import { Collection, Db, Document, MongoClient, MongoServerSelectionError } from "mongodb";
import { config } from "../config.js";

let client: MongoClient | null = null;
let db: Db | null = null;

function formatConnectError(err: unknown): Error {
  if (!(err instanceof MongoServerSelectionError)) {
    return err instanceof Error ? err : new Error(String(err));
  }

  const message = err.message.toLowerCase();
  const tlsBlocked =
    message.includes("tlsv1 alert internal error") ||
    message.includes("err_ssl_tlsv1_alert_internal_error");

  if (tlsBlocked) {
    return new Error(
      [
        "Could not connect to MongoDB Atlas.",
        "This usually means your IP is not allowed in Atlas Network Access.",
        "In MongoDB Atlas: Security → Network Access → Add IP Address.",
        "Add your current IP or 0.0.0.0/0 for development, then wait ~1 minute and restart the server.",
      ].join(" "),
      { cause: err },
    );
  }

  return err;
}

export async function connectDb(): Promise<Db> {
  if (db) return db;

  client = new MongoClient(config.mongodbUri, {
    serverSelectionTimeoutMS: 15000,
  });

  try {
    await client.connect();
  } catch (err) {
    await client.close().catch(() => undefined);
    client = null;
    throw formatConnectError(err);
  }

  db = client.db(config.mongodbDbName);
  await ensureIndexes(db);
  return db;
}

export function getDb(): Db {
  if (!db) {
    throw new Error("Database not connected. Call connectDb() first.");
  }
  return db;
}

export function getCollection<T extends Document = Document>(
  name: string,
): Collection<T> {
  return getDb().collection<T>(name);
}

export async function closeDb(): Promise<void> {
  if (client) {
    await client.close();
    client = null;
    db = null;
  }
}

async function ensureIndexes(database: Db): Promise<void> {
  await Promise.all([
    database
      .collection("admins")
      .createIndex({ email: 1 }, { unique: true }),
    database.collection("leads").createIndex({ status: 1 }),
    database.collection("leads").createIndex({ created_at: -1 }),
    database.collection("outlets").createIndex({ city: 1 }),
    database
      .collection("blog_posts")
      .createIndex({ slug: 1 }, { unique: true }),
    database.collection("menu_categories").createIndex({ key: 1 }, { unique: true }),
    database.collection("menu_items").createIndex({ id: 1 }, { unique: true }),
    database.collection("faqs").createIndex({ id: 1 }, { unique: true }),
    database
      .collection("testimonials")
      .createIndex({ id: 1 }, { unique: true }),
  ]);
}

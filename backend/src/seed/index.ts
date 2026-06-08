import { closeDb } from "../db/index.js";
import { pushContentToMongo } from "./push-content.js";

pushContentToMongo()
  .then(() => {
    console.log("Database seeded successfully.");
  })
  .catch((err) => {
    console.error("Seed failed:", err);
    process.exitCode = 1;
  })
  .finally(async () => {
    await closeDb();
  });

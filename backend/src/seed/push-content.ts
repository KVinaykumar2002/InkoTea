import { v4 as uuid } from "uuid";
import { connectDb, getCollection } from "../db/index.js";
import {
  SEED_ADMIN_ACCOUNTS,
  SEED_BLOG_POSTS,
  SEED_FAQS,
  SEED_LEADS,
  SEED_MENU_CATEGORIES,
  SEED_MENU_ITEMS,
  SEED_OUTLETS,
  SEED_TESTIMONIALS,
} from "./content-data.js";

async function clearCollections() {
  await Promise.all([
    getCollection("testimonials").deleteMany({}),
    getCollection("faqs").deleteMany({}),
    getCollection("blog_posts").deleteMany({}),
    getCollection("menu_items").deleteMany({}),
    getCollection("menu_categories").deleteMany({}),
    getCollection("outlets").deleteMany({}),
    getCollection("leads").deleteMany({}),
    getCollection("admins").deleteMany({}),
  ]);
}

/** Replaces all admin users, storing passwords as plain text. */
export async function reseedAdmins(): Promise<void> {
  const now = new Date().toISOString();

  const accounts = SEED_ADMIN_ACCOUNTS.map((account) => ({
    id: uuid(),
    email: account.email,
    password: account.password,
    name: account.name,
    created_at: now,
  }));

  await getCollection("admins").deleteMany({});
  await getCollection("admins").insertMany(accounts);
  console.log(`Pushed ${accounts.length} admin accounts`);
}

async function seedAdmins() {
  await reseedAdmins();
}

export async function pushContentToMongo(): Promise<void> {
  await connectDb();
  await clearCollections();
  await seedAdmins();

  await getCollection("outlets").insertMany(SEED_OUTLETS);
  await getCollection("menu_categories").insertMany(SEED_MENU_CATEGORIES);
  await getCollection("menu_items").insertMany(SEED_MENU_ITEMS);
  await getCollection("blog_posts").insertMany(SEED_BLOG_POSTS);
  await getCollection("faqs").insertMany(SEED_FAQS);
  await getCollection("testimonials").insertMany(SEED_TESTIMONIALS);
  await getCollection("leads").insertMany(SEED_LEADS);

  console.log(`Pushed ${SEED_OUTLETS.length} outlets`);
  console.log(`Pushed ${SEED_MENU_CATEGORIES.length} menu categories`);
  console.log(`Pushed ${SEED_MENU_ITEMS.length} menu items`);
  console.log(`Pushed ${SEED_BLOG_POSTS.length} blog posts`);
  console.log(`Pushed ${SEED_FAQS.length} FAQs`);
  console.log(`Pushed ${SEED_TESTIMONIALS.length} testimonials`);
  console.log(`Pushed ${SEED_LEADS.length} leads`);
}

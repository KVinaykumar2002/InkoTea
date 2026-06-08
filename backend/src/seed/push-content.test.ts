import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { closeDb, getCollection } from "../db/index.js";
import { pushContentToMongo } from "./push-content.js";
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

const MIN_DOCS_PER_COLLECTION = 4;

describe("push content to MongoDB", () => {
  it("inserts all marketing content collections", async () => {
    if (!process.env.MONGODB_URI) {
      console.warn("Skipping MongoDB push test — MONGODB_URI is not set.");
      return;
    }

    await pushContentToMongo();

    const counts = {
      outlets: await getCollection("outlets").countDocuments(),
      menu_categories: await getCollection("menu_categories").countDocuments(),
      menu_items: await getCollection("menu_items").countDocuments(),
      blog_posts: await getCollection("blog_posts").countDocuments(),
      faqs: await getCollection("faqs").countDocuments(),
      testimonials: await getCollection("testimonials").countDocuments(),
      admins: await getCollection("admins").countDocuments(),
      leads: await getCollection("leads").countDocuments(),
    };

    assert.equal(counts.outlets, SEED_OUTLETS.length);
    assert.equal(counts.menu_categories, SEED_MENU_CATEGORIES.length);
    assert.equal(counts.menu_items, SEED_MENU_ITEMS.length);
    assert.equal(counts.blog_posts, SEED_BLOG_POSTS.length);
    assert.equal(counts.faqs, SEED_FAQS.length);
    assert.equal(counts.testimonials, SEED_TESTIMONIALS.length);
    assert.equal(counts.admins, SEED_ADMIN_ACCOUNTS.length);
    assert.equal(counts.leads, SEED_LEADS.length);

    for (const [collection, count] of Object.entries(counts)) {
      assert.ok(
        count >= MIN_DOCS_PER_COLLECTION,
        `${collection} has ${count} documents, expected at least ${MIN_DOCS_PER_COLLECTION}`,
      );
    }

    const admins = await getCollection<{
      email: string;
      password: string;
    }>("admins")
      .find({})
      .toArray();

    for (const admin of admins) {
      const seedAccount = SEED_ADMIN_ACCOUNTS.find(
        (a) => a.email === admin.email,
      );
      assert.ok(seedAccount, `missing seed account for ${admin.email}`);
      assert.equal(
        admin.password,
        seedAccount.password,
        `${admin.email} password must match seed password`,
      );
    }

    await closeDb();
  });
});

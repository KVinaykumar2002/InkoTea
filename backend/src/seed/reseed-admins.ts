import { closeDb, connectDb } from "../db/index.js";
import { reseedAdmins } from "./push-content.js";

connectDb()
  .then(() => reseedAdmins())
  .then(() => {
    console.log("Admin users reseeded successfully.");
  })
  .catch((err) => {
    console.error("Admin reseed failed:", err);
    process.exitCode = 1;
  })
  .finally(async () => {
    await closeDb();
  });

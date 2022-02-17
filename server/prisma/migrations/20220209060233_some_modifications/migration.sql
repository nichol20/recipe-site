/*
  Warnings:

  - You are about to drop the column `name` on the `recipes` table. All the data in the column will be lost.
  - Added the required column `title` to the `recipes` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_recipes" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "rating" REAL NOT NULL DEFAULT 0,
    "image" TEXT NOT NULL,
    "views" INTEGER NOT NULL,
    "reviews" INTEGER NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_recipes" ("created_at", "description", "id", "image", "rating", "reviews", "views") SELECT "created_at", "description", "id", "image", "rating", "reviews", "views" FROM "recipes";
DROP TABLE "recipes";
ALTER TABLE "new_recipes" RENAME TO "recipes";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

/*
  Warnings:

  - Added the required column `name` to the `recipes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `reviews` to the `recipes` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "informations" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "prep_time" TEXT NOT NULL,
    "cook_time" TEXT NOT NULL,
    "yield" INTEGER NOT NULL,
    "cook_note" TEXT NOT NULL,
    "recipe_id" TEXT NOT NULL,
    CONSTRAINT "informations_recipe_id_fkey" FOREIGN KEY ("recipe_id") REFERENCES "recipes" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ingredients" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "description" TEXT NOT NULL,
    "information_id" TEXT NOT NULL,
    CONSTRAINT "ingredients_information_id_fkey" FOREIGN KEY ("information_id") REFERENCES "informations" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "directions" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "description" TEXT NOT NULL,
    "information_id" TEXT NOT NULL,
    CONSTRAINT "directions_information_id_fkey" FOREIGN KEY ("information_id") REFERENCES "informations" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_recipes" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "rating" REAL NOT NULL,
    "image" TEXT NOT NULL,
    "views" INTEGER NOT NULL,
    "reviews" INTEGER NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_recipes" ("description", "id", "image", "rating", "views") SELECT "description", "id", "image", "rating", "views" FROM "recipes";
DROP TABLE "recipes";
ALTER TABLE "new_recipes" RENAME TO "recipes";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

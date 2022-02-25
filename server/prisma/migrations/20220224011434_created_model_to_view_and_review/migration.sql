/*
  Warnings:

  - You are about to drop the column `reviews` on the `recipes` table. All the data in the column will be lost.
  - You are about to drop the column `views` on the `recipes` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[recipe_id]` on the table `informations` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `user_id` to the `recipes` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "View" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "user_id" TEXT NOT NULL,
    "recipe_id" TEXT NOT NULL,
    CONSTRAINT "View_recipe_id_fkey" FOREIGN KEY ("recipe_id") REFERENCES "recipes" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Review" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "user_id" TEXT NOT NULL,
    "recipe_id" TEXT NOT NULL,
    CONSTRAINT "Review_recipe_id_fkey" FOREIGN KEY ("recipe_id") REFERENCES "recipes" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_recipes" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "rating" REAL NOT NULL DEFAULT 0,
    "image" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" TEXT NOT NULL,
    CONSTRAINT "recipes_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_recipes" ("created_at", "description", "id", "image", "rating", "title") SELECT "created_at", "description", "id", "image", "rating", "title" FROM "recipes";
DROP TABLE "recipes";
ALTER TABLE "new_recipes" RENAME TO "recipes";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "informations_recipe_id_key" ON "informations"("recipe_id");

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "github_id" INTEGER NOT NULL,
    "avatar_url" TEXT NOT NULL,
    "login" TEXT NOT NULL
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_directions" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "description" TEXT NOT NULL,
    "information_id" TEXT NOT NULL,
    CONSTRAINT "directions_information_id_fkey" FOREIGN KEY ("information_id") REFERENCES "informations" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_directions" ("description", "id", "information_id") SELECT "description", "id", "information_id" FROM "directions";
DROP TABLE "directions";
ALTER TABLE "new_directions" RENAME TO "directions";
CREATE TABLE "new_informations" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "prep_time" TEXT NOT NULL,
    "cook_time" TEXT NOT NULL,
    "amount_yield" INTEGER NOT NULL,
    "cook_note" TEXT NOT NULL,
    "recipe_id" TEXT NOT NULL,
    CONSTRAINT "informations_recipe_id_fkey" FOREIGN KEY ("recipe_id") REFERENCES "recipes" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_informations" ("amount_yield", "cook_note", "cook_time", "id", "prep_time", "recipe_id") SELECT "amount_yield", "cook_note", "cook_time", "id", "prep_time", "recipe_id" FROM "informations";
DROP TABLE "informations";
ALTER TABLE "new_informations" RENAME TO "informations";
CREATE TABLE "new_ingredients" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "description" TEXT NOT NULL,
    "information_id" TEXT NOT NULL,
    CONSTRAINT "ingredients_information_id_fkey" FOREIGN KEY ("information_id") REFERENCES "informations" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_ingredients" ("description", "id", "information_id") SELECT "description", "id", "information_id" FROM "ingredients";
DROP TABLE "ingredients";
ALTER TABLE "new_ingredients" RENAME TO "ingredients";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

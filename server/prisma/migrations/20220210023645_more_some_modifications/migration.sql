PRAGMA foreign_keys=OFF;
CREATE TABLE "new_informations" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "prep_time" TEXT NOT NULL,
    "cook_time" TEXT NOT NULL,
    "amount_yield" INTEGER NOT NULL,
    "cook_note" TEXT NOT NULL,
    "recipe_id" TEXT NOT NULL,
    CONSTRAINT "informations_recipe_id_fkey" FOREIGN KEY ("recipe_id") REFERENCES "recipes" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_informations" ("cook_note", "cook_time", "id", "prep_time", "recipe_id") SELECT "cook_note", "cook_time", "id", "prep_time", "recipe_id" FROM "informations";
DROP TABLE "informations";
ALTER TABLE "new_informations" RENAME TO "informations";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

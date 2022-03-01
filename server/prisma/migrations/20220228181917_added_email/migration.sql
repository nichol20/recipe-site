/*
  Warnings:

  - Added the required column `email` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_users" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "avatar_url" TEXT NOT NULL,
    "github_id" INTEGER,
    "google_id" TEXT
);
INSERT INTO "new_users" ("avatar_url", "github_id", "google_id", "id", "name") SELECT "avatar_url", "github_id", "google_id", "id", "name" FROM "users";
DROP TABLE "users";
ALTER TABLE "new_users" RENAME TO "users";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

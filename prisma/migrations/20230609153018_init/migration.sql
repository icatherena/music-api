-- CreateEnum
CREATE TYPE "Type" AS ENUM ('ALBUM', 'EP', 'SINGLE', 'COMPILATION');

-- CreateTable
CREATE TABLE "Artist" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Artist_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Post" (
    "id" SERIAL NOT NULL,
    "artist_id" INTEGER NOT NULL,
    "type" "Type" NOT NULL,
    "name" TEXT NOT NULL,
    "post_date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Theme" (
    "id" SERIAL NOT NULL,
    "post_id" INTEGER NOT NULL,
    "index" INTEGER NOT NULL,
    "length" INTEGER NOT NULL,

    CONSTRAINT "Theme_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_artist_id_fkey" FOREIGN KEY ("artist_id") REFERENCES "Artist"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Theme" ADD CONSTRAINT "Theme_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

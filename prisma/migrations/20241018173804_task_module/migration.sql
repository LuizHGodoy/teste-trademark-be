-- CreateTable
CREATE TABLE "Task" (
    "uuid" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "priority" TEXT NOT NULL,
    "completed" BOOLEAN NOT NULL DEFAULT false,
    "userUuid" TEXT NOT NULL,

    CONSTRAINT "Task_pkey" PRIMARY KEY ("uuid")
);

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_userUuid_fkey" FOREIGN KEY ("userUuid") REFERENCES "User"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- CreateTable
CREATE TABLE "AppProfile" (
    "email" TEXT NOT NULL,
    "namaPT" TEXT NOT NULL,
    "namaBank" TEXT NOT NULL,
    "noRekening" TEXT NOT NULL,
    "penanggungJawab" TEXT NOT NULL,
    "alamat" TEXT NOT NULL,
    "kabupaten" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AppProfile_pkey" PRIMARY KEY ("email")
);

-- CreateTable
CREATE TABLE "Invoice" (
    "id" SERIAL NOT NULL,
    "invoiceNumber" TEXT NOT NULL,
    "invoiceDate" TIMESTAMP(3) NOT NULL,
    "periode" TEXT NOT NULL,
    "quantityKG" DOUBLE PRECISION NOT NULL,
    "displayQty" DOUBLE PRECISION NOT NULL,
    "pokok" DOUBLE PRECISION NOT NULL,
    "dpp" DOUBLE PRECISION NOT NULL,
    "ppn" DOUBLE PRECISION NOT NULL,
    "total" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Invoice_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Invoice_invoiceNumber_key" ON "Invoice"("invoiceNumber");

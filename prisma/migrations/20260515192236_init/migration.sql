-- CreateEnum
CREATE TYPE "ProductCategory" AS ENUM ('COUPLE_SEATING', 'TENT', 'TABLE', 'GUEST_SEATING', 'LIGHTING', 'DECORATION', 'EXTRA');

-- CreateEnum
CREATE TYPE "PricingUnit" AS ENUM ('PIECE', 'SET', 'DAY', 'PACK', 'METER', 'GUEST');

-- CreateEnum
CREATE TYPE "EventType" AS ENUM ('WEDDING', 'ENGAGEMENT', 'HENNA', 'FAMILY_EVENT', 'OTHER');

-- CreateEnum
CREATE TYPE "QuoteStatus" AS ENUM ('NEW', 'CONTACTED', 'CONFIRMED', 'REJECTED', 'COMPLETED');

-- CreateTable
CREATE TABLE "Product" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "category" "ProductCategory" NOT NULL,
    "nameFr" TEXT NOT NULL,
    "nameAr" TEXT NOT NULL,
    "descriptionFr" TEXT NOT NULL,
    "descriptionAr" TEXT NOT NULL,
    "pricePerDay" DECIMAL(10,2) NOT NULL,
    "unit" "PricingUnit" NOT NULL,
    "imageUrl" TEXT,
    "minQuantity" INTEGER NOT NULL DEFAULT 1,
    "availableQuantity" INTEGER,
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QuoteRequest" (
    "id" TEXT NOT NULL,
    "customerName" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "eventDate" TIMESTAMP(3),
    "city" TEXT,
    "guestCount" INTEGER,
    "eventType" "EventType" NOT NULL DEFAULT 'WEDDING',
    "message" TEXT,
    "status" "QuoteStatus" NOT NULL DEFAULT 'NEW',
    "totalEstimate" DECIMAL(10,2) NOT NULL DEFAULT 0,
    "internalNotes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "QuoteRequest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QuoteItem" (
    "id" TEXT NOT NULL,
    "quoteRequestId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "productSnapshotName" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 1,
    "unitPrice" DECIMAL(10,2) NOT NULL,
    "subtotal" DECIMAL(10,2) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "QuoteItem_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Product_slug_key" ON "Product"("slug");

-- CreateIndex
CREATE INDEX "Product_category_active_idx" ON "Product"("category", "active");

-- CreateIndex
CREATE INDEX "Product_featured_active_idx" ON "Product"("featured", "active");

-- CreateIndex
CREATE INDEX "QuoteRequest_status_createdAt_idx" ON "QuoteRequest"("status", "createdAt");

-- CreateIndex
CREATE INDEX "QuoteRequest_eventDate_idx" ON "QuoteRequest"("eventDate");

-- CreateIndex
CREATE INDEX "QuoteItem_quoteRequestId_idx" ON "QuoteItem"("quoteRequestId");

-- CreateIndex
CREATE INDEX "QuoteItem_productId_idx" ON "QuoteItem"("productId");

-- AddForeignKey
ALTER TABLE "QuoteItem" ADD CONSTRAINT "QuoteItem_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuoteItem" ADD CONSTRAINT "QuoteItem_quoteRequestId_fkey" FOREIGN KEY ("quoteRequestId") REFERENCES "QuoteRequest"("id") ON DELETE CASCADE ON UPDATE CASCADE;

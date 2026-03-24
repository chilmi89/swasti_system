-- SWASTI Database Schema (SQL)
-- This file contains the raw SQL to set up your Supabase database.
-- Once executed in Supabase, run `npx prisma db pull` to update your Prisma schema.

-- 1. Create Role Enum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'ANALYST', 'FARMER', 'PUBLIC');

-- 2. Commodities Table
CREATE TABLE "Commodity" (
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR(255) UNIQUE NOT NULL,
    "unit" VARCHAR(50) NOT NULL,
    "category" VARCHAR(100)
);

-- 3. Regions Table
CREATE TABLE "Region" (
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR(255) NOT NULL,
    "type" VARCHAR(50) NOT NULL, -- 'PROVINCE' or 'REGENCY'
    "parentId" INTEGER REFERENCES "Region"("id") ON DELETE SET NULL
);

-- 4. Users Table (Updated with Role and Region)
CREATE TABLE "User" (
    "id" TEXT PRIMARY KEY,
    "name" VARCHAR(255),
    "email" VARCHAR(255) UNIQUE NOT NULL,
    "password" TEXT,
    "role" "Role" DEFAULT 'PUBLIC' NOT NULL,
    "regionId" INTEGER REFERENCES "Region"("id"),
    "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- 5. Prices Table
CREATE TABLE "Price" (
    "id" TEXT PRIMARY KEY,
    "commodityId" INTEGER NOT NULL REFERENCES "Commodity"("id") ON DELETE CASCADE,
    "regionId" INTEGER NOT NULL REFERENCES "Region"("id") ON DELETE CASCADE,
    "price" DECIMAL(10, 2) NOT NULL,
    "source" TEXT NOT NULL,
    "date" TIMESTAMP NOT NULL,
    "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- 6. Inflations Table
CREATE TABLE "Inflation" (
    "id" TEXT PRIMARY KEY,
    "regionId" INTEGER NOT NULL REFERENCES "Region"("id") ON DELETE CASCADE,
    "month" INTEGER NOT NULL,
    "year" INTEGER NOT NULL,
    "rate" DOUBLE PRECISION NOT NULL,
    "riskLevel" TEXT NOT NULL,
    "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    UNIQUE("regionId", "month", "year")
);

-- 7. MLModels Table
CREATE TABLE "MLModel" (
    "id" TEXT PRIMARY KEY,
    "name" TEXT NOT NULL,
    "version" TEXT NOT NULL,
    "accuracy" DOUBLE PRECISION,
    "isActive" BOOLEAN DEFAULT FALSE NOT NULL,
    "updatedAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- 8. Predictions Table
CREATE TABLE "Prediction" (
    "id" TEXT PRIMARY KEY,
    "commodityId" INTEGER NOT NULL REFERENCES "Commodity"("id") ON DELETE CASCADE,
    "regionId" INTEGER NOT NULL REFERENCES "Region"("id") ON DELETE CASCADE,
    "modelId" TEXT NOT NULL REFERENCES "MLModel"("id") ON DELETE CASCADE,
    "predictedPrice" DECIMAL(10, 2) NOT NULL,
    "targetDate" TIMESTAMP NOT NULL,
    "confidenceScore" DOUBLE PRECISION,
    "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- 9. Reports Table
CREATE TABLE "Report" (
    "id" TEXT PRIMARY KEY,
    "title" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "format" TEXT NOT NULL,
    "fileUrl" TEXT NOT NULL,
    "createdById" TEXT NOT NULL REFERENCES "User"("id") ON DELETE CASCADE,
    "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for performance
CREATE INDEX "idx_price_date_commodity_region" ON "Price"("date", "commodityId", "regionId");
CREATE INDEX "idx_prediction_target_date" ON "Prediction"("targetDate");

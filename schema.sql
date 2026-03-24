-- SWASTI Database Schema (SQL) - Optimized for Dataset Ingestion
-- Aligned with CSV: Date_Scraped, Date_Param, Commodity_ID, Commodity_Name, Province_ID, Province_Name, Price, Price_Type

-- 1. Roles Table
    CREATE TABLE "Role" (
        "id" SERIAL PRIMARY KEY,
        "name" VARCHAR(50) UNIQUE NOT NULL -- e.g., 'ADMIN', 'PEMERINTAH', 'PETANI', 'PUBLIK'
    );

-- 2. Commodities Table (Master Data)
CREATE TABLE "Commodity" (
    "id" INTEGER PRIMARY KEY,        -- Using Commodity_ID from CSV
    "name" VARCHAR(255) UNIQUE NOT NULL,
    "unit" VARCHAR(50) DEFAULT 'kg',
    "category" VARCHAR(100)
);

-- 3. Regions Table (Province Master Data)
CREATE TABLE "Region" (
    "id" INTEGER PRIMARY KEY,        -- Using Province_ID from CSV
    "name" VARCHAR(255) NOT NULL,
    "type" VARCHAR(50) DEFAULT 'PROVINCE'
);

-- 4. Users Table
CREATE TABLE "User" (
    "id" TEXT PRIMARY KEY,
    "name" VARCHAR(255),
    "email" VARCHAR(255) UNIQUE NOT NULL,
    "password" TEXT,
    "roleId" INTEGER REFERENCES "Role"("id") ON DELETE SET NULL,
    "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- 5. Prices Table (Historical Data - Direct CSV Mapping)
CREATE TABLE "Price" (
    "id" TEXT PRIMARY KEY,           -- Unique identifier for each record
    "commodityId" INTEGER NOT NULL REFERENCES "Commodity"("id") ON DELETE CASCADE,
    "regionId" INTEGER NOT NULL REFERENCES "Region"("id") ON DELETE CASCADE,
    "price" DECIMAL(20, 2) NOT NULL,
    "priceType" INTEGER,             -- Maps to Price_Type in CSV
    "dateParam" TIMESTAMP NOT NULL,  -- Maps to Date_Param in CSV
    "dateScraped" TIMESTAMP,         -- Maps to Date_Scraped in CSV
    "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- 6. Inflations Table (Analytical Data)
CREATE TABLE "Inflation" (
    "id" TEXT PRIMARY KEY,
    "regionId" INTEGER NOT NULL REFERENCES "Region"("id") ON DELETE CASCADE,
    "month" INTEGER NOT NULL,
    "year" INTEGER NOT NULL,
    "rate" DOUBLE PRECISION NOT NULL,
    "riskLevel" TEXT NOT NULL,       -- SAFE, WATCH, HIGH_RISK
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
    "predictedPrice" DECIMAL(20, 2) NOT NULL,
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

-- Indexes for performance & quick lookups
CREATE INDEX "idx_price_date_param" ON "Price"("dateParam");
CREATE INDEX "idx_price_lookup" ON "Price"("commodityId", "regionId", "dateParam");
CREATE INDEX "idx_prediction_target_date" ON "Prediction"("targetDate");

import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient();

async function main() {
    console.log('Seeding region data...');

    const csvPath = path.join(process.cwd(), 'dataset', 'komoditas_beras_2022_2026.csv');
    const csvData = fs.readFileSync(csvPath, 'utf8');
    
    const lines = csvData.split('\n');
    const provinces = new Map<number, string>();

    // Skip header and process lines
    for (let i = 1; i < lines.length; i++) {
        const line = lines[i].trim();
        if (!line) continue;

        const columns = line.split(',');
        if (columns.length < 6) continue;

        const provinceId = parseInt(columns[4]);
        const provinceName = columns[5]?.trim();

        if (!isNaN(provinceId) && provinceName) {
            provinces.set(provinceId, provinceName);
        }
    }

    console.log(`Found ${provinces.size} unique provinces. Upserting into database...`);

    for (const [id, name] of provinces.entries()) {
        await prisma.region.upsert({
            where: { id },
            update: { name: name.toUpperCase() },
            create: { 
                id, 
                name: name.toUpperCase(),
                type: 'PROVINCE'
            }
        });
    }

    console.log('Seeding complete.');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });

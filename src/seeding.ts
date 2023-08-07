// seeding.ts
import { createConnection } from 'typeorm';
import { useSeeding, runSeeder, factory } from 'typeorm-seeding';
import { Product } from '@/product/entities/product.entity';

createConnection().then(async () => {
  await useSeeding();

  // Generate 10 products using the ProductFactory
  await factory(Product)().createMany(10);

  // You can add more seed data for other entities if needed.

  // If you have seeders for other entities, run them here
  // For example:
  // await runSeeder(OtherEntitySeeder);

  console.log('Seed data successfully generated.');
  process.exit(0);
});

import '@/lib/repositories/productRepo';
import '@/lib/repositories/variantRepo';
import '@/lib/repositories/imageRepo';
import { syncData } from './sync';

console.log('Database initialized');

// Sync data from API
syncData();

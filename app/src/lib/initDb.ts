import '@/lib/repositories/productRepo';
import '@/lib/repositories/variantRepo';
import '@/lib/repositories/imageRepo';
import db from './db';

db.exec(`
  CREATE TABLE IF NOT EXISTS last_sync (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
  );
`);

console.log('Database initialized');

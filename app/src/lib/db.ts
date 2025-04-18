import { Pool } from 'pg';

const dbUrl = process.env.DATABASE_URL;
if (!dbUrl) throw new Error('DATABASE_URL not set');

const db = new Pool({ connectionString: dbUrl });

export default db;
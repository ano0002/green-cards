import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config();

const db = await mysql.createConnection({
    host: 'anatole-sot.xyz',
    port: 3306,
    user: 'green-cards',
    password: '*qAA_DTD)l)wi(2h',
    database: 'green-cards',
});

export default db;
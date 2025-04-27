import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config();

// Create a pool of connections that can be reused
let pool;

function getPool() {
    if (!pool) {
        pool = mysql.createPool({
            host: process.env.DB_HOST,        // Make sure to set these in your environment
            port: 3306,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            waitForConnections: true,   // Don't block when no connections are available
            connectionLimit: 10,        // Maximum number of concurrent connections
            queueLimit: 0               // Unlimited number of requests in the queue
        });
    }
    return pool;
}

async function makeRequest(req, params = []) {
    try {
        // Get the connection pool and execute the query
        const pool = getPool();
        const [rows] = await pool.execute(req, params);
        return rows;
    } catch (error) {
        console.error('Error connecting to the database:', error);
        throw error;
    }
}

export default makeRequest;

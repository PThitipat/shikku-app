const mysql = require('mysql2');

if (!process.env.MYSQL_URI) {
  throw new Error("❌ MYSQL_URI is missing from environment variables.");
}

export const mysqlPool = mysql.createPool(process.env.MYSQL_URI);
export const mysqlPromisePool = mysqlPool.promise();
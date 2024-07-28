import { createPool } from 'mysql2';

const pool = createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: 3306
});

pool.getConnection((err, conn) => {
  if (err) {
    console.log('MariaDB 연결 실패.');
  } else {
    console.log('MariaDB 연결 성공.');
  }
  conn.release();
});

const executeQuery = (query: any, arrParams: any) => {
  return new Promise((resolve, reject) => {
    try {
      pool.query(query, arrParams, (err, data) => {
        if (err) {
          console.log('Error in executing the query');
          reject(err);
        }
        console.log('========================DB 결과========================');
        //console.log(data)
        resolve(data);
      });
    } catch (err) {
      reject(err);
    }
  });
};

export default executeQuery;

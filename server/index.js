const express = require('express');
const { Pool } = require('pg');

const app = express();
const port = process.env.PORT || 3000;

// 创建 PostgreSQL 数据库连接池
const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // 使用你的数据库连接字符串
  ssl: {
    rejectUnauthorized: false
  }
});

app.use(express.json());

// 处理记录下载的请求
app.post('/record-download', async (req, res) => {
  const packname = req.body.packname; // 获取模组名称

  try {
    await pool.query(
      'UPDATE modpack_downloads SET download_count = download_count + 1 WHERE packname = $1',
      [packname]
    );
    res.status(200).json({ message: 'Download recorded successfully.' });
  } catch (error) {
    console.error('Error recording download:', error);
    res.status(500).json({ message: 'Error recording download.' });
  }
});

// 启动服务器
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

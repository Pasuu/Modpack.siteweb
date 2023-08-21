const { Client } = require('pg');

export default async (req, res) => {
  const packname = req.query.packname; // 获取 packname 查询参数

  const client = new Client({
    connectionString: process.env.DATABASE_URL, // 使用环境变量来获取数据库连接信息
  });

  try {
    await client.connect();

    const result = await client.query(
      'SELECT download_count FROM download_statistics WHERE packname = $1',
      [packname]
    );

    if (result.rows.length > 0) {
      const downloadCount = result.rows[0].download_count;
      res.status(200).json({ downloadCount });
    } else {
      res.status(404).json({ error: 'Download statistics not found.' });
    }
  } catch (error) {
    console.error('Error fetching download stats:', error);
    res.status(500).json({ error: 'Failed to fetch download stats.' });
  } finally {
    await client.end();
  }
};

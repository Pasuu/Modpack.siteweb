require('dotenv').config();

const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// PostgreSQL setup
const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // Your PostgreSQL connection string
  ssl: {
    rejectUnauthorized: false,
  },
});

// Route to handle fetching download stats
app.get('/api/get-download-stats', async (req, res) => {
  const packname = req.query.packname;
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT download_count FROM download_stats WHERE packname = $1', [packname]);
    client.release();
    res.json({ downloadCount: result.rows[0].download_count });
  } catch (error) {
    console.error('Error fetching download stats:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Route to handle updating download stats
app.post('/api/update-download-stats', async (req, res) => {
  const packname = req.body.packname;
  try {
    const client = await pool.connect();
    // Update the download count in the database
    await client.query('UPDATE download_stats SET download_count = download_count + 1 WHERE packname = $1', [packname]);
    client.release();
    res.json({ message: 'Download stats updated successfully' });
  } catch (error) {
    console.error('Error updating download stats:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/', (req, res) => {
  res.send("Welcome to Modpack SiteWeb!");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

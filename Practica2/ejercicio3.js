import express from 'express';
import mysql from 'mysql2/promise';

const app = express();

app.use(express.json());

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'basededatos'
});

app.get('/categorias/:id', async (req, res) => {

  const id = req.params.id;

  const [resultado] = await pool.query(
    'SELECT * FROM categorias WHERE id = ?',
    [id]
  );

  res.status(200).json(resultado[0]);

});

const PUERTO = 3001;

app.listen(PUERTO, () => {
  console.log(`Servidor en http://localhost:${PUERTO}`);
});
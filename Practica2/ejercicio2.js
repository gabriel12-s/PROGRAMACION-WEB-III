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

app.get('/categorias', async (req, res) => {

  const [resultado] = await pool.query(
    'SELECT * FROM categorias'
  );

  res.status(200).json(resultado);

});

const PUERTO = 3001;

app.listen(PUERTO, () => {
  console.log(`Servidor en http://localhost:${PUERTO}`);
});
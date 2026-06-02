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

app.post('/categorias', async (req, res) => {

  const { nombre, descripcion } = req.body;

  const [resultado] = await pool.query(
    'INSERT INTO categorias(nombre, descripcion) VALUES (?, ?)',
    [nombre, descripcion]
  );

  res.status(201).json(resultado);

});

const PUERTO = 3001;

app.listen(PUERTO, () => {
  console.log(`Servidor en http://localhost:${PUERTO}`);
});
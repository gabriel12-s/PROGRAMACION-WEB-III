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

app.patch('/categorias/:id', async (req, res) => {

  const id = req.params.id;

  const { nombre, descripcion } = req.body;

  const [resultado] = await pool.query(
    'UPDATE categorias SET nombre = ?, descripcion = ? WHERE id = ?',
    [nombre, descripcion, id]
  );

  res.status(200).json(resultado);

});

const PUERTO = 3001;

app.listen(PUERTO, () => {
  console.log(`Servidor en http://localhost:${PUERTO}`);
});
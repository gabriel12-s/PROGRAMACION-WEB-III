import express from "express";
import mysql from "mysql2";
import cors from "cors";
//validaciones
import { body, validationResult } from "express-validator";

const app = express();

app.use(express.json());
app.use(cors());

const conexion = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "miski_wallpa"
});

conexion.connect((error) => {

    if(error){
        console.log("Error de conexión");
    } else {
        console.log("Conexión exitosa");
    }

});

app.get("/productos", (req, res) => {

    conexion.query(
        "SELECT * FROM producto",
        (error, resultados) => {

            if(error){
                console.log(error);
            } else {
                res.json(resultados);
            }

        }
    );

});

app.get("/insertar", (req, res) => {

    const sql = `
        INSERT INTO producto
        (nombre, descripcion, precio, stock, id_categoria)

        VALUES
        ('Hamburguesa', 'Especial', 25, 10, 1)
    `;

    conexion.query(sql, (error, resultado) => {

        if(error){

            console.log(error);
            res.json(error);

        } else {

            res.json("Producto insertado");

        }

    });

});

//login
app.post(

    "/login",

    [
        body("correo")
        .isEmail()
        .withMessage("Correo inválido"),

        body("contrasena")
        .isLength({ min: 6 })
        .withMessage(
            "La contraseña debe tener mínimo 6 caracteres"
        )
    ],

    (req, res) => {

        const errores = validationResult(req);

        if(!errores.isEmpty()){
            return res.status(400).json({
                errores: errores.array()
            });
        }

        const { correo, contrasena } = req.body;

        const sql = `
            SELECT *
            FROM cliente
            WHERE correo = ?
            AND contrasena = ?
        `;

        conexion.query(
            sql,
            [correo, contrasena],
            (error, resultado) => {

                if(error){
                    return res.status(500).json(error);
                }

                if(resultado.length > 0){

                    res.json({
                        mensaje: "Login correcto",
                        cliente: resultado[0]
                    });

                } else {

                    res.status(401).json({
                        mensaje:
                        "Correo o contraseña incorrectos"
                    });

                }

            }
        );

    }
);

//registro
app.post("/registro", (req, res) => {

    const {
        nombre,
        apellido,
        correo,
        telefono,
        direccion,
        contrasena,
        ci
    } = req.body;

    const sql = `
        INSERT INTO cliente
        (
            nombre,
            apellido,
            correo,
            telefono,
            direccion,
            contrasena,
            ci
        )
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    conexion.query(
        sql,
        [
            nombre,
            apellido,
            correo,
            telefono,
            direccion,
            contrasena,
            ci
        ],
        (error, resultado) => {

            if(error){
                console.log(error);
                return res.status(500).json(error);
            }

            res.json({
                mensaje: "Cliente registrado correctamente"
            });

        }
    );

});

//pedidos
app.post("/pedido", (req, res) => {

    const {
        total,
        id_cliente,
        productos
    } = req.body;

    const sqlPedido = `
        INSERT INTO pedido
        (
            fecha,
            estado,
            total,
            id_cliente
        )
        VALUES
        (
            NOW(),
            'Pendiente',
            ?,
            ?
        )
    `;

    conexion.query(
        sqlPedido,
        [total, id_cliente],
        (error, resultado) => {

            if(error){
                console.log(error);
                return res.status(500).json(error);
            }

            const idPedido = resultado.insertId;

            productos.forEach((producto) => {

                const sqlDetalle = `
                    INSERT INTO detalle_pedido
                    (
                        cantidad,
                        subtotal,
                        id_pedido,
                        id_producto
                    )
                    VALUES
                    (
                        1,
                        ?,
                        ?,
                        ?
                    )
                `;

                conexion.query(
                    sqlDetalle,
                    [
                        producto.precio,
                        idPedido,
                        producto.id_producto
                    ]
                );

            });

            res.json({
                mensaje: "Pedido registrado correctamente"
            });

        }
    );

});


//agregar producto admin
app.post("/producto", (req, res) => {

    const {
        nombre,
        descripcion,
        precio,
        stock,
        id_categoria
    } = req.body;

    const sql = `
        INSERT INTO producto
        (
            nombre,
            descripcion,
            precio,
            stock,
            id_categoria
        )
        VALUES (?, ?, ?, ?, ?)
    `;

    conexion.query(
        sql,
        [
            nombre,
            descripcion,
            precio,
            stock,
            id_categoria
        ],
        (error, resultado) => {

            if(error){
                return res.status(500).json(error);
            }

            res.json({
                mensaje: "Producto agregado correctamente"
            });

        }
    );

});

//borrar prodc
app.delete("/producto/:id", (req, res) => {

  const { id } = req.params;

  const sql = `
    DELETE FROM producto
    WHERE id_producto = ?
  `;

  conexion.query(
    sql,
    [id],
    (error, resultado) => {

      if(error){
        console.log(error);

        return res.status(500).json({
          mensaje: "Error al eliminar"
        });
      }

      res.json({
        mensaje: "Producto eliminado"
      });

    }
  );

});


app.listen(3001, () => {
    console.log("Servidor corriendo");
});
import './Platos.css';

import { agregarPedido } from "./services/carrito";


import { useState, useRef } from "react";
// importaciones Boostrap
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';

//importaciones react-icons
import { FaArrowRight } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa";

import { IoFastFoodOutline } from "react-icons/io5";
// imports my arch
import plato1 from './assets/plato1.jpg';
import plato2 from './assets/plato2.jpg';
import plato3 from './assets/plato3.jpg';
import plato4 from './assets/plato4.jpg';
import plato5 from './assets/plato5.jpg';
import plato6 from './assets/plato6.jpg';
import plato7 from './assets/plato7.jpg';
import plato8 from './assets/plato8.jpg';


function Platos({
  pedidos,
  setPedidos,
  busqueda,
  productosExtra,
  usuario,
  eliminarProducto
}) 
{

   const sliderRef = useRef(null);

  


  const moverDerecha = () => {
    const slider = sliderRef.current;

    const card = slider.querySelector(".card-menu-platos");
    const anchoTarjeta = card.offsetWidth + 20;

    slider.scrollBy({
      left: anchoTarjeta,
      behavior: "smooth"
    });
  };

  const moverIzquierda = () => {
    const slider = sliderRef.current;

    const card = slider.querySelector(".card-menu-platos");
    const anchoTarjeta = card.offsetWidth + 20;

    slider.scrollBy({
      left: -anchoTarjeta,
      behavior: "smooth"
    });
  };
 
  // busca
  
 
 const platos = [
  {
    id_productos: 1,
    nombre: "Pique Macho",
    precio: 40,
    imagen: plato1,
    descripcion: "Carne, papas, salchichas, huevo y locoto."
  },
  {
    id_productos: 2,
    nombre: "Pollo Plancha",
    precio: 20,
    imagen: plato2,
    descripcion: "Pechuga asada con arroz y ensalada fresca."
  },
  {
    id_productos: 3,
    nombre: "Fajitas Carne",
    precio: 10.99,
    imagen: plato3,
    descripcion: "Tiras de res, tortilla, frijoles y postre."
  },
  {
    id_productos: 4,
    nombre: "Silpancho",
    precio: 20,
    imagen: plato4,
    descripcion: "Carne delgada, arroz, papas, huevo y salsa."
  },
  {
    id_productos: 5,
    nombre: "Picante Pollo",
    precio: 25,
    imagen: plato5,
    descripcion: "Pollo en ají rojo, arroz y chuño."
  },
  {
    id_productos: 6,
    nombre: "Falso Conejo",
    precio: 20,
    imagen: plato6,
    descripcion: "Carne apanada con fideo, papa y ahogado."
  },
  {
    id_productos: 7,
    nombre: "Garbanzada",
    precio: 15,
    imagen: plato7,
    descripcion: "Guiso de garbanzos con verduras."
  },
  {
    id_productos: 8,
    nombre: "Chorrillana",
    precio: 35,
    imagen: plato8,
    descripcion: "Papas fritas, carne y huevos fritos."
  }
];

const platosExtra = productosExtra.filter(
  (producto) => producto.categoria === "1"
);

const todosLosPlatos = [
  ...platos,
  ...platosExtra
];

const platosFiltrados = todosLosPlatos.filter(
  (plato) =>
    plato.nombre
      .toLowerCase()
      .includes(busqueda.toLowerCase())
);

console.log(platosFiltrados);
  return (
    <div className='platos-container' >
      <div className="carrusel-contenedor">  
        <button onClick={moverIzquierda} className="flecha">
          <FaArrowLeft color='white' size={45}/>
        </button>

        <div className="contenedor-cards" ref={sliderRef}>
           {platosFiltrados.map((plato, index) => (
              <Card key={index} className="card-menu-platos">

                <Image
                  style={{ margin: '0 auto' }}
                  src={plato.imagen}
                  alt={plato.nombre}
                />

                <Card.Body className='card-body'>

                  <Card.Title
                    style={{
                      fontFamily: 'Brush_Script_MT',
                      fontSize: '50px',
                      fontWeight: 'bold'
                    }}
                  >
                    {plato.nombre}
                  </Card.Title>

                  <Card.Text
                    style={{
                      fontFamily: 'Brush_Script_MT',
                      fontSize: '30px'
                    }}
                  >
                    {plato.descripcion}
                  </Card.Text>

                  <Card.Text
                    style={{
                      fontFamily: 'Brush_Script_MT',
                      fontSize: '30px'
                    }}
                  >
                    Precio: Bs. {plato.precio}
                  </Card.Text>

                  <Button
                    variant="primary"
                    className="boton-platos"
                    onClick={() =>
                      agregarPedido(
                        pedidos,
                        setPedidos,
                        {
                          id_producto: plato.id_productos,
                          nombre: plato.nombre,
                          precio: plato.precio
                        }
                      )
                    }
                  >
                    Ir a Ordenar
                    <IoFastFoodOutline
                      size={40}
                      color="white"
                    />
                  </Button>

                  {usuario?.rol === "admin" && (
                    <Button
                      variant="danger"
                      style={{ marginTop: "10px" , borderRadius:"30px", fontSize:"20px", fontWeight: "bold", fontFamily: 'Brush_Script_MT'}}
                      onClick={() =>
                        eliminarProducto(
                          plato.id_productos
                        )
                      }
                    >
                      Eliminar
                    </Button>
                  )}
                </Card.Body>

              </Card>
            ))}
                  
          
        </div>
        <button onClick={moverDerecha} className="flecha">
          <FaArrowRight color='white' size={45}/>
        </button>
 
      </div>
      
    </div>
  );
}

export default Platos;
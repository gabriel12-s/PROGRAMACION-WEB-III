import './Ensaladas.css';

import { useRef } from "react";

// importaciones Boostrap
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';

//importaciones react-icons
import { FaArrowRight } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa";

import { IoFastFoodOutline } from "react-icons/io5";
// imports my arch
import salsa1 from './assets/salsa1.png';
import salsa2 from './assets/salsa2.png';
import salsa3 from './assets/salsa3.png';
import salsa4 from './assets/salsa4.png';
import salsa5 from './assets/salsa5.png';
import salsa6 from './assets/salsa6.png';
import salsa7 from './assets/salsa7.png';
import salsa8 from './assets/salsa8.png';

//carrito
import { agregarPedido } from "./services/carrito";

function Ensaladas({
  pedidos,
  setPedidos,
  busqueda,
  productosExtra
}) {
  const sliderRef = useRef(null);

  


  const moverDerecha = () => {
    const slider = sliderRef.current;

    const card = slider.querySelector(".card-menu-ensaladas");
    const anchoTarjeta = card.offsetWidth + 20;

    slider.scrollBy({
      left: anchoTarjeta,
      behavior: "smooth"
    });
  };

  const moverIzquierda = () => {
    const slider = sliderRef.current;

    const card = slider.querySelector(".card-menu-ensaladas");
    const anchoTarjeta = card.offsetWidth + 20;

    slider.scrollBy({
      left: -anchoTarjeta,
      behavior: "smooth"
    });
  };

  // busaca
  const ensaladas = [
  {
    id_productos: 17,
    nombre: "Llajua Tradicional",
    precio: 2,
    imagen: salsa1,
    descripcion: "Locoto picado, tomate, quirquiña y sal."
  },
  {
    id_productos: 18,
    nombre: "Ensalada Quinoa",
    precio: 15,
    imagen: salsa5,
    descripcion: "Quinoa, tomates, maíz, porotos y queso."
  },
  {
    id_productos: 19,
    nombre: "Ají Amarillo",
    precio: 3,
    imagen: salsa2,
    descripcion: "Vainas cocidas, licuadas, sazonadas."
  },
  {
    id_productos: 20,
    nombre: "Ensalada César",
    precio: 25,
    imagen: salsa7,
    descripcion: "Lechuga, pollo asada, crotones y queso."
  },
  {
    id_productos: 21,
    nombre: "Huacatay y Maní",
    precio: 4,
    imagen: salsa3,
    descripcion: "Hierba aromática, maní, queso y leche."
  },
  {
    id_productos: 22,
    nombre: "Soltero Cochabambino",
    precio: 10,
    imagen: salsa6,
    descripcion: "Queso, tomate, cebolla, habas y locoto."
  },
  {
    id_productos: 23,
    nombre: "Salsa Barbacoa",
    precio: 5,
    imagen: salsa4,
    descripcion: "Salsa ahumada, dulce, ideal para carnes."
  },
  {
    id_productos: 24,
    nombre: "Ensalada Griega",
    precio: 20,
    imagen: salsa8,
    descripcion: "Tomate, pepino, cebolla, queso y aceitunas."
  }
];

//ensaldas extra
const ensaladasExtra = productosExtra.filter(
  (producto) => producto.categoria === "2"
);
const todasLasEnsaladas = [
  ...ensaladas,
  ...ensaladasExtra
];

const ensaladasFiltradas = todasLasEnsaladas.filter(
  (ensalada) =>
    ensalada.nombre
      .toLowerCase()
      .includes(busqueda.toLowerCase())
);
  return ( 
     <div className='ensaladas-container' >
      <div className="carrusel-contenedor">  
        <button onClick={moverIzquierda} className="flecha">
          <FaArrowLeft color='white' size={45}/>
        </button>

        <div className="contenedor-cards" ref={sliderRef}>
          {ensaladasFiltradas.map((ensalada, index) => (
            <Card key={index} className="card-menu-ensaladas">

              <Image
                style={{ margin: '0 auto' }}
                src={ensalada.imagen}
              />

              <Card.Body className='card-body'>

                <Card.Title
                  style={{
                    fontFamily: 'Brush_Script_MT',
                    fontSize: '50px',
                    fontWeight: 'bold'
                  }}
                >
                  {ensalada.nombre}
                </Card.Title>

                <Card.Text
                  style={{
                    fontFamily: 'Brush_Script_MT',
                    fontSize: '30px'
                  }}
                >
                  {ensalada.descripcion}
                </Card.Text>

                <Card.Text
                  style={{
                    fontFamily: 'Brush_Script_MT',
                    fontSize: '30px'
                  }}
                >
                  Precio: Bs. {ensalada.precio}
                </Card.Text>

                <Button
                  variant="primary"
                  className="boton-ensaladas"
                  onClick={() =>
                    agregarPedido(
                      pedidos,
                      setPedidos,
                      { 
                        id_producto: ensalada.id_productos,
                        nombre: ensalada.nombre,
                        precio: ensalada.precio
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
 
export default Ensaladas;
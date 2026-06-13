import './Bebidas.css';

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
import bebida1 from './assets/bebida1.png';
import bebida2 from './assets/bebida2.png';
import bebida3 from './assets/bebida3.png';
import bebida4 from './assets/bebida4.png';
import bebida5 from './assets/bebida5.png';
import bebida6 from './assets/bebida6.png';
import bebida7 from './assets/bebida7.png';
import bebida8 from './assets/bebida8.png';

// carrito
import { agregarPedido } from "./services/carrito";

function Bebidas({
  pedidos,
  setPedidos,
  busqueda,
  productosExtra
}) {

  const sliderRef = useRef(null);

  


  const moverDerecha = () => {
    const slider = sliderRef.current;

    const card = slider.querySelector(".card-menu-bebidas");
    const anchoTarjeta = card.offsetWidth + 20;

    slider.scrollBy({
      left: anchoTarjeta,
      behavior: "smooth"
    });
  };

  const moverIzquierda = () => {
    const slider = sliderRef.current;

    const card = slider.querySelector(".card-menu-bebidas");
    const anchoTarjeta = card.offsetWidth + 20;

    slider.scrollBy({
      left: -anchoTarjeta,
      behavior: "smooth"
    });
  };

  //busca
  const bebidas = [
  {
    id_productos: 9,
    nombre: "Mocochinchi",
    precio: 5,
    imagen: bebida1,
    descripcion: "Durazno seco hervido con canela dulce."
  },
  {
    id_productos: 10,
    nombre: "Chicha de Maní",
    precio: 5,
    imagen: bebida2,
    descripcion: "Maní licuado, cocido y servido frío."
  },
  {
    id_productos: 11,
    nombre: "Jugo de Linaza",
    precio: 5,
    imagen: bebida3,
    descripcion: "Semillas de linaza hervidas y espeso."
  },
  {
    id_productos: 12,
    nombre: "Açaí Smoothie",
    precio: 15,
    imagen: bebida4,
    descripcion: "Pulpa de fruta amazónica dulce licuada."
  },
  {
    id_productos: 13,
    nombre: "Jugo de Frutilla",
    precio: 7,
    imagen: bebida5,
    descripcion: "Frutillas frescas licuadas con agua pura."
  },
  {
    id_productos: 14,
    nombre: "Jugo de Maracuyá",
    precio: 7,
    imagen: bebida6,
    descripcion: "Fruta de la pasión licuada, ácida."
  },
  {
    id_productos: 15,
    nombre: "Limonada con Chía",
    precio: 6,
    imagen: bebida7,
    descripcion: "Zumo de limón, agua y semillas."
  },
  {
    id_productos: 16,
    nombre: "Jugo de Papaya",
    precio: 6,
    imagen: bebida8,
    descripcion: "Papaya dulce licuada, suave y cremosa."
  }
];


//bebidas extra
const bebidasExtra = productosExtra.filter(
  (producto) => producto.categoria === "3"
);
const todasLasBebidas = [
  ...bebidas,
  ...bebidasExtra
];

const bebidasFiltradas = todasLasBebidas.filter(
  (bebida) =>
    bebida.nombre
      .toLowerCase()
      .includes(busqueda.toLowerCase())
);

  return (
     <div className='bebidas-container' >
      <div className="carrusel-contenedor">  
        <button onClick={moverIzquierda} className="flecha">
          <FaArrowLeft color='white' size={45}/>
        </button>

        <div className="contenedor-cards" ref={sliderRef}>
          
        
          {bebidasFiltradas.map((bebida, index) => (
            <Card key={index} className="card-menu-bebidas">

              <Image
                style={{ margin: '0 auto' }}
                src={bebida.imagen}
              />

              <Card.Body className='card-body'>

                <Card.Title
                  style={{
                    fontFamily: 'Brush_Script_MT',
                    fontSize: '50px',
                    fontWeight: 'bold'
                  }}
                >
                  {bebida.nombre}
                </Card.Title>

                <Card.Text
                  style={{
                    fontFamily: 'Brush_Script_MT',
                    fontSize: '30px'
                  }}
                >
                  {bebida.descripcion}
                </Card.Text>

                <Card.Text
                  style={{
                    fontFamily: 'Brush_Script_MT',
                    fontSize: '30px'
                  }}
                >
                  Precio: Bs. {bebida.precio}
                </Card.Text>

                <Button
                  variant="primary"
                  className="boton-bebidas"
                  onClick={() =>
                    agregarPedido(
                      pedidos,
                      setPedidos,
                      {
                        id_producto: bebida.id_productos,
                        nombre: bebida.nombre,
                        precio: bebida.precio
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
      <h2 style={{
        color: "white",
        marginTop: "40px",
        textAlign: "center"
      }}>
        Productos agregados
      </h2>

      <div className="contenedor-cards">

        {bebidasExtra.map((producto) => (

          <Card
            key={producto.id_productos}
            className="card-menu-bebidas"
          >

            <Card.Body>

              <Card.Title>
                {producto.nombre}
              </Card.Title>

              <Card.Text>
                {producto.descripcion}
              </Card.Text>

              <Card.Text>
                Bs. {producto.precio}
              </Card.Text>

            </Card.Body>

          </Card>

        ))}

      </div>
    </div>
  );
} 

export default Bebidas;
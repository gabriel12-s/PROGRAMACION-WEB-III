import './Menu.css'
import { useState } from "react";
import { agregarPedido } from "./services/carrito";

//axios
import axios from "axios";
//import bootstrap
import Card from 'react-bootstrap/Card';

import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Image from 'react-bootstrap/Image';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

import Accordion from 'react-bootstrap/Accordion';

import Carousel from 'react-bootstrap/Carousel';
//import my files
import fig1 from './assets/fig1-menu.avif';
import fig2 from './assets/fig2-menu.jpg';
import fig3 from './assets/fig3-menu.jpg';
import logo2 from './assets/logo2.png';
import logoinf from './assets/logo3.png';
import primero from './assets/primero.jpg';
import prom1 from './assets/prom1.png';
import prom2 from './assets/prom2.png';
import prom3 from './assets/prom3.png';


//import https://react-icons.github.io/
import { FaFacebook } from "react-icons/fa";
import { FaFacebookMessenger } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { IoCallOutline } from "react-icons/io5";
import { IoIosMail } from "react-icons/io";
import { BsGeoAltFill } from "react-icons/bs";
import { IoFastFoodOutline } from "react-icons/io5";
import { TiShoppingCart } from "react-icons/ti";
import { MdAddShoppingCart } from "react-icons/md";
import { FaDeleteLeft } from "react-icons/fa6";
//Rutas

import { Routes, Route, NavLink, Navigate } from "react-router-dom";


import Platos from "./Platos";
import Ensaladas from "./Ensaladas";
import Bebidas from "./Bebidas";


function Menu({pedidos, setPedidos,usuario}) {
// estados nuevo producto
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [precio, setPrecio] = useState("");
  const [stock, setStock] = useState("");
  const [categoria, setCategoria] = useState("1");
  const [imagen, setImagen] = useState(null);

  const agregarProducto = async () => {

    try {

      const respuesta = await axios.post(
        "http://localhost:3001/producto",
        {
          nombre,
          descripcion,
          precio,
          stock,
          id_categoria: categoria
        }
      );

      alert(respuesta.data.mensaje);
      const nuevoProducto = {
        id_productos: Date.now(),
        nombre,
        descripcion,
        precio: Number(precio),
        categoria: categoria,
         imagen: imagen
          ? URL.createObjectURL(imagen)
          : null
      };

agregarProductoNuevo(nuevoProducto);
    } catch(error) {

      console.log(error);
      alert("Error al agregar producto");

    }

  };

  //eliminar producto

const eliminarProducto = async (id) => {

  try {

    await axios.delete(
      `http://localhost:3001/producto/${id}`
    );

    setProductosExtra(
      productosExtra.filter(
        (producto) =>
          producto.id_productos !== id
      )
    );

    alert("Producto eliminado");

  } catch(error) {

    console.log(error);

  }

};
  //busque estado
  const [busqueda, setBusqueda] = useState("");
  // prod extra aumentar estado
  const [productosExtra, setProductosExtra] = useState([]);


    //carrito
  const agregarAlCarrito = (producto) => {

  agregarPedido(
    pedidos,
    setPedidos,
    producto
  );

};

//suma
const total = pedidos.reduce(
  (suma, pedido) => suma + pedido.precio,0);
//elimi
const eliminarUltimoPedido = () => {
  setPedidos(
    pedidos.slice(0, -1)
  );
};




// nuevo productoo
const agregarProductoNuevo = (producto) => {

  setProductosExtra([
    ...productosExtra,
    producto
  ]);

};
//eliminar produc
  const eliminarProducto = (idProducto) => {

  setProductosExtra(
    productosExtra.filter(
      (producto) =>
        producto.id_productos !== idProducto
    )
  );

};



//pedido
const confirmarPedido = async () => {

  try {

    await axios.post(
      "http://localhost:3001/pedido",
      {
        total: total,
        id_cliente: 1,
        productos: pedidos
      }
    );

    alert("Pedido registrado");

  } catch(error) {

    console.log(error);

  }

};

  return (

    
    <div className='menu-container' >
      <div className='buscador'>
        <Navbar expand="lg" className="buscador-navbar"> 
          <Container fluid>
            <Navbar.Brand href="#"></Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
              
              <Form className="control">
                <FaMagnifyingGlass   color="white" size={40}  style={{ marginTop: "10px" }}/>
                <Form.Control
                  type="search"
                  placeholder ="Que se te antoja comer hoy?"
                  style={{fontFamily:'Brush_Script_MT',fontWeight: 'bold', fontSize: '25px'}}
                  className="me-2 buscador-input"
                  aria-label="Search"
                  value={busqueda}
                  onChange={(e) => setBusqueda(e.target.value)}
                />
                <Button  className='boton' style={{fontSize: '25px', fontFamily: 'Brush_Script_MT', fontWeight: 'bold', padding: '10px 10px'}}>Buscar</Button>
              </Form>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
      <div className='mininavar'>

        <Nav variant="tabs" >
          <Nav.Item>
            <Nav.Link as={NavLink} to="/menu/platos" style={{fontFamily:"SWItalt", fontSize: '30px', fontWeight: 'bold'}}>
              Platos
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link as={NavLink} to="/menu/ensaladas" style={{fontFamily:"SWItalt", fontSize: '30px', fontWeight: 'bold'}}>
              Salsas y Ensaladas
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>

            
            <Nav.Link as={NavLink} to="/menu/bebidas" style={{fontFamily:"SWItalt", fontSize: '30px', fontWeight: 'bold'}}>
              Bebidas
            </Nav.Link>
          </Nav.Item>
        </Nav>

      </div>
      

      {usuario?.rol === "admin" && (

        <Card
          style={{
            marginTop: "30px",
            padding: "20px",
            fontFamily:"SWItalt",
            borderRadius:"20px",
            backgroundColor:"transparent",
            border:"none"
          }}
        >

          <h2 style={{color:"white", fontSize:"40px"}}>Agregar Producto <MdAddShoppingCart color='white' size={70}/></h2>

          <input
            type="text"
            placeholder="Nombre"
            className="form-control mb-2"
            onChange={(e) =>
              setNombre(e.target.value)
            }
          />

          <input
            type="text"
            placeholder="Descripción"
            className="form-control mb-2"
            onChange={(e) =>
              setDescripcion(e.target.value)
            }
          />

          <input
            type="number"
            placeholder="Precio"
            className="form-control mb-2"
            onChange={(e) =>
              setPrecio(e.target.value)
            }
          />

          <input
            type="file"
            className="form-control mb-2"
            accept="image/*"
            onChange={(e) =>
              setImagen(e.target.files[0])
            }
          />

          <input
            type="number"
            placeholder="Stock"
            className="form-control mb-2"
            onChange={(e) =>
              setStock(e.target.value)
            }
          />

          <select
            className="form-control mb-2"
            onChange={(e) =>
              setCategoria(e.target.value)
            }
          >
            <option value="1">Platos</option>
            <option value="2">Ensaladas</option>
            <option value="3">Bebidas</option>
          </select>

          <Button onClick={agregarProducto} style={{borderRadius:"30px", width:"600px", margin:"auto", fontSize:"30px"}}>
            Guardar Producto
          </Button>

        </Card>

      )}

      <Routes>
        <Route index element={<Navigate to="platos" />} />
        <Route path="platos" element={<Platos pedidos={pedidos} setPedidos={setPedidos} busqueda={busqueda} productosExtra={productosExtra} usuario={usuario} eliminarProducto={eliminarProducto}/>} />
        <Route path="ensaladas" element={<Ensaladas pedidos={pedidos} setPedidos={setPedidos} busqueda={busqueda} productosExtra={productosExtra} usuario={usuario} eliminarProducto={eliminarProducto}/>} />
        <Route path="bebidas" element={<Bebidas pedidos={pedidos} setPedidos={setPedidos} busqueda={busqueda} productosExtra={productosExtra} usuario={usuario} eliminarProducto={eliminarProducto}/>} />
      </Routes>
            
      
        <div className='primero' >
          <Card body className='card1'>
            <h1 style={{fontSize: '50px', fontFamily:"SWItalt", fontWeight: 'bold'}}>Tu Pedidos <TiShoppingCart size={70} /></h1>
            <p style={{fontSize: '25px', fontFamily: "Brush_Script_MT"}}> ¡Explora nuestro menú y encuentra tu próxima comida favorita!</p>
            <Accordion defaultActiveKey="1" className='accordion'>
              
              <Accordion.Item eventKey="1">
                <Accordion.Header></Accordion.Header>
                <Accordion.Body className='accordion-body'>
                  {pedidos.map((pedido, index) => (
                    <div key={index}>
                      <p style={{fontSize: '30px'}}>{pedido.nombre}</p>
                      <p style={{fontSize: '30px'}}>Bs. {pedido.precio}</p>
                      <hr />
                    </div>
                  ))}
                  <h3>
                    Total: Bs. {total} <FaDeleteLeft  size={30} style={{  cursor: "pointer", marginLeft: "10px", color: "red" }}
    onClick={eliminarUltimoPedido}/>
                  </h3>
                  <br />
                  <Button variant="primary" className="boton-carrito" onClick={confirmarPedido}>Confirmar Pedido <IoFastFoodOutline size={40} color='white'/></Button>
                </Accordion.Body>
              </Accordion.Item>
              
            </Accordion>
        
          </Card>
          <Card body className='card1'>
            
          </Card>

        </div>

      
      


      <div className='segundo' >
        <Carousel fade>
          <Carousel.Item>
            <img className="carrusel" src={prom1}  />
           
          </Carousel.Item>
          <Carousel.Item>
            <img className="carrusel" src={prom2}  />
           
          </Carousel.Item>
          <Carousel.Item>
            <img className="carrusel" src={prom3}  />
           
          </Carousel.Item>
        </Carousel>
      </div>
      
     


      <div className='informacion'>
            <Card border="danger" className='card-informacion' >
              <Card.Header>
                <img src={logoinf} style={{ height: '300px' , width: '300px' , margin: '0 auto' }} className="logo-informacion" />
                <Card.Text>
                  "Disfruta de la mejor experiencia gastronómica con ingredientes frescos y atención de calidad."
                  
                </Card.Text>
                <Card.Text>
                  <FaFacebook size={30} href='#'/> <FaFacebookMessenger size={30} href='#'/> <FaWhatsapp size={30} href='#'/> <FaInstagram size={30} href='#'/> <FaXTwitter size={30} href='#'   />
                </Card.Text>
              </Card.Header>

              <Card.Body>
                <Card.Title style={{fontSize: '30px', fontFamily:"SWItalt", fontWeight: 'bold'}}>Contactenos</Card.Title>
                <Card.Text>
                  <IoCallOutline size={30} color="white" />{" "} 71234567
                </Card.Text>

                <Card.Text>
                  <BsGeoAltFill size={30} color="white" />{" "} Av.Nose donde sera, Calle quete
                </Card.Text>
                
                <Card.Text>
                  <IoIosMail size={30} color="white" style={{ fontFamily: "Brush_Script_MT"}}/> {" "}contacto@miskiwallpa.com
                </Card.Text>
              </Card.Body>

              <Card.Body>
                <Card.Title style={{fontSize: '30px', fontFamily:"SWItalt", fontWeight: 'bold'}}>Horario de Atencion</Card.Title>
                <Card.Text>
                  <p style={{fontSize: '25px', fontFamily: "Brush_Script_MT"}}>Lunes - Viernes</p>
                  <p style={{fontSize: '25px', fontFamily: "Brush_Script_MT"}}>08:00 - 22:00</p>

                  <p style={{fontSize: '25px', fontFamily: "Brush_Script_MT"}}>Sábado - Domingo</p>
                  <p style={{fontSize: '25px', fontFamily: "Brush_Script_MT"}}>09:00 - 23:00</p>
                  
                </Card.Text>
                </Card.Body>
              <Card.Body>

                <Card.Title style={{fontSize: '30px', fontFamily:"SWItalt", fontWeight: 'bold'}}>Donde encontrarnos ??</Card.Title>

                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1840.0360958926985!2d-68.22341118004982!3d-16.548832701208966!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x915edf00196ccf09%3A0xc056de4c32f8ac8!2sIglesia%20cristiana%20DE%20LO%20ALTO!5e0!3m2!1ses-419!2sbo!4v1780323873335!5m2!1ses-419!2sbo" 
                  height="250"
                  style={{ border: 0 , borderRadius: '30px' }}
                  allowFullScreen
                  loading="lazy"
                >
                </iframe>

              </Card.Body>

  
              
            </Card>
            
          </div>

    </div>
  );
}

export default Menu;
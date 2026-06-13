
import './App.css'

import { agregarPedido } from "./services/carrito";
//navegacion 
import { useNavigate } from "react-router-dom";
//otra pagina

import Menu from './Menu';
import Registro from './Registro';

import { useState } from 'react';
import TemaBoton from './TemaBoton';
//rutas xd
import { Routes, Route, Link, Navigate } from 'react-router-dom';

/*Import My archiv*/ 
import logo from './assets/logo-miski.png';
import videoCard from './assets/videologo.mp4';
import img1 from './assets/img-carrusel1.png';
import img2 from './assets/img-carrusel2.png';
import img3 from './assets/img-carrusel3.jpeg';
import logoinf from './assets/logo3.png';
import favo1 from './assets/Favo1.avif';
import favo2 from './assets/Favo2.jpg';
import favo3 from './assets/Favo3.webp';
import favo4 from './assets/Favo4.jpg';
/* MODAL*/
import Modal from 'react-bootstrap/Modal';


/*Import Bootstrap */
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

import Carousel from 'react-bootstrap/Carousel';

//import https://react-icons.github.io/
import { VscAccount } from "react-icons/vsc";
import { FaCommentDots } from "react-icons/fa";
import { IoMdHelpCircle } from "react-icons/io";
import { BsHouseFill } from "react-icons/bs";
import { IoFastFoodOutline } from "react-icons/io5";
import { MdRestaurantMenu } from "react-icons/md";

import { AiOutlineEyeInvisible } from "react-icons/ai";
import { AiOutlineEye } from "react-icons/ai";

import { FaFacebook } from "react-icons/fa";
import { FaFacebookMessenger } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";

import { BsGeoAltFill } from "react-icons/bs";
import { IoCallOutline } from "react-icons/io5";
import { IoIosMail } from "react-icons/io";

import { CiLocationArrow1 } from "react-icons/ci";

import { FaStar } from "react-icons/fa";// estrellas xd



// FRAMER MOTION
import { motion } from "framer-motion";
import { CardGroup } from 'react-bootstrap';

// axios
import axios from "axios";











function App() {

  const navigate = useNavigate();

  const ordenarFavorito = () => {

    agregarPedido(
      pedidos,
      setPedidos,
      {
        nombre: "Ensalada de Hamburguesa Desarmada",
        precio: 30
      }
    );

    navigate("/menu");

  };
//funciones modal
const [mostrarModal, setMostrarModal] = useState(false);

const abrirModal = () => setMostrarModal(true);
const cerrarModal = () => setMostrarModal(false);

//ojito
const [mostrarPassword, setMostrarPassword] = useState(false);
//login
const [correo, setCorreo] = useState("");
const [password, setPassword] = useState("");
const [usuario, setUsuario] = useState(null);

const iniciarSesion = async () => {
  if (password.length < 6) {
    alert("La contraseña debe tener mínimo 6 caracteres");
    return;
  }
  try {

    const respuesta = await axios.post(
      "http://localhost:3001/login",
      {
        correo: correo,
        contrasena: password
      }
    );

    alert("Login exitoso");

    setUsuario(respuesta.data.cliente);

    cerrarModal();

    navigate("/menu");

  } catch (error) {

    alert("Error al iniciar sesión");

  }
};
//funciones para el tema oscuro
  const [temaOscuro, setTemaOscuro] = useState(true);
  const cambiarTema = () => {setTemaOscuro(!temaOscuro);};

  const [colorTema, setColorTema] = useState("#a30000");


  // carrito 
  const [pedidos, setPedidos] = useState([]);
  const agregarAlCarrito = (producto) => {
  
    agregarPedido(
      pedidos,
      setPedidos,
      producto
    );
  
  };
  


  return (
    <div className='main-container'style={{  padding: "40px",  backgroundColor: colorTema,  transition: "0.5s"  }}>
      <div className='navar'>
        <Navbar expand="lg" className="navbar-custom"  >
          <Container>
            <Navbar.Brand as={Link} to="/">
              <img src={logo} alt="Logo" className="logo-navbar" />
            </Navbar.Brand>
            <Navbar.Text >Misk'i Wallpa</Navbar.Text>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ms-auto">
                <Nav.Link as={Link} to="/" className='inicio'>
                  <BsHouseFill />
                  Inicio
                </Nav.Link>
                <Nav.Link as={Link} to="/menu" className='menu'>
                  <MdRestaurantMenu />
                  Menú
                </Nav.Link>
              
               
                <NavDropdown  title="Mi Perfil " id="basic-nav-dropdown" className='acordeon-navar' >
                  
                  <NavDropdown.Item onClick={abrirModal}>
                    <VscAccount  size={40} color="orange"  />
                    {" "}Inicio de Sesion
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/registro">
                    <FaCommentDots size={40} color="red"/>
                    {" "}Registrarse
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/ayuda">
                    <IoMdHelpCircle size={40} color="orange"/>
                    {" "}Ayuda
                  </NavDropdown.Item>
                </NavDropdown>

                <Nav.Link className='menu'>
                  <TemaBoton cambiarTema={cambiarTema} temaOscuro={temaOscuro} setColorTema={setColorTema}/>
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
      

    
    <Routes>

      <Route path="/" element={
        <motion.div 
          initial={{
            x: 1000,
            opacity: 0,
            scale: 0.8
          }}
          animate={{
            x: 0,
            opacity: 1,
            scale: 1
          }}
          transition={{
            duration: 2,
            ease: "easeInOut"
          }}>
        <>


          <div className='espacio'>
            <Carousel  className='carrusel' fade interval={4000} pause={false} ride="carousel">
              <Carousel.Item>
                <img className="d-block w-100" src={img1} alt="slide" />
                <Carousel.Caption>
                  <h1 style={{ fontSize: '90px' , fontFamily: "Brush_Script_MT"}}>¡El sabor auténtico que te encanta!</h1>
                  <h3 style={{ fontSize: '30px' , fontFamily: "Brush_Script_MT"}}>Disfruta de la mejor comida que es agradable al gustos</h3>
                  <div className="botones">
                    <Button className="btn" as={Link} to="/menu" variant="primary" style={{ borderRadius: '30px' , fontFamily: "Brush_Script_MT", fontSize: '25px' }}>Ir a Ordenar<IoFastFoodOutline size={20} color='white'/></Button>
                  </div>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <img className="d-block w-100" src={img2} alt="slide" />
                <Carousel.Caption>
                  <h1 style={{ fontSize: '90px' , fontFamily: "Brush_Script_MT"}}>¡Acompaña tu pedido con la mejor frescura!</h1>
                  <h3 style={{ fontSize: '30px' , fontFamily: "Brush_Script_MT"}}>Refrescantes jugos naturales, batidos y gaseosas para el maridaje perfecto.</h3>
                  <div className="botones">
                    <Button className="btn" as={Link} to="/menu" variant="primary" style={{ borderRadius: '30px' , fontFamily: "Brush_Script_MT", fontSize: '25px' }} >Ir a Ordenar<IoFastFoodOutline size={20} color='white'/></Button>
                  </div>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <img className="d-block w-100" src={img3} alt="slide" />
                <Carousel.Caption>
                  <h1 style={{ fontSize: '90px' , fontFamily: "Brush_Script_MT"}}>¡Dale el toque final con nuestras salsas!</h1>
                  <h3 style={{ fontSize: '30px' , fontFamily: "Brush_Script_MT"}}>Desde las más suaves hasta las más picantes, hechas con la receta secreta de la casa.</h3>
                  <div className="botones">
                    <Button className="btn" as={Link} to="/menu" variant="primary" style={{ borderRadius: '30px', fontFamily: "Brush_Script_MT", fontSize: '25px' }}>Ir a Ordenar<IoFastFoodOutline size={20} color='white'/></Button>
                  </div>
                </Carousel.Caption>
              </Carousel.Item>
            </Carousel>
          </div>
          
          <div className='favoritos'>
            <Card style={{ width: '18rem' , borderRadius: '30px' }}>
              <Card.Img variant="top" src={favo1}  className='img-favoritos'/>
              <Card.Body>
                <Card.Title style={{fontWeight: 'bold', fontFamily: "Brush_Script_MT"}}>Ensalada de Hamburguesa Desarmada</Card.Title>
                <div style={{ marginBottom: "10px" }}>
                  <FaStar color="gold" />
                  <FaStar color="gold" />
                  <FaStar color="gold" />
                  <FaStar color="gold" />
                  <FaStar color="gold" />
                  
                </div>
                <Card.Text style={{ fontSize: '15px' , fontFamily: "Brush_Script_MT"}}>
                  Carne premium troceada con vegetales frescos y un toque crocante irresistible.
                </Card.Text>
                <Button variant="primary" style={{ borderRadius: '30px' }} onClick={ordenarFavorito}>
                  Ir a Ordenar<IoFastFoodOutline size={20} color='white'/>
                </Button>
              </Card.Body>
            </Card>

            <Card style={{ width: '18rem', borderRadius: '30px' }}>
              <Card.Img variant="top" src={favo2} className='img-favoritos' />
              <Card.Body>
                <Card.Title style={{fontWeight: 'bold', fontFamily: "Brush_Script_MT"}}>Pollo Desmenuzado con Arroz Blanco</Card.Title>
                <div style={{ marginBottom: "10px" }}>
                  <FaStar color="gold" />
                  <FaStar color="gold" />
                  <FaStar color="gold" />
                  <FaStar color="gold" />
                  <FaStar color="gold" />
                  
                </div>
                <Card.Text style={{ fontSize: '15px' , fontFamily: "Brush_Script_MT"}}>
                  Pollo tierno sazonado con nuestra receta secreta sobre arroz blanco graneado.
                </Card.Text>
                <Button variant="primary" style={{ borderRadius: '30px' }} onClick={ordenarFavorito}>
                  Ir a Ordenar<IoFastFoodOutline size={20} color='white'/>
                </Button>
              </Card.Body>
            </Card>

            <Card style={{ width: '18rem', borderRadius: '30px' }}>
              <Card.Img variant="top" src={favo3} className='img-favoritos' />
              <Card.Body>
                <Card.Title style={{fontWeight: 'bold', fontFamily: "Brush_Script_MT"}} >Pechuga de Pollo al Horno con Arroz Integral y Ensalada</Card.Title>
                <div style={{ marginBottom: "10px" }}>
                  <FaStar color="gold" />
                  <FaStar color="gold" />
                  <FaStar color="gold" />
                  <FaStar color="gold" />
                  <FaStar color="gold" />
                  
                </div>
                <Card.Text style={{ fontSize: '15px' , fontFamily: "Brush_Script_MT"}}>
                  Pechuga horneada en su propio jugo con una guarnición ligera y saludable.
                </Card.Text>
                <Button variant="primary" style={{ borderRadius: '30px' }} onClick={ordenarFavorito}>
                  Ir a Ordenar<IoFastFoodOutline size={20} color='white'/>
                </Button>
              </Card.Body>
            </Card>

            <Card style={{ width: '18rem', borderRadius: '30px' }}>
              <Card.Img variant="top" src={favo4} className='img-favoritos'  />
              <Card.Body>
                <Card.Title style={{fontWeight: 'bold', fontFamily: "Brush_Script_MT"}} >Ensalada de Arroz Silvestre / Integral con Champiñones y Vegetales</Card.Title>
                <div style={{ marginBottom: "10px" }}>
                  <FaStar color="gold" />
                  <FaStar color="gold" />
                  <FaStar color="gold" />
                  <FaStar color="gold" />
                  <FaStar color="gold" />
                  
                </div>
                <Card.Text style={{ fontSize: '15px' , fontFamily: "Brush_Script_MT"}}>
                  Champiñones seleccionados salteados con una mezcla fresca y natural.
                </Card.Text>
                <Button variant="primary" style={{ borderRadius: '30px' }} onClick={ordenarFavorito}>
                  Ir a Ordenar<IoFastFoodOutline size={20} color='white'/>
                </Button>
              </Card.Body>
            </Card>

            
          </div>
          
          <div className='presentacion'>
            <div className='targeta-presentacion'>
              <Card className='targeta-texto'>
                <Card.Body>
                  <Card.Title style={{ fontSize: '45px' ,fontWeight: 'bold', fontFamily: "Brush_Script_MT"}}>
                    ¿Con ganas de algo delicioso?
                  </Card.Title>

                  <Card.Text style={{ fontSize: '30px' , fontFamily: "Brush_Script_MT" }}>
                    Preparamos tu comida favorita en minutos. Disfruta del sabor único y crujiente de Misk'i Wallpa directo a tu puerta.
                  </Card.Text>

                  <div className="botonxd">
                    <Button className="btn" as={Link} to="/menu" variant="primary" style={{ borderRadius: '30px' , fontFamily: "Brush_Script_MT", fontSize: '25px' }}>Ir a Ordenar<IoFastFoodOutline size={20} color='white'/></Button>
                  </div>

                </Card.Body>
              </Card>
            </div>

            <div>
              <Card className='targeta-video'>
                <video autoPlay loop muted className="video-card">
                  <source src={videoCard} type="video/mp4"/>
                </video>
              </Card>
            </div>
          </div>
          


          <div className='preguntas'>
            <Carousel>
              <Carousel.Item>
                <div className="pregunta-slide" style={{fontSize: '30px' , fontFamily: "Brush_Script_MT"}}>
                  <h2>¿Cómo puedo pagar mi pedido?</h2>
                  <p>Aceptamos efectivo al momento de la entrega, transferencias bancarias y pagos rápidos por QR para tu mayor comodidad.</p>
                </div>
              </Carousel.Item>
              <Carousel.Item>
                <div className="pregunta-slide" style={{fontSize: '30px' , fontFamily: "Brush_Script_MT"}}>
                  <h2>¿Cuál es el horario de atención?</h2>
                  <p>Atendemos de lunes a domingo de 08:00 a 23:00.</p>
                </div>
              </Carousel.Item>
              <Carousel.Item>
                <div className="pregunta-slide" style={{fontSize: '30px' , fontFamily: "Brush_Script_MT"}}>
                  <h2>¿Tienen servicio de entrega a domicilio?</h2>
                  <p>¡Claro que sí! Llegamos a diversas zonas de El Alto con rapidez para que disfrutes tu pedido caliente y en su punto.</p>
                </div>
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
        </>
        </motion.div>
        }/>

        <Route path="/registro" element={<Registro />} />
        <Route path="/menu/*" element={ 
          usuario ? (
          <motion.div 
            initial={{
                x: "100vw"
            }}
            animate={{
                x: 0
            }}
            transition={{
                duration: 2
            }}
          >
              <Menu  
                pedidos={pedidos}
                setPedidos={setPedidos}
                usuario={usuario}
              />

          </motion.div>):(<Navigate to="/" />)} />
        </Routes>


      <Modal show={mostrarModal} onHide={cerrarModal} centered  className='mi-modal'>
        <Modal.Header closeButton>
          <Modal.Title>
            Inicio de Sesión
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <input type="email"  placeholder="Correo"  className="form-control mb-3" value={correo}
            onChange={(e) =>
            setCorreo(e.target.value)
          }/>
          <div className="password-container">
            <input
              type={mostrarPassword ? "text" : "password"}
              placeholder="Contraseña"
              className="form-control"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
            />
            <span
              className="icono-ojo"
              onClick={() =>
                setMostrarPassword(!mostrarPassword)
              }
            >
              {
                mostrarPassword
                ? <AiOutlineEyeInvisible />
                : <AiOutlineEye />
              }
            </span>
          </div>

        </Modal.Body>

        <Modal.Footer>

          <Button
            variant="secondary"
            onClick={cerrarModal}
          >
            Cerrar
          </Button>

          <Button variant="primary"  onClick={iniciarSesion}>
            Ingresar
          </Button>

        </Modal.Footer>

      </Modal>
        
      




    </div>
  );
}

export default App

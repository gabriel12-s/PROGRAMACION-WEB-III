import './Registro.css'

import { useState } from "react";
import axios from "axios";

function Registro() {

    const [nombre, setNombre] = useState("");
    const [apellido, setApellido] = useState("");
    const [correo, setCorreo] = useState("");
    const [telefono, setTelefono] = useState("");
    const [direccion, setDireccion] = useState("");
    const [contrasena, setContrasena] = useState("");
    const [ci, setCi] = useState("");

    
    const [nivelPassword, setNivelPassword] = useState("");
// evitar 6
    const registrarCliente = async () => {
        if (
            parseInt(captcha) !==
            num1 + num2
        ) {
            alert(
                "CAPTCHA incorrecto"
            );
            return;
        }

        if(contrasena.length < 6){
        alert(
            "La contraseña debe tener al menos 6 caracteres"
        );
        return;
    }

        try {

            const respuesta = await axios.post(
                "http://localhost:3001/registro",
                {
                    nombre,
                    apellido,
                    correo,
                    telefono,
                    direccion,
                    contrasena,
                    ci
                }
            );

            alert(respuesta.data.mensaje);

        } catch (error) {

            console.log(error);
            alert("Error al registrar");

        }

    };
// contra debil
    const evaluarPassword = (texto) => {

        setContrasena(texto);

        if (texto.length < 6) {
            setNivelPassword("Débil");
        }
        else if (
            texto.length >= 6 &&
            texto.length < 10
        ) {
            setNivelPassword("Media");
        }
        else {
            setNivelPassword("Fuerte");
        }

    };

// capvha suma
   const [num1] = useState(
        Math.floor(Math.random() * 10) + 1
    );

    const [num2] = useState(
        Math.floor(Math.random() * 10) + 1
    );

    const [captcha, setCaptcha] = useState("");
        


    return (
        <div className='Inf' >

            <h2 style={{fontFamily:'SWItalt', fontSize:'40px', color: 'white'}}>Registro de Cliente</h2>
            <div className='inputs'style={{alignContent: 'center'}}>  
                <input
                    type="text"
                    placeholder="Nombre"
                    className="form-control mb-2"
                    style={{width:'800px'}}
                    onChange={(e)=>setNombre(e.target.value)}
                />

                <input
                    type="text"
                    placeholder="Apellido"
                    style={{width:'800px'}}
                    className="form-control mb-2"
                    onChange={(e)=>setApellido(e.target.value)}
                />

                <input
                    type="email"
                    placeholder="Correo"
                    style={{width:'800px'}}
                    className="form-control mb-2"
                    onChange={(e)=>setCorreo(e.target.value)}
                />

                <input
                    type="text"
                    placeholder="Teléfono"
                    style={{width:'800px'}}
                    className="form-control mb-2"
                    onChange={(e)=>setTelefono(e.target.value)}
                />

                <input
                    type="text"
                    placeholder="Dirección"
                    style={{width:'800px'}}
                    className="form-control mb-2"
                    onChange={(e)=>setDireccion(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="Contraseña"
                    style={{width:'800px'}}
                    className="form-control mb-2"
                    onChange={(e)=>evaluarPassword(e.target.value)}
                />

                <p
                    style={{
                        fontWeight: "bold",
                        color:
                            nivelPassword === "Débil"
                            ? "red"
                            : nivelPassword === "Media"
                            ? "orange"
                            : "green"
                    }}
                >
                    Seguridad: {nivelPassword}
                </p>

                <input
                    type="text"
                    placeholder="CI"
                    style={{width:'800px'}}
                    className="form-control mb-2"
                    onChange={(e)=>setCi(e.target.value)}
                />

                <div
                    style={{
                        width: "800px",
                        marginBottom: "15px",
                        color:"white",
                        fontWeight:"bold",
                        backgroundColor: "gray",
                        borderRadius:"20px"
                    }}
                >
                    <h4 >
                        CAPTCHA: ¿Cuánto es {num1} + {num2} ?
                    </h4>

                    <input
                        type="number"
                        placeholder="Respuesta"
                        className="form-control"
                        value={captcha}
                        style={{
                            borderRadius:"20px"
                        }}
                        onChange={(e) =>
                            setCaptcha(e.target.value)
                        }
                    />
                </div>

                <button
                    className="btn btn-primary"
                    style={{borderRadius:'30px'}}
                    onClick={registrarCliente}
                >
                    Registrarse
                </button>
            </div> 
        </div>
    );
}

export default Registro;
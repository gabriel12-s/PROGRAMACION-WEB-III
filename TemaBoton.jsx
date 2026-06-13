import { FiMoon, FiSun } from "react-icons/fi";

function TemaBoton({
  cambiarTema,
  temaOscuro,
  setColorTema
}) {
  const coloresOscuros = [
    "#601212",
    "#822117",
    "#a75105",
    "#d47500"
  ];
  const coloresClaros = [
    "#ffffff",
    "#f5f5dc",
    "#dff6ff",
    "#ffe4c4"
  ];
  return (
    <div>
      <div onClick={cambiarTema} style={{ cursor: "pointer", marginBottom: "10px"}}>
        {temaOscuro
          ?
          <FiMoon size={25} />
          :
          <FiSun size={25} />
        }
      </div>

      <div style={{ display: "flex", gap: "5px" }}>

        {
          temaOscuro
          ?
          coloresOscuros.map((color) => (
            <button
              key={color}
              onClick={() => setColorTema(color)}
              style={{
                backgroundColor: color,
                width: "25px",
                height: "25px",
                borderRadius: "50%",
                border: "none",
                cursor: "pointer"
              }}
            />
          ))
          :
          coloresClaros.map((color) => (
            <button
              key={color}
              onClick={() => setColorTema(color)}
              style={{
                backgroundColor: color,
                width: "25px",
                height: "25px",
                borderRadius: "50%",
                border: "1px solid black",
                cursor: "pointer"
              }}
            />
          ))
        }

      </div>

    </div>
  );
}

export default TemaBoton;
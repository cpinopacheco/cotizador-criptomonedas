import { useState, useEffect } from "react";
import { Formulario } from "./components/Formulario";
import { Resultado } from "./components/Resultado";
import { Spinner } from "./components/Spinner";
import styled from "@emotion/styled";
import ImagenCripto from "./Materiales Criptos/img/imagen-criptos.png";

//Styled Components
const Contenedor = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  width: 90%;
  @media (min-width: 992px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 2rem;
  }
`;

const Imagen = styled.img`
  max-width: 400px;
  width: 80%;
  margin: 100px auto 0 auto;
  display: block;
`;

const Heading = styled.h1`
  font-family: "Red Hat Mono", sans-serif;
  color: #fff;
  text-align: center;
  font-weight: 400;
  margin-top: 80px;
  margin-bottom: 50px;
  font-size: 34px;
  &::after {
    content: "";
    width: 100%;
    height: 6px;
    background-color: #66a2fe;
    display: block;
    margin: 10px auto 0 auto;
  }
`;

function App() {
  const [monedas, setMonedas] = useState({});

  const [cotizacion, setCotizacion] = useState({});

  const [cargando, setCargando] = useState(false);

  useEffect(() => {
    //Con esa validación evitamos que el codigo se ejecute hasta que se cumpla (si el objeto no esta vacio)
    if (Object.keys(monedas).length > 0) {
      setCargando(true);
      setCotizacion({});
      const cotizarCripto = async () => {
        const { moneda, criptoMoneda } = monedas;

        try {
          const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptoMoneda}&tsyms=${moneda}`;

          const respuesta = await fetch(url);
          const resultado = await respuesta.json();

          //accede a las propiedades del objeto de forma dinámica
          setCotizacion(resultado.DISPLAY[criptoMoneda][moneda]);
          setCargando(false);
        } catch (error) {}
      };

      cotizarCripto();
    }
  }, [monedas]);

  return (
    <Contenedor>
      <Imagen src={ImagenCripto} alt="imágenes criptomonedas" />
      <div>
        <Heading>Cotiza Criptomonedas al Instante</Heading>
        <Formulario setMonedas={setMonedas} />
        {/* se carga el componente cuando tenga informacion en la propiedad indicada */}

        {cargando && <Spinner />}
        {cotizacion.PRICE && <Resultado cotizacion={cotizacion} />}
      </div>
    </Contenedor>
  );
}

export default App;

import { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { useSelectMonedas } from "../hooks/useSelectMonedas";
import { monedas } from "../data/monedas";
import { Error } from "./Error";

//Styled Components
const InputSubmit = styled.input`
  background-color: #9497ff;
  border: none;
  width: 100%;
  padding: 10px;
  color: #fff;
  font-weight: 700;
  text-transform: uppercase;
  font-size: 20px;
  border-radius: 5px;
  margin-top: 30px;
  transition: background-color 0.3s ease;
  cursor: pointer;
  :hover {
    background-color: #9497ff70;
  }
`;

export const Formulario = ({ setMonedas }) => {
  const [criptos, setCriptos] = useState([]);
  const [error, setError] = useState(false);

  //recibimos el return segun el indice al al ser destructuring de array
  const [moneda, SelectMonedas] = useSelectMonedas("Elige tu Moneda", monedas); //Extraemos el custom hook

  const [criptoMoneda, SelectCriptoMonedas] = useSelectMonedas(
    "Elige tu CriptoMonedas",
    criptos
  ); //Extraemos el custom hook

  //Se ejecuta una sola vez cuando es componente este listo
  useEffect(() => {
    const consultarApi = async () => {
      try {
        const url =
          "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD";

        const respuesta = await fetch(url);
        const resultado = await respuesta.json();

        const arrayCriptos = resultado.Data.map((cripto) => {
          const objeto = {
            id: cripto.CoinInfo.Name,
            nombre: cripto.CoinInfo.FullName,
          };

          return objeto;
        });

        setCriptos(arrayCriptos);
      } catch (error) {
        console.log(error);
      }
    };

    consultarApi();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if ([moneda, criptoMoneda].includes("")) {
      setError(true);
      return;
    }

    setError(false);
    setMonedas({
      moneda,
      criptoMoneda,
    });
  };

  return (
    <>
      {/* el contenido del componente error se va como argumento (children)
       */}
      {error && <Error>Todos los campos son obligatorios</Error>}
      <form onSubmit={handleSubmit}>
        <SelectMonedas />
        <SelectCriptoMonedas />
        <InputSubmit type="submit" value="Cotizar" />
      </form>
    </>
  );
};

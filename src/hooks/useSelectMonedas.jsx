import { useState } from "react";
import styled from "@emotion/styled";

const Label = styled.label`
  color: #fff;
  display: block;
  font-size: 24px;
  margin: 15px 0;
`;

const Select = styled.select`
  width: 100%;
  font-size: 1rem;
  padding: 6px;
  border-radius: 10px;
`;

//Creamos el custom hook
export const useSelectMonedas = (label, opciones) => {
  const [state, setState] = useState("");

  //Con los parentesis despues de => damos por implicito el return
  const SelectMonedas = () => (
    <>
      <Label>{label}</Label>
      <Select value={state} onChange={(e) => setState(e.target.value)}>
        <option value=""> -- Seleccione --</option>
        {/* para iterar es con map */}
        {opciones.map((opcion) => (
          <option key={opcion.id} value={opcion.id}>
            {opcion.nombre}
          </option>
        ))}
      </Select>
    </>
  );

  return [state, SelectMonedas];
};

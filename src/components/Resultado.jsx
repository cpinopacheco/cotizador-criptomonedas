import styled from "@emotion/styled";

export const Resultado = ({ cotizacion }) => {
  //console.log(cotizacion);

  const Contenedor = styled.div`
    color: #fff;
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-top: 2rem;

    @media (max-width: 992px) {
      justify-content: center;
    }

    @media (max-width: 576px) {
      flex-direction: column;
      gap: 0;
    }
  `;

  const Imagen = styled.img`
    display: block;
    width: 120px;
  `;

  const Texto = styled.p`
    font-size: 18px;
    /* accede al hijo del elemento */
    span {
      font-weight: 700;
    }
  `;

  const Precio = styled.p`
    font-size: 1.5rem;
    /* accede al hijo del elemento */
    span {
      font-weight: 700;
    }
    &::after {
      content: "";
      width: 100%;
      height: 6px;
      background-color: #66a2fe;
      display: block;
      margin: 10px auto 0 auto;
    }
  `;

  const { PRICE, HIGHDAY, LOWDAY, CHANGEPCT24HOUR, IMAGEURL, LASTUPDATE } =
    cotizacion;

  return (
    <Contenedor>
      <Imagen
        src={`https://cryptocompare.com/${IMAGEURL}`}
        alt="imágen criptomoneda"
      />
      <div>
        <Precio>
          El precio es de: <span>{PRICE}</span>
        </Precio>
        <Texto>
          Precio más alto del día: <span>{HIGHDAY}</span>
        </Texto>
        <Texto>
          Precio más bajo del día: <span>{LOWDAY}</span>
        </Texto>
        <Texto>
          Variación últimas 24 horas: <span>{CHANGEPCT24HOUR}</span>
        </Texto>
        <Texto>
          Última Actualización: <span>{LASTUPDATE}</span>
        </Texto>
      </div>
    </Contenedor>
  );
};

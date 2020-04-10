import React,{Fragment, useState, useEffect} from 'react';
import Header from './Components/Header';
import Formulario from './Components/Formulario';
import Clima from './Components/Clima';
import Error from './Components/Error';

function App() {

  //STATE DEL FORMULARIO
  const [busqueda, guardar_busqueda] = useState({
    ciudad: '',
    pais: ''
  });   

  const [consultar, guardar_consultar] = useState(false);
  const [resultado, guardar_resultado] = useState({});
  const [error, guardar_error] = useState(false);

  const {ciudad,pais} = busqueda;
  

  

  useEffect(() =>{
    const consultar_api = async () => {
      
      if(consultar){
        const app_id = '69a4e9d004f1e82f1dd92d280deae2c3';
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${app_id}`;

        const respuesta = await fetch(url);
        const resultado = await respuesta.json();

        guardar_resultado(resultado);
        guardar_consultar(false);

        //DETECTA RESULTADOS CORRECTOS EN LA CONSULTA
        if(resultado.cod === '404'){
          guardar_error(true);
        } else{
          guardar_error(false);
        }
      }
    }
    consultar_api();
    //eslint-disable-next-line
  },[consultar]);

  let componente;
  if(error){
    componente = <Error mensaje="No hay resultados" />
  } else {
    componente = <Clima 
                    resultado={resultado}
                  />
  }
  
  return (
    <Fragment>
      <Header 
        titulo='Clima React App'
      />

      <div className="contenedor-form">
        <div className="container">
          <div className="row">
            <div className="col m6 s12">
              <Formulario 
                busqueda={busqueda}
                guardar_busqueda={guardar_busqueda}
                guardar_consultar={guardar_consultar}
              />
            </div>
            <div className="col m6 s12">
              {componente}
            </div>
          </div>
        </div>
      </div>
    </Fragment>
   
  );
}

export default App;

import React , { Fragment , useState , useEffect } from 'react';
import Formulario from './components/fomulario.js';
import axios from 'axios';
import Cancion from './components/cancion.js';
import Info from './components/info';

function App() {

  const [ busquedaLetra , guardarBusquedaLetra ] = useState({});
  const [ letra , guardarLetra ] = useState('');
  const [ informacion , guardarInformacion ] = useState({});
  
  useEffect( () => {
    if(Object.keys(busquedaLetra).length === 0 ) return;
    
    const consultarApiLetra = async () => {
      const { artista , cancion } = busquedaLetra;
      const url = `https://api.lyrics.ovh/v1/${artista}/${cancion}`;
      const url2 = `https://www.theaudiodb.com/api/v1/json/1/search.php?s=${artista}`;
      
      //consultar APis simultaneamente por medio de un promise
      const [ letra , informacion ] = await Promise.all([
        axios(url),
        axios(url2)
      ]);

      guardarLetra(letra.data.lyrics);
      guardarInformacion(informacion.data.artists[0]);
      guardarBusquedaLetra({});
    }
    consultarApiLetra();
  },[busquedaLetra , informacion])


  return (
    <Fragment>
      <Formulario guardarBusquedaLetra={guardarBusquedaLetra} />
      <div className="container">
        <div className="row">
          <div className="col-md-6 mt-5">
              <Info informacion={informacion}/>
          </div>
          <div className="col-md-6 mt-5">
              <Cancion letra={letra} />
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;

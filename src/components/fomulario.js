import React , { useState } from 'react';
import Error from './error.js';

const Formulario = ({guardarBusquedaLetra}) => {

    const [ busqueda , guardarBusqueda ] = useState({
        artista : '',
        cancion : ''
    });
    const [error, guardarError] = useState(false);
    const { artista , cancion } = busqueda;

    const actualizarState = e => {
        guardarBusqueda({
            ...busqueda,
            [e.target.name] : e.target.value
        })
    }
    //consultar APis
    const buscarInformacion = e => {
        e.preventDefault();

        if(artista.trim() === '' || cancion.trim() === '' ){
            guardarError(true);
            return;
        }
        guardarError(false);
        //pasamos al componente principal
        guardarBusquedaLetra(busqueda);
    }

    return ( 
        <div className="bg-info">
            { error ? <Error mensaje="Todos los campos son obligatorios" /> : null }

            <div className="container">
                <div className="row">
                    <form
                        onSubmit={buscarInformacion}
                        className="col card teaxt-white bg-transparent mb-5 pt-5 pb-2"
                    >
                        <fieldset>
                            <legend className="text-center">Buscador de Canciones</legend>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label>Artista</label>
                                        <input  type="text" 
                                                name="artista" 
                                                className="form-control" 
                                                placeholder="Nombre Artista" 
                                                onChange={actualizarState}
                                                value={artista} 
                                        />
                                    </div>                                    
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label>Cancion</label>
                                        <input  type="text" 
                                                name="cancion" 
                                                className="form-control" 
                                                placeholder="Nombre Cancion" 
                                                onChange={actualizarState} 
                                                value={cancion}
                                        />
                                    </div>
                                </div>
                            </div> 
                            <button type="submit" className="btn btn-primary float-right" >Buscar</button>

                        </fieldset>
                        
                    </form>
                </div>
            </div>
        </div>

     );
}
 
export default Formulario;
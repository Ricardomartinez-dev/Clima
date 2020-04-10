import React,{useState} from 'react';
import Error from './Error';
import PropTypes from 'prop-types';

const Formulario = ({busqueda,guardar_busqueda,guardar_consultar}) => {

    // //STATE DEL FORMULARIO
    // const [busqueda, guardar_busqueda] = useState({
    //     ciudad: '',
    //     pais: ''
    // });

    //EXTRAER CIUDAD Y PAIS
    const {ciudad,pais} = busqueda;

    //FUNCION QUE COLOCA LOS ELEMENTOS EN EL STATE
    const handleChange = e => {
        //ACTUALIZAR EL STATE
        guardar_busqueda({
            ...busqueda,
            [e.target.name]: e.target.value
        });
    }
    //VALIDAR
    const [error, guardar_error] = useState(false);

    //CUANDO EL USUARIO DA SUBMIT AL FORM
    const handleSubmit = e => {
        e.preventDefault();

        //VALIDAR
        if(ciudad.trim() === '' || pais.trim() === ''){
            guardar_error(true);
            return;
        }
        guardar_error(false);

        //PASAR AL COMPONENTE PRINCIPAL
        guardar_consultar(true);

    }
    return ( 
        <form
            onSubmit={handleSubmit}
        >
            {error ? <Error mensaje="Ambos campos son obligatorios" /> : null}
            <div className="input-field col s12">
                <input 
                    type="text"
                    name="ciudad"
                    id="ciudad"
                    value={ciudad}
                    onChange={handleChange}
                />
                <label htmlFor="ciudad">Ciudad: </label>
            </div>

            <div className="input-field col s12">
                <select
                    name="pais"
                    id="pais"
                    value={pais}
                    onChange={handleChange}
                >
                    <option value="">-- Seleccione un País --</option>
                    <option value="US">Estados Unidos</option>
                    <option value="MX">México</option>
                    <option value="AR">Argentina</option>
                    <option value="CO">Colombia</option>
                    <option value="CR">Costa Rica</option>
                    <option value="ES">España</option>
                    <option value="PE">Perú</option>
                </select>
                <label htmlFor="pais">País: </label>
            </div>

            <div className="input-field col s12">
                <input 
                    type="submit"
                    value="Buscar Clima"
                    className="waves-effect waves-light btn-large btn-block yellow accent-4"
                />
            </div>
        </form>
     );
}
 
Formulario.propTypes = {
    busqueda: PropTypes.object.isRequired,
    guardar_busqueda: PropTypes.func.isRequired,
    guardar_consultar: PropTypes.func.isRequired
}
export default Formulario;
import React from 'react';

import { useHistory } from 'react-router-dom';

function Maintenence() {
    const history = useHistory();

    return (
        <div className="container justify-center mx-auto flex pt-8">
            <div className="shadow-lg font-bold text-center text-2xl text-gray-800 p-12 rounded bg-white flex flex-col">
                Oops! Parece que essa página<br /> 
                ainda está em construção...
                
                <button onClick={ () => history.goBack() }
                    className='text-xl hover:bg-orange-600 bg-orange-500 mt-8 py-2 px-4 rounded text-white font-bold shadow focus:outline-none focus:shadow-outline' 
                >
                    Voltar
                </button>
            </div>
        </div>
    );
}

export default Maintenence;

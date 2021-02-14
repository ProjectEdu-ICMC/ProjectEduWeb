import React from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

//import { LanguageContext } from '../../contexts/LanguageContext';

import { auth } from '../../auth/fire.js';

function Header(props) {
    const token = useSelector(state => state.auth.token);
    const history = useHistory();
    //const [ , setLang ] = useContext(LanguageContext);
    
    const logout = () => {
        auth.signOut()
            .then(() => history.push('/login'))
            .catch((error) => console.log(error));
    }
    
    //const setPortuguese = () => {
    //    setLang('pt-br');
    //};

    //const setEnglish = () => {
    //    setLang('en-us');
    //}

    return (
        <div className='bg-white flex justify-between py-4 px-10 shadow-lg fixed w-full z-20'>
            <h1 className='text-3xl font-bold text-gray-800'>Portal EDU</h1>
            <div>
                { /**
                <button 
                    className='bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded text-white font-bold shadow focus:outline-none focus:shadow-outline'
                    onClick={ setPortuguese }>BR</button>
                <button 
                    className='bg-blue-500 hover:bg-blue-600 px-4 py-2 ml-2 rounded text-white font-bold shadow focus:outline-none focus:shadow-outline'
                    onClick={ setEnglish }>EN</button>
                */ }
                { token &&
                    <button 
                        className='bg-red-500 hover:bg-red-600 px-4 py-2 ml-2 rounded text-white font-bold shadow focus:outline-none focus:shadow-outline'
                        onClick={ logout }>Logout</button>
                }
            </div>
        </div>
    );
}

export default Header;

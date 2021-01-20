import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';

import { LanguageContext } from '../../contexts/LanguageContext';

import { auth } from '../../auth/fire.js';
//import useLocalStorage from '../../hooks/localStorageHook.js';

function Header(props) {
    const history = useHistory();
    const [ , setLang ] = useContext(LanguageContext);
    
    const logout = () => {
        auth.signOut()
            .then(() => history.push('/login'))
            .catch((error) => console.log(error));
    }
    
    const setPortuguese = () => {
        setLang('pt-br');
    };

    const setEnglish = () => {
        setLang('en-us');
    }

    return (
        <>
            <button className='btn btn-green' onClick={ setPortuguese }>BR</button>
            <button className='btn btn-blue' onClick={ setEnglish }>EN</button>
            <button className='btn btn-red' onClick={ logout }>Logout</button>
        </>
    );
}

export default Header;

import React, { useContext } from 'react';
import { LanguageContext } from '../../contexts/LanguageContext';

function Header(props) {

    const [ , setLang ] = useContext(LanguageContext);

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
        </>
    );
}

export default Header;
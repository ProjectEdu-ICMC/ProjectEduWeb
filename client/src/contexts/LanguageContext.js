import React, { useState, createContext, useEffect } from 'react';
import dicts from '../data/lang.json';
import useLocalStorage from '../hooks/localStorageHook';

export const LanguageContext = createContext();

export function LanguageContextProvider(props) {

    const [ lang, setLang ] = useLocalStorage('lang', 'pt-br');
    const [ dict, setDict ] = useState(dicts[lang]);

    useEffect(() => {
        setDict(dicts[lang]);
    }, [ lang ])

    return (
        <LanguageContext.Provider value={[ dict, setLang ]}>
            { props.children }
        </LanguageContext.Provider>
   );
}
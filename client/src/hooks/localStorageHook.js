import { useState, useEffect } from 'react';

function useLocalStorage (key, initial) {
    const [ value, setValue ] = useState(
        localStorage.getItem(key) || initial
    );

    useEffect(() => {
        if (!value) 
            localStorage.removeItem(key);
        else
            localStorage.setItem(key, value);
    }, [ key, value ]);

    return [ value, setValue ];
}

export default useLocalStorage;

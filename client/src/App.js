import React, { useState, useEffect } from 'react';
import Axios from 'axios';

function App() {
    
    const [ data, setData ] = useState();

    useEffect(() => {
        const loadData = () => {
            Axios.get('http://localhost:3001/')
                .then((res) => {
                    setData(res.data);
                })
                .catch((err) => {
                    console.log(err);
                });
        };

        loadData();
    }, []);
    
    

    return (
        <>
            {JSON.stringify(data)}
        </>
    );
}

export default App;

import React, { useState, useEffect } from 'react';
import Axios from 'axios';

import CardBoard from '../components/CardBoard';

function Main(props) {
    
    const [ data, setData ] = useState();

    useEffect(() => {
        const loadData = () => {
            Axios.get('http://localhost:3001/module/all')
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
            { data ? 
                <CardBoard url='/mod' cardSize={64} data={ data } /> : 
                'No modules' }
        </>
   );
}

export default Main;
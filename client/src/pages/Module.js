import React, { useState, useEffect } from 'react';
import Axios from 'axios';

import { useParams, Link } from 'react-router-dom'
import CardBoard from '../components/CardBoard';

function Module(props) {
    const { id } = useParams();
    
    const [ data, setData ] = useState();

    useEffect(() => {
        const loadData = () => {
            Axios.get('http://localhost:3001/module', { params: { id: id } })
                .then((res) => {
                    setData(res.data);
                })
                .catch((err) => {
                    console.log(err);
                });
        };

        if (id !== undefined)
            loadData();
    }, [id]);

    return (
        <>
            { data ? 
                <CardBoard cardSize={32} data={ data.topics } /> : 
                'No modules' }
            <Link className='btn btn-blue' to='/'>
                Back
            </Link>
        </>
   );
}

export default Module;
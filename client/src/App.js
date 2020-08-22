import React from 'react';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Main from './pages/Main';
import Module from './pages/Module'

function App() {

    

    return (
        <Router>
            <Switch>
                <Route path='/mod/:id'>
                    <Module />
                </Route>
                <Route path='/'>
                    <Main />
                </Route>
            </Switch>

        </Router>

    );
}

export default App;

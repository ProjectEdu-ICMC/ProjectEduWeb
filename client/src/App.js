import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { 
    BrowserRouter as Router, 
    Route, 
    Switch 
} from 'react-router-dom';

import { store, persistor } from './store.js';

import Main from './pages/Main';
import Module from './pages/Module';
import Topic from './pages/Topic';
import Login from './pages/Login';

import { LanguageContextProvider } from './contexts/LanguageContext';
import PrivateRoute from './components/auth/PrivateRoute.js';

import { DndProvider } from 'react-dnd';

import { HTML5Backend } from 'react-dnd-html5-backend';
import { TouchBackend } from 'react-dnd-touch-backend';

const isTouchDevice = () => {
  if ("ontouchstart" in window) {
    return true;
  }
  return false;
};

const DNDBackend = isTouchDevice() ? TouchBackend : HTML5Backend;

function App() {
    return (
        <Provider store={ store }>
            <PersistGate 
                loading={ <> Loading... </> }
                persistor={ persistor }
            >
                <LanguageContextProvider>
                    <DndProvider backend={ DNDBackend }>
                        <Router>
                            <Switch>
                                <PrivateRoute path='/topic/:mod/:topic'>
                                    <Topic />
                                </PrivateRoute>
                                <PrivateRoute path='/mod/:mod'>
                                    <Module />
                                </PrivateRoute>
                                <Route path='/login'>
                                    <Login />
                                </Route>
                                <PrivateRoute path='/'>
                                    <Main /> 
                                </PrivateRoute>
                            </Switch>

                        </Router>
                    </DndProvider>
                </LanguageContextProvider>
            </PersistGate>
        </Provider>
    );
}

export default App;

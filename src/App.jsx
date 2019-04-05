import React from 'react';
import { Router, Route } from 'react-router-dom';

import { history } from './_helpers';

import Home from './components/Home/Home';

import './App.css';

const App = props => (
    <div>
        <Router history={history}>
            <div>
                <Route path="/" component={Home} />
            </div>
        </Router>
    </div>
);

export default App;

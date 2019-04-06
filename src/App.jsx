import React from 'react';
import { Router, Route } from 'react-router-dom';

import { history } from './_helpers';

import Search from './components/Search/Search';
import Result from './components/Result/Result';

import './App.css';

const App = props => (
    <div>
        <Router history={history}>
            <div>
                <div className="info">Plan your travels</div>
                <Route exact path="/" component={Search} />
                <Route path="/result" component={Result} />
            </div>
        </Router>
    </div>
);

export default App;

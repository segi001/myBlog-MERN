// All routes
// Sve rute

import React from 'react';
import {Route
        ,BrowserRouter} from 'react-router-dom';
import ReactDOM from 'react-dom';

import Home from './components/home';
import PostPage from './components/post';
import Admin from './components/admin';

ReactDOM.render(
    <BrowserRouter>
        <Route exact path='/home' component={Home} />
        <Route path='/post' component={PostPage} />
        <Route path='/admin' component={Admin} />
    </BrowserRouter>,
    document.getElementById('root')
)

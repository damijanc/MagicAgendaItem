import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import logger from 'redux-logger'
import {createStore, applyMiddleware} from 'redux'
import {Provider} from "react-redux";
import thunk from 'redux-thunk';

// Containers
import Details from './containers/details'
import Agenda from './containers/agenda'

// Components
import Navigation from "./components/navigation";

// Reducers
import rootReducer from "./reducers/index";

// Antd
import {LocaleProvider} from 'antd'; // Locales for antd
import enUS from 'antd/lib/locale-provider/en_US'; // Set Default locale for antd
import {Row, Col} from 'antd'; // Import for antd components

// Import styles
import './styles/scss/main.scss'


// Create Redux store, define its reducers and apply all middlewares
const store = createStore(
    rootReducer,
    applyMiddleware(thunk, logger)
);

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <LocaleProvider locale={enUS}>
                <div className="main-wrapper">
                    <h1 className="meeting-title">Meeting title</h1>
                    <Navigation/>
                    <Switch>
                        <Route path="/details" component={Details} exact={true}/>
                        <Route path="/agenda" component={Agenda}/>
                    </Switch>
                </div>
            </LocaleProvider>
        </BrowserRouter>
    </Provider>
    , document.getElementById('main'))

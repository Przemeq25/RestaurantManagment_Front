import React from 'react';
import ReactDOM from 'react-dom';
import {ThemeProvider} from '@material-ui/core/styles';

import App from './App';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter as Router} from "react-router-dom";
import theme from "./theme";
import {Provider} from 'react-redux';
import store from "./redux/store";


ReactDOM.render(
    <Provider store={store}>
        <Router>
            <ThemeProvider theme={theme}>
                <App/>
            </ThemeProvider>
        </Router>
    </Provider>,
    document.getElementById('root'));
serviceWorker.unregister();

import React from 'react'
import  ReactDOM  from 'react-dom';
import App from "./App";
import {Provider} from "react-redux"
import {createStore,applyMiddleware,compose} from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';
import {BrowserRouter} from 'react-router-dom';

const store = createStore(reducers,compose(applyMiddleware(thunk)))

ReactDOM.render(
<BrowserRouter>
          <Provider store={store}>
                    <App/>
          </Provider>
</BrowserRouter>
,document.getElementById('root'));
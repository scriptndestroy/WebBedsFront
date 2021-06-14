import { createStore, applyMiddleware} from 'redux';
import thunk from "redux-thunk";
import { createLogger } from 'redux-logger';
import reducers from './reducers'
import config from '../config';

const loggerMiddleware = createLogger()

export const store = config.DEV 
    ? createStore(reducers,applyMiddleware(thunk, loggerMiddleware))
    : createStore(reducers,applyMiddleware(thunk))


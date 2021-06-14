import loc from './config.loc'; 
import dev from './config.dev';
import prod from './config.pro'; 


const config = process.env.REACT_APP_STAGE === 'PRO' ? prod : (process.env.REACT_APP_STAGE === 'DEV' ? dev : loc);

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    ...config,    
    VERSION:"v 0.060409" // mm/dd/hh
};
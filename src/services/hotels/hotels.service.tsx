import config from '../../config';
import { HotelRates } from '../../interfaces/HotelRates';
import ApiServices from './api.services';

export default class HotelService extends ApiServices<HotelRates>{
    URL: string;
    constructor(){
        super();
        this.URL = config.webbeds_external + 'Hotels';
    }

}
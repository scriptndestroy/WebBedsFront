import { Hotel } from "./Hotel";
import { Rate } from "./Rate";

export interface HotelRates {
     hotel: Hotel;
     rates: Rate[]; 
}
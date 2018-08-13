import { combineReducers } from 'redux';
import prodid from './productid';
import idLog from './idLogin';
import idInvoice from './idInvoice';
import idKategori from './idKategori';
export default combineReducers({
    idproduct: prodid,
    idLogin: idLog,
    invoice: idInvoice,
    idkategori: idKategori,
}); 
//state
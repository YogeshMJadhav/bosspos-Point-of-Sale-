import axios from 'axios';
//import { uri } from './commonURI';
const uri = 'http://localhost:3005/'

export function getInwardStock(){
    return axios.get(uri + 'InwardStock');
  }
  export function getInwardStockList(){
    return axios.get(uri + 'InwardStockList');
  }
   export function deleteInwardStock(id){
   return axios.delete(uri + 'InwardStock/' + id);
 }
 
  export function postInwardstock(data) {
    return axios.post(uri + 'InwardStock',data);
  }
  export function putInwardStock(id,data) {
    return axios.put(uri + 'InwardStock/'+id,data);
  }

  export function getInwardStockPerticuler(id){
      return axios.get(uri + 'InwardStock/'+id);
  }  
  
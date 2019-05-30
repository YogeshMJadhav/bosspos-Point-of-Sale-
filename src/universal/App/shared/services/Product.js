import axios from 'axios';
import { uri } from './commonURI'
// const url="http://localhost:3005/"

// export function getProduct(){
//   return axios.get(url + 'Products');
// }

export function getProduct(){
    return axios.get(uri + 'Products');
  } 
  export function getProductList(){
    return axios.get(uri + 'ProductList');
  }
   export function deleteProduct(id){
   return axios.delete(uri + 'Product/' + id);
 }
 
  export function postProduct(data) {
    return axios.post(uri + 'Product',data);
  }
  export function putProduct(id,data) {
    return axios.put(uri + 'Product/'+id,data);
  }
  
  
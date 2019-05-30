import axios from 'axios';
import { uri } from './commonURI';
// const uri = 'http://localhost:3005/'

export function getMenu(){
    return axios.get(uri + 'Menus');
  }
   export function deleteMenu(id){
   return axios.delete(uri + 'Menu/' + id);
 }
 
  export function postMenu(data) {
    return axios.post(uri + 'Menu',data);
  }
  export function putMenu(id,data) {
    return axios.put(uri + 'Menu/'+id,data);
  }
  export function getPerticulerMenu(id){
    return axios.get(uri + 'Menu/' + id);
  } 
  
  
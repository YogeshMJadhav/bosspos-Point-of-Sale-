import axios from 'axios';
// import { uri } from './commonURI';
const uri = 'http://localhost:3005/'

export function getLogin(){
    return axios.get(uri + 'Login');
  }
   export function deleteLogin(id){
   return axios.delete(uri + 'Login/' + id);
 }
 
  export function postLogin(data) {
    return axios.post(uri + 'Login',data);
  }
  export function putLogin(id,data) {
    return axios.put(uri + 'Login/'+id,data);
  }
  
  
import axios from 'axios';
import { uri } from './commonURI';
//  const uri='http://localhost:3005/'
export function getUser() {
    return axios.get(uri + 'Users');
  }
  export function deleteUser(id) {
    return axios.delete(uri + 'User/' + id);
  }
  export function postUser(data) {
    return axios.post(uri + 'User',data);
  }
  export function putUser(id,data) {
    return axios.put(uri + 'User/'+id,data);
  }
  export function getUserPerticuler(id) {
    return axios.get(uri + 'User/'+id);
  }
  
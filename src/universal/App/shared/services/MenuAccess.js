import axios from 'axios';
import { uri } from './commonURI';
//  const uri='http://localhost:3005/'
export function getMenuAccess() {
    return axios.get(uri + 'MenuAccess');
  }
  export function deleteMenuAccess(id) {
    return axios.delete(uri + 'MenuAccess/' + id);
  }
  export function postMenuAccess(data) {
    return axios.post(uri + 'MenuAccess',data);
  }
  export function putMenuAccess(id,data) {
    return axios.put(uri + 'MenuAccess/'+id,data);
  }
  export function getMenuAccessPerticuler(id) {
    return axios.post(uri + 'MenuAccess/'+id);
  }
  
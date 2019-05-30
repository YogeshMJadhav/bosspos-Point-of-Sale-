import React from 'react';
import axios from 'axios';
//import { uri } from './commonURI';
const uri='http://localhost:3005/';
export function getRegistration(){
    return axios.get(uri + 'Registration');
  }
  export function deleteRegistration(id){
    return axios.delete(uri + 'Registration/' + id);
  }
  
   export function postRegistration(data) {
     return axios.post(uri + 'Registration',data);
   }
   export function putRegistration(id,data) {
     return axios.put(uri + 'Registration/'+id,data);
   }
   export function getRegistrationPerticuler(id){
    return axios.get(uri + 'Registration/'+id);
  }
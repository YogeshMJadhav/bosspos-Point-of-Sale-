import React from 'react';
import axios from 'axios';
import { uri } from './commonURI';

export function getTax(){
    return axios.get(uri + 'Taxes');
  }
  export function deleteTax(id){
    return axios.delete(uri + 'Tax/' + id);
  }
  
   export function postTax(data) {
     return axios.post(uri + 'Tax',data);
   }
   export function putTax(id,data) {
     return axios.put(uri + 'Tax/'+id,data);
   }
   export function getTaxPerticuler(id){
    return axios.get(uri + 'Tax/'+id);
  }
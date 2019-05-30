import React from 'react';
import axios from 'axios';
import { uri } from './commonURI';
const url="http://localhost:3005/"

  // export function getVendor(){
  //   return axios.get(url + 'Vendor');
  // }

  export function getVendor(){
    return axios.get(uri + 'Vendor');
  }

  export function deleteVendor(id){
    return axios.delete(uri + 'Vendor/' + id);
  }
  
  export function postVendor(data) {
    return axios.post(uri + 'Vendor',data);
  }
  
  export function putVendor(id,data) {
    return axios.put(uri + 'Vendor/'+id,data);
  }
   
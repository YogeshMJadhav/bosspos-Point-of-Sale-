import React from 'react';
import axios from 'axios';
import { uri } from './commonURI';


export function getProductType() {
    return axios.get(uri + 'ProductTypes');
  }
  export function deleteProductType(id) {
    return axios.delete(uri + 'ProductType/' + id);
  }
  export function postProductType(data) {
    return axios.post(uri + 'ProductType',data);
  }
  export function putProductType(id,data) {
    return axios.put(uri + 'ProductType/'+id,data);
  }
  export function getProductTypePerticuler(id) {
    return axios.put(uri + 'ProductType/'+id);
  }
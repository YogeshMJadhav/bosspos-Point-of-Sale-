import React from 'react';
import axios from 'axios';
import { uri } from './commonURI';

export function getUserType() {
    return axios.get(uri + 'UserTypes');
  }
  export function deleteUserType(id) {
    return axios.delete(uri + 'UserType/' + id);
  }
  export function postUserType(data) {
    return axios.post(uri + 'UserType',data);
  }
  export function putUserType(id,data) {
    return axios.put(uri + 'UserType/'+id,data);
  }
  export function getUserTypePerticuler(id) {
    return axios.get(uri + 'UserType/'+id);
  }
  
  
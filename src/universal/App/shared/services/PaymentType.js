import React from 'react';
import axios from 'axios';
import { uri } from './commonURI';


export function getPaymentType() {
    return axios.get(uri + 'PaymentTypes');
  }
  export function deletePaymentType(id) {
    return axios.delete(uri + 'PaymentType/' + id);
  }
  export function postPaymentType(data) {
    return axios.post(uri + 'PaymentType',data);
  }
  export function putPaymentType(id,data) {
    return axios.put(uri + 'PaymentType/'+id,data);
  }
  export function getPaymentTypePerticuler(id) {
    return axios.get(uri + 'PaymentType/' + id);
  }
  
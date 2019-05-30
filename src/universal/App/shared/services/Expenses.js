import React from 'react';
import axios from 'axios';
//import { uri } from './commonURI';
const uri='http://localhost:3005/';
export function getExpenses(){
    return axios.get(uri + 'Expenses');
  }
  export function deleteExpenses(id){
    return axios.delete(uri + 'Expenses/' + id);
  }
  
   export function postExpenses(data) {
     return axios.post(uri + 'Expenses',data);
   }
   export function putExpenses(id,data) {
     return axios.put(uri + 'Expenses/'+id,data);
   }
   export function getExpensesPerticuler(id){
    return axios.get(uri + 'Expenses/'+id);
  }
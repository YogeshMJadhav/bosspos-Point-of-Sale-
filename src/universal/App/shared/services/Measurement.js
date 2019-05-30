import axios from 'axios';
import { uri } from './commonURI';
// const uri = 'http://localhost:3005/'

export function getMeasurements(){
    return axios.get(uri + 'MeasurementUnit');
  }
   export function deleteMeasurement(id){
   return axios.delete(uri + 'MeasurementUnit/' + id);
 }
 
  export function postMeasurement(data) {
    return axios.post(uri + 'MeasurementUnit',data);
  }
  export function putMeasurement(id,data) {
    return axios.put(uri + 'MeasurementUnit/'+id,data);
  }
  
  
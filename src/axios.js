import axios from 'axios';

export var sqlApi = axios.create({
  baseURL: 'http://localhost:5000/api/vulnerable'
});
  
export var noSqlApi = axios.create({
  baseURL: 'http://localhost:3100/api/vulnerable'
})
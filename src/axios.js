import axios from 'axios';

export var sqlApi = axios.create({
  baseURL: 'http://localhost:5000/api/vulnerable'
});
  
export var noSqlApi = axios.create({
  baseURL: 'http://localhost:3100/api/vulnerable'
});

export var ldapApi = axios.create({
  baseURL: 'http://localhost:8080/api/vulnerable'
});

export var deserializationApi = axios.create({
  baseURL: 'http://127.0.0.1:5000/api/vulnerable'
});
import axios from 'axios';

const axiosClient = axios.create();

const axiosConfig = {
    baseURL: 'https://restcountries.com/v2/',
    timeout: 30000,
  };

axiosClient.defaults.withCredentials = true;

axios.interceptors.response.use(function (response) {
    //Dispatch any action on success
    return response;
  }, function (error) {
      if(error.response.status === 401) {
        // Redirect to main page or add other logic
        window.location.replace("/")
      }
    return Promise.reject(error);
  });

export function getRequest(URL: string) {
    return axiosClient.get(`${URL}`, axiosConfig).then(response => response);
}
  
export function postRequest(URL: string, payload: any) {
    return axiosClient.post(`/${URL}`, payload).then(response => response);
}
  
  
export function deleteRequest(URL: string) {
    return axiosClient.delete(`/${URL}`).then(response => response);
}
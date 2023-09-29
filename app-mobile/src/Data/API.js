import axios from 'axios';

  const API = (baseURL) => axios.create({
      baseURL: baseURL,
      withCredentials: true,
      headers: {
        'App': 'Sanlam',
        'AppKey': 'secret-api-key',
        'AppVersion': '1.0.0',
        'Content-Type': 'application/json'
      },
  });

export default API;
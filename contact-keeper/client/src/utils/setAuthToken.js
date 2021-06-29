import axios from 'axios';

// global auth token so we dont have to create a header (Content-Type) with token
// everytime we want to access a protected route on the backend
const setAuthToken = token => {
  if (token) {
    axios.defaults.headers.common['x-auth-token'] = token;
  } else {
    delete axios.defaults.headers.common['x-auth-token'];
  }
};

export default setAuthToken;

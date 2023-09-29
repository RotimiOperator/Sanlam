import API from './API';


const authURL = 'http://192.168.43.3/api/mobile';

    //Auth
    const Login = (data) => {
        return API(authURL).post('/login', data);
    };
  
    const Auth = {
        Login
    };

export default Auth;
import API from './API';

const authURL = 'http://192.168.43.3/api/mobile';


    //User
    const Authenticated = () => {
        return API(authURL).post('/authenticated');
    };
  
    const APIs = {
        Authenticated
    };

export default APIs;
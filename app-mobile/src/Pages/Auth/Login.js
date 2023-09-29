import { useEffect, useState, useContext } from 'react';
import { Text, View, Image, TouchableOpacity, ScrollView } from 'react-native';
import Input from '../../Components/Input';
import Button from '../../Components/Button';
import styles from '../../Shared/Styles';
import Auth from '../../Data/Auth';
import Header from '../../Components/Header';
import ModalAlert from '../../Components/ModalAlert';
import { Success, Error } from '../../Components/Icon';
import { AppContext } from '../../Data/AppContext';
import LocalAuth from '../../Components/LocalAuth';
import { setLocalData, getLocalData } from '../../Data/LocalStorage';

export default function Login({ navigation }) {
  const { readFromStorage } = useContext(AppContext);
  const [ data, setData ] = useState({
    username: '',
    password: '',
    device_name: "Phone"
  });
  const [ error, setError ] = useState('');
  const [ success, setSuccess ] = useState('');
  const [ verify, setVerify ] = useState(false);
  const [ processing, setProcessing ] = useState(false);
  
  const onHandleChange = (name, value) => {
    setData({...data, [name]: value});
  };
  
  const submit = (data) => {
    setProcessing(true);
    if (!data.username || !data.password) {
      var errorMessage = () => {
        if (!data.username && !data.password) { return 'Please enter your Email Address or Phone Number and Password' };
        if(!data.username) { return 'Please enter your Email Address or Phone Number' };
        if(!data.password) { return 'Please enter your Password' };
      }
      setError(errorMessage);
      return setProcessing(false);
    } else if(!(/\S+@\S+\.\S+/.test(data.username))) {
      var errorMessage = () => {
        return 'Please enter a valid Email Address';
      }
      setError(errorMessage);
      return setProcessing(false);
    } else {
      //
    }
    if(data.username && data.password) {
      Auth.Login(data)
      .then(response => {
        console.log(response.data);
        if (response.status === 200) {
          if(response.data) {
            setLocalData('auth', data);
            setLocalData('token', response.data.token);
            setLocalData('status', 'true');
            setLocalData('user', response.data.user);
            setSuccess('Login Successful!');
            readFromStorage();
          } else {
            setError('Error!');
          }
        }
        return setProcessing(false);
      })
      .catch(error => {
        console.error(error);
        setError('Network Error!');
        return setProcessing(false);
      });
    }
  };

  const [ authData, setAuthData ] = useState(null);
  const [ localAuthentication, setLocalAuthentication ] = useState(false);
  useEffect(() => {
    if(localAuthentication) {
      setData(authData);
      submit(authData);
    }
  }, [ localAuthentication ]);

  const [ showBiometrics, setShowBiometrics ] = useState(false);
  const handleBiometrics = async () => {
    const auth = await getLocalData('auth');
    if(!(auth === null)) {
      setAuthData(auth);
      setShowBiometrics(true);
    }
  };
  useState(() => {
    handleBiometrics();
  }, []);

  return (<>
    <Header
      center={<Image
        style={[styles.radius_lg, styles.bg_color_secondary, {width: 200, height: 200}]}
        source={require('../../../assets/images/sanlam.png')}
        resizeMode="contain"
      />}
      styleHeader={[styles.bg_color_secondary, styles.text_color_white, styles.header_rounded]}
      />

    <ScrollView
      //stickyHeaderIndices={[0]}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      style={[styles.container]}>

      <View style={[styles.margin_md.b]}>
        
        <Text style={[styles.center, styles.text_lg, styles.fw_bolder, styles.margin_md.b]}>Login</Text>

        <View style={[styles.form]}>
          <Input
            label="Email Address or Phone Number"
            name="username"
            value={data.username}
            handleChange={onHandleChange}
          />
          
          <Input
            label="Password"
            name="password"
            value={data.password}
            handleChange={onHandleChange}
            type="password"
            secureTextEntry={true}
            styleField={[styles.margin_sm.b]}
          />

          <LocalAuth login={setLocalAuthentication} show={showBiometrics} />
          
          <Button
            onPress = {() => submit(data)}
            processing={processing}
            style = {[
                    styles.button_md,
                    styles.text_color_primary,
                    styles.bg_color_secondary,
                    styles.button_stretch,
                    styles.margin_sm.b,
                ]}
            styleText = {[
                styles.text_color_primary,
            ]}
            >
                Sign In
          </Button>

          <ModalAlert
            icon={<Error />}
            title="Error!"
            message={error}
            primary={"Okay"}
            onPressPrimary={() => {setError('')} }
            />

          <ModalAlert
            icon={<Success />}
            title="Success!"
            message={success}
            primary="Go to Dashboard"
            onPressPrimary={() => {setSuccess(''); readFromStorage();} }
            />

          
          <View style={[styles.bars, styles.center]}>
            <Text style={[styles.text_xs, styles.center, styles.margin_md.y, styles.margin_sm.e]}>
              Login to your account today
            </Text>
          </View>
          
        </View>
        
      </View>

    </ScrollView>
  </>);
}

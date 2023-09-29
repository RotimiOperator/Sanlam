import { useRef, useState, useEffect } from 'react';
import { AppState } from 'react-native';
import axios from 'axios';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AppContext } from './Data/AppContext';
import API from './Data/API';
import APIs from './Data/APIs';
import { getAllKeys, getLocalData, delLocalData, setLocalData } from './Data/LocalStorage';
import styles, { constants } from './Shared/Styles';
import SVG from './Components/SVG';

import Login from './Pages/Auth/Login';
import ComingSoon from './Pages/ComingSoon';

import Dashboard from './Pages/Dashboard';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function Index() {
  const [ token, setToken ] = useState(null);
  const [ status, setStatus ] = useState(false);
  const [ data, setData ] = useState({});
  
  const readFromStorage = async () => {
    const token = await getLocalData('token');
    setToken(token);
    const status = await getLocalData('status');
    setStatus(status);
    const user = await getLocalData('user');
    setData({...data, token: token, user: user});
    //const all = await getAllKeys();
    //console.log(all);
  console.log(user);
  };
  console.log(data);
  //console.log(token);
  
  useEffect(() => {
    readFromStorage();
  }, [status]);
  
  useEffect(() => {
    if(token) {
      axios.defaults.headers.common['Authorization'] = token;
    }
  }, [token]);

  /* useEffect(() => {
    if(token) {
      APIs.User()
      .then(response => {
        if (response.status === 200) {
          setData(response.data)
        }
      })
      .catch(error => {
        console.error(error);
      });
    }
  }, [token]); */



  return (
    <AppContext.Provider value={{ appData: data, readFromStorage: () => readFromStorage() }}>
      <NavigationContainer>
        {(token && status) ? 
          <Tab.Navigator
              initialRouteName="Home"
              screenOptions={({ route }) => ({
                headerShown: false,
                tabBarStyle: { height: 60, backgroundColor: constants.color.secondary, paddingTop: constants.padding.sm, paddingBottom: constants.padding.xs },
                tabBarIcon: ({ focused, color, size }) => {
                  let iconName;

                  if (route.name === 'Home') {
                    iconName = focused
                      ? 'M12 26.4V17.0824H18V26.4H25.5V13.9765H30L15 0L0 13.9765H4.5V26.4H12Z'
                      : 'M12 26.4V17.0824H18V26.4H25.5V13.9765H30L15 0L0 13.9765H4.5V26.4H12Z';
                  } else if (route.name === 'Assets') {
                    iconName = 'M25.9091 0H12.2727C11.1878 0 10.1472 0.431005 9.38002 1.1982C8.61282 1.96539 8.18182 3.00593 8.18182 4.09091V13.6364C8.18182 14.7213 8.61282 15.7619 9.38002 16.5291C10.1472 17.2963 11.1878 17.7273 12.2727 17.7273H25.9091C26.9941 17.7273 28.0346 17.2963 28.8018 16.5291C29.569 15.7619 30 14.7213 30 13.6364V4.09091C30 3.00593 29.569 1.96539 28.8018 1.1982C28.0346 0.431005 26.9941 0 25.9091 0ZM27.2727 13.6364C27.2727 13.998 27.1291 14.3449 26.8733 14.6006C26.6176 14.8563 26.2707 15 25.9091 15H12.2727C11.9111 15 11.5642 14.8563 11.3085 14.6006C11.0528 14.3449 10.9091 13.998 10.9091 13.6364V4.09091C10.9091 3.72925 11.0528 3.3824 11.3085 3.12667C11.5642 2.87094 11.9111 2.72727 12.2727 2.72727H25.9091C26.2707 2.72727 26.6176 2.87094 26.8733 3.12667C27.1291 3.3824 27.2727 3.72925 27.2727 4.09091V13.6364ZM22.5 8.18182C21.9952 8.18353 21.5091 8.37311 21.1364 8.71364C20.8431 8.44712 20.4788 8.2715 20.0877 8.20814C19.6965 8.14478 19.2954 8.19639 18.933 8.35671C18.5706 8.51703 18.2626 8.77916 18.0464 9.11123C17.8302 9.4433 17.7151 9.83102 17.7151 10.2273C17.7151 10.6235 17.8302 11.0112 18.0464 11.3433C18.2626 11.6754 18.5706 11.9375 18.933 12.0978C19.2954 12.2582 19.6965 12.3098 20.0877 12.2464C20.4788 12.183 20.8431 12.0074 21.1364 11.7409C21.3826 11.9647 21.6798 12.1251 22.002 12.2081C22.3242 12.2911 22.6619 12.2942 22.9856 12.2171C23.3093 12.1401 23.6094 11.9853 23.8597 11.766C24.11 11.5468 24.3031 11.2698 24.4222 10.9591C24.5412 10.6483 24.5827 10.3132 24.5429 9.98285C24.5032 9.65248 24.3834 9.33678 24.194 9.06316C24.0046 8.78954 23.7514 8.56626 23.4562 8.41268C23.161 8.25909 22.8328 8.17985 22.5 8.18182V8.18182ZM20.4545 20.4545C20.0929 20.4545 19.746 20.5982 19.4903 20.8539C19.2346 21.1097 19.0909 21.4565 19.0909 21.8182V23.1818C19.0909 23.5435 18.9472 23.8903 18.6915 24.1461C18.4358 24.4018 18.0889 24.5455 17.7273 24.5455H4.09091C3.72925 24.5455 3.3824 24.4018 3.12667 24.1461C2.87094 23.8903 2.72727 23.5435 2.72727 23.1818V17.7273H4.09091C4.45257 17.7273 4.79941 17.5836 5.05515 17.3279C5.31088 17.0721 5.45455 16.7253 5.45455 16.3636C5.45455 16.002 5.31088 15.6551 5.05515 15.3994C4.79941 15.1437 4.45257 15 4.09091 15H2.72727V13.6364C2.72727 13.2747 2.87094 12.9279 3.12667 12.6721C3.3824 12.4164 3.72925 12.2727 4.09091 12.2727C4.45257 12.2727 4.79941 12.1291 5.05515 11.8733C5.31088 11.6176 5.45455 11.2707 5.45455 10.9091C5.45455 10.5474 5.31088 10.2006 5.05515 9.94485C4.79941 9.68912 4.45257 9.54545 4.09091 9.54545C3.00593 9.54545 1.96539 9.97646 1.1982 10.7437C0.431005 11.5108 0 12.5514 0 13.6364V23.1818C0 24.2668 0.431005 25.3073 1.1982 26.0745C1.96539 26.8417 3.00593 27.2727 4.09091 27.2727H17.7273C18.8122 27.2727 19.8528 26.8417 20.62 26.0745C21.3872 25.3073 21.8182 24.2668 21.8182 23.1818V21.8182C21.8182 21.4565 21.6745 21.1097 21.4188 20.8539C21.1631 20.5982 20.8162 20.4545 20.4545 20.4545ZM6.81818 21.8182H8.18182C8.54348 21.8182 8.89032 21.6745 9.14605 21.4188C9.40179 21.1631 9.54545 20.8162 9.54545 20.4545C9.54545 20.0929 9.40179 19.746 9.14605 19.4903C8.89032 19.2346 8.54348 19.0909 8.18182 19.0909H6.81818C6.45652 19.0909 6.10968 19.2346 5.85395 19.4903C5.59821 19.746 5.45455 20.0929 5.45455 20.4545C5.45455 20.8162 5.59821 21.1631 5.85395 21.4188C6.10968 21.6745 6.45652 21.8182 6.81818 21.8182Z';
                  }

                  // You can return any component that you like here! {size}
                  return <SVG width={30} height={29} fill={color} d={iconName} />;
                },
                tabBarActiveTintColor: constants.color.primary,
                tabBarInactiveTintColor: constants.color.white,
              })}
            >
            <Tab.Screen name="Home">
              {(props) => <StackScreen {...props} routeName="Dashboard" setStatus={setStatus} />}
            </Tab.Screen>
            <Tab.Screen name="Assets">
              {(props) => <StackScreen {...props} routeName="Assets" />}
            </Tab.Screen>
          </Tab.Navigator>
            :
          <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Login">
              {(props) => <Login {...props} setStatus={setStatus} />}
            </Stack.Screen>
            <Stack.Screen
              name="ComingSoon"
              component={ComingSoon}
              />
          </Stack.Navigator>
        }
      </NavigationContainer>
    </AppContext.Provider>
  );
};


function StackScreen({ routeName, setStatus }) {

  return (
    <Stack.Navigator initialRouteName={routeName ?? "Dashboard"} screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Dashboard">
        {(props) => <Dashboard {...props} setStatus={setStatus} />}
      </Stack.Screen>
      <Stack.Screen
        name="Assets"
        component={ComingSoon}
        />
      <Stack.Screen
        name="ComingSoon"
        component={ComingSoon}
        />
    </Stack.Navigator>
  );
}
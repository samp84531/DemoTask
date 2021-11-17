import React, { useState, useEffect } from 'react'
import { View, Text } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { fetchLoggedInData } from '../redux/actions/LoginAction'
import RegisterView from "./RegisterView"
import SportsTeamOrAtheleteView from './SportsTeamOrAtheleteView'
import AboutYou from '../components/registeration/AboutYou'
import LoginView from './LoginView'
import ForgotPasswordView from '../screens/ForgotPasswordView';
import OtpVerifyView from '../screens/OtpVerifyView';
import NewPasswordView from '../screens/NewPasswordView';
import CustomStack from '../navigation/StackNavigator'
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
const IndexView = () => {
  const { loggedInUser } = useSelector(state => state.login)
  const dispatch = useDispatch();
  const [loading , setLoading] = useState(true)
  useEffect(()=> {
    dispatch(fetchLoggedInData())
  },[])
  const AuthStack = createStackNavigator();

  const AuthScreen = () => (
    <NavigationContainer>
    <AuthStack.Navigator screenOptions={{ headerShown: false }} initialRouteName="RegisterView">
      <AuthStack.Screen name="RegisterView" component={RegisterView} />
      <AuthStack.Screen name="SportsTeamOrAtheleteView" component={SportsTeamOrAtheleteView} />
      <AuthStack.Screen name="LoginView" component={LoginView} />
      <AuthStack.Screen name="AboutYou" component={AboutYou} />
      <AuthStack.Screen name="ForgotPasswordView" component={ForgotPasswordView} />
      <AuthStack.Screen name="OtpVerifyView" component={OtpVerifyView} />
      <AuthStack.Screen name="NewPasswordView" component={NewPasswordView} />
    </AuthStack.Navigator>
    </NavigationContainer>
  );
  
  useEffect(() => {
    if (loggedInUser.username) {
      setLoading(false)
    }
  },[loggedInUser])

  if (!loggedInUser && loading) {
    return <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}><Text>Loaidng...</Text></View>
  }

  if (loggedInUser && loggedInUser.username) {
    return <CustomStack />
  } else {
      return <AuthScreen />
  }
}

export default IndexView
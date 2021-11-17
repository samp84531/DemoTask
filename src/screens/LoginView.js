import React, { useState } from 'react'
import { View, StyleSheet, TextInput, TouchableOpacity, Text } from 'react-native'
import { useDispatch } from 'react-redux';
import { Formik } from 'formik';
import ModedText from '../components/typography/ModedText'
import LoginContainer from '../components/login/LoginContainer'
import Heading from '../components/registeration/Heading'
import { alphaBlack3perct, lightGrey,errorColor } from '../configs/colors'
import ArrowButton from '../components/common/ArrowButton'
import { loginWithApi } from '../utils/apiService'
import { storeUserAccess } from '../redux/actions/LoginAction'
import { storeLoginData } from '../utils/asyncStore'
import * as Yup from "yup";
import SendBird from 'sendbird';
import ScrollableAvoidKeyboard from '../components/ScrollableAvoidKeyboard'
import {APPLICATION_ID} from '../configs/serverApis';
import Fonts from '../configs/fonts';
const appId = APPLICATION_ID;
const sendbird = new SendBird({ 'appId': appId });

const validationSchema = Yup.object().shape({
  username: Yup.string().required("Username is required"),
  password: Yup.string().required("Password is required")
});

const LoginView = ({ showregister,navigation }) => {

  const dispatch = useDispatch()
  const[serverErrors, setServerErrors] = useState(null);
  const [loading, setLoader] = useState(false);

  const handleFormSubmit = async (values) => {
    try {
      setLoader(true)
      let res = await loginWithApi(values);
      if (res && res.status == 200 && res.data.data) {
        // TODO need to work more on this logic for user creation and updation
        sendbird.connect(values.username, (err, user) => {
          // console.log(err,'err', user);
          if (!err) {
            // console.log('sendbird res', user);
            if (user.userID !== res.data.data.username) {
              sendbird.updateCurrentUserInfo(
                res.data.data.username,
                '',
                (err, user) => {
                  if (!err) {
                    onLoginSuccess(res.data.data);
                  } else {
                    onLoginSuccess(res.data.data);
                  }
                },
              );
            } else {
              onLoginSuccess(res.data.data);
            }
          } else {
            // if user exist on sendbird
            // console.log(user, 'lst else', err)
            // onLoginSuccess(err);
            onLoginSuccess(res.data.data);
          }
        });
      }
    }catch (e){
      setServerErrors(e.response.data);
      setLoader(false)
      console.log(e.response.data)
    }
  }

  const onLoginSuccess = (data) => {
    setLoader(false)
    storeLoginData(data);
    dispatch(storeUserAccess(data));
  };

  return (
    <LoginContainer>
      <Heading primary='login' secondary='welcome back' />
      <View style={{flex:1}}>
      <Formik
        validationSchema={validationSchema}
        initialValues={{ username: '', password: '' }}
        onSubmit={handleFormSubmit}>
        {({ handleChange, handleBlur, handleSubmit, values, errors, }) => (
            <ScrollableAvoidKeyboard
            style={{ flex: 1 }}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps={"handled"}>
          <View style={styles.loginFormContainer}>
            <View style={styles.serverError}>
              {serverErrors && (serverErrors.username || serverErrors.password) ? <Text style={styles.ErrorText}>{serverErrors.username || serverErrors.password}</Text>: null}
            </View>
            <View style={styles.loginFormBlock}>        
              <View style={serverErrors && serverErrors.username ? [styles.username, {borderColor: errorColor, borderWidth: 0.5}] : styles.username}>
                <Text style={styles.atsymbol}>@</Text>
                <TextInput
                  style={styles.inputBox}
                  placeholder='your username' 
                  placeholderTextColor='#ccc'
                  onChangeText={handleChange('username')}
                  onBlur={handleBlur('username')}
                  value={values.username}/>
              </View>
              <View>{errors && errors.username ? <Text style={styles.ErrorText}>{errors.username}</Text> : null}</View>
              <View style={serverErrors && serverErrors.password ? [styles.password, {borderColor: errorColor, borderWidth: 0.5}] : styles.password}>
                <TextInput
                  style={styles.inputBox}
                  secureTextEntry={true}
                  placeholder='your password'
                  placeholderTextColor='#ccc'
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  value={values.password}/>
              </View>
              <View>{errors && errors.password ? <Text style={styles.ErrorText}>{errors.password}</Text> : null}</View>
              <View style={styles.forgotPasswordContainer}>
                <TouchableOpacity onPress={()=>{navigation.navigate('ForgotPasswordView')}}>
                  <ModedText style={styles.forgotPasswordLink}>forgot my password</ModedText>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.loginButtonContainer}>
              <ArrowButton text='login' onPress={handleSubmit} visible={loading} />
            </View>
          </View>
          </ScrollableAvoidKeyboard>
        )}
      </Formik>
      </View>
      <View style={styles.needRegister}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('RegisterView')}>
          <ModedText style={styles.loginText}>i need to register</ModedText>
        </TouchableOpacity>
      </View>
    </LoginContainer>
  )
} 

const styles = StyleSheet.create({
  loginFormContainer: {
    marginTop: 20
  },
  button:{
  },
  loginFormBlock: {
    backgroundColor: alphaBlack3perct,
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderRadius: 20,
    minHeight: 200
  },
  serverError: {
    alignItems: "flex-end", 
    marginBottom: 10
  },
  username: {
    width: '100%',
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    borderRadius: 5,
    borderColor: lightGrey,
    borderWidth: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  atsymbol: {
    fontSize: 28,
    color: '#ccc'
  },
  password: {
    width: '100%',
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    borderRadius: 5,
    borderColor: lightGrey,
    borderWidth: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10
  },
  inputBox: {
    width: '100%',
    fontSize: 18
  },
  forgotPasswordContainer: {
    alignItems: 'flex-end',
    marginTop: 10
  },
  forgotPasswordLink: {
    textDecorationLine: 'underline',
    opacity: 0.5,
    fontFamily:Fonts.Regular
  },
  loginButtonContainer: {
    marginTop: 50,
    flex: 1
  },
  loginText: {
    fontWeight: '800',
    textDecorationLine: 'underline'
  },
  ErrorText: {
    color:errorColor,
    fontWeight: 'bold',
    opacity: 0.5
  },
  needRegister: {
    marginTop: 50, 
    alignItems: 'center',
  }
})
export default LoginView
import React, { useState } from 'react'
import { View, StyleSheet, TextInput, TouchableOpacity, Text } from 'react-native'
import { Formik } from 'formik';
import ModedText from '../components/typography/ModedText'
import LoginContainer from '../components/login/LoginContainer'
import Heading from '../components/registeration/Heading'
import { alphaBlack3perct, lightGrey,errorColor } from '../configs/colors'
import ArrowButton from '../components/common/ArrowButton'
import * as Yup from "yup";
import ScrollableAvoidKeyboard from '../components/ScrollableAvoidKeyboard'
import { forgotPassword } from '../utils/apiService';
const validationSchema = Yup.object().shape({
  username: Yup.string().required("Username is required")
});

const LoginView = ({ navigation }) => {
  const[serverErrors, setServerErrors] = useState(null);
  const [loading, setLoader] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const handleFormSubmit = async (values) => {
    setLoader(true)
    let res = await forgotPassword(values.username)
      console.log('res',res);
        if (res && res.status == 200) {
          setLoader(false)
          setErrorMsg(null)
          navigation.navigate('OtpVerifyView',{email:values.username,message:res.data.message})
        }else{
          console.log('res',res);
          setErrorMsg(res)
          setLoader(false)
        }
  }

  return (
    <LoginContainer>
      <Heading primary='forgot password' secondary='welcome back' />
      <Formik
        validationSchema={validationSchema}
        initialValues={{ username: '' }}
        onSubmit={handleFormSubmit}>
        {({ handleChange, handleBlur, handleSubmit, values, errors, }) => (
            <ScrollableAvoidKeyboard
             style={{ flex: 1 }}
             showsVerticalScrollIndicator={false}
             >
            <View style={styles.loginFormContainer}>
            <View style={styles.serverError}>
              {serverErrors && serverErrors.username  ? <Text style={styles.ErrorText}>{serverErrors.username || serverErrors.password}</Text>: null}
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
            </View>
            <View style={styles.loginButtonContainer}>
              <ArrowButton text='next' visible={loading} onPress={handleSubmit} visible={loading} />
            </View>
            <View style={{alignSelf: 'center',paddingVertical:10}}>
              {errorMsg &&
                <Text style={styles.ErrorText}>
                  {errorMsg.email}
                </Text>
              }
              </View>
          </View>
          </ScrollableAvoidKeyboard>
        )}
      </Formik>
      <View style={styles.needRegister}>
        <TouchableOpacity onPress={() => navigation.navigate('RegisterView')}>
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
  loginFormBlock: {
    backgroundColor: alphaBlack3perct,
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderRadius: 20,
    minHeight: 100
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
    transform: [{skewX: '30deg'}]
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
  },
  loginButtonContainer: {
    marginTop: 50,
    flex: 1
  },
})
export default LoginView
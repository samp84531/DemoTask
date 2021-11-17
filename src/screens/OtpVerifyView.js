import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
} from 'react-native';
import {Formik} from 'formik';
import ModedText from '../components/typography/ModedText';
import LoginContainer from '../components/login/LoginContainer';
import Heading from '../components/registeration/Heading';
import {alphaBlack3perct, lightGrey,primaryBlack,primaryGreen,errorColor} from '../configs/colors';
import ArrowButton from '../components/common/ArrowButton';
import * as Yup from 'yup';
import ScrollableAvoidKeyboard from '../components/ScrollableAvoidKeyboard';
import Fonts from '../configs/fonts';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import { otpVerify } from '../utils/apiService';
const validationSchema = Yup.object().shape({
  code: Yup.string().required('Enter your varification code'),
});

const LoginView = ({route, navigation}) => {
  const [serverErrors, setServerErrors] = useState(null);
  const [loading, setLoader] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const handleFormSubmit = async values => {
    console.log('route',values);
    setLoader(true)
    let request = {
      code:values.code,
      email:route.params.email
    }
    let res = await otpVerify(request)
        if (res && res.status == 200) {
          setLoader(false)
          setErrorMsg(null)
          navigation.navigate('NewPasswordView',{email:route.params.email})
        }else{
          console.log('res',res);
          setErrorMsg(res)
          setLoader(false)
        }
  };

  return (
    <LoginContainer>
      <Heading primary={route.params.message}  secondary="Otp Verify" />
      <Formik
        validationSchema={validationSchema}
        initialValues={{code: ''}}
        onSubmit={handleFormSubmit}>
        {({handleChange, handleBlur, handleSubmit, values, errors}) => (
          <ScrollableAvoidKeyboard
            style={{flex: 1}}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps={'handled'}>
            <View style={styles.loginFormContainer}>
              <View style={styles.serverError}>
                {serverErrors && serverErrors.code ? (
                  <Text style={styles.ErrorText}>
                    {serverErrors.code}
                  </Text>
                ) : null}
              </View>
              <View style={styles.loginFormBlock}>
                <View
                  style={
                    serverErrors && serverErrors.code
                      ? [
                          styles.code,
                          {borderColor:errorColor, borderWidth: 0.5},
                        ]
                      : styles.code
                  }>
                  <OTPInputView
                    style={styles.codeContainer}
                    pinCount={4}
                    autoFocusOnLoad={false}
                    codeInputFieldStyle={styles.codeInput}
                    codeInputHighlightStyle={styles.codeInputHighlight}
                    secureTextEntry={true}
                    onCodeChanged={handleChange('code')}
                    onCodeFilled={handleChange('code')}
                  />

                </View>
                <View>
                  {errors && errors.code ? (
                    <Text style={styles.ErrorText}>{errors.code}</Text>
                  ) : null}
                </View>
              </View>
              <View style={styles.loginButtonContainer}>
                <ArrowButton
                  text="next"
                  onPress={handleSubmit}
                  visible={loading}
                />
              </View>
              <View style={{alignSelf: 'center', paddingVertical:10}}>
              {errorMsg &&
                <Text style={styles.ErrorText}>
                  {errorMsg.otp?errorMsg.otp:errorMsg.error}
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
  );
};

const styles = StyleSheet.create({
  loginFormContainer: {
    marginTop: 20,
  },
  loginFormBlock: {
    backgroundColor: alphaBlack3perct,
    paddingHorizontal: 20,
    paddingVertical: 20,
    // marginTop: 30,
    borderRadius: 20,
    minHeight: 100,
  },
  serverError: {
    alignItems: 'flex-end',
    marginBottom: 10,
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
    transform: [{skewX: '30deg'}],
  },
  atsymbol: {
    fontSize: 28,
    color: '#ccc',
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
    marginTop: 10,
  },
  inputBox: {
    width: '100%',
    fontSize: 18,
  },
  loginText: {
    fontWeight: '800',
    textDecorationLine: 'underline',
  },
  ErrorText: {
    color: errorColor,
    fontWeight: 'bold',
    opacity: 0.5,
  },
  needRegister: {
    marginTop: 50,
    alignItems: 'center',
  },
  loginButtonContainer: {
    marginTop: 50,
    flex: 1,
  },
  codeContainer: {
    width: '92%', height: 50, alignSelf: 'center'
},
codeInput: {
    height: 50,
    width: 50,
    borderWidth: 1,
    borderRadius: 4,
    borderColor: primaryGreen,
    color: primaryBlack,
    fontFamily: Fonts.Regular,
    fontSize: 17,
    marginVertical: 10
},
codeInputHighlight: {
    borderColor:primaryBlack,
    // fontSize:20
},
});
export default LoginView;

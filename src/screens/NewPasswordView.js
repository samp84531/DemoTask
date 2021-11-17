import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Text,
} from 'react-native';
import {Formik} from 'formik';
import ModedText from '../components/typography/ModedText';
import LoginContainer from '../components/login/LoginContainer';
import Heading from '../components/registeration/Heading';
import {alphaBlack3perct, lightGrey,errorColor} from '../configs/colors';
import ArrowButton from '../components/common/ArrowButton';
import * as Yup from 'yup';
import { resetPassword } from '../utils/apiService';
import ScrollableAvoidKeyboard from '../components/ScrollableAvoidKeyboard';
const validationSchema = Yup.object().shape({
  password: Yup.string().required('Password is required'),
});

const LoginView = ({route, navigation}) => {
  const [serverErrors, setServerErrors] = useState(null);
  const [loading, setLoader] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const handleFormSubmit = async values => {
    console.log('route', values);
    setLoader(true);
    let request = {
      password: values.password,
      email: route.params.email,
    };
    let res = await resetPassword(request);
    console.log(res);
    if (res && res.status == 200) {
      setLoader(false);
      setErrorMsg(null)
      navigation.navigate('LoginView');
    } else {
      console.log('res', res);
      setErrorMsg(res);
      setLoader(false);
    }
  };

  return (
    <LoginContainer>
      <Heading primary="New Password" secondary="welcome back" />
      <Formik
        validationSchema={validationSchema}
        initialValues={{password: ''}}
        onSubmit={handleFormSubmit}>
        {({handleChange, handleBlur, handleSubmit, values, errors}) => (
          <ScrollableAvoidKeyboard
            style={{flex: 1}}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps={'handled'}>
            <View style={styles.loginFormContainer}>
              <View style={styles.serverError}>
                {serverErrors && serverErrors.password ? (
                  <Text style={styles.ErrorText}>
                    {serverErrors.password || serverErrors.password}
                  </Text>
                ) : null}
              </View>
              <View style={styles.loginFormBlock}>
                <View
                  style={
                    serverErrors && serverErrors.password
                      ? [
                          styles.password,
                          {borderColor: errorColor, borderWidth: 0.5},
                        ]
                      : styles.password
                  }>
                  <TextInput
                    style={styles.inputBox}
                    secureTextEntry={true}
                    placeholder="your password"
                    placeholderTextColor="#ccc"
                    onChangeText={handleChange('password')}
                    onBlur={handleBlur('password')}
                    value={values.password}
                  />
                </View>
                <View>
                  {errors && errors.password ? (
                    <Text style={styles.ErrorText}>{errors.password}</Text>
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
                  {errorMsg.password}
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
    color:errorColor,
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
});
export default LoginView;

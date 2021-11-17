import React, {useRef, useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import * as Yup from 'yup';
import {Picker} from '@react-native-picker/picker';
// import RNPickerSelect from 'react-native-picker-select';
import {dullWhite, errorColor, primaryBlack,errorColor,borderColor} from '../../configs/colors';
import AboutYouContainer from './AboutYouContainer';
import ArrowButton from '../common/ArrowButton';
import {Formik} from 'formik';
import {fetchCountriesFromApi, registerUser} from '../../utils/apiService';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {storeUserAccess} from '../../redux/actions/LoginAction';
import {storeLoginData} from '../../utils/asyncStore';
import Fonts from '../../configs/fonts';
import ScrollableAvoidKeyboard from '../../components/ScrollableAvoidKeyboard';
import Loader from './Loader';
const validationSchema = Yup.object().shape({
  city: Yup.string().required('City is required'),
  country: Yup.number().required('Country is required'),
  email: Yup.string()
    .email()
    .required('Email is required')
    .email('Must be a valid email address'),
  password: Yup.string().required('Password is required'),
  username: Yup.string().required('Username is required'),
});

const AboutYou = () => {
  const dispatch = useDispatch();
  const {selectedTeams} = useSelector(state => state.register);
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState();
  const [photo, setPhoto] = useState({});
  const [errorMsg, setErrorMsg] = useState(null);
  const [loading, setLoader] = useState(false);
  const [visible, setVisible] = useState(false);
  const pickerRef = useRef();

  const open = () => {
    pickerRef.current.focus();
  };

  const close = () => {
    pickerRef.current.blur();
  };

  const fetchCountries = async () => {
    let res = await fetchCountriesFromApi();
    if (res && res.status == 200 && res.data && res.data.data) {
      setCountries(res.data.data);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setVisible(true)
    }, 2000);
    fetchCountries();
  }, []);

  const handleFormSubmit = async values => {
    console.log('values', values);
    try {
      if (photo == null) {
        console.log('no photo');
      } else {
        setLoader(true);
        setErrorMsg(null);
        //values.country = selectedCountry
        values.profile_pic = photo.base64;
        let result = selectedTeams.map(a => a.id);
        console.log(result);
        values.team_athlete_selected = result;
        let res = await registerUser(values);
        if (res && res.status == 201 && res.data && res.data.data) {
          setLoader(false);
          storeLoginData(res.data.data);
          dispatch(storeUserAccess(res.data.data));
        }
      }
    } catch (e) {
      setLoader(false);
      console.log(e.response.data);
      setErrorMsg(e.response.data);
    }
  };

  const uploadImage = () => {
    launchImageLibrary(
      {mediaType: 'photo', quality: 1, includeBase64: true},
      res => {
        if (res && res.assets && res.assets.length > 0) {
          setPhoto(res.assets[0]);
        }
      },
    );
  };

  return (
    <AboutYouContainer>
      <Loader loading={loading} />

      <Formik
        validationSchema={validationSchema}
        initialValues={{email: '', username: '', city: '', password: ''}}
        onSubmit={handleFormSubmit}>
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          setFieldValue,
        }) => (
          <ScrollableAvoidKeyboard
            style={{flex: 1}}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps={'handled'}>
            <View style={styles.photoContainer}>
              <TouchableOpacity onPress={() => uploadImage()}>
                <View style={styles.profileImage}>
                  <View>
                    {photo && photo.uri ? (
                      <Image
                        source={{uri: photo.uri}}
                        style={{width: 120, height: 120}}
                      />
                    ) : null}
                  </View>
                </View>
              </TouchableOpacity>
              <View style={styles.usernamePasswordContainer}>
                <View style={styles.usernameError}>
                  {errors && errors.username ? (
                    <Text style={styles.usernameErrorText}>
                      {errors.username}
                    </Text>
                  ) : null}
                </View>
                <View style={styles.usernameContainer}>
                  <Text style={styles.atsymbol}>@</Text>
                  <TextInput
                    style={styles.usernameInput}
                    placeholder="username"
                    placeholderTextColor="#ccc"
                    onChangeText={handleChange('username')}
                    onBlur={handleBlur('username')}
                    value={values.username}
                  />
                </View>
                <View style={styles.passwordError}>
                  {errors && errors.password ? (
                    <Text style={styles.passwordErrorText}>
                      {errors.password}
                    </Text>
                  ) : null}
                </View>
                <View style={styles.passwordContainer}>
                  <Text style={styles.atsymbol}>*</Text>
                  <TextInput
                    secureTextEntry={true}
                    style={styles.passwordInput}
                    placeholder="password"
                    placeholderTextColor="#ccc"
                    onChangeText={handleChange('password')}
                    onBlur={handleBlur('password')}
                    value={values.password}
                  />
                </View>
              </View>
            </View>
            <View style={styles.locationContainer}>
              <View style={styles.cityHolder}>
                <View
                  style={{alignSelf: 'flex-start', ...styles.errorContainer}}>
                  {errors && errors.city ? (
                    <Text style={styles.errorText}>{errors.city}</Text>
                  ) : null}
                </View>
                <TextInput
                  style={{color: primaryBlack}}
                  placeholder="your city"
                  placeholderTextColor="#ccc"
                  onChangeText={handleChange('city')}
                  onBlur={handleBlur('city')}
                  value={values.city}
                />
              </View>
              <View style={styles.countryHolder}>
                <View
                  style={{alignSelf: 'flex-start', ...styles.errorContainer}}>
                  {errors && errors.country ? (
                    <Text style={styles.errorText}>{errors.country}</Text>
                  ) : null}
                </View>
                {/* {countries && countries.length > 0 ? ( */}
                  <Picker
                    ref={pickerRef}
                    selectedValue={values.country}
                    onValueChange={val => {
                      console.log('va',val);
                        setFieldValue('country', val);
                    }}>
                    {countries &&
                      countries.map((val, i) => (
                        <Picker.Item
                          label={val.country_name}
                          value={val.id}
                          key={i}
                        />
                      ))}
                  </Picker>
              {/* ) : null} */}
              </View>
            </View>
            <View style={styles.emailAddressContainer}>
              <View style={{...styles.errorContainer}}>
                {errors && errors.email ? (
                  <Text style={styles.errorText}>{errors.email}</Text>
                ) : null}
              </View>
              <TextInput
                style={{color: primaryBlack}}
                placeholder="your email address"
                placeholderTextColor="#ccc"
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                onSubmitEditing={handleSubmit}
                value={values.email}
              />
            </View>
            <View style={styles.actions}>
              <ArrowButton text="register" onPress={handleSubmit} />
            </View>
            <View style={{alignSelf: 'center', top: 8}}>
              {errorMsg && (
                <Text style={styles.errorText}>
                  {errorMsg.email
                    ? errorMsg.email
                    : errorMsg.password
                    ? errorMsg.password
                    : errorMsg.username
                    ? errorMsg.username
                    : errorMsg.city
                    ? errorMsg.city
                    : errorMsg.country
                    ? errorMsg.country
                    : errorMsg.role_id
                    ? errorMsg.role_id
                    : errorMsg.team_athlete_selected}
                </Text>
              )}
            </View>
          </ScrollableAvoidKeyboard>
        )}
      </Formik>
      {/* </View> */}
    </AboutYouContainer>
  );
};

const styles = StyleSheet.create({
  profileImage: {
    backgroundColor: dullWhite,
    width: 120,
    height: 120,
    borderRadius: 100,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  photoContainer: {
    marginVertical: 20,
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden',
  },
  usernamePasswordContainer: {
    flexDirection: 'column',
    flex: 1,
  },
  usernameContainer: {
    flexDirection: 'row',
    marginLeft: 10,
    flex: 1,
    paddingHorizontal: 15,
    alignItems: 'center',
  },
  usernameError: {
    alignItems: 'flex-end',
  },
  usernameErrorText: {
    color:errorColor,
    fontWeight: 'bold',
  },
  passwordError: {
    alignItems: 'flex-end',
  },
  passwordErrorText: {
    color:errorColor,
    fontWeight: 'bold',
  },
  errorContainer: {
    alignItems: 'flex-end',
  },
  errorText: {
    color: errorColor,
    fontWeight: 'bold',
  },
  passwordContainer: {
    flexDirection: 'row',
    marginLeft: 10,
    flex: 1,
    paddingHorizontal: 15,
    alignItems: 'center',
  },
  atsymbol: {
    fontSize: 28,
    color: '#ccc',
  },
  usernameInput: {
    width: '100%',
    marginLeft: 5,
    fontSize: 16,
    color: primaryBlack,
    flex: 1,
    fontFamily: Fonts.Regular,
  },
  passwordInput: {
    width: '100%',
    marginLeft: 5,
    fontSize: 16,
    color: primaryBlack,
    flex: 1,
    fontFamily: Fonts.Regular,
  },
  locationContainer: {
    borderTopColor: borderColor,
    borderTopWidth: 1,
    borderBottomColor:borderColor,
    borderBottomWidth: 1,
    width: '75%',
    alignSelf: 'center',
    flexDirection: 'row',
    paddingVertical: 10,
  },
  cityHolder: {
    width: '50%',
    paddingLeft: 15,
    paddingVertical: 25,
  },
  countryHolder: {
    width: '60%',
    paddingLeft: 5,
    borderLeftColor:borderColor,
    borderLeftWidth: 1,
    paddingVertical: 25,
  },
  emailAddressContainer: {
    paddingVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actions:{
    marginBottom:20
  }
});

export default AboutYou;

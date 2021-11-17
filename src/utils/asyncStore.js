import AsyncStorage from '@react-native-async-storage/async-storage';
export const LOGIN_DATA_TOKEN = '@auth_token'
export const storeLoginData = async (val) => {
  try {
    await AsyncStorage.setItem(LOGIN_DATA_TOKEN, JSON.stringify(val))
  } catch (e) {
    console.log(e);
    return false;
  }
}

export const fetchLoginData = async () => {
  try {
    let userData = await AsyncStorage.getItem(LOGIN_DATA_TOKEN);
    return JSON.parse(userData);
  } catch (e) {
    throw e;
  }
}

export const logoutUserFromStorage = async () => {
  try {
    await AsyncStorage.removeItem(LOGIN_DATA_TOKEN);
    return true
  } catch (e) {
    return false
  }
}
import axios from './axios'
import { fetchLoginData } from './asyncStore';
export const fetchSports = async () => {
  try {
    let res = await axios.get('/sports-interests');
    return res;
  } catch (e) {
    console.log(e)
  }
}
export const fetchSportTeamsById = async (sportId, key) => {
  try {
    let res = await axios.get('/sport-teams?id=' + sportId + '&search=' + key);
    return res
  } catch (e) {
    console.log(e)
  }
}
export const registerUser = async (userData) => {
  try {
    userData.role_id = 3;
    const formData = new FormData();
    formData.append('username', userData.username);
    formData.append('email', userData.email);
    formData.append('password', userData.password);
    formData.append('city', userData.city);
    formData.append('country', userData.country);
    formData.append('role_id', userData.role_id);
    for (let i = 0; i < userData.team_athlete_selected.length; i++) {
      formData.append('team_athlete_selected[]', userData.team_athlete_selected[i]);
    }
    formData.append('profile_pic', userData.profile_pic);
    const res = await axios.post("/user", formData, { headers: {
      'content-type': 'multipart/form-data'
    }});
    console.log(res)
    return res;
  } catch (e) {
    throw e
  }
}
export const otpVerify = async (values) => {
    try{
        console.log(`/verify-code?email=${values.email}&otp=`+values.code);
        let res = await axios.post(`/verify-code?email=${values.email}&otp=`+values.code);
        return res
      } catch (e){
        console.log('e',e);
        return e.response.data?e.response.data:e
      }
}
export const resetPassword = async (values) => {
  try{
      console.log(`/reset-password?email=${values.email}&password=`+values.password);
      let res = await axios.post(`/reset-password?email=${values.email}&password=`+values.password);
      return res
    } catch (e){
      return e.response.data
    }
}
export const forgotPassword = async (body) => {
  try{
      console.log(`/forgot-password?email=${body}`);
      let res = await axios.post(`/forgot-password?email=${body}`);
      return res
    } catch (e){
      return e.response.data
    }
}
export const fetchCountriesFromApi = async () => {
  try {
    let res = await axios.get('/country-list');
    return res
  } catch (e) {
    console.log(e)
  }
}
export const loginWithApi = async (values) => {
  try {
    let res = await axios.post('/login', values);
    return res
  } catch (e) {
    throw e
  }
}
export const teamAthleteFollowedByUser = async (values) => {
  try{
    const authData = await fetchLoginData();
    if(authData && authData.token){
      const headers = {
        'Authorization': authData.token
      }
      try{
        return await axios.get(`/user-followed?type=${values.type}&length=${values.length}`, {headers: headers});
      } catch (e){
        throw e
      }
    }
    return true;
  } catch (e){
    throw e
  }
}
export const teamAthleteList = async (values) => {
  try{
    const authData = await fetchLoginData();
    if(authData && authData.token){
      console.log('authData.token',authData.token);
      const headers = {
        'Authorization': authData.token
      }
      try{
        return await axios.get(`/teams?type=${values.type}&length=${values.length}&page=${values.pageNo}`, {headers: headers});
      } catch (e){
        throw e
      }
    }

    return true;
  } catch (e){
    throw e
  }
}

export const cryptoList = async () => {
  try{
    const authData = await fetchLoginData();
    if(authData && authData.token){
      const headers = {
        'Authorization': authData.token
      }
      try{
        return await axios.get(`/crypto`, {headers: headers});
      } catch (e){
        throw e
      }
    }

    return true;
  } catch (e){
    throw e
  }
}

export const singleTeamAthleteDetails = async (id) => {
  try{
    const authData = await fetchLoginData();
    if(authData && authData.token){
      const headers = {
        'Authorization': authData.token
      }
      try{
        return await axios.get(`/teams/${id}`, {headers: headers});
      } catch (e){
        throw e
      }
    }
    return true;
  } catch (e){
    throw e
  }
}

// create join Channel  no use now becouse no sandbird api for this
export const joinChanle = async (values) => {
  try {
    let res = await axios.post('/join', values);
    return res
  } catch (e) {
    throw e
  }
}
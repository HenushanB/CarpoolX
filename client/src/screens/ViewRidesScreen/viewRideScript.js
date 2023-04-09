import * as Keychain from 'react-native-keychain';

/**
 * 
 * @description retrieve tokens from keychain
 * @returns tokens from keychain
 */
export const retrieveTokens = async () => {
    try {
      const credentials = await Keychain.getGenericPassword();
      if (credentials && credentials.password) {
        const tokens = JSON.parse(credentials.password);
        return tokens;
      }
    } catch (error) {
      console.log(error);
    }
};

export function joinRide(idToken, taxi_id, callback){
    console.log(idToken,'scripe')
    return fetch('http://10.0.2.2:5000/joinride', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': idToken
        },
        body: JSON.stringify({
            taxi_id: taxi_id,
        })
    })
    .then(res => res.json())
    .then(data => {
      console.log(data)
      if (data.success){
        console.log("Joined Ride")
        return data.data;
      }else{
        callback(false);
      }
    })
    .catch(error =>{
      console.error("Error occured ->: ", error)
    })
}
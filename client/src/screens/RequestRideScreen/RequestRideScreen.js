import { View, Text, StyleSheet, SafeAreaView } from 'react-native'
import React, {useState} from 'react'
import GoogleMaps from '../../components/Maps/GoogleMaps'
import CustomButton from '../../components/CustomButton'
import CustomInput from '../../components/CustomInput'
import DropdownMenu from '../../components/DropdownMenu'
import { useNavigation } from '@react-navigation/native'
import { REACT_NATIVE_GOOGLE_MAPS_APIKEY } from '@env'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'

function sendRide(pickup, dest, capacity){
  return fetch('http://10.0.2.2:5000/requestride', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({
          pickuploc: pickup,
          destloc: dest,
          capacity: capacity
      })
      .then(res => res.json())
      .then(data => {
        console.log("The Response was", data)
      })
      .catch(error =>{
        console.error("Error occured ->: ", error)
      })
  }

  )
}

const RequestRideScreen = () => {

    const navigation = useNavigation()
    const [pickup, setPickup] = useState(null)
    const [destination, setDestination] = useState(null)
    const [capacity, setCapacity] = useState('')

    const [showPickupError, setPickupError] = useState(false);
    const [showDestError, setDestError] = useState(false);

    const errorMsg = "Please enter a location"

    const onNextPressed = () => {
        if (pickup && destination) {
          navigation.navigate('PeopleShare', { pickup, destination })
        }else{
          if (pickup){
            setPickupError(false)
          }
          if (destination){
            setDestError(true)
          }
          if (!pickup){
            setPickupError(true)
          }
          if (!destination){
            setDestError(true)
          }
        }
    }

    console.log(capacity)
    return (
        <View>
          <View style={styles.container}>
            <GooglePlacesAutocomplete
                placeholder= {'Pick Up Location'}
                styles={styles}
                fetchDetails={true}
                returnKeyType={"search"}
                minLength={2}
                onPress={(data, details = null) => {
                    setPickup(true)
                }}
                enablePoweredByContainer={false}
                query={{
                    key: REACT_NATIVE_GOOGLE_MAPS_APIKEY,
                    language: 'en',
                }}
                nearbyPlacesAPI='GooglePlacesSearch'
                debounce={400}
            />
            <View style={styles.errorContainer}>
              {showPickupError && <Text style={styles.errorMsg}>{errorMsg}</Text>}
            </View>
          </View>
          <View style={styles.container}>
            <GooglePlacesAutocomplete
                placeholder= {"Where to"}
                styles={styles}
                fetchDetails={true}
                returnKeyType={"search"}
                minLength={2}
                onPress={(data, details = null) => {
                    setDestination(true)
                }}
                enablePoweredByContainer={false}
                query={{
                    key: REACT_NATIVE_GOOGLE_MAPS_APIKEY,
                    language: 'en',
                }}
                nearbyPlacesAPI='GooglePlacesSearch'
                debounce={400}
            />
            <View style={styles.errorContainer}>
              {showDestError && <Text style={styles.errorMsg}>{errorMsg}</Text>}
            </View>
            <View style={styles.capacity}>
              <Text>
              How many people in the ride?
              </Text>
              <CustomInput
                placeholder="Enter a number between 1-5"
                value={capacity}
                setValue={setCapacity}
              />
            </View>
          </View>
          
          <GoogleMaps />
          <CustomButton 
            text='Next'
            onPress={onNextPressed}
            type="RIDE"
          />
        </View>
    )
}

export default RequestRideScreen

const styles = StyleSheet.create({
  container: {
      backgroundColor: 'white',
      paddingTop:10,
      paddingBottom: 0,
      flex: 0
  },
  textInput: {
      backgroundColor: '#DDDDDF',
      borderRadius: 0,
      fontSize: 18,
  },
  textInputContainer: {
      paddingHorizontal: 20,
      paddingBottom: 0,
  },
  errorMsg: {
    color: 'red',
    fontSize: 12,
  },
  errorContainer: {
    height: 15,
    marginLeft: 20,
  },
  capacity: {
    marginLeft: 20,
  },
  buttonStyle: {
    marginTop: 40
  },
})
import { View, Text, StyleSheet } from 'react-native'
import React, {useEffect, useState} from 'react'
import CustomButton from '../../components/CustomButton'
import { useNavigation, useRoute } from '@react-navigation/native'

function getPassengers(taxiId, callback){
    console.log("Getting users...")
    return fetch('http://10.0.2.2:5000/getpassengers', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            taxi_id: taxiId
        })
    })
    .then(res => res.json())
    .then(data => {
      console.log(data)
      if (data.success){
        console.log("Got users", data.data)
        return data.data;
      }else{
        callback(false);
      }
    })
    .catch(error =>{
      console.error("Error occured ->: ", error)
    })
  }

const ViewPeopleScreen = () => {

    const route = useRoute();
    const navigation = useNavigation()
    const {rideToFind} = route.params
    const [passengers, setPassengers] = useState([])
    const [havePassengers, setHavePassengers] = useState(false)

    useEffect(() => {
        console.log(passengers, "refresh passengers");
      }, [passengers]);
      
      const onRefreshPressed = async() => {
        newPassengers = await getPassengers(rideToFind);
        if (newPassengers == undefined) {
          console.log("No passengers");
          return;
        }
        console.log(newPassengers, "new passengers to set");
        try {
          setPassengers(newPassengers);
        } catch (error) {
          console.log("cant set passengers");
        }
        setHavePassengers(true);
      }

    useEffect(() => {
    console.log(passengers, "passengers to set");
    }, [passengers]);
    
    useEffect(() => {
    const fetchData = async () => {
        taxiId = rideToFind;
        const newPassengers = await getPassengers(rideToFind);
        if (newPassengers == undefined) {
        console.log("No passengers");
        return;
        }
        try {
        setPassengers(newPassengers);
        } catch (error) {
        console.log("cant set passengers");
        }
        setHavePassengers(true);
    }
    fetchData();
    }, []);

    return(
        <View style={styles.container}>
            <Text>Current users on ride:</Text>
            <View>
                <Text>{passengers}</Text>
            </View>
            <CustomButton
                text="Refresh"
                onPress={onRefreshPressed}
                type="PRIMARY"
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        paddingHorizontal: 40,
        marginHorizontal: 20,
        marginVertical: 100
    }
})

export default ViewPeopleScreen
import { View, Text, StyleSheet } from 'react-native'
import React, { useEffect, useState, useCallback } from 'react'
import { findTaxi } from './findTaxiScript'
import { useNavigation, useFocusEffect } from '@react-navigation/native'
import CustomButton from '../../components/CustomButton'

/**
 * 
 * @description FindTaxiScreen component
 * @param {*} param0 
 * @returns 
 */
const TaxiInformationScreen = ({route, navigation}) => {
    const { code } = route.params;
    const [taxCode, setTaxCode] = useState(code)
    const [passengers, setPassengers] = useState(['...'])
    const [destination, setDestination] = useState('...')

    useEffect(() => {
        const getTaxiInfo = async () => {
            const taxiInfo = await findTaxi(taxCode)
            setPassengers(taxiInfo.passengers)
            setDestination(taxiInfo.destination)
        }
    }, [])

    /**
     * @description Resets the variables to their initial state if the user navigates away from this screen
     */
    const resetVars = useCallback(() => {
        return () => {
            setDestination('...');
            setPassengers(['...']);
        }
    }, [])
    useFocusEffect(resetVars);  // reset the variables when the user navigates away from this screen
    return (
        <View style={styles.root}>
            <View style={styles.container_info}>
                <Text style={styles.title}>Taxi ID #{code}</Text>
                <View style={styles.container_sublist}>
                    <Text style={styles.subtitle}>Passengers</Text>
                    <Text style={styles.item}>
                        {passengers.map((passenger, index) => {
                            return (
                                <Text style={styles.item} key={index}>{passenger}</Text>
                            )
                        })}
                    </Text>
                </View>
                <View style={styles.container_sublist}>
                    <Text style={styles.subtitle}>Where To</Text>
                    <Text style={styles.item}>{destination}</Text>
                </View>
            </View>
            <View style={styles.container_join}>
                <CustomButton 
                    text="Join Taxi"
                    onPress={() => navigation.navigate('JoinTaxi', {code: code})}
                    type="PRIMARY" />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    root: {
        flex:1,
        backgroundColor: 'white',
        height: '100%',
        alignItems: 'center',
    },
    container_info: {
        borderWidth: 1,
        alignItems: 'center',
        width: '80%',
        marginTop: "50%",
        borderRadius: 20,
        backgroundColor: 'lightgrey',
    },
    title: {
        fontSize: 30,
        fontFamily: 'UberMoveTextBold',
        textDecorationLine: 'underline',
        color: 'black',
        margin: 20,
    },
    container_sublist: {
        margin: 10,
        alignItems: 'center',
    },
    container_join: {
        marginTop: 20,
        width: '80%',
    },
    subtitle: {
        fontSize: 20,
        fontFamily: 'UberMoveTextBold',
        textDecorationLine: 'underline',
        color: 'black',
    },
    item: {
        fontSize: 15,
        fontFamily: 'UberMoveTextBold',
        color: 'black',
        paddingTop: 5,
    }
})

export default TaxiInformationScreen
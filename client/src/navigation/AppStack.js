import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import TabNavigator from './TabNavigator';
import RequestRideScreen from '../screens/RequestRideScreen';
import TaxiInformationScreen from '../screens/TaxiInformationScreen';
import ReportScreen from '../screens/ReportScreen';
import JoinRideScreen from '../screens/JoinRideScreen';

const Stack = createNativeStackNavigator();

/** 
 * @description This is the main navigation component. It contains all the screens that are available in the app.
 */
const AppStack = () => {
  return (
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Home_Tab" component={TabNavigator} />
        <Stack.Screen name="RequestRide" component={RequestRideScreen} />
        <Stack.Screen name="Report" component={ReportScreen} />
        <Stack.Screen name="JoinRide" component={JoinRideScreen} />
        <Stack.Screen name="TaxiInformation" component={TaxiInformationScreen} />
      </Stack.Navigator>
  )
}

export default AppStack
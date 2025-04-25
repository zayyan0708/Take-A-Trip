


import React, { useCallback, useEffect, useLayoutEffect, useState } from 'react';
import { View,Text, StatusBar,ImageBackground } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Packing from './screens/PlanTrip/Packing';
import PlanTrip from './screens/PlanTrip/PlanTrip';
import Currency from './screens/Currency/view/Currency';
import Expenses from './screens/Expenses/view/Expenses';
import Login from './screens/loginsignupreview/Login';
import Signup from './screens/loginsignupreview/Signup';
import HomeScreen from './screens/Samplehome/HomeScreen';
import DetailsScreen from './screens/Samplehome/DetailsScreen';
import { Friends } from './screens/Friends/view/Friends';
import GExpenses from './screens/Expenses/view/GExpenses';
import { GroupsView } from './screens/Groups/view/GroupsView';
import OnBoardScreen from './screens/loginsignupreview/OnBoardScreen';
import {StyleSheet, Image, Button} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import splashPic from '././assets/onboardImage.png';
import PlacesList from './screens/PlacesList/PlacesList';
import TripItinerary from './screens/TripItineary/TripItinerary';
import CreateTripItinearyManual from './screens/Create Itineary - Manual/views/create-itineary-manual';
import ForgotPassword from './screens/loginsignupreview/ForgotPassword';
import ChatRooms from './screens/Chatroom';
import { Provider, useDispatch } from 'react-redux';
import { store } from './src/Redux/store';
import ViewParticular from './screens/Create Itineary - Manual/views/view-particular';
import CompleteItinearyManual from './screens/Create Itineary - Manual/views/complete-itineary';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { addPlanInfo, addUser } from './src/Redux/Actions/User/user-actions';
import Review from './screens/loginsignupreview/Review';
import ReviewPage from './screens/loginsignupreview/ReviewList';


function SplashScreen({navigation}) {
  var authToken = null;
  async function checkD(){
    authToken = await AsyncStorage.getItem('authToken')
    if(authToken!==null){
      navigation.replace('HomeScreen');
    }
    else{
      setTimeout(() => {
        navigation.replace('OnBoardScreen'); // Stack Name
      }, 3000);
    }
  }
  checkD();
  
  return (
    <View
      style={{
        flex:1
      }}>
        
      <ImageBackground source={splashPic} style={{flex:1}} />
    </View>
  );
}
const Stack = createStackNavigator();
function MyStack(){
  const dispatch = useDispatch();
  const checkLoginStatus = useCallback( async () => {
    try {
      const authToken = await AsyncStorage.getItem('authToken');
      console.log(authToken);
      if (authToken!==null) {
        const uI = await AsyncStorage.getItem('userInfo');
        const uPI = await AsyncStorage.getItem('userPlanInfo');
        dispatch(addUser('insertUser',JSON.parse(uI)));
        dispatch(addPlanInfo('insertPlanTrip',JSON.parse(uPI)));
      }
    } catch (error) {
      console.error('Error reading auth token from AsyncStorage:', error);
    }
  },[]);
  useEffect(()=>{
    
    checkLoginStatus();
  },[])
  return(
    <SafeAreaProvider>
      <NavigationContainer>
      <Stack.Navigator initialRouteName='Splash_Screen' screenOptions={{headerShown:false}}>
        <Stack.Screen name="OnBoardScreen" component={OnBoardScreen} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="PlanTrip" component={PlanTrip} />
        <Stack.Screen name="DetailsScreen" component={DetailsScreen} />
        <Stack.Screen name="Expenses" component={Expenses} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Packing" component={Packing} />
        <Stack.Screen name="Currency" component={Currency} />
        <Stack.Screen name="PlacesList" component={PlacesList} />
        <Stack.Screen name="Friends" component={Friends} ></Stack.Screen>
        <Stack.Screen name="GExpenses" component={GExpenses} ></Stack.Screen>
        <Stack.Screen name="Groups" component={GroupsView} ></Stack.Screen>
        <Stack.Screen name="Splash_Screen" component={SplashScreen}/>
        <Stack.Screen name="TripItinerary" component={TripItinerary} />
        <Stack.Screen name="CreateTripItineraryManual" component={CreateTripItinearyManual} />
        <Stack.Screen name="ViewParticular" component={ViewParticular} />
        <Stack.Screen name="CompleteItinerary" component={CompleteItinearyManual} />
        <Stack.Screen name="Chatrooms" component={ChatRooms} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
        <Stack.Screen name="Reviews" component={Review} />
        <Stack.Screen name="ReviewList" component={ReviewPage} />
      </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
export default function App(){
  
  
  // useEffect(()=>{
  //   // StatusBar.setHidden(false);
    
  // },[]);
  
  return (
    <Provider store={store}>
      <MyStack/>
    </Provider>
  );
};

// export default App;

const API_KEY = 'AIzaSyDbqj-KQU70Ud2y7rIMlWa92RCm7KGL3vI';
import React, { useState, useEffect, useLayoutEffect } from 'react';
import { Text, View, FlatList, Image, TextInput, StyleSheet, StatusBar, Pressable, TouchableOpacity, Modal, Linking } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from 'react-native-vector-icons/FontAwesome5';
import { colorCodes, screenHeight, screenWidth } from '../../components/constants';

const Try = () => {
    const openGoogleMapsDirections = (destination) => {
        const currentLocation = 'Block 8 Gulshan-e-Iqbal, Karachi, Karachi City, Sindh, Pakistan'; // Use the user's current location
      
        // Construct the Google Maps URL with the source and destination
        const mapsUrl = `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(currentLocation)}&destination=${encodeURIComponent(destination)}`;
      
        // Open Google Maps using the URL
        Linking.openURL(mapsUrl)
          .catch(error => console.error('Failed to open Google Maps:', error));
      };
    const destination = '22-g block, 6, P.E.C.H.S. Block 6 PECHS, Karachi, Karachi City, Sindh, Pakistan';
    return (
        <SafeAreaView style={{ flex: 10, backgroundColor: colorCodes.expensesDarkBlue ,justifyContent:'center',alignItems:'center'}}>
            <TouchableOpacity onPress={()=>{openGoogleMapsDirections(destination);}}>
                <View style={{width:screenWidth*0.5,height:screenHeight*0.1,backgroundColor:'white',borderRadius:23.3,justifyContent:'center',alignItems:'center'}}>
                    <Text style={{ color: colorCodes.expensesDarkBlue, fontSize: 26, fontFamily: 'Pacifico-Regular' }}>Open Google Map</Text>
                </View>
            </TouchableOpacity>
        </SafeAreaView>
    );
}

export default Try;
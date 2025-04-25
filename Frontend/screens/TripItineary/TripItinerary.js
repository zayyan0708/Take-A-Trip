const API_KEY = 'AIzaSyDbqj-KQU70Ud2y7rIMlWa92RCm7KGL3vI';
import React, { useState, useEffect } from 'react';
import { Text, View, FlatList, Image, TextInput, StyleSheet, StatusBar, Pressable, TouchableOpacity, Modal, Linking } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from 'react-native-vector-icons/FontAwesome5';
import { colorCodes, screenHeight, screenWidth } from '../../components/constants';
import ImageViewer from 'react-native-image-zoom-viewer';
import { useRoute } from '@react-navigation/native';
import LottieView from 'lottie-react-native';

const TripItinerary = ({navigation}) => {
    return(
        <SafeAreaView style={{ flex: 1, backgroundColor: colorCodes.expensesDarkBlue }}>

        </SafeAreaView>
    );
}

export default TripItinerary;
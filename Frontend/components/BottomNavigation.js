
import React, { Component } from 'react';
import { View, Image, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, Animated, Text, Alert } from 'react-native';
import plus from '../assets/plus.png';
import Icon from 'react-native-vector-icons/MaterialIcons';
import COLORS from '../consts/colors';
import { useNavigation } from '@react-navigation/native';
export default function BottomNavigation({ isHome,isMenu,id }) {
  const navigation =useNavigation();
    return (
      <View style={{
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'grey'

      }}>
        <View style={{
          position: 'absolute',
          alignSelf: 'center',
          backgroundColor: 'grey',
          elevation:20,
          width: 60,
          height: 60,
          borderRadius: 35,
          bottom: 35,
          zIndex: 10
        }}>

          <TouchableWithoutFeedback onPress={()=>navigation.navigate('PlanTrip',{user_i:id})}>
            <View style={[styles.button, styles.actionBtn]}>

              <Image style={{ width: 30, height: 30 }}
                resizeMode="contain"
                source={plus} />
            </View>
          </TouchableWithoutFeedback>
        </View>
        <View style={{
          position: 'absolute',
          backgroundColor:COLORS.secondary ,
          borderTopRightRadius:25,
          borderTopLeftRadius:25,
          border: 2,
          radius: 3,
          shadowOpacity: 0.3,
          shadowRadius: 3,
          shadowOffset: {
            height: 3, width: 3
          },
          x: 0,
          y: 0,
          style: { marginVertical: 5 },
          bottom: 0,
          width: '100%',
          height: 70,
          flexDirection: 'row',
          justifyContent: 'space-around',
          paddingVertical: 10,
          paddingHorizontal: 25
        }}>
          <View style={{
            flexDirection: 'column', alignItems: 'center', justifyContent: 'center'
          }}>
            <TouchableOpacity onPress={() =>navigation.navigate('HomeScreen',{user_i:id})}>
            <Icon name="home" size={30} color={isHome?COLORS.focusedIcon:COLORS.unfocusedIcon} />
            </TouchableOpacity>
            <Text style={{ justifyContent: 'center', alignItems: 'center',color:isHome?COLORS.focusedIcon:COLORS.unfocusedIcon }}>Home</Text>
          </View>
{/* 
          <View style={{
            flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginStart: 30
          }}>

            <TouchableOpacity
              onPress={() => { Alert.alert("click") }}
            >
              <Icon name="home" size={30} color={'black'} />

            </TouchableOpacity>
            <Text style={{ justifyContent: 'center', alignItems: 'center' }}>search </Text>
          </View> */}
          <View style={{
            flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between', marginStart: 85,
          }}>
            <TouchableOpacity
              onPress={() =>navigation.navigate('Chatrooms', {groupId:1})}
            >
             <Icon name="assignment" size={30} color={isMenu?COLORS.focusedIcon:COLORS.unfocusedIcon} />

            </TouchableOpacity>
            <Text style={{ justifyContent: 'center', alignItems: 'center',color:isMenu?COLORS.focusedIcon:COLORS.unfocusedIcon}}>Itinerary</Text>
          </View>
        </View>
      </View>
    );
}


const styles = StyleSheet.create({

  MainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'blue'
  },
  button: {
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: 'grey',
    shadowOpacity: 0.1,
    shadowOffset: { x: 2, y: 0 },
    shadowRadius: 2,
    borderRadius: 30,
    position: 'absolute',
    bottom: 20,
    right: 0,
    top: 5,
    left: 5,
    shadowOpacity: 5.0,

  },
  actionBtn: {

    // backgroundColor: '#1E90FF',
    backgroundColor: COLORS.primary,
    textShadowOffset: { width: 5, height: 5 },
    textShadowRadius: 10,
    borderWidth: 2,
    borderColor: '#fff'
  }
});
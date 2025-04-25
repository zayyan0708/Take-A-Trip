import React, { useState,useEffect } from 'react';
import Btn from '../../components/Btn';
import COLORS from '../../consts/colors';
import { View, Text, StyleSheet, Button, TextInput, Image, Dimensions, Pressable, FlatList, } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import ItemsData from '../../consts/Items';
import { Alert } from 'react-native';
import { useRoute } from '@react-navigation/native';
const API_KEY = '7fab1e1afb364f47c24cc16a226ffc03';
import { useNavigation } from '@react-navigation/native';
import { localHost } from '../../components/constants';
import { useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Packing = () => {
  const route=useRoute();
  const uD = useSelector((state)=>state.userReduce)
  const navigation=useNavigation();
  const {cityName}=route.params;
  const {userid}=route.params;
  const {endDay}=route.params;
  const {endMonth}=route.params;
  const {startDate}=route.params;
  const {EndDate}=route.params;
  const {stDay}=route.params;
  const {stMonth}=route.params;
  const {weatherData}=route.params;
  const [data,setData]=useState(ItemsData(weatherData));
  const ChangeIcon=(itemValue, index)=>{
    const new_data = [...data]
    new_data[index].check = itemValue
    setData(new_data);
  };
  // useEffect(()=>{console.log(uD.planInfo)},[])

  const itemlist=[];
  const GetList=()=>{
    
    data.map((item, index) => {
      if (item.check==true) {
        itemlist.push(item.name);
  
      }  
    });
    // console.log(typeof(itemlist));
    itemm=itemlist.join(', ');
    axios.post(`http://${localHost}/essentials`, {
      i_name: itemm,
      user_id: userid,
      temp:weatherData.toString()
    })
    .then(function (response) {
      // console.warn(response);
    })
    .catch(function (error) {
      console.warn(error);
    });



  }
  
  return (
    <View style={{backgroundColor:COLORS.primary,height:'100%',widht:'100%'}}>
     <View style={{ backgroundColor: 'white', flex: 1 ,marginTop:20,borderTopLeftRadius:35,borderTopRightRadius:35}}>
        <Text style={[styles.HeadingText]}>
          {cityName}
        </Text>
        <Text style={[styles.SubHeaderText]}>
          {stMonth} {stDay} - {endMonth} {endDay}
        </Text>
        <View style={{
          borderBottomColor: '#D9D9D9',
          borderBottomWidth: 3,
          marginVertical: 15
        }}>
        </View>
        <View style={{
          width: 375,
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginHorizontal: 10,
        }}>
          <Text style={[styles.TextStyle2]}>
            Weather Forecast
          </Text>
          <Text style={[styles.TextStyle2,{color:COLORS.primary}]}>
           {/* {(weatherData -273).toFixed(1)} °C */}
          {weatherData} °C
          </Text>
        </View>
        <View style={{
          borderBottomColor: '#D9D9D9',
          borderBottomWidth: 3,
          marginVertical: 15
        }}>
        </View>
        <Text style={styles.SubHeaderText}>
          Essentials
        </Text>

        <View style={{
          borderBottomColor: '#D9D9D9',
          borderBottomWidth: 3,
          marginBottom: 15
        }}></View>


        <FlatList
          data={data}
          renderItem={({ item, index }) =>
            <View style={{
              flexDirection: 'row',
              paddingLeft: 20,
               alignItems: 'center'
              //justifyContent: 'space-around'
            }}>
              <Pressable onPress={() => ChangeIcon(!item.check, index)}>
                <Icon name={item.check ? 'check-square-o' : 'square-o'} size={25} color={COLORS.primary}/></Pressable>
              <View style={{ width: 10 }} />
              <Text style={[styles.TextStyle2,{fontSize:13}]}>
                {item.name}
              </Text>
            </View>
          } />
          <View style={{paddingHorizontal:30}}>
          <Btn bgColor={COLORS.primary} btnLabel='Next' textColor='white'Press={async ()=>{
          GetList();
          await AsyncStorage.setItem('authToken','logged'); 
          navigation.navigate("HomeScreen")
          
          }}/>

          </View>
      </View>
      </View>
  );
};
const styles = StyleSheet.create({
  HeadingText: {
    fontSize: 40,
    fontWeight: '600',
    fontStyle: 'Roboto',
    color: COLORS.primary,
    paddingLeft: 20,
    textDecorationStyles: "solid"
  },
  TextStyle2: {
    fontSize: 20,
    fontWeight: '500',
    fontStyle: 'Roboto',
    color: 'black',

  },
  SubHeaderText: {
    fontSize: 15,
    fontWeight: '600',
    fontStyle: 'Roboto',
    color: 'black',
    paddingLeft: 20,
  },
});
export default Packing;
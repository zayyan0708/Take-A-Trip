import { useLinkProps } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, TextInput, StatusBar } from 'react-native';
import Background from './Background';
import Btn from '../../components/Btn';
import Field from '../../components/Field';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { localHost } from '../../components/constants';

const Review = ({navigation}) => {
    
    const uD = useSelector((state)=>state.userReduce);
    const fname = uD.userInfo.fname;
    const lname = uD.userInfo.lname;
    const profilepic = uD.userInfo.profilepic;
    const user_id = uD.userInfo.user_id;
    const selectedCity = uD.planInfo.selectedCity;
    
    const [rev,setRev] = useState('');
    const [rating,setRating] = useState(0);
    function handleSubmitReview(){

        console.log(rev,rating,fname,lname,profilepic,user_id,selectedCity);
        axios.post(`http://${localHost}/reviews`, {
            review:rev,
            rating: parseInt(rating),
            city: selectedCity,
            userName: fname+' '+lname,
            profilePic: profilepic,
            user_id: user_id,
        })
          .then(function (response) {
            // console.warn(response);
            navigation.goBack();
          })
          .catch(function (error) {
            console.warn(error);
          });
    }
  return (
    <Background>
      <View style={{ alignItems: "center", width: 395 }}>
        <Text style={{ color: "white", fontSize: 64, fontWeight: 'bold', marginVertical: 10 }}></Text>
        <View style={{
          backgroundColor: "white", height: 800, width: 470,
          borderTopLeftRadius: 100, borderTopRightRadius: 100, paddingTop: 15, alignItems: 'center'
        }}>
          <Text style={{ fontSize: 40, color: '#006A42', fontWeight: "bold" }}>Share your Review.</Text>
          <Text style={{ color: "grey", fontSize: 19, fontWeight: "bold", marginBottom: 20 }}>FOR YOUR FAVORITE DESTINATIONS</Text>
          <View style={{ alignItems: 'flex-end', width: '80%', paddingRight: 16, marginBottom: 10 }}>
            <TextInput
              style={{
                borderRadius: 20, color: '#006A42', paddingHorizontal: 10, width: '100%', height: 250, textAlign: "justify",
                backgroundColor: 'rgb(220,220,200)', paddingTop: 10, paddingBottom: 10,fontSize:20,marginBottom:5
              }}
              multiline={true}
              value={rev}
              onChangeText={(text)=>{setRev(text);}}
              placeholder="Write your review..."
              placeholderTextColor="#006A42"
            />
            <TextInput
            style={{
                borderRadius: 20, color: '#006A42', paddingHorizontal: 10, width: '100%', textAlign: "justify",
                backgroundColor: 'rgb(220,220,200)', paddingTop: 10, paddingBottom: 10,fontSize:20
              }}
            value={rating}
            onChangeText={(text) => {
                const digit = text.replace(/[^1-5]/g, ''); // Remove any non-digit characters
                setRating(digit); // Update the rating state with the cleaned value
              }}
            maxLength={1}
            placeholder='Enter Rating 0-5'
            keyboardType='numeric'
            ></TextInput>
          </View>
          <Btn textColor='white' bgColor={'#006A42'} btnLabel="Post Review" Press={()=>{handleSubmitReview();}}/>
        </View>
      </View>
    </Background>
  )
}

const styles = StyleSheet.create({})

export default Review;
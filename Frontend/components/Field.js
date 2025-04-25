import React from "react";
import {View,StyleSheet,TextInput} from 'react-native';

const Field = props => {
    return(
        <TextInput 
        {...props}
        style={{borderRadius:100,color:'#006A42', paddingHorizontal:20,width:'80%', marginVertical:5,marginHorizontal:20,textAlign:'left',alignItems:'center',
        backgroundColor:'rgb(220,220,200)'}} placeholderTextColor={'black'}>


        </TextInput>
    )
}
export default Field;
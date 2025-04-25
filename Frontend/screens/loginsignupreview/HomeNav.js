import { useLinkProps } from '@react-navigation/native';
import React,{useEffect}from 'react';
import { View, StyleSheet, Text, TextInput, StatusBar, Pressable } from 'react-native';
// import Icon from 'react-native-ico-material-design';
import Background from './Background';
import Btn from '../../components/Btn';
import Field from '../../components/Field';

var iconHeight=26
var iconWidth=26
export default class HomeNav extends React.Component{
    render()
    {
    return (
        <View style={{backgroundColor:'#006A42' ,justifyContent:'center',flex:1}}>
        
        
        <View style={{backgroundColor:'#eee',flex:0.28,marginTop:1, justifyContent:'center'}} >
            <Text style={{color:'black',fontWeight:"bold", fontSize:29}}>  Take A Trip</Text>
        </View>

        <View style={{backgroundColor:'#eee',flex:1,marginRight:20,marginLeft:20,marginTop:30,borderRadius:20}} >
            <Text style={{ color: 'black', fontSize: 28, fontWeight:"bold" }} > Continue planning</Text>
            <Text style={{ color: 'black', fontSize: 28, fontWeight:"bold", }} > your trip.</Text>
        </View>

        <View style={{backgroundColor:'#eee',flex:1,marginRight:20,marginLeft:20,marginTop:10,marginBottom:300,borderRadius:20}} >
        <Text style={{ color: 'black', fontSize: 28, fontWeight:"bold" }} > Share your trip experience</Text>
            <Text style={{ color: 'black', fontSize: 28, fontWeight:"bold" }} > with friends.</Text>
        </View>
        
  
            <View>
               <StatusBar style="light"></StatusBar> 
            </View>


            <View style={styles.NavContainer}>
                <View style={styles.navBar}>
                    <Pressable onPress={()=> {}} style={styles.IconBehaves}
                    android_ripple={{borderless:true,radius:50}}>

                        {/* <Icon name="favorite-heart-button" height={iconHeight} width={iconWidth} color='#448aff'></Icon> */}
                    </Pressable>
                </View>
            </View>

        </View>
    )
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#3962FF',
        alignItems:'center',
        justifyContent:'center',
    },
    NavContainer:{
        position:'absolute',
        alignItems:'center',
        bottom:15,
    },
    navBar:{
        flexDirection:'row',
        backgroundColor: '#eee',
        marginLeft:7,
        width:'95%',
        height:45,
        justifyContent:'space-evenly',
        borderRadius:20,
    },
    IconBehaves:{
        padding:14
    }
});

import { useLinkProps } from '@react-navigation/native';
import React,{useEffect}from 'react';
import { View, StyleSheet, Text, StatusBar } from 'react-native';
import Background from './Background';
import Btn from '../../components/Btn';
import Field from '../../components/Field';

const Home = (props) => {
    useEffect(()=>{
    StatusBar.setHidden(true);
    }
    )
    return (
        <Background>
            <View style={{ marginHorizontal: 40, marginVertical: 100 }}>
                <Text style={{ color: 'white', fontSize: 64, fontWeight:"bold" }}>Take A</Text>
                <Text style={{ color: 'white', fontSize: 64, fontWeight:"bold", marginBottom:40 }}>Trip!</Text>
                <Btn bgColor={'#006A42'} textColor='white' btnLabel="Login" Press={()=> props.navigation.navigate("Login")}></Btn>
                <Btn bgColor={'white'} textColor={'#006A42'} btnLabel="Signup" Press={()=>props.navigation.navigate("Signup")} ></Btn>
                <Btn bgColor={'white'} textColor={'#006A42'} btnLabel="Give Review" Press={()=>props.navigation.navigate("Review")} ></Btn>
                <Btn bgColor={'white'} textColor={'#006A42'} btnLabel="Home Nav" Press={()=>props.navigation.navigate("HomeNav")} ></Btn>
            </View>
        </Background>
    )
}

const styles = StyleSheet.create({})

export default Home;
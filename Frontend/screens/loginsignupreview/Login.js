import axios from 'axios';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, ScrollView, Alert } from 'react-native';
import Background from './Background';
import Btn from '../../components/Btn';
import Field from '../../components/Field';
import COLORS from '../../consts/colors';
import { localHost, screenHeight } from '../../components/constants';
import {NavigationContainer} from '@react-navigation/native'
import { auth } from '../../fireconfig/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useDispatch, useSelector } from 'react-redux';
import { addUser } from '../../src/Redux/Actions/User/user-actions';
import AsyncStorage from '@react-native-async-storage/async-storage';

//DataBase

const Login = (props) => {

    const userData = useSelector((state) => state.userReduce);
    const dispatch = useDispatch();
    //HOOKS FOR VALIDATIOn
    const [valueofemail, onChangeEmail] = useState('');
    const [emailerror, SetEmailError] = useState('');
    const [valueofpassword, onChangePassword] = useState('');
    const [passworderror, SetPasswordError] = useState('');
    //VALIDATION FUNCTION

    function validation(e, p) {
        let flag1 = false; 
        let flag2 = false;
        if (e == '') { flag1=false;SetEmailError('Please Enter Email'); }
        else {
            let rjx = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');
            if (!rjx.test(e)) {
                SetEmailError('Enter Correct Format Of Email');
            }
            else {
                SetEmailError('');
                flag1 = true;
            }
        }
        if (p == '') { flag2=false; SetPasswordError('Please Enter Passwword'); }
        else {
            if (p.length < 6) { SetPasswordError('Minimum Password Length required is 5'); }
            else {
                SetPasswordError('');
                flag2 = true;
                
            }
        }
        if (flag1 == true && flag2 == true) {
        }
        //AXIOS LOGIN FUNCTION
        signInWithEmailAndPassword(auth, e, p)
        .then((userCredential) => {

            axios.get(`http://${localHost}/user_info/${e.toString()}`).then(async function(response){
                // console.log(response.data)
    
                if(response.data==false)
                {
                    Alert.alert(
                        'Incorrect Credentials'
                    );
    
                }
            else
        {
            Alert.alert(
                'Successful Login'
            );
            id_user=response.data[0].user_id;
            // console.

            dispatch(addUser('insertUser',response.data[0]));
            await AsyncStorage.setItem('userInfo',JSON.stringify(response.data[0]));    
            SetEmailError('');
            SetPasswordError('');
            props.navigation.replace("PlanTrip")
            // props.navigation.navigate('Chatrooms', {groupId:2})
            e="";
            p="";
        }
    }).catch(function(error)
        {})

        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert("Incorrect Credentials",errorMessage );
        });




}
    ///PAGE CODE
    return (
             <View style={{backgroundColor:COLORS.primary, alignItems: "center", width: '100%',height:'100%' }}>

                    <ScrollView showsVerticalScrollIndicator={false} style={{
                     height: '80%', width: '100%'}} >
                    <View style={{
                        backgroundColor: "white", height: '80%', width: '100%',marginBottom:screenHeight*0.1,
                        borderTopLeftRadius: 90,borderBottomRightRadius:90,paddingTop: 40, alignItems: 'center', marginTop:screenHeight*0.15}}>
                        <Text style={{ fontSize: 40, color: 'black', fontWeight: "bold" }}>Welcome User</Text>
                        <Text style={{ color: "grey", fontSize: 19, fontWeight: "bold", marginBottom: 20 }}>Login to your account</Text>
                        <Field placeholder="Enter Email" keyboardType={"email-address"} value={valueofemail} onChangeText={text => onChangeEmail(text)} />
                        <Text style={{ color: 'red', fontSize: 12, fontWeight:'bold',marginRight:220 }}>{emailerror}</Text>
                        <Field placeholder="Enter Password" secureTextEntry={true} value={valueofpassword}
                            onChangeText={text => onChangePassword(text)} />
                        <Text style={{ color: 'red', fontSize: 12, fontWeight:'bold',marginRight:200 }}>{passworderror}</Text>
                        <View style={{ alignItems: 'flex-end', width: '80%', paddingRight: 16, marginBottom: 80 }}>
                        <TouchableOpacity onPress={() => {props.navigation.navigate("ForgotPassword");}}>
                                <Text style={{ color: 'black', fontWeight: 'bold' }}>Forgot Password</Text>
                            </TouchableOpacity>
                        </View>
                        <Btn textColor='white' bgColor={COLORS.primary} btnLabel="Login" Press={() => { validation(valueofemail, valueofpassword) }} />
                            <Text>Don't have an account ? </Text>
                            <TouchableOpacity onPress={() => {SetEmailError('');SetPasswordError('');props.navigation.navigate("Signup");}}>
                                <Text style={{ color: 'black', fontWeight: 'bold' }}>Signup</Text>
                            </TouchableOpacity>
                    </View>
                    </ScrollView>
            </View> 
    );
}
const styles = StyleSheet.create({})

export default Login;
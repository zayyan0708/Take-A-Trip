import axios from 'axios';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, ScrollView, Alert, Dimensions } from 'react-native';

import Btn from '../../components/Btn';
import Field from '../../components/Field';
import COLORS from '../../consts/colors';
import { screenHeight } from '../../components/constants';

import { getAuth, sendPasswordResetEmail } from "firebase/auth";
const { width, height } = Dimensions.get('window');

//DataBase

const ForgotPassword = (props) => {
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
        if (flag1 == true) {
            const auth = getAuth();
sendPasswordResetEmail(auth, e)
  .then(() => {
    Alert.alert("Email has been sent to reset password");
    props.navigation.replace('Login');
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    Alert.alert("This email is not found",errorMessage);
    // ..
  });
        }

}
    ///PAGE CODE
    return (
        <View style={{ backgroundColor: COLORS.primary, alignItems: 'center', width: '100%', height: '100%' }}>
        <ScrollView showsVerticalScrollIndicator={false} style={{ height: '100%', width: '100%' }}>
          <View
            style={{
              backgroundColor: 'white',
              height: height * 0.7,
              width: width,
              marginBottom: height * 0.1,
              borderTopLeftRadius: width * 0.2,
              borderBottomRightRadius: width * 0.2,
              paddingTop: height * 0.14,
              alignItems: 'center',
              marginTop: height * 0.15,
            }}
          >
            <Text style={{ fontSize: width * 0.08, color: 'black', fontWeight: 'bold' }}>Find your account</Text>
            <Text style={{ color: 'grey', fontSize: width * 0.04, fontWeight: 'bold', marginBottom: height * 0.02 }}>
              Enter your account email
            </Text>
            <Field
              placeholder="Enter Email"
              keyboardType="email-address"
              value={valueofemail}
              onChangeText={(text) => onChangeEmail(text)}
            />
            <Text style={{ color: 'red', fontSize: width * 0.03, fontWeight: 'bold', marginRight: width * 0.35 }}>
              {emailerror}
            </Text>
            <Btn textColor="white" bgColor={COLORS.primary} btnLabel="Reset Password" Press={() => validation(valueofemail)} />
          </View>
        </ScrollView>
      </View>
    );
}
const styles = StyleSheet.create({})

export default ForgotPassword;
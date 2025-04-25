import React from 'react';
import { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import Btn from '../../components/Btn';
import Field from '../../components/Field';
import axios from 'axios';
//DataBase

const Sample = (props) => {
    //Read
    // axios.get('http://192.168.56.1:3300/users/1')
    // .then(function (response) {
    //   console.warn(response);
    // })
    // .catch(function (error) {
    //   console.warn(error);
    // });
    
    //Insert
    // axios.post('http://192.168.56.1:3300/users', {
    //     id: '2',
    //     firstname:'Flintstone'
    //   })
    //   .then(function (response) {
    //     console.warn(response);
    //   })
    //   .catch(function (error) {
    //     console.warn(error);
    //   });

    //Delete
    // axios.delete('http://192.168.56.1:3300/users/1')
    // .then(function (response) {
    //   console.warn(response);
    // })
    // .catch(function (error) {
    //   console.warn(error);
    // });
//READ API
// axios.get(`http://192.168.56.1:3300/users/${e.toString()}/${p.toString()}`).then(function(response){
//     if (response.data==true)
//     {
//         console.warn("Success")
//     }
// }).catch(function(error)
// {
//     console.warn("Not found")
// })

 }

const styles = StyleSheet.create({})

export default Sample;
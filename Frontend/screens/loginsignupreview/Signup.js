import React from 'react';
import { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import Background from './Background';
import Btn from '../../components/Btn';
import Field from '../../components/Field';
import axios from 'axios';
import { ScrollView } from 'react-native-gesture-handler';
import {
  TouchableHighlight,
  Alert,
  ToastAndroid,
} from 'react-native';
import { createUserWithEmailAndPassword, signOut, updateProfile } from 'firebase/auth';
import {Avatar, Button} from 'react-native-paper';
import {launchImageLibrary} from 'react-native-image-picker';
import { SafeAreaView } from 'react-native-safe-area-context';
import { blue200, orange100 } from 'react-native-paper/lib/typescript/styles/themes/v2/colors';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import COLORS from '../../consts/colors';
import { localHost, screenHeight } from '../../components/constants';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { storage,auth } from '../../fireconfig/firebase';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
const Signup = (props) => {
    //HOOKS FOR VALIDATION
    const [valueofFName,onChangeFName]=useState('');
    const [FNameerror,SetFNameError]=useState('');
    const [valueofLName,onChangeLName]=useState('');
    const [LNameerror,SetLNameError]=useState('');
    const [valueofCity,onChangeCity]=useState('');
    const [Cityerror,SetCityError]=useState('');
    const [Pic, SetPic] = useState('');
    const [valueofCountry,onChangeCountry]=useState('');
    const [Countryerror,SetCountryError]=useState('');
    const [imgBuffer,SetImageError]=useState('');
    const [valueofemail, onChangeEmail] = useState('');
    const [emailerror, SetEmailError] = useState('');
    const [valueofpassword, onChangePassword] = useState('');
    const [passworderror, SetPasswordError] = useState('');
     //VALIDATION FUNCTION
     function validation(e, p,fname,lname,city,country,Img) {
        let flag1,flag2,flag3,flag4,flag5,flag6,flag7 = false;
        if (e == '') { SetEmailError('Please Enter Email'); }
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
        if (p == '') { SetPasswordError('Please Enter Passwword'); }
        else {
            if (p.length < 6) { SetPasswordError('Minimum Password Length required is 8'); }
            else {
                SetPasswordError('');
                flag2 = true;
            }
        }
        if(fname == ''){SetFNameError('Please Enter First Name');}
        else{
            let rjx = new RegExp('[A-Za-z]');
            if (!rjx.test(fname)) {
                SetFNameError('Enter Correct Format Of Name');
            }
            else {
                SetFNameError('');
                flag3 = true;
            }
        }
        if(lname == ''){SetLNameError('Please Enter Last Name');}
        else{
            let rjx = new RegExp('[A-Za-z]');
            if (!rjx.test(lname)) {
                SetLNameError('Enter Correct Format Of Name');
            }
            else {
                SetLNameError('');
                flag4 = true;
            }
        }
        if(city == ''){SetCityError('Please Enter City Name');}
        else{
            let rjx = new RegExp('[A-Za-z]');
            if (!rjx.test(city)) {
                SetCityError('Enter Correct Format Of City Name');
            }
            else {
                SetCityError('');
                flag5 = true;
            }
        }
        if(country == ''){SetCountryError('Please Enter Country Name');}
        else{
            let rjx = new RegExp('[A-Za-z]');
            if (!rjx.test(country)) {
                SetCountryError('Enter Correct Format Of Country Name');
            }
            else {
                SetCountryError('');
                flag6 = true;
            }
        }
      //  let imgBuffer=Buffer.from('data:image/png;base64,' + Img,'base64');
        if(Img==''){SetImageError('Upload Image');}
        else
        {
          SetImageError('');
          flag7=true;
          
        }
        
        if (flag1 == true && flag2 == true && flag3 == true && flag4 == true && flag5 == true && flag6 == true) {
          createUserWithEmailAndPassword(auth, valueofemail, valueofpassword)
          .then((userCredential) => {
              // Registered
              axios.post(`http://${localHost}/user_info`, {
                email: e.toString(),
                pass: p.toString(),
                fn:fname.toString(),
                ln:lname.toString(),
                ucity:city.toString(),
                ucountry:country.toString(),
                profilepic:Img
              })
              .then(function (response) {
                console.warn(response);
                const user = userCredential.user;
              })
              .catch(function (error) {
                console.warn(error);
              });
          })
          .catch((error) => {
              const errorCode = error.code;
              const errorMessage = error.message;
              alert(errorMessage);
          });
          console.log(typeof(Img))
          console.log(e.toString())
        }
        else
        {
          Alert.alert(
            'Unsuccessful Signup',
            'Please Enter Correct Details',
            [{text: 'OK'}],
          );
        }
    }
    
      const setToastMessage = message => {
        ToastAndroid.showWithGravity(
          message,
          ToastAndroid.SHORT,
          ToastAndroid.CENTER,
        );
      };
      const handleImageUpload = async () => {
        try {
          const imagePickerOptions = {
            mediaType: 'photo',
            quality: 0.5,
          };
      
          launchImageLibrary(imagePickerOptions, async (response) => {
            if (response.didCancel) {
              console.log('Image picker was canceled');
            } else if (response.errorMessage) {
              console.log('Image picker error:', response.errorMessage);
            } else {
              const { uri } = response.assets[0];
              let blobImage = null;
      
              if (Platform.OS === 'ios') {
                blobImage = await fetch(uri).then((response) => response.blob());
              } else {
                // On Android, the image is already in blob format
                blobImage = uri;
              }
      
              const metadata = {
                contentType: 'image/jpeg',
              };
      
              const storageRef = ref(storage, 'images/' + Date.now());
              const uploadTask = uploadBytesResumable(storageRef, blobImage, metadata);
      
              uploadTask.on(
                'state_changed',
                (snapshot) => {
                  const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                  console.log('Upload is ' + progress + '% done');
                  switch (snapshot.state) {
                    case 'paused':
                      console.log('Upload is paused');
                      break;
                    case 'running':
                      console.log('Upload is running');
                      break;
                  }
                },
                (error) => {
                  switch (error.code) {
                    case 'storage/unauthorized':
                      break;
                    case 'storage/canceled':
                      break;
                    case 'storage/unknown':
                      break;
                  }
                },
                () => {
                  getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    console.log('File available at', downloadURL);
                    SetPic(downloadURL.toString()); // Update selectedImage with the download URL
                  });
                }
              );
            }
          });
        } catch (error) {
          console.log('Error uploading image:', error);
          Alert.alert('Error', 'Failed to upload image');
        }
      };
      

      const register = () => {
        if (valueofemail !== '' && valueofpassword !== '') {
            createUserWithEmailAndPassword(auth, valueofemail, valueofpassword)
                .then((userCredential) => {
                    // Registered
                    const user = userCredential.user;
                    // updateProfile(user, {
                    //     displayName: name,
                    //     photoURL: avatar ? avatar : 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
                    // })
                    //     .then(() => {
                    //         alert('Registered, please login.');
                    //     })
                    //      .catch((error) => {
                    //         alert(error.message);
                    //     })
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    alert(errorMessage);
                });
        }
    }
    return (
      <View style={{backgroundColor:COLORS.primary, width: '100%',height:'100%' }}>
        <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{backgroundColor:"white", height: screenHeight, width: '100%',alignItems: 'center', paddingTop:30,borderTopLeftRadius:30,borderTopRightRadius:30,marginTop:50}}>
                  
                  <TouchableHighlight
                  
                  onPress={() => handleImageUpload()}
                  underlayColor="rgba(0,0,0,0)">
                    {Pic!=""?<Avatar.Image size={100} source={{uri:Pic}}/>:<View style={{backgroundColor:COLORS.primary,height:100,width:100,borderRadius:50,alignItems:'center',justifyContent:'center'}}><Icon name={"user"} size={30} color="white"></Icon></View>}
                  </TouchableHighlight>
                    <Field placeholder="Enter First Name" value={valueofFName} onChangeText={text => onChangeFName(text)}/>
                    <Text style={{ color: 'red', fontSize: 12, fontWeight:'bold',marginRight:200}}>{FNameerror}</Text>
                    <Field placeholder="Enter Last Name" value={valueofLName} onChangeText={text => onChangeLName(text)} />
                    <Text style={{ color: 'red', fontSize: 12, fontWeight:'bold',marginRight:200 }}>{LNameerror}</Text>
                    <Field placeholder="Enter City" value={valueofCity} onChangeText={text => onChangeCity(text)}/>
                    <Text style={{ color: 'red', fontSize: 12, fontWeight:'bold',marginRight:200 }}>{Cityerror}</Text>
                    <Field placeholder="Enter Country" value={valueofCountry} onChangeText={text => onChangeCountry(text)}/>
                    <Text style={{ color: 'red', fontSize: 12, fontWeight:'bold',marginRight:180 }}>{Countryerror}</Text>
                    <Field placeholder="Enter Email" keyboardType={"email-address"} value={valueofemail} onChangeText={text => onChangeEmail(text)}/>
                    <Text style={{ color: 'red', fontSize: 12, fontWeight:'bold',marginRight:225 }}>{emailerror}</Text>
                    <Field placeholder="Enter Password" secureTextEntry={true} value={valueofpassword} onChangeText={text => onChangePassword(text)} />
                    <Text style={{ color: 'red', fontSize: 12, fontWeight:'bold',marginRight:192 }}>{passworderror}</Text>
                    <Btn textColor='white' bgColor={COLORS.primary} btnLabel="Sign up" Press={() => 
                    
                      { validation(valueofemail, valueofpassword,valueofFName,valueofLName,valueofCity,valueofCountry,Pic);
                      
                      } } />
                    <View style={{ display: 'flex', flexDirection: 'row', justifyContent: "center" }}>
                        <Text>Already have an account ? </Text>
                        <TouchableOpacity onPress={() => props.navigation.navigate("Login")}>
                            <Text style={{ color: 'black', fontWeight: 'bold' }}>Login</Text>
                        </TouchableOpacity>
                    </View>
            </View>
            </ScrollView>
            </View>
    
            
    );
}
const styles = StyleSheet.create({});
export default Signup;

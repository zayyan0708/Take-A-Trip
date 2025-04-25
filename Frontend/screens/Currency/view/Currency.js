// import { IconComponentProvider,Icon } from "@react-native-material/core";
// import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { View,Text, StatusBar, Pressable, Dimensions } from "react-native";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import { color } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from 'react-native-vector-icons/FontAwesome5';
import { BottomModal } from "../../../components/BottomModal";
import Btn from "../../../components/Btn";
import {colorCodes} from "../../../components/constants"
import AnimatedLoader from 'react-native-animated-loader';
import LottieView from 'lottie-react-native';
import { currency_code } from "../model/currency_code";
import COLORS from "../../../consts/colors";


const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;
const Currency=()=>{
    
    const [fromNamez,changeFromNameZ] = useState("From")
    const [toNamez,changeToNameZ] = useState("To")
    const [fromValue,onChangeFromValue] = useState(0);
    const [toValue,onChangeToValue] = useState(0);
    const [checkValue,onCheck] = useState('');
    let [visible, setVisible] = useState(false);
    useEffect(()=>{
        StatusBar.setHidden(false);
        StatusBar.setBackgroundColor(COLORS.primary)
    })
    let popupRef = React.createRef();
    const onShowPopUp=()=>{
        popupRef.show()
    }
    const onClosePopUp=()=>{
        popupRef.close()
    }
    return(
        <SafeAreaView style={{flex:1,justifyContent:"flex-start"}}>
            <ScrollView>
                <View>
                <View style={{height:screenHeight*0.065,backgroundColor:COLORS.primary,justifyContent:'center'}}>
                    <Text style={{fontSize:28,color:'white',fontWeight:"600"}}>  Currency Convertor</Text>
                </View>
                <View style={{height:screenHeight*0.1,backgroundColor:COLORS.primary,borderColor:colorCodes.primaryClr,borderWidth:screenWidth*0.009,justifyContent:'space-around',alignItems:"center",flexDirection:'row'}}>
                    <View style={{flexDirection:'row',alignItems:'center'}}>
                        <Pressable onPress={()=>{onShowPopUp();onCheck('From');}}>
                            <Icon name="chevron-circle-down" size= {25} color="red"></Icon>
                        </Pressable>
                        <Text style={{fontSize:20,color:'white',fontWeight:'500'}}>{fromNamez}</Text>
                    </View>
                    <Icon name="arrow-right" size= {30} color="red"></Icon>
                    <View style={{flexDirection:'row',alignItems:'center'}}>
                        <Pressable onPress={()=>{onShowPopUp();onCheck('To');}}>
                            <Icon name="chevron-circle-down" size= {25} color="red"></Icon>
                        </Pressable>
                        <Text style={{fontSize:20,color:'white',fontWeight:'500'}}>{toNamez}</Text>
                    </View>
                </View>
                <View style={{backgroundColor:COLORS.primary,height:screenHeight*0.82}}>
                    <View style={{height:screenHeight*0.09}}></View>
                    <View style={{height:screenHeight*0.066,backgroundColor:'#D9D9D9',marginHorizontal:screenWidth*0.03}}>
                        <TextInput
                            style={{fontSize:20,color:'black'}}
                            value={fromValue}
                            onChangeText={text=>onChangeFromValue(parseInt(text))}
                            keyboardType={"number-pad"}
                        ></TextInput>
                    </View>
                    <View style={{height:screenHeight*0.007}}></View>
                    <View style={{alignItems:'center'}}><Icon name="gg-circle" size={25} color="red"></Icon></View>
                    <View style={{height:screenHeight*0.007}}></View>
                    <View style={{height:screenHeight*0.066,backgroundColor:'#D9D9D9',marginHorizontal:screenWidth*0.03,paddingVertical:10}}>
                        <Text style={{fontSize:20,color:'black'}}>{toValue}</Text>
                    </View>
                    <View style={{height:screenHeight*0.071}}></View>
                    <View style={{alignItems:'center'}}>
                        <Btn bgColor={colorCodes.primaryClr} btnLabel={"Convert"} textColor={"black"} Press={()=>{
                            ConvertCurrency();
                            async function ConvertCurrency(){
                                setVisible(true);
                                await setTimeout(()=>{
                                    setVisible(true);
                                },500);
                                var myHeaders = new Headers();
                                myHeaders.append("apikey", "TZQbYa6bS5WuhQNk0WBxIIg9JhYY1TGj");
                                var requestOptions = {
                                method: 'GET',
                                redirect: 'follow',
                                headers: myHeaders
                                };
                                fetch(`https://api.apilayer.com/exchangerates_data/convert?to=${toNamez}&from=${fromNamez}&amount=${parseInt(fromValue)}`, requestOptions)
                                .then(response => response.text())
                                .then(re => {onChangeToValue(JSON.parse(re).result);setVisible(false);})
                                .catch(error => console.warn('error', error));
                                
                            }
                        }}></Btn>
                    
                    </View>
                </View>
                
                <BottomModal
                    title="Select Currency"
                    ref={(target)=>popupRef=target}
                    onTouchOutside={onClosePopUp}
                    data={currency_code}
                    changeFrom={changeFromNameZ}
                    changeTo={changeToNameZ}
                    checker={checkValue}
                ></BottomModal>
                </View>
                
                {
                    visible==true?(
                    <LottieView
                        source={require('../../../assets/currency_loader.json')}
                        loop
                        autoPlay
                    >
                    </LottieView>):(<View></View>)
                }
            </ScrollView>
        </SafeAreaView>
    );
}

export default Currency;
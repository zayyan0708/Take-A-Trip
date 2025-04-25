import React, { useState, useEffect } from 'react';
import { Text, View, FlatList, Image, TextInput, StyleSheet, StatusBar, Pressable, TouchableOpacity, Modal, Linking } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from 'react-native-vector-icons/FontAwesome5';
import { colorCodes, screenHeight, screenWidth } from '../../../components/constants';
import ImageViewer from 'react-native-image-zoom-viewer';
import { useRoute } from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import { useDispatch, useSelector } from 'react-redux';
import { changeSelected, createItinearyList } from '../../../src/Redux/Actions/Create-Itineary-Manual/cim-actions';

const CreateTripItinearyManual = ({ navigation }) => {
    const cimS = useSelector((state) => state.cimMenu);
    const uD = useSelector((state) => state.userReduce);
    const dispatch = useDispatch();
    const [activityOptions, setActivityOptions] = useState([
        {
            'id': 1,
            'name': 'Breakfast',
            'image': require(`../../../assets/itineary-manual/Image.png`),
        },
        {
            'id': 2,
            'name': 'Lunch',
            'image': require(`../../../assets/itineary-manual/lunch1.png`),
        },
        {
            'id': 3,
            'name': 'Dinner',
            'image': require(`../../../assets/itineary-manual/dinner1.png`),
        },
        {
            'id': 4,
            'name': 'Shopping',
            'image': require(`../../../assets/itineary-manual/shopping1.png`),
        },
        {
            'id': 5,
            'name': 'Sightseeing',
            'image': require(`../../../assets/itineary-manual/sightseeing.png`),
        },
        {
            'id': 6,
            'name': 'Amusement-Park',
            'image': require(`../../../assets/itineary-manual/amusement_park.png`),
        },
        {
            'id': 7,
            'name': 'Market',
            'image': require(`../../../assets/itineary-manual/market.png`),
        },
    ]);
    const renderItem = ({ item }) => (
        <Pressable 
        onPress={()=>{navigation.navigate("ViewParticular",{type:item.name.toLowerCase(),city:uD.planInfo.selectedCity.toLowerCase()});}}
        >
            <View style={{ height: screenHeight * 0.1, width: '100%', alignItems: 'center', justifyContent: 'center', backgroundColor: 'white', borderRadius: 13.3, marginBottom: 20, flexDirection:'row'}}>
                <View style={{flex:1,height:'100%'}}>
                    <Image source={item.image} style={{height:'100%',width:'100%',borderTopLeftRadius:13.3,borderBottomLeftRadius:13.3}}/>
                </View>
                <View style={{flex:1,height:'100%',justifyContent:'center',alignItems:'center'}}>
                    <Text style={{color:colorCodes.expensesDarkBlue,fontSize:22,fontWeight:'500',fontFamily: 'Pacifico-Regular'}}>{item.name}</Text>
                </View>
            </View>
        </Pressable>
    );
    function AppBar(){
        return(
            <View style={styles.appBar}>
                <Pressable onPress={() => { navigation.goBack(); }}><Icon style={{ marginRight: screenWidth * 0.2, marginLeft: 3 }} name='angle-left' size={35} color={colorCodes.primaryClr} /></Pressable>
                <Text style={styles.appBarTitle}>Create Trip Itineary</Text>
            </View>
        );
    }
    function Body(){
        return(
            <View style={styles.body}>
                <FlatList
                    data={activityOptions}
                    keyExtractor={item => item.id}
                    renderItem={renderItem}
                />
            </View>
        );
    }
    function Bottom(){
        return(
            <View style={styles.bottom}>
                <Pressable onPress={async ()=>{
                    var tempDic = {};
                    tempDic = {...cimS.selected};
                    if(tempDic.dinner.length==1&&tempDic.lunch.length==1)
                    {
                        if(tempDic.dinner[0].currentPostionPriorityTAT<tempDic.lunch[0].currentPostionPriorityTAT){
                            [tempDic.dinner[0].currentPostionPriorityTAT,tempDic.lunch[0].currentPostionPriorityTAT] = [tempDic.lunch[0].currentPostionPriorityTAT,tempDic.dinner[0].currentPostionPriorityTAT]
                        }
                    }
                    if(tempDic.lunch.length==1&&tempDic.breakfast.length==1)
                    {
                        if(tempDic.lunch[0].currentPostionPriorityTAT<tempDic.breakfast[0].currentPostionPriorityTAT){
                            [tempDic.breakfast[0].currentPostionPriorityTAT,tempDic.lunch[0].currentPostionPriorityTAT] = [tempDic.lunch[0].currentPostionPriorityTAT,tempDic.breakfast[0].currentPostionPriorityTAT]
                        }
                    }
                    dispatch(changeSelected('modifySelected',tempDic));
                    var valuesz = Object.values(cimS.selected).flat(); 
                    valuesz.sort((a, b) => a.currentPostionPriorityTAT - b.currentPostionPriorityTAT);
                    dispatch(createItinearyList('createList',valuesz));
                    navigation.navigate("CompleteItinerary");
                }}>
                    <View style={{width:screenWidth*0.3,height:screenHeight*0.06,borderRadius:10,backgroundColor:'white',justifyContent:'center',alignItems:'center'}}>
                        <Text style={{color:colorCodes.expensesDarkBlue,fontSize: 26, fontFamily: 'Pacifico-Regular'}}>Continue</Text>
                    </View>
                </Pressable>
            </View>
        );
    }
    return (
        <SafeAreaView style={{ flex: 10, backgroundColor: colorCodes.expensesDarkBlue }}>
            <AppBar/>
            <Body/>
            <Bottom/>
        </SafeAreaView >
    );
}

const styles = StyleSheet.create({
    appBar: {
        flex: 0.62, borderBottomWidth: 5, borderBottomColor: 'white', justifyContent: 'flex-start', alignItems: 'center', flexDirection: 'row',
    },
    appBarTitle: {
        textAlign: 'center', color: 'white', fontSize: 26, fontFamily: 'Pacifico-Regular'
    },
    body: {
        flex: 8.38, padding: 10, paddingTop: 20
    },
    bottom: {
        flex: 0.8, padding: 5, justifyContent:'center', alignItems:'center'
    }
});

export default CreateTripItinearyManual;
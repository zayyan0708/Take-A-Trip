// const API_KEY = 'AIzaSyDbqj-KQU70Ud2y7rIMlWa92RCm7KGL3vI';
const API_KEY = 'AIzaSyCU18_3ekW7y7z7qVYjg-FoTQ56hUIyPxE';
import React, { useState, useEffect, useLayoutEffect } from 'react';
import { Text, View, FlatList, Image, TextInput, StyleSheet, StatusBar, Pressable, TouchableOpacity, Modal, Linking } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from 'react-native-vector-icons/FontAwesome5';
import { colorCodes, screenHeight, screenWidth } from '../../../components/constants';
import ImageViewer from 'react-native-image-zoom-viewer';
import { useRoute } from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import { useDispatch, useSelector } from 'react-redux';
import ModalPopup from '../../../components/Modal';
import { swapTwoInList } from '../../../src/Redux/Actions/Create-Itineary-Manual/cim-actions';
import Calendar from 'react-native-calendars/src/calendar';


const CompleteItinearyManual = ({ navigation }) => {
    const today = new Date();
    const cimTAT = useSelector((state) => state.cimMenu);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [selectedItem, setSelectedItem] = useState({});
    const dispatch = useDispatch();
    const [visible, setVisible] = useState(false);
    const [visibleDoneZ, setVisibleDoneZ] = useState(false);
    const [errorText, setErrorText] = useState('');
    // useEffect(()=>{
    //     console.warn(cimTAT.itList)
    // },[])
    function AppBar() {
        return (
            <View style={styles.appBar}>
                <Pressable onPress={() => { navigation.goBack(); }}><Icon style={{ marginRight: screenWidth * 0.2, marginLeft: 3 }} name='angle-left' size={35} color={colorCodes.primaryClr} /></Pressable>
                <Text style={styles.appBarTitle}>Manage Trip Itineary</Text>
            </View>
        );
    }
    const renderItem = ({ item }) => (
        <Pressable onPress={() => {
        }}>
            <View style={{ flex: 1, flexDirection: 'row', backgroundColor: 'white', marginBottom: 10, width: screenWidth * 0.95, paddingHorizontal: 5, paddingVertical: 5, borderRadius: 13.3 }}>
                <View style={{ width: screenWidth * 0.08, justifyContent: 'center', alignItems: 'center' }}>
                    <Pressable onPress={() => {
                        setSelectedIndex(item.currentPostionPriorityTAT);
                        setSelectedItem({ ...item });
                        setVisible(true);
                    }}>
                        <View style={{ width: 25, height: 25, borderRadius: 13, borderWidth: 2, borderColor: colorCodes.expensesDarkBlue, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ color: colorCodes.expensesDarkBlue, fontWeight: '400' }}>{item.currentPostionPriorityTAT + 1}</Text>
                        </View>
                    </Pressable>
                </View>
                <View style={{ flexDirection: 'row', width: screenWidth * 0.85 }}>
                    <Image
                        source={{ uri: item['placeImgTAT'] }}
                        style={{ width: 100, height: 130, marginRight: 10 }}
                        onError={() => {
                            console.warn("Image not loading!");
                        }}
                    />
                    <View style={{ flexShrink: 1 }}>
                        <Text style={{ fontSize: 20, fontWeight: '500', flexWrap: 'wrap', color: colorCodes.expensesDarkBlue, fontFamily: 'Pacifico-Regular' }}>{item.placeTypeTAT.charAt(0).toUpperCase() + item.placeTypeTAT.slice(1)}</Text>
                        <Text numberOfLines={1} style={{ fontSize: 18, fontWeight: '400', flexWrap: 'wrap', color: 'black' }}>{item.name}</Text>
                        <Text numberOfLines={2} ellipsizeMode='tail' style={{ flexWrap: 'wrap', }}>{item.formatted_address}</Text>
                        <Text>{item['placePhoneNumberTAT']}</Text>
                        <Text>Rating: {item.rating}</Text>
                    </View>
                </View>
            </View>
        </Pressable>
    );
    function Body() {
        return (
            <View style={styles.body}>
                <FlatList
                    data={cimTAT.itList}
                    keyExtractor={item => item.place_id}
                    renderItem={renderItem}
                />
            </View>
        );
    }
    function Bottom() {
        return (
            <View style={styles.bottom}>
                <TouchableOpacity onPress={() => {
                    setVisibleDoneZ(true);
                }}>
                    <View style={{ width: screenWidth * 0.3, height: screenHeight * 0.06, borderRadius: 10, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ color: colorCodes.expensesDarkBlue, fontSize: 26, fontFamily: 'Pacifico-Regular' }}>Done</Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
    return (
        <SafeAreaView style={{ flex: 10, backgroundColor: colorCodes.expensesDarkBlue }}>
            <AppBar />
            <Body />
            <View style={{ alignItems: 'center' }}>
                <ModalPopup visible={visible?true:visibleDoneZ?true:false} heightAExpense={visible?screenHeight * 0.3:screenHeight*0.65}>
                    <View style={{}}>
                        <View style={{ width: '100%', height: screenHeight * 0.035, alignItems: 'flex-end', justifyContent: 'center' }}>
                            <TouchableOpacity onPress={() => { setErrorText(""); setVisible(false); setVisibleDoneZ(false); }}><Icon name="times" size={25} color={'red'}></Icon></TouchableOpacity>
                        </View>
                        <View style={{ alignItems: 'center' }}>
                            <Text style={{ color: colorCodes.expensesDarkBlue, fontSize: 26, fontFamily: 'Pacifico-Regular' }}>{visible==true?"Change Priority":"Set Date For Schedule"}</Text>
                        </View>
                        <View style={{ alignItems: 'center' }}>
                            {visible === true ? (
                                <View>
                                    <Text style={{ color: 'red' }}>{errorText}</Text>
                                    <View style={{ flexDirection: 'row', marginBottom: screenHeight * 0.04, width: screenWidth * 0.3, borderColor: errorText === '' ? colorCodes.expensesDarkBlue : 'red', borderWidth: 2, alignItems: 'center', justifyContent: 'space-between' }}>
                                        <TouchableOpacity onPress={() => {
                                            if (selectedItem.currentPostionPriorityTAT !== 0) {
                                                setSelectedItem({ ...selectedItem, currentPostionPriorityTAT: selectedItem.currentPostionPriorityTAT - 1 })
                                            }
                                        }}><Icon name="chevron-left" size={20} color={colorCodes.expensesDarkBlue} /></TouchableOpacity>
                                        <Text style={{ color: colorCodes.expensesDarkBlue, fontSize: 25 }}>{selectedItem.currentPostionPriorityTAT + 1}</Text>
                                        <TouchableOpacity onPress={() => {
                                            if (selectedItem.currentPostionPriorityTAT !== cimTAT.itList.length - 1) {
                                                setSelectedItem({ ...selectedItem, currentPostionPriorityTAT: selectedItem.currentPostionPriorityTAT + 1 })
                                            }
                                        }}><Icon name="chevron-right" size={20} color={colorCodes.expensesDarkBlue} /></TouchableOpacity>
                                    </View>
                                    <TouchableOpacity onPress={() => {
                                        if (selectedItem.placeTypeTAT === 'breakfast') {
                                            const lunchIndex = cimTAT.itList.findIndex(obj => obj.placeTypeTAT === 'lunch');
                                            const dinnerIndex = cimTAT.itList.findIndex(obj => obj.placeTypeTAT === 'dinner');
                                            if ((parseInt(lunchIndex) < 0 || (selectedItem.currentPostionPriorityTAT !== lunchIndex && selectedItem.currentPostionPriorityTAT < lunchIndex)) && (parseInt(dinnerIndex) < 0 || (selectedItem.currentPostionPriorityTAT !== dinnerIndex && selectedItem.currentPostionPriorityTAT < dinnerIndex))) {
                                                // console.warn("hellooo")
                                                let tempList = cimTAT.itList;
                                                let t1 = selectedItem; //Item which priority is changing
                                                let t2 = cimTAT.itList[selectedItem.currentPostionPriorityTAT]; //Item from which it will be swapping
                                                t2.currentPostionPriorityTAT = selectedIndex;
                                                tempList[selectedIndex] = t2;
                                                tempList[selectedItem.currentPostionPriorityTAT] = t1;
                                                dispatch(swapTwoInList('modifyItList', tempList));
                                                setVisible(false);
                                                setErrorText('');
                                            }
                                            else {
                                                setErrorText("Breakfast item can not come after lunch or dinner!");
                                            }
                                        }
                                        else if (selectedItem.placeTypeTAT === 'lunch') {
                                            const breakfastIndex = cimTAT.itList.findIndex(obj => obj.placeTypeTAT === 'breakfast');
                                            const dinnerIndex = cimTAT.itList.findIndex(obj => obj.placeTypeTAT === 'dinner');
                                            if ((breakfastIndex === -1 || (selectedItem.currentPostionPriorityTAT !== breakfastIndex && selectedItem.currentPostionPriorityTAT > breakfastIndex)) && (dinnerIndex === -1 || (selectedItem.currentPostionPriorityTAT !== dinnerIndex && selectedItem.currentPostionPriorityTAT < dinnerIndex))) {
                                                let tempList = cimTAT.itList;
                                                let t1 = selectedItem; //Item which priority is changing
                                                let t2 = cimTAT.itList[selectedItem.currentPostionPriorityTAT]; //Item from which it will be swapping
                                                t2.currentPostionPriorityTAT = selectedIndex;
                                                tempList[selectedIndex] = t2;
                                                tempList[selectedItem.currentPostionPriorityTAT] = t1;
                                                dispatch(swapTwoInList('modifyItList', tempList));
                                                setVisible(false);
                                                setErrorText('');
                                            }
                                            else {
                                                setErrorText("Lunch item can not come before breakfast and after dinner!");
                                            }
                                        }
                                        else if (selectedItem.placeTypeTAT === 'dinner') {
                                            const lunchIndex = cimTAT.itList.findIndex(obj => obj.placeTypeTAT === 'lunch');
                                            const breakfastIndex = cimTAT.itList.findIndex(obj => obj.placeTypeTAT === 'breakfast');
                                            if (((parseInt(lunchIndex) == -1) || (selectedItem.currentPostionPriorityTAT !== lunchIndex && selectedItem.currentPostionPriorityTAT > lunchIndex)) && ((parseInt(breakfastIndex) == -1) || (selectedItem.currentPostionPriorityTAT !== breakfastIndex && selectedItem.currentPostionPriorityTAT > breakfastIndex))) {
                                                let tempList = cimTAT.itList;
                                                let t1 = selectedItem; //Item which priority is changing
                                                let t2 = cimTAT.itList[selectedItem.currentPostionPriorityTAT]; //Item from which it will be swapping
                                                t2.currentPostionPriorityTAT = selectedIndex;
                                                tempList[selectedIndex] = t2;
                                                tempList[selectedItem.currentPostionPriorityTAT] = t1;
                                                dispatch(swapTwoInList('modifyItList', tempList));
                                                setVisible(false);
                                                setErrorText('');
                                            }
                                            else {
                                                setErrorText("Dinner item can not come before lunch or dinner!");
                                            }
                                        }
                                        else {
                                            let tempList = cimTAT.itList;
                                            let t1 = selectedItem; //Item which priority is changing
                                            let t2 = cimTAT.itList[selectedItem.currentPostionPriorityTAT]; //Item from which it will be swapping
                                            t2.currentPostionPriorityTAT = selectedIndex;
                                            tempList[selectedIndex] = t2;
                                            tempList[selectedItem.currentPostionPriorityTAT] = t1;
                                            dispatch(swapTwoInList('modifyItList', tempList));
                                            setVisible(false);
                                            setErrorText('');
                                        }
                                    }}>
                                        <View style={{ width: screenWidth * 0.3, height: screenHeight * 0.05, backgroundColor: colorCodes.expensesDarkBlue, borderRadius: 23.3, justifyContent: 'center', alignItems: 'center' }}><Text style={{ color: 'white', fontSize: 25, fontFamily: 'Pacifico-Regular' }}>Save</Text></View>
                                    </TouchableOpacity>
                                </View>
                            ) : <View style={{alignItems:'center'}}>
                                    <Calendar style={{ borderRadius: 10, elevation: 20, margin: 30 }}
                                        minDate={today.toDateString()}
                                        onDayPress={date => {
                                            console.warn(date.dateString)
                                            // setIDate(date.dateString)
                                            // setIMonth(getMonths(date.month))
                                            // setIDay(date.day)
                                        }}
                                    />
                                    <TouchableOpacity onPress={()=>{}}>
                                        <View style={{justifyContent:'center',alignItems:'center',width:screenWidth*0.5,height:screenHeight*0.06,backgroundColor:colorCodes.expensesDarkBlue,borderRadius:23.3}}>
                                            <Text style={{ color: 'white', fontSize: 26, fontFamily: 'Pacifico-Regular' }}>Submit</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>}
                        </View>
                    </View>
                </ModalPopup>
            </View>
            <Bottom />
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
        flex: 0.8, padding: 5, justifyContent: 'center', alignItems: 'center'
    }
});

export default CompleteItinearyManual;
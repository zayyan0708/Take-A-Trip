import React, { useEffect, useState } from "react";
import { View, StatusBar, Text, Pressable, Animated, Touchable, TouchableOpacity, StyleSheet, Platform, FlatList } from "react-native";
import { TextInput } from 'react-native-gesture-handler';
import { SafeAreaView } from "react-native-safe-area-context";
import { colorCodes, screenHeight, screenWidth } from "../../../components/constants";
import Icon from 'react-native-vector-icons/FontAwesome5';
import DropDownPicker from "react-native-dropdown-picker";
import ModalPopup from "../../../components/Modal";
import DateTimePicker from "@react-native-community/datetimepicker";
import returngarr from "../controller/GExpController";


const progressBarWidth = screenWidth * 0.7;
// const progressedWidth = 

const GExpenses = ({navigation}) => {
    // let showexp = new Array();
    const barwidth = React.useRef(new Animated.Value(0)).current;
    useEffect(() => {
        // showexp = returnarr("DateO");
        StatusBar.setBackgroundColor(colorCodes.expensesDarkBlue);
        // if(value=="Your Expenses"){
        //     navigation.goBack;
        // }
        Animated.spring(barwidth, {
            toValue: screenWidth * ((50 / 100) * 0.7),
            bounciness: 20,
            speed: 2,
            useNativeDriver: false,
        }).start();
        return () => {
            setShow(false)
        }
    }, []);

    const foodIcon = "utensils";
    const transportIcon = "taxi";
    const shoppingIcon = "shopping-cart";
    const otherIcon = "lightbulb";

    const [sortByDateO, setSortByDateO] = useState(true);
    const [sortByDateL, setSortByDateL] = useState(false);
    const [sortByPriceH, setSortByPriceH] = useState(false);
    const [sortByPriceL, setSortByPriceL] = useState(false);

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState('Group Expenses');
    const [items, setItems] = useState([
        { label: 'Your Expenses', value: 'Your expenses' },
        { label: 'Group Expenses', value: 'Group Expenses' }
    ]);

    const [openExpensesTypes, setOpenExpensesTypes] = useState(false);
    const [expensesValue, setexpensesValue] = useState(null);
    const [expensesType, setExpensesType] = useState([
        { label: 'Food', value: 'food' },
        { label: 'Shopping', value: 'shopping' },
        { label: 'Transport', value: 'transport' },
        { label: 'Others', value: 'others' },
    ]);
    const [expenseTitle, setExpenseTitle] = useState('');
    const [expenseDescrip, setExpenseDescrip] = useState('');
    const [expenseAmount, setExpenseAmount] = useState(0);
    const [expenseDate, setExpenseDate] = useState(new Date());
    const [expenseBudget, setExpenseBudget] = useState(123);
    let [show, setShow] = useState(false);
    const [text, setText] = useState('Select Date');
    const onChange = (event, selectedDate) => {
        setShow(false);
        const currentDate = selectedDate || expenseDate;
        setExpenseDate(selectedDate);

        let tempDate = new Date(currentDate);
        let fDate = tempDate.getFullYear() + '/' + (tempDate.getMonth() + 1) + '/' + tempDate.getDate();
        let fTime = 'Hours: ' + tempDate.getHours() + ' | Minutes: ' + tempDate.getMinutes();
        setText(fDate + '\n' + fTime);

        if (event.type === 'positiveButtonPressed' || event.type === 'negativeButtonPressed') { setShow(false); }
        setShow(false);
    }

    const [expensesValueError,setExpensesValueError] = useState("");
    const [expensesTitleError,setExpensesTitleError] = useState("");
    const [expensesDescriptionError,setExpensesDescriptionError] = useState("");
    const [expensesAmountError,setExpensesAmountError] = useState("");
    const [expensesDateError,setExpensesDateError] = useState("");
    const [expensesBudgetError,setExpensesBudgetError] = useState("");

    const [modalHeight, setmodalHeight] = useState(screenHeight);
    const [visible, setVisible] = useState(false);
    const [visibleExp, setVisibleExp] = useState(false);
    const [visibleB, setVisibleB] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const renderItem = ({ item }) => (
        <Pressable onPress={() => { setSelectedIndex(item); setmodalHeight(screenHeight * 0.5); setVisibleExp(true); }}>
            <View style={{ height: screenHeight * 0.12, width: '100%', borderWidth: 2, marginVertical: 5, padding: 10, backgroundColor: '#d6d6d6', borderColor: '#B2B2B2', borderRadius: 13, flexDirection: 'row', alignItems: 'stretch' }}>
                <View style={{ height: screenHeight * 0.07, width: screenWidth * 0.17, backgroundColor: colorCodes.expensesDarkBlue, borderRadius: 13.3, justifyContent: 'center', alignItems: 'center' }}>
                    <Icon name={item.type == "Food" ? (foodIcon) : item.type == "Shopping" ? (shoppingIcon) : item.type == "Transport" ? (transportIcon) : (otherIcon)} size={30} color="white"></Icon>
                </View>
                <View style={{ width: screenWidth * 0.01 }}></View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: screenWidth * 0.7, alignItems: 'center' }}>
                    <View style={{ flexDirection: 'column' }}>
                        <Text style={{ fontSize: 25, color: colorCodes.expensesDarkBlue, fontWeight: '500' }}>{item.title}</Text>
                        <Text style={{ fontSize: 15 }} numberOfLines={1} ellipsizeMode='tail'>{(item.description.substring(0, 15) + '.....')}</Text>
                        <Text style={{ fontSize: 15 }}>{"By: "+item.byfname+' '+item.bylname}</Text>
                    </View>
                    <View style={{ flexDirection: 'column' }}>
                        <Text style={{ fontSize: 20, color: colorCodes.expensesDarkBlue, fontWeight: '500' }}>Rs. {item.amount}</Text>
                        <Text style={{ fontSize: 16, color: colorCodes.expensesDarkBlue, fontWeight: '500' }}>Date: {item.date}</Text>
                    </View>
                </View>
            </View>
        </Pressable>

    );

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: colorCodes.expensesDarkBlue }}>
            <View style={{ height: screenHeight * 0.2 }}>
                <View style={{ flexDirection: 'row', marginLeft: screenWidth * 0.03 }}>
                {value=="Your expenses"?navigation.goBack():null}
                    <DropDownPicker
                        containerStyle={{ width: screenWidth * 0.6 }}
                        style={{ borderColor: colorCodes.expensesDarkBlue, borderBottomColor: 'white', width: screenWidth * 0.6, backgroundColor: colorCodes.expensesDarkBlue }}
                        textStyle={{ fontSize: 26 }}
                        open={open}
                        value={value}
                        items={items}
                        setOpen={setOpen}
                        setValue={setValue}
                        setItems={setItems}
                        arrowIconStyle={{ width: 22, height: 22 }}
                        tickIconStyle={{ width: 22, height: 22 }}
                        tickIconContainerStyle={{ backgroundColor: 'white', borderRadius: 23 }}
                        closeIconContainerStyle={{ backgroundColor: 'white', borderRadius: 33 }}
                        arrowIconContainerStyle={{ backgroundColor: 'white', borderRadius: 53 }}
                        selectedItemContainerStyle={{
                            backgroundColor: colorCodes.expensesDarkBlue
                        }}
                        selectedItemLabelStyle={{ color: 'white' }}
                        labelStyle={{ color: 'white' }}
                        disabledItemLabelStyle={{
                            opacity: 0.5,
                            color: "black"
                        }}
                        dropDownContainerStyle={{
                            borderColor: 'white',
                            borderWidth: 2
                        }}
                    ></DropDownPicker>
                </View>
                <View style={{ height: screenHeight * 0.03 }}></View>

                <View style={{ alignItems: 'center' }}>
                    <Text style={{ fontSize: 28, fontWeight: '600', color: 'white' }}>PKR 25000.00</Text>
                    <View style={{ height: screenHeight * 0.01, width: screenWidth * 0.7, backgroundColor: 'white', borderRadius: 23 }}>
                        <Animated.View style={{ height: screenHeight * 0.01, width: barwidth, backgroundColor: 'red', borderRadius: 23 }} />
                    </View>
                    <Pressable onPress={() => {setmodalHeight(screenHeight*0.25);setVisibleB(true);}}>
                        <Text style={{ fontSize: 15, fontWeight: '600', color: 'white',textDecorationLine: 'underline',textDecorationStyle:'double'}}>Set your budget</Text>
                    </Pressable>
                </View>
            </View>
            <View style={{ backgroundColor: 'white', height: screenHeight * 0.8, borderTopLeftRadius: 23.0, borderTopRightRadius: 23.0 }}>
                <View style={{ height: screenHeight * 0.065, borderBottomWidth: screenWidth * 0.01, borderBottomColor: '#D9D9D9', paddingHorizontal: screenWidth * 0.03, flexDirection: 'row', paddingVertical: screenHeight * 0.003 }}>
                    <View style={{ width: screenWidth * 0.2, alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ fontSize: 20, color: colorCodes.expensesDarkBlue, fontWeight: '500' }}>Sort By: </Text>
                    </View>
                    <View style={{ width: screenWidth * 0.74, flexDirection: 'row', alignItems: 'stretch' }}>
                        <View style={{ width: screenWidth * 0.37, flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between' }}>
                            <Text style={{ fontSize: 18, color: colorCodes.expensesDarkBlue, fontWeight: '500', textDecorationLine: 'underline', textDecorationColor: 'red' }}>Date</Text>
                            <View style={{ flexDirection: 'row' }}>
                                <Pressable onPress={() => { setSortByPriceL(false); setSortByPriceH(false); setSortByDateL(false); setSortByDateO(true); }}>
                                    <View style={{ flexDirection: 'row' }}>
                                        <View style={{ backgroundColor: 'white', borderWidth: 3, borderColor: colorCodes.expensesDarkBlue, padding: 2, height: screenHeight * 0.025, width: screenWidth * 0.047, borderRadius: 80, justifyContent: 'center', alignItems: 'center' }}>
                                            {sortByDateO == true ? (<View style={{ backgroundColor: colorCodes.expensesDarkBlue, borderWidth: 3, padding: 2, height: screenHeight * 0.008, width: screenWidth * 0.01, borderRadius: 80 }}></View>) : (<View></View>)}
                                        </View>
                                        <Text style={{ fontSize: 15, color: colorCodes.expensesDarkBlue, fontWeight: '400' }}>Oldest  </Text>
                                    </View>
                                </Pressable>
                                <Pressable onPress={() => { setSortByPriceL(false); setSortByPriceH(false); setSortByDateO(false); setSortByDateL(true); }}>
                                    <View style={{ flexDirection: 'row' }}>
                                        <View style={{ backgroundColor: 'white', borderWidth: 3, borderColor: colorCodes.expensesDarkBlue, padding: 2, height: screenHeight * 0.025, width: screenWidth * 0.047, borderRadius: 80, justifyContent: 'center', alignItems: 'center' }}>
                                            {sortByDateL == true ? (<View style={{ backgroundColor: colorCodes.expensesDarkBlue, borderWidth: 3, padding: 2, height: screenHeight * 0.008, width: screenWidth * 0.01, borderRadius: 80 }}></View>) : (<View></View>)}
                                        </View>
                                        <Text style={{ fontSize: 15, color: colorCodes.expensesDarkBlue, fontWeight: '400' }}>Latest</Text>
                                    </View>
                                </Pressable>
                            </View>
                        </View>
                        <View style={{ width: screenWidth * 0.37, flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between' }}>
                            <Text style={{ fontSize: 18, color: colorCodes.expensesDarkBlue, fontWeight: '500', textDecorationLine: 'underline', textDecorationColor: 'red' }}>Price</Text>
                            <View style={{ flexDirection: 'row' }}>
                                <Pressable onPress={() => { setSortByDateL(false); setSortByDateO(false); setSortByPriceH(false); setSortByPriceL(true); }}>
                                    <View style={{ flexDirection: 'row' }}>
                                        <View style={{ backgroundColor: 'white', borderWidth: 3, borderColor: colorCodes.expensesDarkBlue, padding: 2, height: screenHeight * 0.025, width: screenWidth * 0.047, borderRadius: 80, justifyContent: 'center', alignItems: 'center' }}>
                                            {sortByPriceL == true ? (<View style={{ backgroundColor: colorCodes.expensesDarkBlue, borderWidth: 3, padding: 2, height: screenHeight * 0.008, width: screenWidth * 0.01, borderRadius: 80 }}></View>) : (<View></View>)}
                                        </View>
                                        <Text style={{ fontSize: 15, color: colorCodes.expensesDarkBlue, fontWeight: '400' }}>Lowest  </Text>
                                    </View>
                                </Pressable>
                                <Pressable onPress={() => { setSortByDateL(false); setSortByDateO(false); setSortByPriceL(false); setSortByPriceH(true); }}>
                                    <View style={{ flexDirection: 'row' }}>
                                        <View style={{ backgroundColor: 'white', borderWidth: 3, borderColor: colorCodes.expensesDarkBlue, padding: 2, height: screenHeight * 0.025, width: screenWidth * 0.047, borderRadius: 80, justifyContent: 'center', alignItems: 'center' }}>
                                            {sortByPriceH == true ? (<View style={{ backgroundColor: colorCodes.expensesDarkBlue, borderWidth: 3, padding: 2, height: screenHeight * 0.008, width: screenWidth * 0.01, borderRadius: 80 }}></View>) : (<View></View>)}
                                        </View>
                                        <Text style={{ fontSize: 15, color: colorCodes.expensesDarkBlue, fontWeight: '400' }}>Highest</Text>
                                    </View>
                                </Pressable>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={{ height: '100%', alignItems: 'stretch', marginHorizontal: screenWidth * 0.02 }}>
                    <FlatList
                        data={sortByDateO==true?returngarr("DateO"):sortByDateL==true?returngarr("DateL"):sortByPriceH==true?returngarr("PriceH"):returngarr("PriceL")}
                        renderItem={renderItem}
                        keyExtractor={item => item.id}
                    >
                    </FlatList>
                </View>
                <View style={{ alignItems: 'center' }}>
                    <ModalPopup visible={visible == true ? (visible) : (visibleExp==true) ? (visibleExp) : visibleB} heightAExpense={modalHeight}>
                        <View style={{}}>
                            <View style={{ width: '100%', height: screenHeight * 0.035, alignItems: 'flex-end', justifyContent: 'center' }}>
                                <TouchableOpacity onPress={() => { setVisible(false); setVisibleExp(false);setVisibleB(false); }}><Icon name="times" size={25} color={'red'}></Icon></TouchableOpacity>
                            </View>
                            {/* Add Expense */}
                            {visible == true ? (<View>
                                <View style={{ alignItems: 'center' }}><Text style={{ fontSize: 30, color: colorCodes.expensesDarkBlue, fontWeight: '500' }}>Enter Expense Detail</Text></View>
                                <View style={{ height: screenHeight * 0.02 }}></View>
                                <View style={{ alignItems: 'flex-start' }}>
                                    
                                    <Text style={{ fontSize: 20, color: expensesValueError?"red":colorCodes.expensesDarkBlue, fontWeight: '500' }}>Enter Expense Detail</Text>
                                    <DropDownPicker
                                        containerStyle={{ width: screenWidth * 0.7 }}
                                        style={{ borderColor: expensesValueError?"red":colorCodes.expensesDarkBlue }}
                                        textStyle={{ fontSize: 20, color: expensesValueError?"red":colorCodes.expensesDarkBlue }}
                                        open={openExpensesTypes}
                                        value={expensesValue}
                                        items={expensesType}
                                        setOpen={setOpenExpensesTypes}
                                        setValue={setexpensesValue}
                                        setItems={setExpensesType}
                                        arrowIconStyle={{ width: 22, height: 22 }}
                                        tickIconStyle={{ width: 22, height: 22 }}
                                        tickIconContainerStyle={{ backgroundColor: 'white', borderRadius: 23 }}
                                        closeIconContainerStyle={{ backgroundColor: 'white', borderRadius: 33 }}
                                        arrowIconContainerStyle={{ backgroundColor: 'white', borderRadius: 53 }}
                                        selectedItemContainerStyle={{
                                            backgroundColor: colorCodes.expensesDarkBlue
                                        }}
                                        selectedItemLabelStyle={{ color: 'white' }}
                                        labelStyle={{ color: colorCodes.expensesDarkBlue }}
                                        disabledItemLabelStyle={{
                                            opacity: 0.5,
                                            color: "black"
                                        }}
                                        dropDownContainerStyle={{
                                            borderColor: colorCodes.expensesDarkBlue,
                                            borderWidth: 2
                                        }}
                                    ></DropDownPicker>
                                    <View style={{ height: screenHeight * 0.01 }}></View>
                                    <Text style={{ fontSize: 20, color: expensesTitleError?"red":colorCodes.expensesDarkBlue, fontWeight: '500' }}>Enter Expense Title</Text>
                                    <TextInput style={expensesValueError!=""?[styles.input,styles.errorb]:styles.input} value={expenseTitle} onChangeText={text => setExpenseTitle(text)}></TextInput>
                                    <View style={{ height: screenHeight * 0.01 }}></View>
                                    <Text style={{ fontSize: 20, color: expensesDescriptionError?"red":colorCodes.expensesDarkBlue, fontWeight: '500' }}>Enter Expense Description</Text>
                                    <TextInput style={expensesDescriptionError!=""?[styles.input,styles.errorb]:styles.input} value={expenseDescrip} onChangeText={text => setExpenseDescrip(text)}></TextInput>
                                    <View style={{ height: screenHeight * 0.01 }}></View>
                                    <Text style={{ fontSize: 20, color: expensesAmountError?"red":colorCodes.expensesDarkBlue, fontWeight: '500' }}>Enter Expense Amount</Text>
                                    <TextInput style={expensesAmountError!=""?[styles.input,styles.errorb]:styles.input} value={expenseAmount} onChangeText={text => setExpenseAmount(parseInt(text))} keyboardType={"number-pad"}></TextInput>
                                    <View style={{ height: screenHeight * 0.01 }}></View>
                                    <Text style={{ fontSize: 20, color: expensesDateError?"red":colorCodes.expensesDarkBlue, fontWeight: '500' }}>Set Expense Date</Text>
                                    <TouchableOpacity onPress={() => { setShow(true); }}>
                                        <View style={{ height: screenHeight * 0.06, width: screenWidth * 0.7, borderWidth: 1, padding: 10, borderColor: expensesDateError?"red":colorCodes.expensesDarkBlue, borderRadius: 13, flexDirection: 'row', justifyContent: 'space-between' }}>
                                            <Text style={{ fontSize: 20, color: expensesDateError?"red":colorCodes.expensesDarkBlue, fontWeight: '500' }}>{text}</Text>
                                            <Icon name="calendar-alt" size={25} color={expensesDateError?"red":colorCodes.expensesDarkBlue}></Icon>
                                        </View>
                                    </TouchableOpacity>
                                    {show == true ? (<DateTimePicker value={expenseDate} onChange={onChange} minimumDate={new Date(2022, 0, 1)} maximumDate={new Date()}></DateTimePicker>) : (<View></View>)}
                                    <View style={{ height: screenHeight * 0.03 }}></View>
                                    {(expensesValueError!=""||expensesTitleError!=""||expensesDescriptionError!=""||expensesAmountError!=""||expensesDateError!="")?<Text style={{ fontSize: 18, color: "red", fontWeight: '500' }}>Provide all info</Text>:<View></View>}
                                    <TouchableOpacity onPress={()=>{
                                        if(expensesValue==null){
                                            setExpensesValueError("Error");
                                        }
                                        if(expenseTitle==""){
                                            setExpensesTitleError("Error");
                                        }
                                        if(expenseDescrip==""){
                                            setExpensesDescriptionError("Error");
                                        }
                                        if(expenseAmount==""){
                                            setExpensesAmountError("Error");
                                        }
                                        if(text=="Select Date"){
                                            setExpensesDateError("Error");
                                        }
                                        if(expensesValueError==""&&expensesTitleError==""&&expensesDescriptionError==""&&expensesAmountError==""&&expensesDateError==""){
                                            // const e = new AllExpense('5',expenseTitle,expenseAmount,expensesValue,expenseDescrip);
                                            // Here comes the logic of adding new expense calling API
                                        }
                                    }}>
                                        <View style={{ height: screenHeight * 0.06, width: screenWidth * 0.7, backgroundColor: colorCodes.expensesDarkBlue, borderRadius: 23, alignItems: 'center', justifyContent: 'center' }}>
                                            <Text style={{ fontSize: 20, color: 'white', fontWeight: '500' }}>Submit</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </View>) : visibleExp==true?(<View>
                                <View style={{ alignItems: 'flex-start', flexDirection: 'column' }}>
                                    <View style={{ flexDirection: 'row', height: screenHeight * 0.08, alignItems: 'flex-end', justifyContent: 'space-between', width: screenWidth * 0.7 }}>
                                        <View style={{flexDirection:'column'}}>
                                            <Text style={{ fontSize: 30, color: colorCodes.expensesDarkBlue, fontWeight: '500' }}>{selectedIndex.title}</Text>
                                            <Text style={{ fontSize: 15, color: colorCodes.expensesDarkBlue, fontWeight: '500' }}>{"By: "+selectedIndex.byfname+' '+selectedIndex.bylname}</Text>
                                        </View>
                                        <View style={{ flexDirection: 'column' }}>
                                            <Text style={{ fontSize: 30, color: colorCodes.expensesDarkBlue, fontWeight: '500' }}>Rs. {selectedIndex.amount}</Text>
                                            <Text style={{ fontSize: 15, color: colorCodes.expensesDarkBlue, fontWeight: '500' }}>Date:{selectedIndex.date}</Text>
                                        </View>
                                    </View>
                                    <View style={{ height: screenHeight * 0.36, width: screenWidth * 0.7, alignItems: 'center' }}>
                                        <Text style={{ fontSize: 18, color: colorCodes.expensesDarkBlue, fontWeight: '500', textAlign: 'center' }}>{selectedIndex.description}</Text>
                                    </View>
                                </View>
                            </View>):
                            <View style={{ alignItems: 'flex-start', flexDirection: 'column', justifyContent:'center', alignItems:'center' }}>
                                <Text style={{ fontSize: 30, color: colorCodes.expensesDarkBlue, fontWeight: '500' }}>Set Group Budget</Text>
                                <TextInput style={expensesBudgetError!=""?[styles.input,styles.errorb]:styles.input} keyboardType={"number-pad"} value={expenseBudget} onChangeText={text => setExpenseBudget(text)}></TextInput>
                                <View style={{height:screenHeight*0.02}}></View>
                                <Pressable onPress={()=>{
                                    if(expenseBudget<0||expenseBudget==0){
                                        setExpensesBudgetError("Error");
                                    }
                                    if(expenseBudget>0){
                                        setExpensesBudgetError("");
                                        setVisibleExp(false);
                                    }
                                }}>
                                    <View style={{height:screenHeight*0.05,width:screenWidth*0.3,borderRadius:13.3,backgroundColor:colorCodes.expensesDarkBlue,alignItems:'center',justifyContent:'center'}}>
                                        <Text style={{color:'white',fontSize:20,fontWeight:'500'}}>Submit</Text>
                                    </View>
                                </Pressable>
                            </View>
                            }
                        </View>
                    </ModalPopup>
                </View>
                <TouchableOpacity style={{ position: 'absolute', width: 50, height: 50, alignItems: 'center', justifyContent: 'center', right: 20, bottom: 60 }} onPress={() => { setmodalHeight(screenHeight * 0.75); setVisible(true); }}>
                    <Icon name="plus-circle" size={50} style={{ resizeMode: 'contain', width: 50, height: 50 }} color={colorCodes.expensesDarkBlue}></Icon>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    input: {
        height: screenHeight * 0.06,
        width: screenWidth * 0.7,
        borderWidth: 1,
        padding: 10,
        borderColor: colorCodes.expensesDarkBlue,
        borderRadius: 13,
        textDecorationColor: colorCodes.expensesDarkBlue,
        color: colorCodes.expensesDarkBlue,
        fontSize: 20
    },
    errorb:{
        borderColor:'red'
    }
});

export default GExpenses;
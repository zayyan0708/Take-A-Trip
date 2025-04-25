import React, { useEffect, useState } from 'react';
import Field from '../../components/Field';
import Btn from '../../components/Btn';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { SelectList } from 'react-native-dropdown-select-list';
import Calendar from 'react-native-calendars/src/calendar'
import Modal from "react-native-modal";
import axios from 'axios';
import moment from 'moment/moment';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, FlatList,Alert } from 'react-native';
import DropdownPicker from 'react-native-dropdown-picker';
import COLORS from '../../consts/colors';
import { ScrollView } from 'react-native-gesture-handler';
import { useRoute } from '@react-navigation/native';
import { localHost } from '../../components/constants';
import { useDispatch, useSelector } from 'react-redux';
import { addPlanInfo } from '../../src/Redux/Actions/User/user-actions';
import AsyncStorage from '@react-native-async-storage/async-storage';
const API_KEY = '7fab1e1afb364f47c24cc16a226ffc03';
export default function PlanTrip() {
    const userData = useSelector((state)=>state.userReduce);
    const dispatch = useDispatch(); 
    // useEffect(()=>{
    //     console.warn(userData.userInfo);
    // },[]);
    const navigation =useNavigation();
    const route = useRoute();
    // const {user_i}=route.params;
    const [selectedCity, setSelectedCity] = useState("");
    const [StartDate, setStartDate] = useState("");
    const [StartMonth, setStartMonth] = useState("");
    const [StartDay, setStartDay] = useState("");
    const [EndMonth, setEndMonth] = useState("");
    const [EndDay, setEndDay] = useState("");
    const [EndDate, setEndDate] = useState("");
    const user_i=userData.userInfo['user_id'];
    async function validation(cN,sD,eD,temp,policy)
  {
    let flag1,flag2,flag3,flag4,flag5 = false; 
    
    if (cN == '') { flag1=false; }
    else {
      
        flag1 = true;
    }
    if (sD == '') { flag2=false; }
    else {
     
            flag2 = true;  
        }
   
    if (eD == '') { flag3=false;}
    else {

            flag3 = true;  
        }
    if(policy=='') { flag5=false }
    else {
     
            flag5 = true;  
        }
    if(flag1 == true && flag2 == true && flag3 == true && flag5 == true){
        axios.post(`http://${localHost}/plantrip`, {
            userid:user_i,
            cName: cN.toString(),
            sDate: sD.toString(),
            eDate:eD.toString(),
            upolicy:policy.toString(),
          })
          .then(function (response) {
            // console.warn(response);
          })
          .catch(function (error) {
            console.warn(error);
          });
          let dicTemp = {
            userID:user_i,
            selectedCity:cN.toString(),
            startDate:sD.toString(),
            endDate:eD.toString(),
            tPolicy: policy.toString()
          }
        //   console.warn(dicTemp);
         dispatch(addPlanInfo('insertPlanTrip',dicTemp));
         await AsyncStorage.setItem('userPlanInfo',JSON.stringify(dicTemp));
         navigation.navigate('Packing',{userid:user_i,cityName:selectedCity,startDate:StartDate,stDay:StartDay,stMonth:StartMonth,endDate:EndDate,endDay:EndDay,endMonth:EndMonth,weatherData:weatherData})
        }
    else{
        Alert.alert
        (
            'Enter All Details!'
        );
    }
      }   

    const getMonths=(value)=>{
        if(value=='1'){
            return "January"
        }
        else if(value=='2'){
            return "Febuary"
        }
        else if(value=='3'){
            return "March"
        }
        else if(value=='4'){
            return "April"
        }
        else if(value=='5'){
            return "May"
        }
        else if(value=='6'){
            return "June"
        }
        else if(value=='7'){
            return "July"
        }
        else if(value=='8'){
            return "August"
        }
        else if(value=='9'){
            return "September"
        }
        else if(value=='10'){
            return "October"
        }else if(value=='11'){
            return "November"
        }
        else if(value=='12'){
            return "December"
        }
        return ""
    }
    const cities = [
        "karachi","Lahore","Multan","Islamabad","Peshawar","Quetta","Muree","Hyderabad"

    ];

const [temperatures, setTemperatures] = useState([]);
  const [weatherData,setweatherData]=useState(0);
    const fetchData = async (city) => {
      try {
        const response = await axios.get(
          `https://pro.openweathermap.org/data/2.5/forecast/climate?q=${city}&units=metric&appid=${API_KEY}`
         );
        setTemperatures(response.data.list);
       // FindTemp();
      } catch (error) {
        console.error(error);
      }
    };
    const NoDays=(da)=>{
      const today = new Date();
      const stDate = moment(da);
      const numberOfDays = stDate.diff(today, 'days');
      return numberOfDays +2;
     
    };
  const FindTemp = (stdat) => {
    temperatures.map((day, index) => {
      if (index == NoDays(stdat)) {
        //setData(ItemsData(day.temp.max));
        return setweatherData(day.temp.max);
      }
    });
  };
//End try
    //start
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState(
        [{
            label: 'Privacy',
            value: 'privacy',
            icon: () =>
                <View style={{ padding: 5 }}>
                    <Icon name='users' size={20} color='#000' />
                </View>

        },
        {
            label: 'Public',
            value: 'Public',
            icon: () =>
                <View style={{ padding: 5 }}>
                    <Icon name='globe' size={20} color='#000' />
                </View>
        },

            ,]
    );
    //end
    const [showModal2, setShowModal2] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [isModalVisible, setModalVisible] = useState(false);
    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const maxDates = new Date(today);
    maxDates.setDate(tomorrow.getDate() + 30);
    // function onDateChange(date){
    //       SetselectedStartDate(date)
    //   }
    return (
        <View style={{backgroundColor:COLORS.primary,height:'100%',width:'100%'}}>
            
        {/* <View style={{position:"absolute",marginTop:100,width:'100%',marginBottom:0,height:'100%'}}> */}
        <View style={[styles.Container]}>
            {/* <ScrollView> */}
            <Text style={{ fontSize: 24, fontWeight: '700', fontFamily: 'Inter', color: 'black', paddingHorizontal: 30 }}>Map out your upcoming</Text>
            <Text style={{ fontSize: 24, fontWeight: '700', fontFamily: 'Inter', color: 'black', paddingLeft: 85 }}>travel plans</Text>
            <View style={{ height: 30 }} />
            <SelectList
                setSelected={(val) =>{setSelectedCity(val);fetchData(val)}}
                data={cities}
                placeholder='Where to?'
                boxStyles={{
                    borderRadius: 100, color: COLORS.primary, paddingHorizontal: 10, width: '100%', marginVertical: 10, borderWidth: 0,
                    backgroundColor: 'rgb(220,220,200)'
                }}
                inputStyles={{ color: COLORS.primary, fontWeight: '500',fontSize:15 }}
                dropdownTextStyles={{ color: COLORS.primary, fontWeight: '500', fontSize: 15 }}
            />
            {/* Calendar Start */}
            {/* Start Date */}
            <TouchableOpacity
                onPress={() => setShowModal(true)}
                style={{
                    backgroundColor: 'Black',
                }}
            >
                <View style={
                    [styles.input]
                }>
                    <Icon name='calendar' size={20} color={COLORS.primary} />
                    <View style={{ width: 10 }} />
                    {StartDate == "" ? <Text style={{ fontSize: 15, color: COLORS.primary, fontWeight: '500', paddingLeft: 10 }}>Start Date</Text> : <Text style={{ fontSize: 15, color: COLORS.primary, fontWeight: '500', paddingLeft: 10 }}>{StartDate}</Text>}
                </View>

            </TouchableOpacity>
            <Modal visible={showModal} animationType="fade">
                <Calendar style={{ borderRadius: 10, elevation: 4, margin: 30 }}
                    minDate={tomorrow.toDateString()}
                    maxDate={maxDates.toDateString()}
                    onDayPress={date => {
                        setStartDate(date.dateString)
                        setStartMonth(getMonths(date.month))
                        setStartDay(date.day)
                        FindTemp(date.dateString)
                        setShowModal(false)
                    }}
                />
            </Modal>
            {/* End Date */}
            <TouchableOpacity
                onPress={() => setShowModal2(true)}
                style={{
                    backgroundColor: 'Black',
                }}
            >
                <View style={
                    [styles.input]
                }>
                    <Icon name='calendar' size={20} color={COLORS.primary} />
                    <View style={{ width: 10 }} />
                    {EndDate == "" ? <Text style={{ fontSize: 15, color: COLORS.primary, fontWeight: '500', paddingLeft: 10 }}>End Date</Text> : <Text style={{ fontSize: 15, color: COLORS.primary, fontWeight: '500', paddingLeft: 10 }}>{EndDate}</Text>}
                </View>

            </TouchableOpacity>
            <Modal visible={showModal2} animationType="fade">
                <Calendar style={{ borderRadius: 10, elevation: 4, margin: 30 }}
                    minDate={StartDate}
                    onDayPress={date => {
                        setEndDate(date.dateString)
                        setEndDay(date.day)
                        setEndMonth(getMonths(date.month))
                        setShowModal2(false)
                    }}
                />
            </Modal>
            {/* Calendar End */}
            {/* <Modal
                onBackdropPress={() => setModalVisible(false)}
                onBackButtonPress={() => setModalVisible(false)}
                isVisible={isModalVisible}
                swipeDirection="down"
                onSwipeComplete={toggleModal}
                animationIn="bounceInUp"
                animationOut="bounceOutDown"
                animationInTiming={900}
                animationOutTiming={500}
                backdropTransitionInTiming={1000}
                backdropTransitionOutTiming={500}
                style={styles.modal}
            >
                <View style={styles.modalContent}>
                    <View style={styles.center}>
                        <View style={styles.barIcon} />
                        <Text style={styles.text}>Invite a Friend</Text>
                        <View style={{ height: 10 }} />
                        <Field placeholder='Enter Email' />
                        <View style={{ height: 20 }} />
                        <Btn bgColor='#16B6AA' btnLabel='Send' textColor='Black' />

                    </View>
                </View>
            </Modal> */}
            <View style={{ height: 10 }} />
            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems:'center',
                width:'100%',
                height:40,
                marginVertical:15
            }}>
                {/* <Pressable onPress={toggleModal}>
                    <View style={{
                        flexDirection: 'row'
                    }}>
                        <Icon name='plus-circle' size={20} color='#000' />
                        <Text style={{ fontSize: 14, fontWeight: '400', fontFamily: 'Inter', color: 'black', paddingLeft: 10 }}>Invite a Friend</Text>
                    </View>
                </Pressable> */}
                <DropdownPicker
                open={open}
                value={value}
                setOpen={setOpen}
                setValue={setValue}
                items={items}
                setItems={setItems}
                defaultValue={'Privacy'}
                placeholder="Select Privacy"
                placeholderStyle={{color:COLORS.primary,fontSize:14}}
                containerStyle={{ height: 40 ,width:140}}
                style={{ backgroundColor: 'rgb(220,220,200)', width: 140, borderRadius: 100,borderWidth:0, color: '#006A42', }}
                itemStyle={{
                    justifyContent: 'flex-start',fontSize: 14, fontWeight: '400', fontFamily: 'Inter', color: COLORS.primary, paddingLeft: 10
                }}
                dropdownStyle={{ backgroundColor: '#fafafa' }}
                onChangeItem={item => console.log(item.value)}
            />
                {/* <View style={{
                    flexDirection: 'row'
                }}>

                    <Icon name='users' size={15} color='#000' />
                    <Text style={{ fontSize: 14, fontWeight: '400', fontFamily: 'Inter', color: 'black', paddingLeft: 10 }}>Privacy</Text>
                </View> */}

            </View>
           
            <View style={{ height: 30 }} />
            <Btn bgColor={COLORS.primary} btnLabel='Next' textColor='white' Press={()=>
                // navigation.navigate('Packing',{cityName:selectedCity,startDate:StartDate,stDay:StartDay,stMonth:StartMonth,endDate:EndDate,endDay:EndDay,endMonth:EndMonth,weatherData:weatherData})} 
                {
                    validation(selectedCity,StartDate,EndDate,weatherData,value)
                }}
                />
            {/* </ScrollView> */}
        </View>
        
        </View>

    // </View>
       
    )
}
const styles = StyleSheet.create({
    Container: {
        flex: 1,
        paddingTop: 30,
        paddingHorizontal: 30,
        backgroundColor: 'white',
        borderTopLeftRadius:90,
        // borderTopRightRadius:30,
        borderBottomRightRadius:90,
        position:"absolute",marginTop:30,width:'100%',marginBottom:50,height:'90%'
    },
    input: {
        
        padding: 10,
        flexDirection: 'row',
        borderRadius: 100, color: '#006A42', paddingHorizontal: 10, width: '100%', marginVertical: 15,
        backgroundColor: 'rgb(220,220,200)'
    },
    modalContent: {
        backgroundColor: "#fff",
        paddingTop: 12,
        paddingHorizontal: 12,
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        minHeight: 400,
        paddingBottom: 30,
    },
    center: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 20,
    },
    barIcon: {
        width: 60,
        height: 5,
        backgroundColor: "#bbb",
        borderRadius: 3,
    },
    modal: {
        justifyContent: "flex-end",
        margin: 0,
    },
    text: {
        fontSize: 25,
        fontWeight: 'bold',
        fontFamily: 'Inter',
        color: 'black'
    }
})
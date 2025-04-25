import React, { useEffect, useState } from "react";
import { View, StatusBar, Text, Pressable, Animated, Touchable, TouchableOpacity, StyleSheet, Platform, FlatList, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colorCodes, localHost, screenHeight, screenWidth } from "../../../components/constants";
import LinearGradient from 'react-native-linear-gradient';
// import sendSelectedPeople from "../../controller/FriendsController";
import sendSelectedGroup from "../controller/GroupsController";
import sendSelectedPeople from "../../Friends/controller/FriendsController";
import Icon from 'react-native-vector-icons/FontAwesome5';
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

export const GroupsView =({ navigation }) =>{
    const userData = useSelector((state) => state.userReduce);
    const userInfo = { ...userData.userInfo };
    const userPlanInfo = { ...userData.planInfo };
    const [selectedOption,setSelectedOption] = useState("M");
    const [allfriends, setallFriends] = useState([]);
    // const userid=userInfo.user_id;
    const userid = 25;
    useEffect(()=>{
        StatusBar.setBackgroundColor("black");
        fetchAllFriends();
    },[]);
    const fetchAllFriends = async () => {
        try {
          const response = await axios.get(
             `http://${localHost}/groupfriends/${userid}`
          );
          setallFriends(response.data);
        //   console.log(response);
        } catch (error) {
          console.error("Error fetching friends:", error);
        }
      };



    const renderItemMF = ({ item }) => (
        <Pressable onPress={() => {removeFriend(item.user_id) }}>
            <View style={{ height: screenHeight * 0.1, width: '100%',marginVertical: 5, padding: 10, flexDirection: 'row', alignItems: 'stretch' }}>
                <View style={{ height: screenHeight * 0.07, width: screenWidth * 0.17, borderRadius: 13.3, justifyContent: 'center', alignItems: 'center' }}>
                    <Image style={{height:screenHeight*0.07,width:screenWidth*0.17, borderRadius:13.3}} source={{uri:item.profilepic}}></Image>
                </View>
                <View style={{ width: screenWidth * 0.03 }}></View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: screenWidth * 0.75, alignItems: 'center' }}>
                    <View style={{ flexDirection: 'column' }}>
                        <Text style={{ fontSize: 25, color: "white", fontWeight: '400' }}>{item.fname+' '+item.lname}</Text>
                        <Text style={{ fontSize: 15, color: "#809393", fontWeight: '400' }}>{item.email}</Text>
                    </View>
                    <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                        <Icon name="reply" size={30} color="#00B589"></Icon>
                        <View style={{width:screenWidth*0.03}}></View>
                        <Icon name="ellipsis-v" size={22} color="white"></Icon>
                    </View>
                </View>
            </View>
        </Pressable>
    );
    return (
        <SafeAreaView style={{ flex: 1 ,flexDirection:'column'}}>
            <LinearGradient colors={['#192D2D', '#0C1717', '#000000']} style={styles.linearGradient}>
                <View style={styles.headerD}>
                    <Text style={{color:'white',fontSize:30,fontWeight:"500"}}>{allfriends.length>0?'My Group':'You are not part of any Group'}</Text>
                    {allfriends.length>0?<View style={{flexDirection:'row',alignItems:'flex-end'}}>
                        
                        <TouchableOpacity style={{flexDirection:'row',alignItems:'flex-end'}} onPress={()=>{navigation.navigate('Chatrooms', {groupId:allfriends[0].gidz})}}>
                            <Text style={{color:'white',fontSize:23}}>Chat </Text>
                            <Icon name="comment-alt" size={22} color="white"></Icon>
                        </TouchableOpacity>
                        
                    </View>:<View></View>}
                </View>
                <FlatList
                    data={allfriends}
                    renderItem={renderItemMF}
                    keyExtractor={item => item.id}
                >
                </FlatList>
            </LinearGradient>
        </SafeAreaView>
    );
}

var styles = StyleSheet.create({
    capsuleT:{
        color:'white',
        fontWeight:'500',
        fontSize:15
    },
    selectedcapsuleHD:{
        height:screenHeight*0.05,
        width:screenHeight*0.11,
        borderRadius:23.3,
        backgroundColor:'#00B589',
        justifyContent:'center',
        alignItems:'center'
    },
    capsuleHD:{
        height:screenHeight*0.05,
        width:screenHeight*0.11,
        borderRadius:23.3,
        backgroundColor:'#3A4949',
        justifyContent:'center',
        alignItems:'center'
    },
    jgcapsulewidthHD:{
        width:screenHeight*0.13
    },
    headerD:{
        paddingTop:screenWidth*0.07,
        paddingHorizontal:screenWidth*0.04,
        flexDirection:'row',
        height:screenHeight*0.23,
        width:screenWidth,
        justifyContent:'space-between',
        alignItems:'center'
        // borderBottomColor:'white',
        // borderBottomWidth:5
    },
    linearGradient: {
      flex: 1,
    },
  });
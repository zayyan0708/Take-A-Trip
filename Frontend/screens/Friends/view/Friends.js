import React, { useCallback, useEffect, useState } from "react";
import { View, StatusBar, Text, Pressable, Animated, Touchable, TouchableOpacity, StyleSheet, Platform, FlatList, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colorCodes, localHost, screenHeight, screenWidth } from "../../../components/constants";
import LinearGradient from 'react-native-linear-gradient';
import { sendSelectedPeople } from "../controller/FriendsController";
import { getPeople } from "../controller/FriendsController";
import Icon from 'react-native-vector-icons/FontAwesome5';
import { listpeople } from "../controller/FriendsController";
import axios from "axios";
import { useFocusEffect } from "@react-navigation/native";
import { useSelector } from "react-redux";

export const Friends = () => {
  const userData = useSelector((state) => state.userReduce);
  const userInfo = { ...userData.userInfo };
  const userPlanInfo = { ...userData.planInfo };
  const [friends, setFriends] = useState([]);
  const [allfriends, setallFriends] = useState([]);
  const [allrecv, setallrecv] = useState([]);
  const [allsent, setallsent] = useState([]);
  const [listpeople, setlistpeople] = useState([]);
  const [selectedOption, setSelectedOption] = useState("MF");
  const userid = userInfo.user_id;
  const startdate = userPlanInfo.startDate;
  const enddate = userPlanInfo.endDate;
  const city = userPlanInfo.selectedCity;
  const policy = userPlanInfo.tPolicy;
  // useFocusEffect(
  //     React.useCallback(() => {
  //       StatusBar.setBackgroundColor('black');
  //       fetchAllPeople();
  //       fetchAllFriends();
  //       fetchrequest();
  //       fetchsent();
  //     }, [])
  //   );

  const fetchAllData = async () => {
    try {
      // console.warn('uiiiiiiiii',userInfo);
      // console.warn('upiiiiiiiiii',userPlanInfo);
      await Promise.all([
        fetchAllPeople(),
        fetchAllFriends(),
        fetchrequest(),
        fetchsent(),
      ]);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    StatusBar.setBackgroundColor('black');
    fetchAllData();
  }, []);

  // useEffect(()=>{
  //     StatusBar.setBackgroundColor("black");
  //     fetchAllPeople();
  //     fetchAllFriends();
  //     fetchrequest();
  //     fetchsent();

  // },[]);

  const filteredPeople = friends.filter(person => {
    return !allfriends.some(friend => friend.user_id === person.user_id) && !allsent.some(sentPerson => sentPerson.user_id === person.user_id);
  });


  const fetchAllPeople = useCallback(async () => {
    try {
      // console.warn("thrljbf",userPlanInfo);
      const response = await axios.get(
        `http://${localHost}/allpeople/${userid}/${startdate}/${enddate}/${policy}/${city}`
      );
      setFriends(response.data);

    } catch (error) {
      console.error("Error fetching friends:", error);
    }
  }, [userid]);
  const fetchAllFriends = useCallback(async () => {
    try {
      const response = await axios.get(
        `http://${localHost}/allfriends/${userid}`
      );
      setallFriends(response.data);
      // console.log(response);
    } catch (error) {
      console.error("Error fetching friends:", error);
    }
  }, [userid]);
  const fetchrequest = useCallback(async () => {
    try {
      const response = await axios.get(
        `http://${localHost}/recvreq/${userid}`
      );
      setallrecv(response.data);
      // console.log(response);
    } catch (error) {
      console.error("Error fetching friends:", error);
    }
  }, [userid]);
  const fetchsent = useCallback(async () => {
    try {
      const response = await axios.get(
        `http://${localHost}/sendreq/${userid}`
      );
      setallsent(response.data);
      // console.log(response);
    } catch (error) {
      console.error("Error fetching friends:", error);
    }
  }, [userid]);
  const addFriend = async (fid) => {
    try {
      const friendId = fid;

      const response = await axios.post(
        `http://${localHost}/friend/${userid}/${friendId}`
      );
      // console.log(response.data);

      // Perform any necessary actions after successful insertion
      // For example, refetch the updated friend list
      //fetchAllFriends();
      fetchAllData();
    } catch (error) {
      console.error("Error adding friend:", error);
    }
  };
  const acceptReq = async (fid) => {
    try {
      const friendId = fid;

      const response = await axios.post(
        `http://${localHost}/acceptFriend/${userid}/${friendId}`
      );
      // console.log(response.data);

      // Perform any necessary actions after successful insertion
      // For example, refetch the updated friend list
      //fetchAllFriends();
      fetchAllData();
    } catch (error) {
      console.error("Error adding friend:", error);
    }
  };
  const removeSent = async (fid) => {
    try {
      const friendId = fid;

      const response = await axios.post(
        `http://${localHost}/removeSent/${userid}/${friendId}`
      );
      // console.log(response.data);
      fetchAllData();
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const removeFriend = async (fid) => {
    try {
      const friendId = fid;

      const response = await axios.post(
        `http://${localHost}/removeFriend/${userid}/${friendId}`
      );
      // console.log(response.data);

      // Perform any necessary actions after successful insertion
      // For example, refetch the updated friend list
      //fetchAllFriends();
      fetchAllData();
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const renderItemMF = ({ item }) => (
    <Pressable onPress={() => { removeFriend(item.user_id) }}>
      <View style={{ height: screenHeight * 0.1, width: '100%', marginVertical: 5, padding: 10, flexDirection: 'row', alignItems: 'stretch' }}>
        <View style={{ height: screenHeight * 0.07, width: screenWidth * 0.17, borderRadius: 13.3, justifyContent: 'center', alignItems: 'center' }}>
          <Image style={{ height: screenHeight * 0.07, width: screenWidth * 0.17, borderRadius: 13.3 }} source={{ uri: item.profilepic }}></Image>
        </View>
        <View style={{ width: screenWidth * 0.03 }}></View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: screenWidth * 0.75, alignItems: 'center' }}>
          <View style={{ flexDirection: 'column' }}>
            <Text style={{ fontSize: 25, color: "white", fontWeight: '400' }}>{item.fname + ' ' + item.lname}</Text>
            <Text style={{ fontSize: 15, color: "#809393", fontWeight: '400' }}>{item.email}</Text>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
            <Icon name="reply" size={30} color="#00B589"></Icon>
            <View style={{ width: screenWidth * 0.03 }}></View>
            <Icon name="ellipsis-v" size={22} color="white"></Icon>
          </View>
        </View>
      </View>
    </Pressable>
  );
  const renderItemAP = ({ item }) => (
    <Pressable onPress={() => { addFriend(item.user_id) }}>
      <View style={{ height: screenHeight * 0.1, width: '100%', marginVertical: 5, padding: 10, flexDirection: 'row', alignItems: 'stretch' }}>
        <View style={{ height: screenHeight * 0.07, width: screenWidth * 0.17, borderRadius: 13.3, justifyContent: 'center', alignItems: 'center' }}>
          <Image style={{ height: screenHeight * 0.07, width: screenWidth * 0.17, borderRadius: 13.3 }} source={{ uri: item.profilepic }}></Image>
        </View>
        <View style={{ width: screenWidth * 0.03 }}></View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: screenWidth * 0.75, alignItems: 'center' }}>
          <View style={{ flexDirection: 'column' }}>
            <Text style={{ fontSize: 25, color: "white", fontWeight: '400' }}>{item.fname + ' ' + item.lname}</Text>
            <Text style={{ fontSize: 15, color: "#809393", fontWeight: '400' }}>{item.email}</Text>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
            <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row', height: screenHeight * 0.045, width: screenWidth * 0.22, borderRadius: 10.3, borderWidth: 3, borderColor: '#00B589' }}>
              {
                item.isSent == true ? <Text style={{ fontSize: 20, color: "#00B589", fontWeight: '500' }}>Sent</Text> :
                  item.isRecieved == true ? <Text style={{ fontSize: 20, color: "#00B589", fontWeight: '500' }}>Receieved</Text> :
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                      <Icon name="plus" size={22} color="#00B589"></Icon>
                      <Text style={{ fontSize: 20, color: "#00B589", fontWeight: '500' }}>  Add</Text>
                    </View>
              }
            </View>
            <View style={{ width: screenWidth * 0.03 }}></View>
            <Icon name="ellipsis-v" size={22} color="white"></Icon>
          </View>
        </View>
      </View>
    </Pressable>
  );
  const renderItemR = ({ item }) => (
    <Pressable onPress={() => { acceptReq(item.user_id) }}>
      <View style={{ height: screenHeight * 0.1, width: '100%', marginVertical: 5, padding: 10, flexDirection: 'row', alignItems: 'stretch' }}>
        <View style={{ height: screenHeight * 0.07, width: screenWidth * 0.17, borderRadius: 13.3, justifyContent: 'center', alignItems: 'center' }}>
          <Image style={{ height: screenHeight * 0.07, width: screenWidth * 0.17, borderRadius: 13.3 }} source={{ uri: item.profilepic }}></Image>
        </View>
        <View style={{ width: screenWidth * 0.03 }}></View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: screenWidth * 0.75, alignItems: 'center' }}>
          <View style={{ flexDirection: 'column' }}>
            <Text style={{ fontSize: 25, color: "white", fontWeight: '400' }}>{item.fname + ' ' + item.lname}</Text>
            <Text style={{ fontSize: 15, color: "#809393", fontWeight: '400' }}>{item.email}</Text>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
            <Icon name="check-circle" size={35} color="#00B589"></Icon>
            <View style={{ width: screenWidth * 0.03 }}></View>
            <Icon name="times-circle" size={35} color="#CF0101"></Icon>
            <View style={{ width: screenWidth * 0.03 }}></View>
            <Icon name="ellipsis-v" size={22} color="white"></Icon>
          </View>
        </View>
      </View>
    </Pressable>
  );
  const renderItemS = ({ item }) => (
    <Pressable onPress={() => { removeSent(item.user_id) }}>
      <View style={{ height: screenHeight * 0.1, width: '100%', marginVertical: 5, padding: 10, flexDirection: 'row', alignItems: 'stretch' }}>
        <View style={{ height: screenHeight * 0.07, width: screenWidth * 0.17, borderRadius: 13.3, justifyContent: 'center', alignItems: 'center' }}>
          <Image style={{ height: screenHeight * 0.07, width: screenWidth * 0.17, borderRadius: 13.3 }} source={{ uri: item.profilepic }}></Image>
        </View>
        <View style={{ width: screenWidth * 0.03 }}></View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: screenWidth * 0.75, alignItems: 'center' }}>
          <View style={{ flexDirection: 'column' }}>
            <Text style={{ fontSize: 25, color: "white", fontWeight: '400' }}>{item.fname + ' ' + item.lname}</Text>
            <Text style={{ fontSize: 15, color: "#809393", fontWeight: '400' }}>{item.email}</Text>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
            <Icon name="times-circle" size={35} color="#CF0101"></Icon>
            <View style={{ width: screenWidth * 0.03 }}></View>
            <Icon name="ellipsis-v" size={22} color="white"></Icon>
          </View>
        </View>
      </View>
    </Pressable>
  );
  return (
    <SafeAreaView style={{ flex: 1, flexDirection: 'column' }}>
      <LinearGradient colors={['#192D2D', '#0C1717', '#000000']} style={styles.linearGradient}>
        <View style={styles.headerD}>
          <Text style={{ color: 'white', fontSize: 30, fontWeight: "500" }}>Friends</Text>
          <View style={{ flexDirection: 'row', marginTop: screenHeight * 0.02, justifyContent: 'space-between' }}>
            <Pressable onPress={() => { setSelectedOption("AP"); }}>
              <View style={selectedOption == "AP" ? styles.selectedcapsuleHD : styles.capsuleHD}>
                <Text style={styles.capsuleT}>All people</Text>
              </View>
            </Pressable>
            <Pressable onPress={() => { setSelectedOption("MF"); }}>
              <View style={selectedOption == "MF" ? styles.selectedcapsuleHD : styles.capsuleHD}>
                <Text style={styles.capsuleT}>My Friends</Text>
              </View>
            </Pressable>
            <Pressable onPress={() => { setSelectedOption("R"); }}>
              <View style={selectedOption == "R" ? styles.selectedcapsuleHD : styles.capsuleHD}>
                <Text style={styles.capsuleT}>Recieved</Text>
              </View>
            </Pressable>
            <Pressable onPress={() => { setSelectedOption("S"); }}>
              <View style={selectedOption == "S" ? styles.selectedcapsuleHD : styles.capsuleHD}>
                <Text style={styles.capsuleT}>Sent</Text>
              </View>
            </Pressable>
          </View>
        </View>
        <FlatList

          data={selectedOption == "MF" ? allfriends : selectedOption == "AP" ? filteredPeople : selectedOption == "R" ? allrecv : allsent}
          renderItem={selectedOption == "MF" ? renderItemMF : selectedOption == "AP" ? renderItemAP : selectedOption == "R" ? renderItemR : renderItemS}
          keyExtractor={item => item.userid}
        >
        </FlatList>
      </LinearGradient>
    </SafeAreaView>
  );
}

var styles = StyleSheet.create({
  capsuleT: {
    color: 'white',
    fontWeight: '500',
    fontSize: 15
  },
  selectedcapsuleHD: {
    height: screenHeight * 0.05,
    width: screenHeight * 0.11,
    borderRadius: 23.3,
    backgroundColor: '#00B589',
    justifyContent: 'center',
    alignItems: 'center'
  },
  capsuleHD: {
    height: screenHeight * 0.05,
    width: screenHeight * 0.11,
    borderRadius: 23.3,
    backgroundColor: '#3A4949',
    justifyContent: 'center',
    alignItems: 'center'
  },
  headerD: {
    paddingTop: screenWidth * 0.07,
    paddingHorizontal: screenWidth * 0.02,
    flexDirection: 'column',
    height: screenHeight * 0.2,
    width: screenWidth,
    // borderBottomColor:'white',
    // borderBottomWidth:10
  },
  linearGradient: {
    flex: 1,
  },
});
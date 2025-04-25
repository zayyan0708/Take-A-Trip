import React, { useEffect, useState,useLayoutEffect,useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Avatar } from 'react-native-elements';
import {auth,db} from './../fireconfig/firebase';
import { signOut } from 'firebase/auth';
import { collection, addDoc, query, orderBy, onSnapshot, updateDoc, doc, where, getDocs } from 'firebase/firestore';
import { GiftedChat } from 'react-native-gifted-chat';
import CustomBubble from './MessageBubble';
import { useSelector } from 'react-redux';

const ChatRooms = ({ navigation, route }) => {
  const uD = useSelector((state)=>state.userReduce);
  const { groupId } = route.params;
  const [messages, setMessages] = useState([]);
  const groupName= uD.planInfo.selectedCity+' Group '+groupId.toString();
  const groupAvatar="https://firebasestorage.googleapis.com/v0/b/takeatrip-3e82d.appspot.com/o/images%2F1684251931182?alt=media&token=b48bd284-1106-446e-94c0-b29d0c5c06c5";

  // const userid=18;
  const userid = uD.userInfo.user_id;
  const name= uD.userInfo.fname;
  const avatarimg="https://firebasestorage.googleapis.com/v0/b/takeatrip-3e82d.appspot.com/o/images%2F1684251931182?alt=media&token=b48bd284-1106-446e-94c0-b29d0c5c06c5";

  const signOutNow = () => {
    signOut(auth)
      .then(() => {
        navigation.replace('Login');
      })
      .catch((error) => {
        console.log('Sign out error:', error);
      });
  };

  useEffect(() => {
    navigation.setOptions({
        title: groupName.toString(),
        headerShown:true,
        headerLeft: () => (
            <View style={{ marginLeft: 20 }}>
                <Avatar rounded source={{ uri: groupAvatar.toString() }} />
            </View>
        ),
        headerRight: () => (
            <TouchableOpacity
                style={{
                    marginRight: 10
                }}
                onPress={signOutNow}
            >
                <Text>logout</Text>
            </TouchableOpacity>
        )
    });

    const q = query(
        collection(db, 'chats'),
        where('groupId', '==', groupId), // Filter messages based on groupId
        orderBy('createdAt', 'desc')
    );
    const unsubscribe = onSnapshot(q, (snapshot) =>
        setMessages(
            snapshot.docs.map((doc) => ({
                _id: doc.data()._id,
                createdAt: doc.data().createdAt.toDate(),
                text: doc.data().text,
                user: doc.data().user
            }))
        )
    );

    return () => {
        unsubscribe();
    };
}, [navigation, groupId]);

const onSend = useCallback((messages = []) => {
    setMessages((previousMessages) =>
        GiftedChat.append(previousMessages, messages)
    );
    const { _id, createdAt, text, user } = messages[0];

    addDoc(collection(db, 'chats'), { _id, createdAt, text, user, groupId }); // Add groupId to the message
}, []);
  const renderChatHeader = () => {
    return (
      <View>
        <Text>{groupName}</Text>
        <Avatar source={{uri:avatarimg}} />
      </View>
    );
  };

  return (
    <GiftedChat
      messages={messages}
      showAvatarForEveryMessage={true}
      onSend={onSend}
      messagesContainerStyle={{
        backgroundColor: '#orange',
      }}
      textInputStyle={{
        backgroundColor: '#fff',
        borderRadius: 20,
      }}
      user={{
        _id: userid,
        name: name,
        avatar: avatarimg,
      }}
      renderBubble={(props) => <CustomBubble {...props} />}
      style={styles.giftedChatContainer}
     
      renderAvatarOnTop
      renderChatHeader={renderChatHeader}
      />
      );
      };
      
      export default ChatRooms;
      
      const styles = StyleSheet.create({
      giftedChatContainer: {
      backgroundColor: '#orange',
      },
      });
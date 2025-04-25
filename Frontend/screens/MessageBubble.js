import React, { useEffect } from 'react';
import { StyleSheet,Text, View } from 'react-native';
import { Bubble } from 'react-native-gifted-chat';

const CustomBubble = (props) => {
  const { currentMessage } = props;
  const isCurrentUser = currentMessage.user._id === props.user._id;
  const receiverColors = ['#448244', '#ADC04f','#55CBBD', '#BBDEFB', '#B59AAA','#d8d8d8']; // Add more colors as needed

  useEffect(() => {
    // console.log(props);
  }, []);

  const getReceiverColor = (userId) => {
    // Generate a color based on the user ID
    const colorIndex = userId % receiverColors.length;
    return receiverColors[colorIndex];
  };
  return (
    <View style={styles.container}>
      {!isCurrentUser && (
        <Text style={styles.username}>{"~"+currentMessage.user.name}</Text>
      )}
    <Bubble
      {...props}
      wrapperStyle={{
        left: {
          padding:5, // Negative value to create a cone shape
          margin:3,
          // overflow: 'hidden', 
          backgroundColor:isCurrentUser ? 'lightgreen' : getReceiverColor(currentMessage.user._id),
        },
        right: {
          padding:5, // Negative value to create a cone shape
          // overflow: 'hidden', 
          margin:3,
          backgroundColor: 'lightgreen',
        },
      }}
      textStyle={{
        left: {
          color: 'black',
        },
        right: {
          color: 'black',
        },
      }}
      
    >
    </Bubble>
    </View>
  );
};

export default CustomBubble;
const styles = StyleSheet.create({
  container: {
    marginBottom: 4,
  },
  username: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 4,
    marginLeft: 8,
  },
  });
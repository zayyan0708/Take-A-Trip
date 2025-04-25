// const API_KEY = 'AIzaSyDbqj-KQU70Ud2y7rIMlWa92RCm7KGL3vI';
const API_KEY = 'AIzaSyCU18_3ekW7y7z7qVYjg-FoTQ56hUIyPxE';
import React, { useState, useEffect } from 'react';
import { Text, View, FlatList, Image, TextInput, StyleSheet, StatusBar, Pressable, TouchableOpacity, Modal, Linking } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from 'react-native-vector-icons/FontAwesome5';
import { colorCodes, screenHeight, screenWidth } from '../../components/constants';
import ImageViewer from 'react-native-image-zoom-viewer';
import { useRoute } from '@react-navigation/native';
import LottieView from 'lottie-react-native';

// Star Rating Component
const StarRating = ({ rating }) => {
  const filledStars = Math.floor(rating);
  const remainder = rating - filledStars;
  const hasHalfStar = remainder >= 0.5;
  var emptyStars = Math.floor(5 - rating);
  if ((filledStars == 4) && (hasHalfStar == false)) {
    emptyStars = 1;
  }
  const stars = [];

  for (let i = 0; i < filledStars; i++) {
    stars.push(<Icon name='star' size={20} color='#ffc107' solid key={i} />);
  }

  if (hasHalfStar) {
    stars.push(<Icon name='star-half-alt' size={20} color='#ffc107' key='half' />);
  }

  for (let i = 0; i < emptyStars; i++) {
    stars.push(<Icon name='star' size={20} color='#ffc107' key={i + filledStars + 1} />);
  }

  return (
    <View style={styles.starContainer}>
      {stars}
    </View>
  );
};
const PlacesList = ({navigation}) => {
  const route = useRoute();
  const {type, city} = route.params;
  const [hotels, setHotels] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [sortOpt, setSortOpt] = useState('r');
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [phoneNumbers, setPhoneNumbers] = useState({});
  const [loaderVisible,setLoaderVisible] = useState(false);
  const [placeImgs,setPlaceImgs] = useState({});

  const fetchPhoneNumber = async (placeId) => {
    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=name,formatted_phone_number&key=${API_KEY}`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      const phoneNumber = data.result.formatted_phone_number;
      setPhoneNumbers(phoneNumbers => ({ ...phoneNumbers, [placeId]: phoneNumber }));
    } catch (error) {
      console.warn(error);
    }
  }
  const fetchPlacePics = (place_id,photo_uri) => {
    setPlaceImgs(allplaceImgs => ({ ...allplaceImgs, [place_id]: photo_uri}));
  }



  useEffect(() => {
    setLoaderVisible(true);
    fetch(`https://maps.googleapis.com/maps/api/place/textsearch/json?query=${type}+in+${city}&key=${API_KEY}`)
      .then(response => response.json())
      .then(async data => {
        var temp_place_list = [];
        for (d in data.results)
        {
          if(data.results[d].permanently_closed==true){

          }
          else{
            temp_place_list.push(data.results[d]);
            await fetchPhoneNumber(data.results[d].place_id);
            if(data.results[d].photos)
            {
              fetchPlacePics(data.results[d].place_id,`https://maps.googleapis.com/maps/api/place/photo?maxwidth=100&photoreference=${data.results[d].photos[0].photo_reference}&key=${API_KEY}`);
            }
            else{
              fetchPlacePics(data.results[d].place_id,`https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnGTGcCCHvEcMV1S2ouB_HO_kWS8-u5q1WaZ-nrPn0q-3pmGdMtt3Odoe0U8LkwxtA-j0&usqp=CAU`);
            } 
          }
        }
        setHotels(temp_place_list.sort((a, b) => b.rating - a.rating));
        // setHotels(data.results.sort((a, b) => b.rating - a.rating)); // sort by rating in descending order
        setLoaderVisible(false);
      })
      .catch(error => {
        console.warn(error);
        // console.error(error);
      });
    
    StatusBar.setBackgroundColor(colorCodes.expensesDarkBlue);
  }, []);

  const renderItem = ({ item }) => (
    <Pressable onPress={() => {
      setSelectedHotel(item);
      setModalVisible(true);
    }}>
      <View style={{ flex: 1, flexDirection: 'row', backgroundColor: 'white', marginBottom: 10, width: screenWidth * 0.95, paddingHorizontal: 5, paddingVertical: 5, borderRadius: 13.3 }}>
        <Image 
            // source={{ uri: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=100&photoreference=${item.photos[0].photo_reference}&key=${API_KEY}` }} 
            source={{ uri: placeImgs[item.place_id]}}
            // defaultSource={{ uri: `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnGTGcCCHvEcMV1S2ouB_HO_kWS8-u5q1WaZ-nrPn0q-3pmGdMtt3Odoe0U8LkwxtA-j0&usqp=CAU`}}
            style={{ width: 100, height: 100, marginRight: 10 }} 
            onError={()=>{
              // handleImageError(item.place_id);
              console.warn("Image not loading!");
            }}
        />
        <View style={{ flexShrink: 1 }}>
          <Text numberOfLines={1} style={{ fontSize: 18, fontWeight: '400', flexWrap: 'wrap', color: 'black' }}>{item.name}</Text>
          <Text numberOfLines={2} ellipsizeMode='tail' style={{ flexWrap: 'wrap', }}>{item.formatted_address}</Text>
          <Text>{phoneNumbers[item.place_id]}</Text>
          <Text>Rating: {item.rating}</Text>
        </View>
      </View>
    </Pressable>
  );

  const filteredHotels = hotels.filter(hotel => hotel.name.toLowerCase().startsWith(searchText.toLowerCase()));
  const hotelImages = selectedHotel?.photos?.map(photo => ({
    url: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photo.photo_reference}&key=${API_KEY}`
  })) || [{url: `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnGTGcCCHvEcMV1S2ouB_HO_kWS8-u5q1WaZ-nrPn0q-3pmGdMtt3Odoe0U8LkwxtA-j0&usqp=CAU`}];
  const hotelRating = selectedHotel?.rating ?? '-';
  const hotelNumRatings = selectedHotel?.user_ratings_total ?? '-';

  // Sorting Functions
  function SortHotelsAlphabetically() {
    const sortedHotels = hotels.sort((a, b) => a.name.localeCompare(b.name));
    setHotels(sortedHotels);
  }
  function SortHotelsRating() {
    const sortedHotels = hotels.sort((a, b) => b.rating - a.rating);
    setHotels(sortedHotels);
  }

  // All small components
  function SearchbarZ() {
    return (
      <View style={[styles.container]}>
        <Icon name={"search"} size={18} style={styles.prefixIcon} color={colorCodes.primaryClr} />
        <TextInput placeholder={"Search "+type+"..."} placeholderTextColor={colorCodes.primaryClr} onChangeText={text => setSearchText(text)} value={searchText} style={styles.textInput} />
      </View>
    );
  }
  function HotelFlatList() {
    return (
      <FlatList
        data={filteredHotels}
        keyExtractor={item => item.place_id}
        renderItem={renderItem}
      />
    );
  }
  function SortCircle(optprops) {
    return (
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <View style={{ borderColor: 'white', borderWidth: 2, height: screenHeight * 0.03, width: screenWidth * 0.06, borderRadius: 33.3, alignItems: 'center', justifyContent: 'center' }}>
          <View style={optprops.isIt == "true" ? styles.selectedCircleStyle : styles.unselectedCircleStyle}></View>
        </View>
        <Text style={styles.sortText}> {optprops.rating}   </Text>
      </View>
    );
  }
  function SortArea() {
    return (
      <View style={{ flexDirection: 'row', paddingHorizontal: 10, justifyContent: 'space-between' }}>
        <View>
          <Text style={styles.sortText}>Sort By:</Text>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <Pressable onPress={() => { setSortOpt("r"); SortHotelsRating(); }}><SortCircle rating="Rating" isIt={sortOpt == "r" ? "true" : "false"} /></Pressable>
          <Pressable onPress={() => { setSortOpt("a"); SortHotelsAlphabetically(); }}><SortCircle rating="Name" isIt={sortOpt == "a" ? "true" : "false"} /></Pressable>
        </View>
      </View>
    );
  }
  const handleCloseModal = () => {
    setModalVisible(false);
  };
  const handlePhonePress = (phoneNumber) => {
    Linking.openURL(`tel:${phoneNumber}`);
  };
  function ModalArea() {
    return (
      <Modal
        visible={modalVisible}
        animationType='slide'
        onRequestClose={handleCloseModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>{selectedHotel?.name}</Text>
            <TouchableOpacity onPress={handleCloseModal}>
              <Text style={styles.modalClose}>X</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.modalContent}>
            <ImageViewer
              imageUrls={hotelImages}
              style={styles.imageViewer}
            />
            <View style={styles.hotelInfo}>
              <Text style={styles.hotelAddress}>{selectedHotel?.formatted_address}</Text>
              <Pressable onPress={()=>{handlePhonePress(phoneNumbers[selectedHotel?.place_id])}}>
                <View style={{flexDirection:'row'}}>
                  <Text style={styles.hotelPhone}>Contact: </Text>
                  <Text style={styles.hotelPhoneU}>{phoneNumbers[selectedHotel?.place_id]}</Text>
                  <Text style={styles.hotelPhone}> (Press To Dial)</Text>
                </View>
              </Pressable>
              <View style={styles.hotelRating}>
                <Text style={styles.ratingLabel}>Rating:</Text>
                <StarRating rating={parseFloat(hotelRating)} />
                <Text style={styles.ratingCount}>({hotelNumRatings})</Text>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colorCodes.expensesDarkBlue }}>
      <View style={{ height: screenHeight * 0.15, flexDirection: 'column',marginBottom:5  }}>
        <View style={{flexDirection:'row',marginLeft:8,alignItems:'center'}}>
          <Pressable onPress={()=>{navigation.goBack();}}><Icon name='angle-left' size={35} color={colorCodes.primaryClr}/></Pressable>
          <Text style={{flex:1,textAlign:'center',color:'white',fontSize:26,fontFamily:'Pacifico-Regular'}}>{type.charAt(0).toUpperCase() + type.slice(1)} Finder</Text>
        </View>
        <SearchbarZ />
        <SortArea />
      </View>
      <View style={{ alignItems: 'center', height: screenHeight * 0.82 }}>
        <HotelFlatList />
        <ModalArea />
        {loaderVisible==true?<LottieView source={require('../../assets/currency_loader.json')} loop autoPlay></LottieView>:<View></View>}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'gray',
    marginHorizontal: 10,
    // marginTop: 10,
    marginBottom: 5,
    borderRadius: 23.3,
    height: screenHeight * 0.06,
    paddingLeft: 8,
    backgroundColor: 'white'
  },
  prefixIcon: {
    marginRight: 8,
  },
  textInput: {
    flex: 1,
    fontSize: 20,
    fontWeight: '400',
    color: colorCodes.primaryClr
  },
  selectedCircleStyle: {
    borderColor: 'white',
    borderWidth: 2,
    height: screenHeight * 0.015,
    width: screenWidth * 0.03,
    borderRadius: 33.3,
    backgroundColor: 'white',
  },
  unselectedCircleStyle: {
    height: screenHeight * 0.015,
    width: screenWidth * 0.03,
    borderRadius: 33.3,
  },
  sortText: {
    fontSize: 20,
    fontWeight: '400',
    color: 'white',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: colorCodes.expensesDarkBlue,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colorCodes.expensesDarkBlue,
    padding: 20
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  modalClose: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'red',
  },
  modalContent: {
    flex: 1,
    padding: 20
  },
  imageViewer: {
    height: screenHeight * 0.5
  },
  hotelInfo: {
    marginTop: 20
  },
  hotelAddress: {
    fontSize: 16,
    marginBottom: 10,
    color: 'white'
  },
  hotelPhone: {
    fontSize: 16,
    marginTop: 5,
    color:'white',
  },
  hotelPhoneU:{
    fontSize: 16,
    marginTop: 5,
    color:'white',
    textDecorationLine: 'underline',
    textDecorationColor:'red',
  },
  hotelRating: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  ratingValue: {
    fontSize: 14,
    marginLeft: 5,
    color: 'white',
  },
  ratingLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white'
  },
  ratingCount: {
    marginLeft: 5,
    // color: '#7f8c8d'
    color: colorCodes.primaryClr,
  },
  starContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },

});

export default PlacesList;
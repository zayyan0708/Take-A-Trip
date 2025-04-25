import React, { useEffect, useState } from 'react';
import { useRoute } from '@react-navigation/native';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
  Text,
  TextInput,
  ImageBackground,
  FlatList,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import BottomNavigation from '../../components/BottomNavigation';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icons from 'react-native-vector-icons/Ionicons';
import Iconz from 'react-native-vector-icons/FontAwesome';
import Icona from 'react-native-vector-icons/FontAwesome5';
import COLORS from '../../consts/colors';
import axios from 'axios';
import { useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {auth,db} from '../../fireconfig/firebase';
import { signOut } from 'firebase/auth';
import { colorCodes, screenHeight, screenWidth } from '../../components/constants';
// import places from '../../consts/places';
const { width } = Dimensions.get('screen');
// const API_KEY = 'AIzaSyDbqj-KQU70Ud2y7rIMlWa92RCm7KGL3vI';
const API_KEY = 'AIzaSyCU18_3ekW7y7z7qVYjg-FoTQ56hUIyPxE';
const PLACE_PHOTO_API = 'https://maps.googleapis.com/maps/api/place/photo';
const PLACE_SEARCH_API = 'https://maps.googleapis.com/maps/api/place/textsearch/json';

const HomeScreen = ({ navigation }) => {
  const userData = useSelector((state) => state.userReduce);
  const [places,setPlaces] = useState([]);
  const route=useRoute();
  // const {id_user,city_name}=route.params;
  const id_user = userData.userInfo.user_id;
  const city_name = userData.planInfo.selectedCity;
  useEffect( () => {
    // console.log(city_name);
    // const authToken = await AsyncStorage.getItem('authToken');
    // console.warn(authToken);
    fetchPlaces();
  }, []);

  const fetchPlaces = async () => {
    try {
      const response = await fetch(
        `${PLACE_SEARCH_API}?query=${city_name.toLowerCase()}+top+places&key=${API_KEY}`
      );
      const data = await response.json();
      const placesWithImages = await Promise.all(
        data.results.slice(0, 5).map(async (place) => {
          // const photoResponse = await fetch(
          //   `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${place.photos[0].photo_reference}&key=AIzaSyDbqj-KQU70Ud2y7rIMlWa92RCm7KGL3vI`
          // );
          // const photoData = await photoResponse.blob();
          // const photoUrl = URL.createObjectURL(photoData);
          const photoUrl = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${place.photos[0].photo_reference}&key=${API_KEY}`;
          const phoneUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${place.place_id}&fields=name,formatted_phone_number&key=${API_KEY}`;
          var phoneNumberZ = '';
          try {
            const response = await fetch(phoneUrl);
            const data = await response.json();
            phoneNumberZ = data.result.formatted_phone_number;
            // setPhoneNumbers(phoneNumbers => ({ ...phoneNumbers, [placeId]: phoneNumber }));
          } catch (error) {
            console.error(error);
          }
          return {
            ...place,
            photoUrl,
            phoneNumberZ,
          };
        })
      );
      setPlaces(placesWithImages);
      // console.log(places);
    } catch (error) {
      console.error(error);
    }
  };
  const icon_name=["Resturant","Hotels","Places","Reviews","Expenses","Currency","Friends","Groups"]
  const categoryIcons = [
    <Icon name="restaurant" size={30} color={COLORS.primary} />,
    <Icon name="hotel" size={30} color={COLORS.primary} />,
    <Icon name="place" size={30} color={COLORS.primary} />,
    <Icon name="rate-review" size={30} color={COLORS.primary} />,
    <Icons name="wallet" size={30} color={COLORS.primary} />,//Expenses
    <Icon name="monetization-on" size={30} color={COLORS.primary} />,//Currency
    <Icona name="user-friends" size={25} color={COLORS.primary} />,//Friends
    <Iconz name="group" size={25} color={COLORS.primary} />,//Groups
  ];
  const ListCategories = () => {
    // const navigation = useNavigation();
    const handlePress = (index) => {
      switch (index) {
        case 0:
          // navigation.navigate('Restaurants');
          navigation.navigate("PlacesList",{type:'restuarants',city:city_name.toLowerCase()});
          break;
        case 1:
          // navigation.navigate('Hotels');
          navigation.navigate("PlacesList",{type:'hotels',city:city_name.toLowerCase()});
          break;
        case 2:
          // navigation.navigate('Places');
          navigation.navigate("PlacesList",{type:'place',city:city_name.toLowerCase()});
          break;
        case 3:
          navigation.navigate("ReviewList");
          break;
        case 4:
          navigation.navigate('Expenses');
          break;
        case 5:
          navigation.navigate('Currency');
          break;
        case 6:
          navigation.navigate('Friends');
          break;
        case 7:
          navigation.navigate('Groups');
          break;
      }
    };
    return (
      <View style={style.categoryContainer}>
        {categoryIcons.map((icon, index) => (
          <TouchableOpacity key={index} onPress={() => handlePress(index)}>
            <View style={style.iconContainer}>
              {icon}
              
              <Text style={{color:COLORS.primary}}>{icon_name[index]}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  const Card = ({ place }) => {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => navigation.navigate('DetailsScreen', place)}>
        {/* <ImageBackground style={style.cardImage} source={place.image}> */}
        <ImageBackground style={style.cardImage} source={{uri: place.photoUrl}}>
          <Text
            style={{
              color: COLORS.black,
              // color: COLORS.primary,
              fontSize: 20,
              fontWeight: '900',
              marginTop: 10,
            }}>
            {place.name}
          </Text>
          <View
            style={{
              flex: 1,
              justifyContent: 'space-between',
              flexDirection: 'row',
              alignItems: 'flex-end',
            }}>
            <View style={{ flexDirection: 'row' }}>
              <Icon name="place" size={20} color={COLORS.white} />
              <Text style={{ marginLeft: 5, color: COLORS.white }}>
                {/* {place.location} */}
                {/* Karachi */}
                {city_name}
              </Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <Icon name="star" size={20} color={COLORS.white} />
              <Text style={{ marginLeft: 5, color: COLORS.white }}>{place.rating}</Text>
            </View>
          </View>
        </ImageBackground>
      </TouchableOpacity>
    );
  };

  const RecommendedCard = ({ place }) => {
    return (
      <ImageBackground style={style.rmCardImage} source={{uri: place.photoUrl}}>
        <Text
          style={{
            color: COLORS.white,
            fontSize: 22,
            fontWeight: 'bold',
            marginTop: 10,
          }}>
          {place.name}
        </Text>
        <View
          style={{
            flex: 1,
            justifyContent: 'space-between',
            alignItems: 'flex-end',
          }}>
          <View style={{ width: '100%', flexDirection: 'row', marginTop: 10 }}>
            <View style={{ flexDirection: 'row' }}>
              <Icon name="place" size={22} color={COLORS.white} />
              <Text style={{ color: COLORS.white, marginLeft: 5 }}>
                {/* {place.location} */}
                {/* Karachi */}
                {city_name}
              </Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <Icon name="star" size={22} color={COLORS.white} />
              <Text style={{ color: COLORS.white, marginLeft: 5 }}>5.0</Text>
            </View>
          </View>
          <Text style={{ color: COLORS.white, fontSize: 13 }}>
            {/* {place.details} */}
            {place.formatted_address}
          </Text>
        </View>
      </ImageBackground>
    );
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <StatusBar translucent={false} backgroundColor={COLORS.primary} />
      <View style={style.header}>
        {/* <Icon name="sort" size={28} color={COLORS.white} /> */}
        <TouchableOpacity onPress={()=>{
          signOut(auth)
          .then(async () => {
            
            await AsyncStorage.multiRemove(['authToken','userInfo','userPlanInfo']);
            navigation.replace('Login');
          })
          .catch((error) => {
            console.log('Sign out error:', error);
          });
        }}>
          <Icon name="logout" size={28} color='red' />
        </TouchableOpacity>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            backgroundColor: COLORS.primary,
            height: 120,
            paddingHorizontal: 20,  
            flexDirection: 'column'
          }}>
            <Text style={style.headerTitle}>Explore the</Text>
            <Text style={style.headerTitle}>{'beautiful places of '+city_name}</Text>
            <View style={{justifyContent:'center',alignItems:'center'}}>
              <TouchableOpacity onPress={()=>{navigation.navigate('Reviews')}}>
                <View style={{marginTop:5,width:screenWidth*0.4,height:screenHeight*0.05,backgroundColor:'white',borderRadius:23.3,justifyContent:'center',alignItems:'center'}}>
                  <Text style={{fontSize:24,fontFamily:'Pacifico-Regular',color:colorCodes.expensesDarkBlue}}>Post Review</Text>
                </View>
              </TouchableOpacity>
            </View>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <ListCategories /></ScrollView>
        <Text style={style.sectionTitle}>Places</Text>
        <View>
          <FlatList
            contentContainerStyle={{ paddingLeft: 20 }}
            horizontal
            showsHorizontalScrollIndicator={false}
            data={places}
            renderItem={({ item }) => <Card place={item} />}
          />
          <Text style={style.sectionTitle}>Recommended</Text>
          <FlatList
            snapToInterval={width - 20}
            contentContainerStyle={{ paddingLeft: 20, paddingBottom: 20 }}
            showsHorizontalScrollIndicator={false}
            horizontal
            data={places}
            renderItem={({ item }) => <RecommendedCard place={item} />}
          />
        </View>
        <View style={{ height: 60 }}></View>
      </ScrollView>
      {/* <BottomNavigation isHome={true} isMenu={false} id={id_user} /> */}
      <BottomNavigation isHome={true} isMenu={false} id={1} />
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  header: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    backgroundColor: COLORS.primary,
  },
  headerTitle: {
    color: COLORS.white,
    fontWeight: 'bold',
    fontSize: 23,
    fontFamily:'Pacifico-Regular',
  },
  inputContainer: {
    height: 60,
    width: '100%',
    backgroundColor: COLORS.white,
    borderRadius: 10,
    position: 'absolute',
    top: 90,
    flexDirection: 'row',
    paddingHorizontal: 20,
    alignItems: 'center',
    elevation: 12,
  },
  categoryContainer: {
    marginTop: 30,
    marginHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  iconContainer: {
    height: 60,
    width: 60,
    backgroundColor: COLORS.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginRight:10
  },
  sectionTitle: {
    marginHorizontal: 20,
    marginVertical: 20,
    fontWeight: 'bold',
    fontSize: 20,
  },
  cardImage: {
    height: 220,
    width: width / 2,
    marginRight: 20,
    padding: 10,
    overflow: 'hidden',
    borderRadius: 10,
  },
  rmCardImage: {
    width: width - 40,
    height: 200,
    marginRight: 20,
    borderRadius: 10,
    overflow: 'hidden',
    padding: 10,
  },
});
export default HomeScreen;
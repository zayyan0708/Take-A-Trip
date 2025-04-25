import axios from 'axios';
import React, { useState,useLayoutEffect, useEffect } from 'react';
import { View, FlatList, Image, StyleSheet, Text, TouchableOpacity, Modal } from 'react-native';
import { localHost } from '../../components/constants';
import { useSelector } from 'react-redux';

const ReviewPage = ({ navigation }) => {
    const uD = useSelector((state)=>state.userReduce);
    const city_name = uD.planInfo.selectedCity;
    const [selectedReview, setSelectedReview] = useState(null);
    const [reviews,setReviews] = useState([])
    useLayoutEffect(() => {
        navigation.setOptions({
          title: 'Reviews',
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: '#097969',
          },
          headerTitleStyle: {
            color: 'black',
            textAlign: 'center',
            alignSelf: 'center',
          },
        });
      }, [navigation]);
    useEffect(()=>{
        
        axios.get(`http://${localHost}/reviews/${city_name}`).then(function(response){
                console.log(response.data[0].profilepic);
                setReviews([...response.data]);
            })
    },[])
    const renderStars = (rating) => {
        const starIcon = '★';
        const emptyStarIcon = '☆';
        const filledStars = starIcon.repeat(rating);
        const emptyStars = emptyStarIcon.repeat(5 - rating);

        const filledStarsStyle = { color: 'yellow' }; // Style for filled stars
        const emptyStarsStyle = { color: 'gray' }; // Style for empty stars

        return (
            <Text>
                <Text style={filledStarsStyle}>{filledStars}</Text>
                <Text style={emptyStarsStyle}>{emptyStars}</Text>
            </Text>
        );
    };

    const renderReviewItem = ({ item }) => (
        <TouchableOpacity
            style={styles.reviewItem}
            onPress={() => setSelectedReview(item)}
        >
            <View style={styles.reviewContainer}>
                <Image source={{ uri: item.profilepic }} style={styles.userPhoto} />
                <View style={styles.reviewDetails}>
                    <Text style={styles.userName}>{item.username}</Text>
                    <Text style={styles.comment} numberOfLines={3} ellipsizeMode="tail">{item.review}</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'baseline' }}>
                        <Text style={styles.comment}>Rating: </Text>
                        <Text style={styles.rating}>{renderStars(item.rating)}</Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={reviews}
                keyExtractor={(item) => item.user_id}
                renderItem={renderReviewItem}
                showsVerticalScrollIndicator={false}
            />

            {/* Dialog Box */}
            <Modal visible={selectedReview !== null} transparent>
                <View style={styles.modalContainer}>
                    {selectedReview && (
                        <View style={styles.modalContent}>
                            <View style={styles.modalUserContainer}>
                                <Image source={{ uri: selectedReview.userPhoto }} style={styles.modalUserPhoto} />
                                <Text style={styles.modalUserName}>{selectedReview.user}</Text>
                            </View>
                            <Text style={styles.modalComment}>{selectedReview.comment}</Text>
                            <View style={{ flexDirection: 'row', alignItems: 'baseline' }}>
                        <Text style={styles.comment}>Rating: </Text>
                        <Text style={styles.modalRating}>{renderStars(selectedReview.stars)}</Text>
                    </View>
                            
                            <TouchableOpacity
                                style={styles.modalCloseButton}
                                onPress={() => setSelectedReview(null)}
                            >
                                <Text style={styles.modalCloseButtonText}>Close</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    // Your styles here
    container: {
        flex: 1,
        backgroundColor: '#097969',
        paddingVertical: 24,
    },
    reviewItem: {
        marginBottom: 16,
        paddingHorizontal: 16,
    },
    reviewContainer: {
        flexDirection: 'row',
        borderRadius: 10,
        backgroundColor: '#AFE1AF',
        elevation: 3,
        padding: 16,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
    },
    userPhoto: {
        width: 60,
        height: 60,
        borderRadius: 30,
        marginRight: 16,
    },
    reviewDetails: {
        flex: 1,
    },
    userName: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    comment: {
        fontSize: 16,
        opacity: 0.8, // Decrease opacity for less highlighting
        marginBottom: 4,
    },
    rating: {
        fontSize: 16,
        // fontWeight: 'bold',
        marginTop: 8,

    },
    // Styles for the modal
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        padding: 16,
        elevation: 5,
        width: '80%',
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    modalComment: {
        fontSize: 16,
        marginBottom: 8,
    },
    modalRating: {
        fontSize: 16,
        marginBottom: 8,
    },
    modalCloseButton: {
        alignSelf: 'flex-end',
        padding: 8,
    },
    modalCloseButtonText: {
        color: 'blue',
        fontSize: 16,
    },
    modalUserContainer: {
        alignItems: 'center',
        marginBottom: 16,
      },
      modalUserPhoto: {
        width: 80,
        height: 80,
        borderRadius: 40,
        marginBottom: 8,
      },
      modalUserName: {
        fontSize: 18,
        fontWeight: 'bold',
      },
      modalComment: {
        fontSize: 16,
        marginBottom: 8,
      },
      modalRating: {
        fontSize: 16,
        marginBottom: 8,
      },
      
});

export default ReviewPage;

import { useEffect, useRef, useState } from "react";
import { Animated, Dimensions, Modal, View } from "react-native";
import { screenHeight, screenWidth } from "./constants";


const ModalPopup = ({visible,heightAExpense,children})=>{
    const [showModal,setShowModal] = useState(visible);
    const heightA = heightAExpense;
    const scaleValue = useRef(new Animated.Value(0)).current;
    useEffect(()=>{
        toggleModal();
    },[visible])
    const toggleModal = ()=>{
        if(visible){
            setShowModal(true);
            Animated.spring(scaleValue,{
                toValue:1,
                duration:300,
                useNativeDriver:true
            }).start();
        }
        else{
            setTimeout(()=>setShowModal(false),200)
            Animated.timing(scaleValue,{
                toValue:0,
                duration:300,
                useNativeDriver:true
            }).start();
        }
    }
    return(
        <Modal transparent visible={showModal}>
            <View style={{flex:1,backgroundColor:'rgba(0,0,0,0.5)',justifyContent:'center',alignItems:'center'}}>
                <Animated.View style={{width:'80%',height:heightA,backgroundColor:'white',paddingHorizontal:20,paddingTop:5,paddingBottom:10,borderRadius:20,elevation:20,transform:[{scale:scaleValue}]}}>
                    {children}
                </Animated.View>
            </View>
        </Modal>
    );
};

export default ModalPopup;
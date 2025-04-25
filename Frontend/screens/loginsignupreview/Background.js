import React, { Children } from 'react';
import {View, ImageBackground} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { screenWidth } from '../../components/constants';

const Background=({children})=>{
    return(
        <View>
            <LinearGradient colors={['#192D2D', '#0C1717', '#000000']} style={{height:'100%',width:'100%'}}></LinearGradient>
            <View style={{position:"absolute",width:screenWidth}}>
                {children}
            </View>
   
        </View>
    )
}


export default Background;
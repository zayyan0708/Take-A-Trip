import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { View,Text, StatusBar } from 'react-native';
import { useEffect } from 'react';
const Login = ({ navigation }) => {
    
    function checkthis(e,p){
        console.warn(e.toString()+' '+p.toString())
    }
    return (
        <SafeAreaView>
            <View></View>
        </SafeAreaView>
    );
}


export default Login;
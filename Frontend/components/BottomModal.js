import { Modal, Dimensions, TouchableWithoutFeedback, StyleSheet, View, Text, Pressable } from 'react-native';
import { Component } from 'react';
import { FlatList } from 'react-native-gesture-handler';
import { fromName, funz } from '../screens/Currency/view/Currency';
import { currency_code2 } from '../screens/Currency/model/currency_code';
import { colorCodes, screenHeight } from './constants';

const deviceHeight = Dimensions.get("window").height;
export class BottomModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
        }
    }
    show = () => {
        this.setState({ show: true })
    }
    close = () => {
        this.setState({ show: false })
    }
    renderOutsideTouchable(onTouch) {
        const view = <View style={{ flex: 1, width: '100%' }}></View>
        if (!onTouch) return view

        return (
            <TouchableWithoutFeedback onPress={onTouch} style={{ flex: 1, width: '100%' }}>
                {view}
            </TouchableWithoutFeedback>

        )
    }
    renderTitle = ()=>{
        const {title} = this.props
        return (
            <View style={{alignItems:'center'}}>
                <Text style={{color:'#182E44',fontSize:30,fontWeight:'500',marginTop:15,marginBottom:30}}>{title}</Text>
            </View>
        );
    }
    renderContent = ()=>{
        const {data} = this.props;
        return (
            <View>
                <FlatList
                style={{marginBottom:20}}
                showsVerticalScrollIndicator={false}
                data={data}
                renderItem={this.renderItem}
                extraData={data}
                keyExtractor={(item,index)=>index.toString()}
                ItemSeparatorComponent={this.renderSeparator}
                contentContainerStyle={{paddingBottom:40}}
                ></FlatList>
            </View>
        )
    }
    renderItem = ({item})=>{
        const {checker} = this.props
        const {changeFrom} = this.props
        const {changeTo} = this.props
        return(
            <Pressable onPress={()=>{checker=='From'?changeFrom(item):changeTo(item);this.close();}}>
                <View style={{height:50,flex:1,alignItems:'center',justifyContent:'center',borderColor:colorCodes.primaryClr,borderWidth:screenHeight*0.002}}>
                    <Text style={{fontSize:18,fontWeight:'normal',color:'black'}}>{item+" <=> "+currency_code2[item]}</Text>
                </View>
            </Pressable>
        )
    }
    renderSeparator = ()=>(
        <View style={{opacity:0.1,backgroundColor:'#182E44',height:1}}></View>
    )
    render() {
        let { show } = this.state;
        const { onTouchOutside, title } = this.props;

        return (
            <Modal
                animationType={'fade'}
                transparent={true}
                visible={show}
                onRequestClose={this.close}
            >
                <View style={{ flex: 1, backgroundColor: '#000000AA', justifyContent: 'flex-end' }}>
                    {this.renderOutsideTouchable(onTouchOutside)}
                    <View style={{ backgroundColor: 'white', width: '100%', borderTopLeftRadius: 10, borderTopRightRadius: 10, paddingHorizontal: 10,paddingBottom:100, maxHeight: deviceHeight*0.5}}>
                        <View>
                            {this.renderTitle()}
                            {this.renderContent()}
                        </View>
                    </View>
                </View>
            </Modal>
        );
    }
}
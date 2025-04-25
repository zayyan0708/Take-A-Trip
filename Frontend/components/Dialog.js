import { Modal, Dimensions, TouchableWithoutFeedback, StyleSheet, View, Text, Pressable } from 'react-native';
import { Component } from 'react';

const deviceHeight = Dimensions.get("window").height;
export class Dialog extends Component {
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
                <Text style={{color:'#182E44',fontSize:20,fontWeight:'500',marginTop:15,marginBottom:30}}>{title}</Text>
            </View>
        );
    }
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
                <View style={{ flex: 1, backgroundColor: '#000000AA', justifyContent: 'center'}}>
                    {this.renderOutsideTouchable(onTouchOutside)}
                    <View style={{alignItems:'flex-start',backgroundColor: 'white', width: '100%', borderTopLeftRadius: 10, borderTopRightRadius: 10, paddingHorizontal: 10, height: deviceHeight*0.5}}>
                        <View>
                            {this.renderTitle()}
                        </View>
                    </View>
                </View>
            </Modal>
        );
    }
}
import React, { Component, useState } from 'react';
import { Alert, View, SafeAreaView, TouchableOpacity, Text } from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';
import Entypo from 'react-native-vector-icons/Entypo';
import { Colors, CommonStyles, Strings, Constants } from '@common';
import styles from './style';

/*
* QRCodeScanner screen design
*/

const QRCodeScannerScreen = (props) => {

    const [scannerRef, setScannerRef] = useState(null);

    const onSuccess = e => {
        const { type } = props.route.params;
        if (type == 'product') {
            if (e && e.data != null) {
                props.navigation.navigate(Constants.Screen.ProductDetails, { scanResult: e.data, type: 'scan' });
            }
        } else {
            Alert.alert(Strings.AppName, e.data, [{ text: 'Ok', onPress: () => scannerRef.reactivate() }])
        }
    };

    return (
        <View style={CommonStyles.flexOne}>
            <SafeAreaView style={CommonStyles.backgroundPrimary} />
            <View style={[CommonStyles.header, CommonStyles.backgroundPrimary]}>
                <TouchableOpacity style={CommonStyles.headerLeftStyle}
                    onPress={() => {
                        props.navigation.goBack()
                    }}>
                    <Entypo name='chevron-left' size={30} color={Colors.White} />
                </TouchableOpacity>
                <Text style={CommonStyles.headerTitle}>Scan</Text>
                <View style={CommonStyles.headerRightStyle} />
            </View>
            <View style={CommonStyles.flexOne}>
                <QRCodeScanner
                    ref={(node) => { setScannerRef(node) }}
                    onRead={onSuccess}
                    flashMode={RNCamera.Constants.FlashMode.off}
                    style={CommonStyles.flexOne}
                    containerStyle={CommonStyles.flexOne}
                    cameraStyle={CommonStyles.flexOne}
                />
                <SafeAreaView />
            </View>
        </View>
    );
}

export default QRCodeScannerScreen;
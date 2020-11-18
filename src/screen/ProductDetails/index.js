import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, ScrollView, Modal, Image } from 'react-native';
import styles from './style';
import { Strings, CommonStyles, Colors, Utils } from '@common';
import Entypo from 'react-native-vector-icons/Entypo';
import { SliderBox } from "react-native-image-slider-box";
import ImageViewer from 'react-native-image-zoom-viewer';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Spinner } from '@component';

/*
* ProductDetails screen design
*/

const ProductDetails = (props) => {
    const [imageView, setImageView] = useState(false);
    const [productDetails, setProductDetails] = useState();
    const [currentImgIndex, setCurrentImgIndex] = useState(0);
    const [images, setImages] = useState([]);

    useEffect(() => {
        setImages([]);
        const { params } = props.route;
        let id;
        if (params.type == 'product') {
            id = params.item.id;
        } else if (params.type == 'scan') {
            id = params.scanResult;
        }
        props.getProductDetails(params.type, id);
    }, []);

    useEffect(() => {
        setProductDetails(props.productDetails);
        if (props.productDetails != null && props.productDetails != undefined) {
            setImages([{ url: `http://${props.productDetails.image}` }]);
        }
    }, [props.productDetails]);

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
                <Text style={CommonStyles.headerTitle}>{Strings.ProductDetails}</Text>
                <View style={CommonStyles.headerRightStyle} />
            </View>
            <View style={CommonStyles.flexOne}>
                {productDetails != null && productDetails != undefined && <View>
                    <ScrollView keyboardShouldPersistTaps='always' showsVerticalScrollIndicator={false} bounces={false}>
                    <Image resizeMode="contain" source={{ uri: `http://${productDetails && productDetails.image}` }} style={styles.qrcodeView} />
                        {/* <SliderBox
                            images={images}
                            sliderBoxHeight={250}
                            dotColor={Colors.Primary}
                            inactiveDotColor="#90A4AE"
                            autoplay
                            bounces={false}
                            resizeMode="contain"
                            imageLoadingColor={Colors.Primary}
                        // onCurrentImagePressed={index => {
                        //     setImageView(true);
                        //     setCurrentImgIndex(index);
                        // }}
                        /> */}
                        <View style={styles.sectionView}>
                            <Text style={styles.name}>{Utils.Capitalize(productDetails && productDetails.name)}</Text>
                            <Text style={styles.normalText}><Text style={styles.textBold}>Quantity:</Text> {productDetails && productDetails.quantity}</Text>
                            <Text style={styles.normalText}><Text style={styles.textBold}>SKU:</Text> {productDetails && productDetails.sku}</Text>
                            {
                                productDetails && productDetails.categoryInfo != null ?
                                    productDetails.categoryInfo.parent != null ?
                                        <View>
                                            <Text style={styles.normalText}><Text style={styles.textBold}>Category:</Text> {productDetails.categoryInfo.parent.title}</Text>
                                            <Text style={styles.normalText}><Text style={styles.textBold}>Sub category:</Text> {productDetails.categoryInfo.title}</Text>
                                        </View>
                                        :
                                        <Text style={styles.normalText}><Text style={styles.textBold}>Category:</Text> {productDetails.categoryInfo.title}</Text>
                                    : <View />
                            }
                            <Image source={{ uri: `http://${productDetails && productDetails.qrCode}` }} style={styles.qrcodeView} />
                        </View>
                    </ScrollView>
                    {/* <Modal visible={imageView} transparent={true}>
                        <ImageViewer imageUrls={images} index={currentImgIndex} />
                        <TouchableOpacity style={{ position: 'absolute', top: 50, right: 20 }} onPress={() => setImageView(false)}>
                            <MaterialCommunityIcons name='close' size={25} color={Colors.White} />
                        </TouchableOpacity>
                    </Modal> */}
                </View>
                }
                 {props.productDetailsLoading ? <Spinner /> : <View />}
            </View>
           
        </View>
    )
}

export default ProductDetails;
import React, { useState, useEffect } from 'react';
import { View, Text, Image, SafeAreaView, TouchableOpacity, FlatList, Alert } from 'react-native';
import styles from './style';
import { Strings, CommonStyles, Constants, Colors, Utils } from '@common';
import Entypo from 'react-native-vector-icons/Entypo';
import { Spinner } from '@component';
/*
* Product screen design
*/

const Product = (props) => {

    const [productList, setProductList] = useState([]);

    useEffect(() => {
        const { params } = props.route;
        let id;
        if (params.type == 'category') {
            id = params.categoryId;
        } else if (params.type == 'subCategory') {
            id = params.item.id;
        }
        props.getProduct(id);
    }, []);

    useEffect(() => {
        setProductList(props.productList);
    }, [props.productList]);

    const onProductClick = (item) => {
        props.navigation.navigate(Constants.Screen.ProductDetails, { item, type: 'product' });
    }

    const renderItem = (item, index) => {
        return (
            <TouchableOpacity key={index} activeOpacity={1} style={[styles.card, { marginTop: index == 0 ? 20 : 0 }]} onPress={() => onProductClick(item)}>
                <Image style={styles.image} source={{ uri: `http://${item.image}` }} />
                <View style={styles.cardContent}>
                    <Text style={styles.name}>{Utils.Capitalize(item.name)}</Text>
                    <Text style={styles.normalText}>Quantity: {item.quantity}</Text>
                    <Text style={styles.normalText}>SKU: {item.sku}</Text>
                    {
                        item.categoryInfo != null ?
                            item.categoryInfo.parent != null ?
                                <View>
                                     <Text style={styles.normalText}>Category: {item.categoryInfo.parent.title}</Text>
                                     {/* <Text style={styles.normalText}>Sub category: {item.categoryInfo.title}</Text> */}
                                </View>
                                :
                                <Text style={styles.normalText}>Category: {item.categoryInfo.title}</Text>
                            : <View />
                    }
                </View>
            </TouchableOpacity>
        )
    }
    
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
                <Text style={CommonStyles.headerTitle}>{Strings.Product}</Text>
                <View style={CommonStyles.headerRightStyle} />
            </View>
            <View style={[CommonStyles.flexOne, styles.container]}>
                {
                    productList && productList.length > 0 ?

                        <FlatList
                            data={productList}
                            showsVerticalScrollIndicator={false}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({ item, index }) => renderItem(item, index)}
                        />
                        :
                        <View style={styles.emptyView}>
                            <Text style={styles.emptyText}>{Strings.ProductEmpty}</Text>
                        </View>
                }
            </View>
            {props.productLoading ? <Spinner /> : <View />}
        </View>
    )
}

export default Product;
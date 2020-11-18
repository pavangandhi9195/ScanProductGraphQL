import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, FlatList, Alert } from 'react-native';
import styles from './style';
import { Strings, CommonStyles, Colors, Constants, Utils } from '@common';
import Entypo from 'react-native-vector-icons/Entypo';
import { Spinner } from '@component';
/*
* SubCategory screen design
*/

const SubCategory = (props) => {

    const [subCategoryList, setSubCategoryList] = useState([]);

    useEffect(() => {
        const { params } = props.route;
        if(params && params.item) {
            setSubCategoryList(params.item.children);
        }        
    //    props.getSubCategory();
    }, []);

    // useEffect(() => {
    //     setSubCategoryList(props.subCategoryList);
    // }, [props.subCategoryList]);

    const onSubCategoryClick = (item) => {
        props.navigation.navigate(Constants.Screen.Product, { item, type: 'subCategory' });
    }

    const renderItem = (item, index) => {
        return (
            <TouchableOpacity key={index} activeOpacity={1} style={[styles.card, { marginTop: index == 0 ? 20 : 0 }]} onPress={() => onSubCategoryClick(item)}>
                <Text style={styles.name}>{Utils.Capitalize(item.title)}</Text>
                <Entypo name='chevron-thin-right' size={25} color={Colors.Black} />
            </TouchableOpacity>
        )
    }
    return (
        <View style={CommonStyles.flexOne}>
            <SafeAreaView style={CommonStyles.backgroundPrimary} />
            <View style={[CommonStyles.header, CommonStyles.backgroundPrimary]}>
                <TouchableOpacity style={CommonStyles.headerLeftStyle} onPress={() => { props.navigation.goBack() }}>
                    <Entypo name='chevron-left' size={30} color={Colors.White} />
                </TouchableOpacity>
                <Text style={CommonStyles.headerTitle}>{Strings.SubCategory}</Text>
                <View style={CommonStyles.headerRightStyle} />
            </View>
            <View style={[CommonStyles.flexOne, styles.container]}>
                <FlatList
                    data={subCategoryList}
                    showsVerticalScrollIndicator={false}
                    bounces={false}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item, index }) => renderItem(item, index)} />                
            </View>
            {props.categoryLoading ? <Spinner /> : <View />}
        </View>
    )
}

export default SubCategory;
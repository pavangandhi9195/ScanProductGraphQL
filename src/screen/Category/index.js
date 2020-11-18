import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, SafeAreaView, TouchableOpacity, FlatList, Alert, Platform } from 'react-native';
import styles from './style';
import { Strings, CommonStyles, Constants, Colors, Utils } from '@common';
import { check, PERMISSIONS, openSettings, request } from 'react-native-permissions';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Spinner } from '@component';

/*
* Category screen design
*/

const Category = (props) => {

    const [search, setSearch] = useState();
    const [categoryList, setCategoryList] = useState([])

    useEffect(async () => {
        request(
            Platform.select({
                android: PERMISSIONS.ANDROID.CAMERA,
                ios: PERMISSIONS.IOS.CAMERA,
            }),
        );
        props.getCategory();
    }, []);

    useEffect(() => {
        setCategoryList(props.categoryList);
    }, [props.categoryList]);

    const onCategoryClick = (item) => {
        if (item && item.children && item.children.length > 0) {
            props.navigation.navigate(Constants.Screen.SubCategory, { item });
        } else {
            props.navigation.navigate(Constants.Screen.Product, { item, categoryId: item.id, type: 'category' });
        }
    }

    const onScanClick = () => {
        check(Platform.select({
            android: PERMISSIONS.ANDROID.CAMERA,
            ios: PERMISSIONS.IOS.CAMERA,
        })).then(
            async (results) => {
                if (results == 'granted') {
                    props.navigation.navigate(Constants.Screen.QRCodeScanner, {
                        type: 'product',
                        onQrcodeResult: (result) => onQrcodeResult(result),
                    });
                } else {
                    Alert.alert(
                        Strings.AppName,
                        'You have denied camera permission to allow you for accessing the cemera.',
                        [
                            { text: 'CANCEL', onPress: () => { } },
                            {
                                text: 'OK', onPress: () => { openSettings().catch(() => console.warn('cannot open settings')); }
                            }
                        ],
                        { cancelable: false }
                    )
                }
            },
        );
    }

    const searchFilterFunction = (text) => {
        if (text && text.length > 0) {
            const newData = props.categoryList.filter(
                function (item) {
                    const itemData = item.title
                        ? item.title.toUpperCase()
                        : ''.toUpperCase();
                    const textData = text.toUpperCase();
                    return itemData.indexOf(textData) > -1;
                });
            setCategoryList(newData);
            setSearch(text);
        } else {
            setCategoryList(props.categoryList);
            setSearch();
        }
    };

    const clearCategory = () => {
        setCategoryList(props.categoryList);
        setSearch();
    }

    const renderItem = (item, index) => {
        return (
            <TouchableOpacity key={index} activeOpacity={1} style={[styles.card, { marginTop: index == 0 ? 10 : 0 }]} onPress={() => onCategoryClick(item)}>
                <Text style={styles.name}>{Utils.Capitalize(item.title)}</Text>
                { item.children != null && item.children.length > 0 && <Entypo name='chevron-thin-right' size={25} color={Colors.Black} />}
            </TouchableOpacity>
        )
    }

    return (
        <View style={CommonStyles.flexOne}>
            <SafeAreaView style={CommonStyles.backgroundPrimary} />
            <View style={[CommonStyles.header, CommonStyles.backgroundPrimary]}>
                <View
                    style={CommonStyles.headerLeftStyle}
                />
                <Text style={CommonStyles.headerTitle}>{Strings.Category}</Text>
                <View style={CommonStyles.headerRightStyle} />
            </View>
            <View style={[CommonStyles.flexOne, styles.container]}>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.textInputStyle}
                        onChangeText={(text) => searchFilterFunction(text)}
                        value={search}
                        underlineColorAndroid="transparent"
                        placeholder="Search Here"
                    />
                    {
                        search && search.length > 0 &&
                        <TouchableOpacity style={styles.closeContainer} onPress={() => clearCategory()}>
                            <MaterialCommunityIcons name='close' size={25} color={Colors.Black} />
                        </TouchableOpacity>
                    }
                    <View style={styles.lineStyle} />
                    <TouchableOpacity onPress={() => onScanClick()}>
                        <MaterialCommunityIcons name='qrcode-scan' size={25} color={Colors.Black} />
                    </TouchableOpacity>
                </View>

                <FlatList
                    data={categoryList}
                    showsVerticalScrollIndicator={false}
                    bounces={false}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item, index }) => renderItem(item, index)}
                    ListEmptyComponent={() => {
                        return (
                            <Text style={{ marginTop: 20, textAlign: 'center' }}>{search && search.length > 0 ? 'No search data' : 'No Data Found'}</Text>
                        )
                    }}
                />
            </View>
            {props.categoryLoading ? <Spinner /> : <View />}
        </View>
    )
}

export default Category;
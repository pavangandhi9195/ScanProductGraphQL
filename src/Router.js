import React, { Component } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import CategoryScreen from './container/Category';
import SubCategoryScreen from './container/SubCategory';
import ProductDetailsScreen from './container/ProductDetails';
import ProductScreen from './container/Product';
import QRCodeScannerScreen from './container/QRCodeScanner';

const Stack = createStackNavigator();

const AppNavigation = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName={'Category'} headerMode="none">
                <Stack.Screen name='Category' component={CategoryScreen} />
                <Stack.Screen name='SubCategory' component={SubCategoryScreen} />
                <Stack.Screen name='Product' component={ProductScreen} />
                <Stack.Screen name='ProductDetails' component={ProductDetailsScreen} />
                <Stack.Screen name='QRCodeScanner' component={QRCodeScannerScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default AppNavigation;
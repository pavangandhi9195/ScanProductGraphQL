import { StyleSheet, Platform } from 'react-native';
import { Colors } from '@common';

const styleSheet = StyleSheet.create({
    container: {
        marginLeft: 20,
        marginRight: 20
    },
    card: {
        shadowColor: '#00000021',
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 0.37,
        shadowRadius: 7.49,
        elevation: 2,
        paddingLeft: 20,
        marginTop: 10,
        marginBottom: 10,
        backgroundColor: "white",
        padding: 10,
        flexDirection: 'row',
        borderRadius: 30,
    },
    name: {
        fontSize: 18,
        flex: 1,
    }
});

export default styleSheet;
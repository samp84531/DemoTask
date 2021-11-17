import React from 'react'
import { View, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Fonts from '../../configs/fonts'

const Searchbar = ({ onChangeText, value, onClear }) => {

    return (
        <View style={styles.container}>
            <TextInput
                style={{ flex: 1, height: 60, fontFamily: Fonts.Regular,fontSize:16 }}
                onChangeText={onChangeText}
                value={value}
                autoFocus={true}
                placeholder={'search'}
            />

            <TouchableOpacity
                activeOpacity={0.9}
                style={styles.iconBtn}
                onPress={onClear}
            >
                <Icon name="close" color={'black'} size={25} />
            </TouchableOpacity>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingLeft: 15,
        backgroundColor: 'rgba(0, 0, 0, 0.0)',
        paddingVertical: 20,
        // paddingHorizontal: 5
    },
    iconBtn: { height: 60, width: 60, justifyContent: 'center', alignItems: 'center' }
})

export default Searchbar
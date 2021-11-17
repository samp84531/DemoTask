import React, { useEffect, useState } from 'react'
import { View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native'
import * as Colors from '../../../configs/colors'
import Fonts from '../../../configs/fonts'

const data = [
    {
        id: 1,
        label: 'Last Match'
    },
    {
        id: 2,
        label: 'Fixtures'
    },
    {
        id: 3,
        label: 'Table'
    },
]

const TeamMatchContainer = (props) => {

    const [selcted, setSelcted] = useState(1)

    const renderData = () => {
        switch (selcted) {
            case 1:
                return (
                    <View style={styles.row}>
                        <View style={styles.box}>
                            <View style={styles.innerBox}>
                                <Image resizeMode='contain' style={styles.img} source={require('../../../assets/images/dummy-arsenal.jpg')} />
                                <Text style={styles.title}>Arsenal</Text>
                            </View>
                            <Text style={styles.count}>2</Text>
                            <Text style={styles.caption}>Nicolas Pepe 49’, 60’</Text>
                        </View>
                        <View style={{ width: 1, height: '100%', backgroundColor: Colors.primaryBorderColor }} />
                        <View style={styles.box}>
                            <View style={styles.innerBox}>
                                <Image resizeMode='contain' style={styles.img} source={require('../../../assets/images/dummy-fcb.jpg')} />
                                <Text style={styles.title}>Brighton</Text>
                            </View>
                            <Text style={styles.count}>0</Text>
                            <Text style={styles.caption}></Text>
                        </View>
                    </View>
                )
            case 2:
                return (
                    <View style={styles.row}>
                        <View style={styles.box}>
                            <View style={styles.innerBox}>
                                <Image resizeMode='contain' style={styles.img} source={require('../../../assets/images/dummy-arsenal.jpg')} />
                                <Text style={styles.title}>Arsenal</Text>
                            </View>
                            <Text style={styles.count}>2</Text>
                            <Text style={styles.caption}>Nicolas Pepe 49’, 60’</Text>
                        </View>
                        <View style={{ width: 1, height: '100%', backgroundColor: Colors.primaryBorderColor }} />
                        <View style={styles.box}>
                            <View style={styles.innerBox}>
                                <Image resizeMode='contain' style={styles.img} source={require('../../../assets/images/dummy-fcb.jpg')} />
                                <Text style={styles.title}>Brighton</Text>
                            </View>
                            <Text style={styles.count}>1</Text>
                            <Text style={styles.caption}></Text>
                        </View>
                    </View>
                )
            case 3:
                return (
                    <View style={styles.row}>
                        <View style={styles.box}>
                            <View style={styles.innerBox}>
                                <Image resizeMode='contain' style={styles.img} source={require('../../../assets/images/dummy-arsenal.jpg')} />
                                <Text style={styles.title}>Arsenal</Text>
                            </View>
                            <Text style={styles.count}>2</Text>
                            <Text style={styles.caption}>Nicolas Pepe 49’, 60’</Text>
                        </View>
                        <View style={{ width: 1, height: '100%', backgroundColor: Colors.primaryBorderColor }} />
                        <View style={styles.box}>
                            <View style={styles.innerBox}>
                                <Image resizeMode='contain' style={styles.img} source={require('../../../assets/images/dummy-fcb.jpg')} />
                                <Text style={styles.title}>Brighton</Text>
                            </View>
                            <Text style={styles.count}>2</Text>
                            <Text style={styles.caption}></Text>
                        </View>
                    </View>
                )
            default:
                break;
        }
    }

    return (
        <View style={styles.container}>

            <View style={styles.tabBox}>
                {data.map((v, i) =>
                    <TouchableOpacity activeOpacity={0.9} onPress={() => setSelcted(v.id)} style={{ marginRight: 42 }}>
                        <Text style={styles.tabLabel}>{v.label}</Text>
                        <View style={{ ...styles.borderBottomPrimary, backgroundColor: v.id == selcted ? Colors.primaryGreen : 'transparent' }} />
                    </TouchableOpacity>
                )}
            </View>

            {renderData()}
        </View >
    )
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        paddingVertical: 20
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    title: {
        fontFamily: Fonts.Regular,
        fontSize: 24,
        marginLeft: 7
    },
    count: {
        fontFamily: Fonts.Regular,
        fontSize: 24,
        fontWeight: '700',
        alignSelf: 'center',
        marginTop: 12,
        marginBottom: 28
    },
    box: {
        flex: 1
    },
    caption: {
        fontSize: 12,
        fontFamily: Fonts.Regular,
        alignSelf: 'center'
    },
    innerBox: {
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: Colors.primaryBorderColor,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 15
    },
    img: {
        height: 24,
        width: 24
    },
    tabBox: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 12
    },
    borderBottomPrimary: {
        height: 5,
        width: 49,
        borderRadius: 50,
        marginTop: 5
    },
    tabLabel: {
        fontSize: 16,
        fontFamily: Fonts.Regular,
        fontWeight: '500'
    }
})
export default TeamMatchContainer
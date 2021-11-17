import React from "react";
import {
    View,
    StyleSheet,
    Text,
    Image,
    FlatList,
    ScrollView,
} from "react-native";
import * as Colors from "../../../configs/colors";
import Fonts from "../../../configs/fonts";

const CryptoContainer = ({ data }) => {
    // console.log('data :::', data);
    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.mainTitle}>Crypto</Text>
                <View style={styles.borderBottomPrimary} />

                <ScrollView horizontal contentContainerStyle={{ marginVertical: 20 }} showsHorizontalScrollIndicator={false}>
                    <FlatList
                        data={data}
                        ListHeaderComponent={() => (
                            <View style={styles.listHeaderRow}>
                                <Text style={{ ...styles.title, width: 250, textAlign: "left" }}>
                                    Name
                                </Text>
                                <Text style={{ ...styles.title, width: 100 }}>Price</Text>
                                <Text style={{ ...styles.title, width: 100 }}>24h %</Text>
                                <Text style={{ ...styles.title, width: 100 }}>7d %</Text>
                            </View>
                        )}
                        renderItem={({ item, index }) => (
                            <View style={{ ...styles.itemRow, paddingVertical: 15 }}>
                                <View
                                    style={{ ...styles.itemRow, width: 250, flexWrap: "wrap" }}
                                >
                                    <Image
                                        style={{ height: 20, width: 20 }}
                                        source={{ uri: item.image }}
                                        resizeMode="contain"
                                    />
                                    <Text style={{ fontFamily: Fonts.Regular, marginHorizontal: 10 }}>
                                        {item.name}
                                    </Text>
                                    <Text style={{ fontFamily: Fonts.Regular, color: Colors.grey }}>
                                        {item.symbol}
                                    </Text>
                                    <Text style={styles.badge}>
                                        Buy
                                    </Text>
                                </View>
                                <Text style={styles.priceData}>$ {item.current_price}</Text>
                                <View style={styles.priceContainer}>
                                    <Image
                                        style={{
                                            ...styles.downArrow,
                                            tintColor: item.price_change_percentage_24h_in_currency < 0 ? 'red' : Colors.primaryGreen,
                                            transform: item.price_change_percentage_24h_in_currency < 0 ? [{ rotate: "0deg" }] : [{ rotate: "180deg" }]
                                        }}
                                        source={require("../../../assets/images/menuDown.png")}
                                    />
                                    <Text style={item.price_change_percentage_24h_in_currency < 0 ? styles.downText : styles.upText}>
                                        {Math.abs(parseFloat(item.price_change_percentage_24h_in_currency).toFixed(2))}
                                    </Text>
                                </View>
                                <View style={styles.priceContainer}>
                                    <Image
                                        style={{
                                            ...styles.downArrow,
                                            tintColor: item.price_change_percentage_7d_in_currency < 0 ? 'red' : Colors.primaryGreen,
                                            transform: item.price_change_percentage_7d_in_currency < 0 ? [{ rotate: "0deg" }] : [{ rotate: "180deg" }]
                                        }}
                                        source={require("../../../assets/images/menuDown.png")}
                                    />
                                    <Text style={item.price_change_percentage_7d_in_currency < 0 ? styles.downText : styles.upText}>
                                        {Math.abs(parseFloat(item.price_change_percentage_7d_in_currency).toFixed(2))}
                                    </Text>
                                </View>
                            </View>
                        )}
                        keyExtractor={(item, index) => index.toString()}
                        ItemSeparatorComponent={() => (
                            <View
                                style={{ height: 1, backgroundColor: Colors.lightBorderColor }}
                            />
                        )}
                    />
                </ScrollView>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        paddingVertical: 20,
    },
    borderBottomPrimary: {
        height: 5,
        width: 49,
        borderRadius: 50,
        marginTop: 5,
        backgroundColor: Colors.primaryGreen,
    },
    itemRow: {
        flexDirection: "row",
        alignItems: "center",
    },
    mainTitle: {
        fontFamily: Fonts.Regular,
        fontSize: 16,
        fontWeight: "500",
    },
    title: {
        fontFamily: Fonts.Regular,
        fontSize: 16,
        textAlign: "right",
    },
    priceData: { width: 100, textAlign: "right", fontFamily: Fonts.Regular },
    priceContainer: {
        flexDirection: "row",
        width: 100,
        justifyContent: "flex-end",
        alignItems: "center",
    },
    downArrow: {
        height: 5,
        width: 5,
        bottom: -2,
        tintColor: Colors.primaryGreen,
    },
    listHeaderRow: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: Colors.lightBorderColor,
    },
    badge: {
        backgroundColor: Colors.lightGrey,
        fontFamily: Fonts.Regular,
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 20,
        marginHorizontal: 10,
    },
    upText: {
        fontFamily: Fonts.Regular,
        color: Colors.primaryGreen,
    },
    downText: {
        fontFamily: Fonts.Regular,
        color: Colors.redColor,
    }
});
export default CryptoContainer;
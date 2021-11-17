import React from "react";
import {
    View,
    StyleSheet,
    Text,
    Image,
    FlatList,
} from "react-native";
import * as Colors from "../../../configs/colors";
import Fonts from "../../../configs/fonts";

const data = [
    {
        id: 1,
        count: "1,114",
        label: "played",
    },
    {
        id: 2,
        count: "597",
        label: "wins",
    },
    {
        id: 3,
        count: "236",
        label: "losses",
    },
    {
        id: 4,
        count: "1,956",
        label: "goals",
    },
    {
        id: 5,
        count: "1,100",
        label: "conceded",
    },
    {
        id: 6,
        count: "423",
        label: "clean sheets",
    },
];

const StatisticsContainer = (props) => {
    return (
        <View style={styles.container}>
            <View style={{ marginVertical: 20 }}>
                <View style={styles.rowJustyfy}>
                    <View style={styles.rowCenter}>
                        <Text style={styles.title}>Statistics</Text>
                        <Text style={styles.text}> for </Text>
                        <Text style={styles.title}>2021/2022</Text>
                    </View>
                    <View style={styles.rowCenter}>
                        <Text style={styles.underLineText}>change season</Text>
                        <Image
                            source={require("../../../assets/images/menuDown.png")}
                            style={{ height: 8, width: 8 }}
                        />
                    </View>
                </View>
                <View style={styles.borderBottomPrimary} />
            </View>
            <FlatList
                data={data}
                numColumns={3}
                renderItem={({ item, index }) => (
                    <View style={{ ...styles.itemBox, marginLeft: index % 3 ? 10 : 0 }}>
                        <View style={styles.itemInnerBox}>
                            <Text style={styles.itemCount}>{item.count}</Text>
                        </View>
                        <Text style={styles.itemLabel}>{item.label}</Text>
                    </View>
                )}
                keyExtractor={(item, index) => index.toString()}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
    },
    rowJustyfy: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    rowCenter: {
        flexDirection: "row",
        alignItems: "center"
    },
    borderBottomPrimary: {
        height: 5,
        width: 49,
        borderRadius: 50,
        marginTop: 5,
        backgroundColor: Colors.primaryGreen,
    },
    underLineText: {
        fontSize: 14,
        fontFamily: Fonts.Light,
        textDecorationLine: "underline",
    },
    title: {
        fontSize: 14,
        fontFamily: Fonts.Regular,
        fontWeight: "500",
    },
    text: {
        fontSize: 14,
        fontFamily: Fonts.Light,
    },

    itemBox: {
        flex: 1,
        marginLeft: 10,
        marginBottom: 10,
    },
    itemInnerBox: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 1,
        borderColor: Colors.lightBorderColor,
    },
    itemCount: {
        fontFamily: Fonts.Regular,
        fontSize: 35,
        paddingVertical: 21,
    },
    itemLabel: {
        fontFamily: Fonts.Regular,
        fontSize: 14,
        alignSelf: "center",
        marginTop: 10,
    }
});
export default StatisticsContainer;
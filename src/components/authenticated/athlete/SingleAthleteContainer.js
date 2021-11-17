import React, { useEffect, useState } from 'react'
import { View, StyleSheet, Text, Image } from 'react-native'
import { primaryBorderColor, primaryWhite } from '../../../configs/colors';
import { singleTeamAthleteDetails } from '../../../utils/apiService';
import { BACKEND_BASE_URL } from '../../../configs/serverApis';
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import Fonts from '../../../configs/fonts';

const singleAthleteContainer = (props) => {

	const { selectedId } = props;
    const [selectedAthleteInfo, setSelectedAthleteInfo] = useState(null);
    const [isLoading, setLoading] = useState(true);

    /**
     * function to run on change of Athlete selection from the slider
     */
    useEffect(() => {
        if(selectedId){
            (async () => { // Self invoked function with async
                try {
                    const res = await singleTeamAthleteDetails(selectedId);
                    if (res && res.status === 200 && res.data) {
                        setSelectedAthleteInfo(res.data);
                        setLoading(false)
                    }
                    return true;
                } catch (error) {
                    console.log('error', error.response);
                    setLoading(false)
                    return false;
                }
            })();
        }
    }, [selectedId]);

    return(
        <View>
            <View style={styles.athleteInfoContainer}>
                {isLoading ?
                    <SkeletonPlaceholder>
                        <View style={{ width: 100, height: 100, borderRadius: 50 }} />
                    </SkeletonPlaceholder>
                : 
                    <Image style={styles.athleteImage} source={{uri: `${selectedAthleteInfo ? BACKEND_BASE_URL+selectedAthleteInfo.logo : null}`}} resizeMode='contain' />
                }
                {isLoading ?
                    <SkeletonPlaceholder>
                        <View style={{ width: 120, height: 20, borderRadius: 4, marginTop: 20 }} />
                    </SkeletonPlaceholder>
                :
                    <Text style={styles.athleteTitle}>{selectedAthleteInfo ? selectedAthleteInfo.name : null}</Text>
                }
                <View style={styles.athleteBioContainer}>
                    <View>
                        <Text style={styles.athleteInfoTHead}>Height</Text>
                        <Text style={styles.athleteInfoTHead}>Weight</Text>
                        <Text style={styles.athleteInfoTHead}>Home Town</Text>
                    </View>
                    <View style={{paddingLeft: 15}}>
                        <Text style={styles.athleteInfoTData}>6’0</Text>
                        <Text style={styles.athleteInfoTData}>235lbs</Text>
                        {isLoading ?
                            <SkeletonPlaceholder>
                                <View style={{ width: '100%', height: 20, borderRadius: 4 }} />
                            </SkeletonPlaceholder>
                        :
                            <Text style={styles.athleteInfoTData}>{selectedAthleteInfo ? `${selectedAthleteInfo.city}, ${selectedAthleteInfo.country}` : null}</Text>
                        }
                    </View>
                </View>
            </View>
            <View style={styles.athleteDescriptionContainer}>
                {isLoading ?
                    <SkeletonPlaceholder>
                        <View style={{ width: 120, height: 20, borderRadius: 4, marginTop: 10 }} />
                        <View style={{ width: 120, height: 20, borderRadius: 4, marginTop: 10 }} />
                        <View style={{ width: 120, height: 20, borderRadius: 4, marginTop: 10 }} />
                    </SkeletonPlaceholder>
                :
                    <Text style={styles.athleteDescriptionText}>{selectedAthleteInfo ? selectedAthleteInfo.description : null}</Text>
                }
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
	athleteBioContainer: {
		flexDirection: "row", 
		alignSelf: "center",
		justifyContent: "center"
		//marginVertical: 40
	},
	athleteInfoContainer: {
		backgroundColor: primaryWhite, 
		borderWidth: 1, 
		borderColor: primaryBorderColor, 
		margin: 20, 
		borderRadius: 10, 
		alignItems: "center", 
		padding: 20,
	},
	athleteImage: {
		marginBottom: 25, 
		borderRadius: 50,
		width: 100,
		height:100
	},
	athleteTitle: {
		fontSize: 24,
        fontFamily:Fonts.Regular,
		fontWeight: "800", 
		marginBottom: 10
	},
	athleteInfoTHead: {
		fontSize: 13, 
		textAlign: "right",
        fontWeight: "bold", 
	},
	athleteInfoTData:{
		fontSize: 12
	},
	athleteDescriptionContainer: {
		padding: 20, 
		paddingTop: 0
	},
	athleteDescriptionText: {
		fontSize: 16,
        fontFamily:Fonts.Regular
	}
})
export default singleAthleteContainer

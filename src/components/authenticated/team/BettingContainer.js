import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  ScrollView,
  FlatList,
} from 'react-native';
import * as Colors from '../../../configs/colors';
import Fonts from '../../../configs/fonts';

const BettingContainer = props => {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>Betting</Text>
        <View style={styles.borderBottomPrimary} />
        <View style={styles.root}>
          <View style={{height:'100%',width:'50%',flexDirection:'row',alignItems:'center',
              paddingHorizontal: 20,
          backgroundColor:Colors.darkBlue}}>
          <Image
            source={require('../../../assets/images/giftbox.png')}
            style={{height: 25, width: 25, tintColor: 'white'}}
          />
          <Text style={styles.textStyle}>Free Bets</Text>
          </View>

        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}>
          <FlatList
            // numColumns={12}
            scrollEnabled={true}
            showsHorizontalScrollIndicator={false}
            data={[{}, {}, {}, {}, {}]}
            ListHeaderComponent={() => (
              <View style={styles.listHeaderRow}>
                <View style={[styles.imgRoot,{backgroundColor:Colors.yellow}]}>
                  <Image style={styles.imgView} source={require('../../../assets/images/energy.png')}></Image>
                </View>
                <View style={[styles.imgRoot,{backgroundColor:Colors.yellow}]}>
                  <Image style={styles.imgView} source={require('../../../assets/images/energy.png')}></Image>
                </View>
                <View style={[styles.imgRoot,{backgroundColor:Colors.yellow}]}>
                  <Image style={styles.imgView} source={require('../../../assets/images/energy.png')}></Image>
                </View>
                <View style={[styles.imgRoot,{backgroundColor:Colors.yellow}]}>
                  <Image style={styles.imgView} source={require('../../../assets/images/energy.png')}></Image>
                </View>
                <View style={[styles.imgRoot,{backgroundColor:Colors.yellow}]}>
                  <Image style={styles.imgView} source={require('../../../assets/images/energy.png')}></Image>
                </View>

                <View style={[styles.imgRoot,{backgroundColor:Colors.primaryWhite,elevation:1}]}>
                  <Image style={[styles.imgView,{tintColor:Colors.lightGrey}]} source={require('../../../assets/images/energy.png')}></Image>
                </View>

                <View style={[styles.imgRoot,{backgroundColor:Colors.yellow}]}>
                  <Image style={styles.imgView} source={require('../../../assets/images/energy.png')}></Image>
                </View>
                <View style={[styles.imgRoot,{backgroundColor:Colors.yellow}]}>
                  <Image style={styles.imgView} source={require('../../../assets/images/energy.png')}></Image>
                </View>

                <View style={[styles.imgRoot,{backgroundColor:Colors.primaryWhite,elevation:1}]}>
                  <Image style={[styles.imgView,{tintColor:Colors.lightGrey}]} source={require('../../../assets/images/energy.png')}></Image>
                </View>
                <View style={[styles.imgRoot,{backgroundColor:Colors.primaryWhite,elevation:1}]}>
                  <Image style={[styles.imgView,{tintColor:Colors.lightGrey}]} source={require('../../../assets/images/energy.png')}></Image>
                </View>
                <View style={[styles.imgRoot,{backgroundColor:Colors.primaryWhite,elevation:1}]}>
                  <Image style={[styles.imgView,{tintColor:Colors.lightGrey}]} source={require('../../../assets/images/energy.png')}></Image>
                </View>
                <View style={[styles.imgRoot,{backgroundColor:Colors.primaryWhite,elevation:1}]}>
                  <Image style={[styles.imgView,{tintColor:Colors.lightGrey}]} source={require('../../../assets/images/energy.png')}></Image>
                </View>

              </View>
            )}
            renderItem={({item, index}) => (
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  width: '100%',
                  //   margin:6
                }}>
                <View style={styles.viewButton}>
                  <Text style={styles.viewText}>
                    {index + '1' + '/' + '2' + index}
                  </Text>
                </View>
                <View style={styles.viewButton}>
                  <Text style={styles.viewText}>
                    {index + '1' + '/' + '2' + index}
                  </Text>
                </View>
                <View style={styles.viewButton}>
                  <Text style={styles.viewText}>
                    {index + '3' + '/' + '6' + index}
                  </Text>
                </View>
                <View style={styles.viewButton}>
                  <Text style={styles.viewText}>
                    {index + '1' + '/' + '2' + index}
                  </Text>
                </View>
                <View style={styles.viewButton}>
                  <Text style={styles.viewText}>
                    {index + '5' + '/' + '2' + index}
                  </Text>
                </View>
                <View style={styles.viewButton}>
                  <Text style={styles.viewText}>
                    {index + '1' + '/' + '2' + index}
                  </Text>
                </View>
                <View style={styles.viewButton}>
                  <Text style={styles.viewText}>
                    {index + '1' + '/' + '9' + index}
                  </Text>
                </View>
                <View style={styles.viewButton}>
                  <Text style={styles.viewText}>
                    {index + '7' + '/' + '2' + index}
                  </Text>
                </View>
                <View style={styles.viewButton}>
                  <Text style={styles.viewText}>
                    {index + '1' + '/' + '2' + index}
                  </Text>
                </View>
                <View style={styles.viewButton}>
                  <Text style={styles.viewText}>
                    {index + '0' + '/' + '2' + index}
                  </Text>
                </View>
                <View style={styles.viewButton}>
                  <Text style={styles.viewText}>
                    {index + '1' + '/' + '6' + index}
                  </Text>
                </View>
                <View style={styles.viewButton}>
                  <Text style={styles.viewText}>
                    {index + '1' + '/' + '6' + index}
                  </Text>
                </View>
              </View>
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    width: '100%',
    backgroundColor: Colors.primaryGreen,
    height: 40,
    marginTop: 25,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',

  },
  container: {
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 14,
    fontFamily: Fonts.Regular,
    fontWeight: '600',
  },
  borderBottomPrimary: {
    height: 5,
    width: 49,
    borderRadius: 50,
    marginTop: 5,
    backgroundColor: Colors.primaryGreen,
  },
  textStyle: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  listHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
  },
  viewButton: {
    marginHorizontal: 1,
    marginVertical: 2,
    height: 60,
    width: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderRadius: 5,
    borderColor: Colors.lightGrey,
  },
  viewText: {
    fontSize: 12,
    fontFamily: Fonts.Regular,
  },
  imgRoot: {
      height:46,width:46,borderRadius:23,justifyContent:'center',alignItems:'center',marginLeft:15
  },
  imgView: {
      height:25,width:25
  },
});
export default BettingContainer;

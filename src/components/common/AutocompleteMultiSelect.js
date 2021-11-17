import React, {useState, useRef, useCallback, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  ScrollView,
} from 'react-native';

import _ from 'lodash';
import {
  alphaBlack3perct,
  lightGrey,
  primaryBlack,
  primaryGreen,
  primaryWhite,
} from '../../configs/colors';
import ModedText from '../../components/typography/ModedText';
import {fetchSportTeamsById} from '../../utils/apiService';
import axios from 'axios';
import Fonts from '../../configs/fonts';

const AutocompleteMultiSelect = ({
  progressingSport,
  setSelectedItemsToSport,
  resizeContainerImage,
}) => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [results, setResults] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleChange = text => {
    resizeContainerImage(true);
    setSearchText(text);
    debounce(text, progressingSport);
  };

  const clearSearchInputAndItems = () => {
    resizeContainerImage(false);
    setSearchText('');
    setResults([]);
  };

  const debounce = useCallback(
    _.debounce(async (_searchVal, mainSport) => {

      setLoading(true);
      if (_searchVal) {
        let res = await fetchSportTeamsById(mainSport.id, _searchVal);
        if (
          res &&
          res.status == 200 &&
          res.data &&
          res.data.data &&
          res.data.data.length > 0
        ) {
          setResults(res.data.data);
          setLoading(false);
        } else {
          setResults([]);
          setLoading(false);
        }
      } else {
        setResults([]);
        setLoading(false);
      }
    }, 1000),
    [],
  );

  useEffect(() => {
    console.log('');
  }, [loading]);

  const addToSelectedItems = item => {
    let oldItems = selectedItems;
    let findedIndex = selectedItems.findIndex(i => i.id === item.id);
    if (findedIndex >= 0) {
      oldItems.splice(findedIndex, 1);
    } else {
      oldItems.push(item);
    }
    setSelectedItems(oldItems);
    setSelectedItemsToSport(oldItems);
    setRefresh(!refresh);
  };

  const removeItemFromSelected = item => {
    _.remove(selectedItems, {id: item.id});
    setSelectedItems(selectedItems);
    setRefresh(!refresh);
  };

  const renderItem = ({item, index}) => (
    <View style={styles.chipItem}>
      <ModedText style={styles.chipItemText}>{item.name}</ModedText>
      <TouchableOpacity onPress={() => removeItemFromSelected(item)}>
        <Image
          resizeMode="contain"
          style={styles.xmarkIcon}
          source={require('../../assets/images/x-mark.png')}
        />
      </TouchableOpacity>
    </View>
  );

  const RenderItemComponent = ({item, index}) => {
    return (
      <View style={styles.chipItem}>
        <ModedText style={styles.chipItemText}>{item.name}</ModedText>
        <TouchableOpacity onPress={() => removeItemFromSelected(item)}>
          <Image
            resizeMode="contain"
            style={styles.xmarkIcon}
            source={require('../../assets/images/x-mark.png')}
          />
        </TouchableOpacity>
      </View>
    );
  };

  const RenderTickMark = ({item}) => {
    let findedIndex = selectedItems.findIndex(i => i.id === item.id);
    if (findedIndex >= 0) {
      return (
        <>
          <ModedText style={styles.itemText}>{item.name}</ModedText>
          <Image
            resizeMode="contain"
            style={{width: 14, height: 10}}
            source={require('../../assets/images/tick-mark.png')}
          />
        </>
      );
    } else {
      return <ModedText style={styles.itemText1}>{item.name}</ModedText>;
    }
    return null;
  };

  useEffect(() => {
    clearSearchInputAndItems();
    setSelectedItems([]);
  }, [progressingSport]);

  return (
    <View>
      <View style={styles.mainWrapper}>
        <View style={styles.searchFieldWrapper}>
          <TextInput
            style={styles.searchField}
            placeholder="type the name of the club"
            onChangeText={handleChange}
            defaultValue={searchText}
            autoFocus
          />
          {!searchText || searchText == null ? (
            <Image
              resizeMode="contain"
              style={styles.searchIcon}
              source={require('../../assets/images/searchIcon.png')}
            />
          ) : (
            <TouchableOpacity onPress={() => clearSearchInputAndItems()}>
              <Image
                resizeMode="contain"
                style={styles.xmarkIcon}
                source={require('../../assets/images/x-mark.png')}
              />
            </TouchableOpacity>
          )}
        </View>
        {results && results.length > 0 ? (
          <View style={styles.autoCompleteList}>
            <ScrollView
              keyboardShouldPersistTaps="handled"
              nestedScrollEnabled={true}
              style={styles.autoCompleteListScrollView}>
              {results &&
                results.map((item, i) => (
                  <TouchableOpacity
                    onPress={() => addToSelectedItems(item)}
                    key={i}>
                    <View style={styles.autoCompleteListItem} key={i}>
                      <Image
                        resizeMode="contain"
                        style={styles.itemLogoImage}
                        source={{uri: 'https://Demo.social' + item.logo}}
                      />
                      <RenderTickMark item={item} />
                    </View>
                  </TouchableOpacity>
                ))}
            </ScrollView>
          </View>
        ) : (
          <>
            {loading ? (
              <View style={[styles.autoCompleteList, {paddingVertical: 20}]}>
                <ActivityIndicator size={25} color={primaryGreen} />
              </View>
            ) : (
              <View style={[styles.autoCompleteList, {paddingVertical: 20}]}>
                <Text style={{fontFamily: Fonts.Regular, textAlign: 'center'}}>
                  {searchText.length>0?"no data found":"type something to begin.."}
                </Text>
              </View>
            )}
          </>
        )}
      </View>
      <View style={styles.chipItems}>
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            alignContent: 'center',
            width: 900,
          }}
          horizontal={true}>
          {selectedItems.map((post, index) => (
            <RenderItemComponent item={post} index={index} key={index} />
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainWrapper: {
    backgroundColor: alphaBlack3perct,
    paddingHorizontal: 20,
    paddingVertical: 20,
    marginTop: 30,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    minHeight: 123,
  },
  searchField: {
    height: 40,
    fontStyle: 'normal',
    fontFamily: Fonts.Regular,
    width: '86%',
    // transform: [{ skewX: '+5deg' }],
    color: primaryBlack,
  },
  searchIcon: {
    height: 24,
    width: 24,
    // transform: [{ skewX: '+5deg' }],
    marginRight: 35,
    marginLeft: 15,
  },
  xmarkIcon: {
    height: 12,
    width: 12,
    // transform: [{ skewX: '+5deg' }],
    marginRight: 35,
    marginLeft: 15,
  },
  searchFieldWrapper: {
    borderColor: '#F4F4F4',
    backgroundColor: primaryWhite,
    borderWidth: 1,
    // transform: [{ skewX: '-7deg' }],
    paddingHorizontal: 28,
    paddingVertical: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  autoCompleteList: {
    backgroundColor: primaryWhite,
    width: '100%',
    marginTop: 10,
    elevation: 3,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    shadowColor: '#ddd',
    shadowOffset: {width: 0, height: 10},
    shadowOpacity: 0.5,
    shadowRadius: 6,
    elevation: 0,
  },
  autoCompleteListScrollView: {
    maxHeight: 250,
    overflow: 'hidden',
  },
  autoCompleteListItem: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden',
    zIndex: 30,
  },
  itemLogoImage: {
    width: 25,
    height: 25,
    marginRight: 12,
  },
  itemText: {
    fontSize: 18,
    width: '80%',
    fontWeight: '700',
    fontFamily: Fonts.Regular,
  },
  itemText1: {
    fontSize: 16,
    width: '80%',
  },
  chipItems: {
    zIndex: -1,
    marginTop: 15,
  },
  chipItem: {
    width: 205,
    height: 65,
    backgroundColor: '#fff',
    borderRadius: 5,
    marginLeft: 20,
    // transform: [{ skewX: '-5deg' }],
    borderColor: primaryGreen,
    borderWidth: 2,
    alignItems: 'center',
    marginBottom: 12,
    flexDirection: 'row',
    paddingHorizontal: 8,
  },
  chipItemText: {
    fontSize: 17,
    fontWeight: '700',
    fontFamily: Fonts.Regular,
    width: '80%',
  },
  lazyView: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 250,
  },
});

export default AutocompleteMultiSelect;

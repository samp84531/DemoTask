import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ScrollView } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { fetchSports } from '../../utils/apiService'
import SportItem from './SportItem'
import ModedText from '../typography/ModedText'
import { loadSelectedSports } from '../../redux/actions/RegisterAction'
import SkeletonPlaceholder from "react-native-skeleton-placeholder";


const SelectSportsItems = () => {
  const dispatch = useDispatch()
  const [error, setError] = useState(false)
  const [refresh, setRefresh] = useState(false)
  const [items, setItems] = useState([])
  const [isLoading, setLoading] = useState(true);

  const selectSports = async (item, index) => {
    items[index].selected = !items[index].selected;
    items[index].processItem = false;
    setItems(items)
    let selectedItems = items.filter((filteredItem) => filteredItem.selected == true)
    dispatch(loadSelectedSports(selectedItems))
    setRefresh(!refresh)
  }

  const renderItem = ({ item, index }) => (
    <TouchableOpacity onPress={() => selectSports(item, index)} style={styles.sportItem}> 
      <SportItem item={item} status={item && item.selected ? true : false}/>
    </TouchableOpacity>
  );

  const RenderComponent = ({ item, index }) => {
    return (
      <TouchableOpacity onPress={() => selectSports(item, index)} style={styles.sportItem}> 
        <SportItem item={item} status={item && item.selected ? true : false}/>
      </TouchableOpacity>
    )
  }

  const fetchSportsFromApi = async () => {
    let res = await fetchSports()
    if (res && res.status === 200 && res.data && res.data.data) {
      setItems(res.data.data);
      setLoading(false)
    } else {
      setError(true)
      setLoading(false)
    }
  }
  useEffect(() => {
    fetchSportsFromApi()
  },[])

   /** initialize shimmer effect in case of api data loading */
   if(isLoading){
    return (
      <SkeletonPlaceholder>
        <View style={{flexWrap: "wrap", flexDirection: "row"}}>
          <View style={{ width: 140, height: 70, borderRadius: 5, margin: 10 }} />
          <View style={{ width: 140, height: 70, borderRadius: 5, margin: 10 }} />
          <View style={{ width: 140, height: 70, borderRadius: 5, margin: 10 }} />
          <View style={{ width: 140, height: 70, borderRadius: 5, margin: 10 }} />
        </View>
      </SkeletonPlaceholder>
    )
  }
  
  if (items && items.length > 0) {
    return (
      <ScrollView nestedScrollEnabled = {true} contentContainerStyle={{ flexDirection: "row", flexWrap: 'wrap', alignContent: "center", width: 900}} horizontal={true}>
        {items.map((post, index) => (
          <RenderComponent item={post} index={index} key={index}/>
        ))}
      </ScrollView>
    )
  }

  if (error) {
    return <ModedText>Some error. Please contact administrator</ModedText>
  }
  return null
}

const styles = StyleSheet.create({
  sportsList: {
    flexDirection: 'row'
  },
  sportItem: {
    marginRight: 5,
    marginBottom: 12
  }
})

export default SelectSportsItems
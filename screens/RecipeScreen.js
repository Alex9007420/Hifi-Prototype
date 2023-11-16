import React from 'react';
import { StyleSheet, View, Text, TextInput, ScrollView, Image, TouchableOpacity, Pressable } from 'react-native';
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs"
import Infoscreen from './InfoScreen';
import CookScreen from './CookScreen';
import MenuScreen from './MenuScreen';
import SettingsScreen from './SettingsScreen';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Tools from '../components/Tools';
import RecipeData from '../data';
import Ingredients from '../components/Ingredients';
import IngredientsData from '../IngredientsData';


export default function Recipe({route, navigation}){
  const Data = RecipeData.find((item) => item.id == route.params.id);
  // const iData = IngredientsData.filter((item) => Data.ingredients.includes(item.id));
  return (
    <ScrollView>
      <Text style={styles.recipeHeader}>{Data.name}</Text>
      <Image style={styles.imageItem} source={{ uri: Data.src}}/>
      {
        Data.details.map((item) => <Text>Detail: {item}</Text>)
      }
      <Tools index={Data.id}/>
      <Text>Estimated preparation time: {Data.time}</Text>
      { Data.ingredients.map((item) => (
        <View>
          <Text>{item}</Text>
          <Ingredients category={item}/>
        </View>
      ))}
      <Pressable style={styles.dashboard}
        onPress={()=> navigation.navigate("CookingMode", {
          id: Data.id
        })}>
        <View style={styles.iconContainer}>
         <Text style={styles.iconText}>Cooking Mode</Text>
        </View>
      </Pressable>
    </ScrollView>
  )
}


const styles = StyleSheet.create({
  recipeHeader: {
    fontSize: 24,
    color: 'red',
    fontWeight: 'bold'
  },
  container: {
    flex: 1,
    marginTop: 30,
  },
  searchContainer: {
    padding: 10,
    backgroundColor: '#fff',
  },
  searchInput: {
    height: 40,
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
    paddingLeft: 10,
  },
  dashboard: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    padding: 5,
  },
  imageItem: {
    height: 160,
    margin: 5,
    width: '45%', // Approximately 2 columns, depending on container width
    borderRadius: 10,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e1e1e1',
    paddingVertical: 10,
    paddingBottom: 20, // Padding to avoid overlap with home gesture
  },
  iconContainer: {
    alignItems: 'center',
  },
  iconText: {
    fontSize: 16,
  },
});
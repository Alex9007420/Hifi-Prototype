import React, {useState, useEffect} from 'react';
import { StyleSheet, View, Text, FlatList, Dimensions, TextInput, ScrollView, Image, TouchableOpacity, Pressable } from 'react-native';
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs"
import Infoscreen from './InfoScreen';
import CookScreen from './CookScreen';
import MenuScreen from './MenuScreen';
import SettingsScreen from './SettingsScreen';
import Tools from '../components/Tools';
import RecipeData from '../data';
import Ingredients from '../components/Ingredients';
import IngredientsData from '../IngredientsData';
// TODO: only import what is actually needed
const {width, height} = Dimensions.get('window')

export default function CookingMode ({route}){
    const ids = route.params.ids;
    console.log(ids);
   
    const Data = IngredientsData.filter((item) => route.params.ids.includes(item.id));
    console.log(Data.length)
    
    return (
        <FlatList
            horizontal //={true}
            pagingEnabled //={true}
            data={Data}
            contentContainerStyle={{alignItems: "stretch"}}
            style={styles.CookingMode}
            keyExtractor={IngredientsData => IngredientsData.id}
            showsHorizontalScrollIndicator={false}
            renderItem={({item}) => {
              //const steps = IngredientsData.find((item) => item.category == Data.ingredients[0]);
              return (
                  <View style={styles.imageContainer}>
                      <Image style={styles.image} source={{uri: item.picture}} />
                      <ScrollView contentContainerStyle={styles.CookingMode}>
                          <Text >
                              {item.name}
                          </Text>
                          <View style={styles.searchContainer}>
                            <Ingredient index={item.id}/>
                          </View>
                      </ScrollView>
                  </View>
              );
            }}
        />
    ) ;
}
const Ingredient = ({ index }) => {
  const iData = IngredientsData.find((item) => item.id === index);

  return (
    <View style={styles.container}>
      <Text>{iData.name}</Text>
      <Image style={styles.imageItem} source={{ uri: iData.src }} />
      {iData.ingredients.map((bla, index) => (
        <Text key={index}>{bla}</Text>
      ))}
    </View>
  );
};


// TODO: add correct styles; just copy pasted the styles for now
const styles = StyleSheet.create({
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
      // flexDirection: 'row',
      // flexWrap: 'wrap',
      // justifyContent: 'space-around',
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
    CookingMode: {
        width: width, // important for flatlist
        paddingToppadding: 0,
        backgroundColor: '#080',
    },
    imageContainer: {
        flex: 1, // important for flatlist
        width: width,
    },
    image: {
        height: 120,
        // width: '100%', 
    },
    });

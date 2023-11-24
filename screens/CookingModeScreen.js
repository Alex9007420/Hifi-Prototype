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
import styles from '../components/Styles';
// TODO: only import what is actually needed
const {width, height} = Dimensions.get('window')

export default function CookingMode ({route}){
  const ids = route.params.ids;
  
  
  //console.log(ids);
  
  
  // Filter IngredientsData based on the provided ids
  const Data = IngredientsData.filter((item) => ids.includes(item.id));
  
  // Order the Data list based on the order of ids
  const orderedData = ids.map((id) => Data.find((item) => item.id === id));
  
  
  //console.log(orderedData.length);
  
    return (
        <FlatList
            horizontal //={true}
            pagingEnabled //={true}
            data={orderedData}
            contentContainerStyle={{alignItems: "stretch"}}
            style={styles.CookingMode}
            keyExtractor={IngredientsData => IngredientsData.id}
            showsHorizontalScrollIndicator={false}
            renderItem={({item}) => {
              //const steps = IngredientsData.find((item) => item.category == Data.ingredients[0]);
              return (
                <View style={styles.CookingMode}>
                  <Text style={styles.subheader}>
                      {item.name}
                  </Text>
                  <ScrollView contentContainerStyle={styles.ingredientsContainer}>
                    <View style={styles.ingredientImageContainer}>
                      <Image style={styles.ingredientImage} source={{uri: item.picture}} />
                  
                    <Text style={styles.ingredientHeading}>
                      Ingredients
                    </Text>
                    <Ingredient index={item.id}/>
                    <Text style={styles.ingredientHeading}>Step-by-step instructions</Text>
                      {
                      item.cookingstep.map((step, index) =>
                        <View key={index} style={styles.stepContainer}>
                          <Text style={styles.stepNumber}>{index + 1}.</Text>
                          <Text style={styles.stepText}>{step}</Text>
                        </View>
                      )}
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
    <View style={styles.ingredientTextContainer}>
      <View style={styles.ingredientPadding}>
        {
          iData.ingredients.map((ingredient, index) => (
            <Text key={index} style={styles.ingredientText}>{ingredientQuantity(ingredient)}</Text>
          ))
        }
        </View>
        <View style={styles.ingredientPadding}>
        {
          iData.ingredients.map((ingredient, index) => (
            <Text>{ingredientDescription(ingredient)}</Text>
          ))
        }
        </View>
      </View>
  );
};


// TODO: add correct styles; just copy pasted the styles for now
/* const styles = StyleSheet.create({
  CookingMode: {
    flex: 1, // important for flatlist
    width: width,
    backgroundColor: '#000',
  },
  titel: {
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: '#111',
    padding: 10,
    borderWidth: 1,
    borderColor: '#fff',
  },
  image: {
    height: 120,
    // width: '100%', 
  },
  ingredientsContainer: {
    width: width, // important for flatlist
    paddingToppadding: 0,
    backgroundColor: '#111',
    borderWidth: 1,
    borderColor: '#fff',
  },
  searchContainer: {
    padding: 10,
  },
  ingredients: {
    backgroundColor: '#111',
    fontSize: 12,
    color: 'white',
    //textAlign: 'center',
    userSelect: 'text',
    padding: 2,
  },
  ingredientsTitel: {
    backgroundColor: '#111',
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
    userSelect: 'text',
    padding: 10,
  },
  stepContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 5,
  },
  stepNumber: {
    color: 'white',
    fontWeight: 'bold',
    marginRight: 5,
    marginLeft: 10,
  },
  stepText: {
    color: 'white',
    flex: 1,
  },
  }); */

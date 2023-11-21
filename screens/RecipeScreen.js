import React,{useState} from 'react';
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
import RecipeTitleCard from '../components/RecipeTitleCard';


export default function Recipe({route, navigation}){
  const recipe = RecipeData.find((item) => item.id == route.params.id);
  const ingredients = IngredientsData.filter((item) => recipe.ingredients.includes(item.id));
  const [cookingIng, setcookingIng] = useState([]);
  return (
    <ScrollView>

      {/* TITLE CARD */}

      <RecipeTitleCard
        style={{  fontSize: 26 }}
        source={{ uri: recipe.src }} // Replace with your image source
        text={recipe.name}
        //width={425} // TODO: is this default width guaranteed to be 100% ?
        height={250} // TODO: units/responsiveness??
      />

      {/* PREPARATION TIME */}

      <Text style={styles.subheader}>Active: {recipe.time} min - Total: {recipe.time} min</Text>

      {/* INGREDIENTS */}

      <Text style={styles.header}>Ingredients</Text>
      {
        recipe.ingredients.map((ingredientCategory) => 
          <>
            {/* INGREDIENT CATEGORY NAME (e.g. dough, sauce, toppings, ...) */}
            <Text style={styles.subheader}>{ingredientCategory}</Text>
            {/* AVAILABLE INGREDIENTS PER CATEGORY (e. g. for dough: pizza dough, cookie dough, ...) */}
            <Ingredients category={ingredientCategory} cookingIng={cookingIng} setcookingIng={setcookingIng}/>
          </>
        )
      }

      {/* UTENSILS */}
      <Text style={styles.header}>Utensils</Text>

      {/* EVERYTHING ELSE */}

      {/*
        TODO: what data goes in 'details' exactly, and shouldn't that field be removed?
        recipe.details.map((item) => <Text>Detail: {item}</Text>)
      */}
      <Tools index={recipe.id}/>
      <Pressable style={styles.dashboard}
        onPress={()=> navigation.navigate("CookingMode", {
          ids: cookingIng
        })}>
        <View style={styles.iconContainer}>
         <Text style={styles.iconText}>Cooking Mode</Text>
        </View>
      </Pressable>
    </ScrollView>
  )
}


const styles = StyleSheet.create({
  header: {
    fontSize: 26,
    margin: 20,
    textAlign: 'center',
  },
  subheader: {
    fontSize: 15,
    margin: 20,
    padding: 10,
    textAlign: 'center',
    borderWidth: 2,
    borderRadius: 10,
    borderColor: 'black',
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
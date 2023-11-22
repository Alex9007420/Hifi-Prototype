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

// Convert minutes (string or int) to hours and minutes in a human-readable string
function timeString(minutes) {
  if (typeof minutes == "string")
    minutes = parseInt(minutes, 10); // Decimal system
  const hours = Math.floor(minutes / 60);
  minutes -= 60 * hours;
  var humanReadable = "";
  if (hours > 0)
    humanReadable += hours + "h";
  if (hours > 0 && minutes > 0)
    humanReadable += " ";
  if (minutes > 0)
    humanReadable += minutes + "min";
  return humanReadable;
}


export default function Recipe({route, navigation}){
  const recipe = RecipeData.find((item) => item.id == route.params.id);
  const ingredients = IngredientsData.filter((item) => recipe.ingredients.includes(item.id));
  const [cookingIng, setcookingIng] = useState([]);

  // Generate different active and total recipe preparation times,
  // as data.js only has one time field, not two.
  // The formula is completely arbitrary, adapt if needed.
  const activeTime = recipe.time;
  const totalTime = Math.max(activeTime, activeTime * 2 - 15);
  return (
    <ScrollView>

      {/* TITLE CARD */}

      <RecipeTitleCard
        style={{  fontSize: 26 }}
        source={{ uri: recipe.src }}
        text={recipe.name}
        //width={425} // TODO: is this default width guaranteed to be 100% ?
        height={250} // TODO: units/responsiveness??
      />

      {/* PREPARATION TIME */}

      <Text style={styles.subheader}><MaterialCommunityIcons name={'clock-outline'} size={15}/> Active: {timeString(activeTime)} - Total: {timeString(totalTime)}</Text>
      {/* TODO: No separate fields available for active/total time at this time (see Figma board) */}

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
      <View style={{padding: 20}}>
        <Tools index={recipe.id}/>
      </View>
      

      {/* optional/unclear section */}
      {/*
        TODO: what data goes in 'details' exactly, and shouldn't that field be removed?
        recipe.details.map((item) => <Text>Detail: {item}</Text>)
      */}

      {/* COOKING MODE BUTTON */}
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
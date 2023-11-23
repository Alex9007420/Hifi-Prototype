import React,{useState} from 'react';
import { StyleSheet, View, Text, TextInput, ScrollView, Image, TouchableOpacity, Pressable, Dimensions, ListView } from 'react-native';
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
import { FlatList } from 'react-native-gesture-handler';
const {width, height} = Dimensions.get('window');

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
    <>
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
        <View style={{
          padding: 20,
          marginBottom: 220, // Bit of scrollable space at the bottom
          flex: 1,
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'flex-start'
          }}>
        {
          recipe.tools.map((tool) => <MaterialCommunityIcons name={tool} size={50} style={{padding: 10}} />)
        }
        </View>

        {/* Cooking Steps
        <Text style={styles.header}>Cooking Steps</Text>
        <View style={{padding: 20, marginBottom: 220}}>
        {selectedIngredients = IngredientsData.filter((item) => cookingIng.includes(item.id))}
        <ListView 
        data={selectedIngredients} 
        renderItem={({item}) => {
          return(
            <View>
            <Text style={styles.subheader}>{item.category}</Text>
            {item.cookingstep.map((step, index) =>
              <View key={index} style={styles.stepContainer}>
                <Text style={styles.stepNumber}>{index + 1}.</Text>
                <Text style={styles.stepText}>{step}</Text>
              </View>
            )}
            </View>
            )}}
        />
        </View> */}

      </ScrollView>
      
      {/* COOKING MODE BUTTON (outside of ScrollView) */}
      <Pressable style={styles.cookingModeButton}
        onPress={()=> navigation.navigate("CookingMode", {
          ids: cookingIng
        })}>          
          <Text style={{ textAlign: 'center', color: 'white', fontWeight: 'bold', fontSize: 15 }}><MaterialCommunityIcons name={'clipboard-list'} size={15} /> Cooking Mode</Text>
      </Pressable>
    </>
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
    borderWidth: 1,
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
  cookingModeButton: {
    backgroundColor: 'red',
    color: 'white',
    width: width - 50,
    borderWidth: 1,
    borderRadius: 15,
    borderStyle: 'solid',
    borderColor: '#cc0000',
    margin: 25,
    marginTop: 5,
    padding: 12,
  },
});
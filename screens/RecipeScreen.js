import React,{useState, useEffect} from 'react';
import { StyleSheet, View, Text, TextInput, ScrollView, Image, TouchableOpacity, Pressable, Dimensions, ListView, Button } from 'react-native';
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
// import { Constants } from 'react-native-navigation';
import styles from '../components/Styles';
import ComponentA from "../components/ComponentA";
import ComponentB from "../components/ComponentB";

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
  const [CookingSteps, setCookingSteps]= useState([[]]);
  const [selectedIngredients, setSelectedIngredients]= useState([]);
  const [ingredientMap, setIngredientMap] = useState(new Map());

  const handleIngredientSelect = (ingredient, item) => {
    const newMap = new Map(ingredientMap);
    newMap.set(ingredient, item);
    
    setIngredientMap(newMap);
    
    //console.log(Array.from(ingredientMap.values()));

    

    const ingredientNames = Array.from(newMap.values());
    const ingredientIds = ingredientNames.map((ingredientName) => {
      const ingredient = IngredientsData.find((item) =>
        item.name === ingredientName
      );
      return ingredient.id;
    });
    
    setcookingIng(ingredientIds);
  };

 

  
// useEffect to update cookingSteps when cookingIng changes
  useEffect(() => {
    // Filter IngredientsData based on the current cookingIng
    const currentselectedIngredients = IngredientsData.filter((item) => cookingIng.includes(item.id));

    // Generate cookingSteps based on selectedIngredients
    const newCookingSteps = currentselectedIngredients.map((ingredient)=> ingredient.cookingstep)
    // console.log("how long are you: "+ newCookingSteps.length)
    // console.log(" let's see if this works. newCookingSteps is: "+ newCookingSteps.toString())
    const temp = cookingIng.map((id)=> currentselectedIngredients.find((item)=> item.id === id))
    //console.log("We are inside the euseeffect hook! cookingIng is: "+ cookingIng)

    // Update cookingSteps state
    setCookingSteps(newCookingSteps);
    setSelectedIngredients(temp)
  }, [cookingIng, ingredientMap]);


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

        
        
  
        {route.params.showComponentA ? <ComponentA 
                      ingredients={recipe.ingredients}
                      handleIngredientSelect={handleIngredientSelect}
                      styles={styles}
                      cookingIng={cookingIng}
                    /> 
                    : 
                    <ComponentB 
                      recipe={recipe} 
                      cookingIng={cookingIng} 
                      setcookingIng={setcookingIng}
                      styles={styles}
                    />}

        {/* UTENSILS */}
        <Text style={styles.header}>Utensils</Text>
        <View style={{
          padding: 20,
          flex: 1,
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'flex-start'
          }}>
        {
          recipe.tools.map((tool) => <MaterialCommunityIcons name={tool} size={50} style={{padding: 10}} />)
        }
        </View>

        {/* Cooking Instructions */}
        <Text style={styles.header}>Step-by-step Instructions</Text>
        {selectedIngredients.map((ingredient)=>
        <View style={styles.ingredientImageContainer}>
          <Text style={styles.ingredientHeading}>{ingredient.name}</Text>
          {ingredient.cookingstep.map((step, index) =>
                        <View key={index} style={styles.stepContainer}>
                          <Text style={styles.stepNumber}>{index + 1}.</Text>
                          <Text style={styles.stepText}>{step}</Text>
                        </View>
                      )}
        </View>)}

        {/* Bit of scrollable space at bottom */}
        <View style={{marginBottom: 220}}></View>
        
        
        

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

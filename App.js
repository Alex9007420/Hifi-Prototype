import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import Home from './screens/Home';
import Stacks from "./Routes/HomeStack"
import Search from "./screens/Search";
import RecipeStorage from "./storage/RecipeStorage"
import RecipeData from './data'; // Your existing RecipeData
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
import NotebookData from "./data/NotebookData";


export default function App() {
  useEffect(() => {
    //console.log("useeffect");
    initializeAsyncStorage().then(() => logAsyncStorageData());;
  }, []);

  return (
    <Stacks />
  );
}

const initializeAsyncStorage = async () => {
  await AsyncStorage.clear();
  try {
    const storedRecipes = await AsyncStorage.getItem('recipes');
    if (!storedRecipes) {
      // AsyncStorage is empty, initialize it with RecipeData
      await AsyncStorage.setItem('recipes', JSON.stringify(RecipeData));
    }
  } catch (error) {
    console.error('Error initializing AsyncStorage with RecipeData:', error);
  }
};

export const logAsyncStorageData = async () => {
  // console.log("------------------------------------------------------");
  // await AsyncStorage.setItem('recipes', JSON.stringify(RecipeData));
  // console.log(JSON.parse(await AsyncStorage.getItem("recipes")));
  // console.log(JSON.parse(await AsyncStorage.getItem("idk")));
  const recipesString = await AsyncStorage.getItem('recipes');
  const recipeTest = JSON.parse(recipesString);
  recipeTest.forEach(element => {
    // console.log(element);
  });

  // console.log(RecipeData);
  // console.log(JSON.stringify(RecipeData));
  // try {
  //   const storedRecipes = await AsyncStorage.getItem('recipes');
  //   if (storedRecipes) {
  //     const formattedData = JSON.stringify(JSON.parse(storedRecipes), null, 2); // Format JSON data for readability
  //     Alert.alert('Stored Recipes', JSON.stringify(formattedData));
  //   } else {
  //     Alert.alert('No Data', 'No recipes found in AsyncStorage');
  //   }
  // } catch (error) {
  //   Alert.alert('Error', 'Error fetching data from AsyncStorage');
  // }
};

// Call this function when your app starts

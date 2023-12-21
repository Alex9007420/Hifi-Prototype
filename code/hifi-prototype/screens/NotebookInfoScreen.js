import React, {useState, useEffect} from 'react';
import { StyleSheet, View, Text, Alert, ScrollView, TouchableOpacity, Pressable } from 'react-native';
import RecipeData from '../data';
import TextOverImage from '../components/TextOverImage';
import NotebookAdd from '../data/NotebookData';
import NotebookData from '../data/NotebookData';
import AsyncStorage from '@react-native-async-storage/async-storage';


  export default function NotebookInfoscreen ({route, navigation}){ 
    const notebook = NotebookData.find(item => item.id === route.params.id);
    const recipes = RecipeData.filter(item => notebook.recipes.includes(item.id));

    const [recipeArray, setRecipeArray] = useState(recipes);

    useEffect(() => {
      const loadData = async () => {
        try {
          const jsonValue = await AsyncStorage.getItem('@notebook' + notebook.id);
          if (jsonValue != null) {
            setRecipeArray(JSON.parse(jsonValue));
          } else {
            // Initialize with filtered RecipeData if nothing is stored yet
            // const initialRecipes = RecipeData.filter(item => notebook.recipes.includes(item.id));
            // setRecipeArray(initialRecipes);
          }
        } catch (e) {
          console.error("Error reading data", e);
        }
      };
  
      loadData();
    }, []);

    const saveData = async (newRecipeArray) => {
      try {
        const jsonValue = JSON.stringify(newRecipeArray);
        await AsyncStorage.setItem('@notebook' + notebook.id, jsonValue);
      } catch (e) {
        console.error("Error saving data", e);
      }
    };

    const deleteRecipe = (recipeId) => {
      const filteredRecipes = recipeArray.filter(recipe => recipe.id !== recipeId);
      setRecipeArray(filteredRecipes);
      saveData(filteredRecipes);
    };

    const handlePress = () => {
      navigation.navigate("NotebookAdd", {
        onReturn: (newRecipe) => {
          // Check if the recipe already exists in the array
          if (!recipeArray.some(recipe => recipe.id === newRecipe.id)) {
            const newRecipeArray = [...recipeArray, newRecipe];
            setRecipeArray(newRecipeArray);
            saveData(newRecipeArray);
          } else {
            Alert.alert(
              "Duplicate Recipe",
              "This recipe is already in your notebook.",
              [
                { text: "OK" }
              ],
              { cancelable: true }
            );
          }
        }
      });
    };

    const handleLongPress = (recipeId) => {
      Alert.alert(
        "Delete Recipe",
        "Are you sure you want to delete this recipe?",
        [
          {
            text: "Cancel",
            style: "cancel"
          },
          { 
            text: "OK", onPress: () => deleteRecipe(recipeId) 
          }
        ],
        { cancelable: false }
      );
    };

    return(
    <View style={styles.container}>

        <TouchableOpacity onPress={handlePress} style={styles.button}>
            <Text style={styles.buttonText}>{"Add Recipes"}</Text>
        </TouchableOpacity>
            {/* Other content of your component */}
      
      {/* Search Bar Header */}
      {/* <View style={styles.searchContainer}>
        <Pressable style={styles.searchContainer}
        onPress={()=> navigation.navigate("Searchbar")}> 
         <Text> 🔍 Search for Recipes...</Text>
        </Pressable>
      </View> */}

      {/* Dashboard */}
      <ScrollView contentContainerStyle={styles.dashboard}>
          {recipeArray.map((item) => (
            <Pressable style={styles.dashboard}
            key={item.id}
            onLongPress={() => handleLongPress(item.id)}
            onPress={()=> navigation.navigate("Recipe", {
              id: item.id
            })}>
              <TextOverImage 
                source={{ uri: item.src }} // Replace with your image source
                text={item.name}
                width={180}
                height={150}
              />
            </Pressable>
          
        ))}
      </ScrollView>
    </View>
    );
  };
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
    button: {
        backgroundColor: '#007bff', 
        padding: 10, 
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    }
});
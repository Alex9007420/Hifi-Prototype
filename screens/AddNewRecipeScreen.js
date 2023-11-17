import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, ScrollView, Text, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { logAsyncStorageData } from '../App';


const AddNewRecipeScreen = ({ navigation }) => {
  const [title, setTitle] = useState('');
  const [time, setTime] = useState('');
  const [details, setDetails] = useState([]);
  // const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [tools, setTools] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  //ab const [instructions, setInstructions] = useState('');

  const handleSubmit = async () => {
    if (!title || !time || !image || !ingredients) {
      Alert.alert('Error', 'Please fill out all fields.');
      return;
    }
    const newRecipe = {
      id: new Date().getTime().toString(),
      name: title,
      details: details.split(',').map(item => item.trim()), // Splitting and trimming
      time,
      src: 'https://www.rcboe.org/cms/lib/GA01903614/Centricity/Domain/17272/testing-.jpg',
      tools: tools.split(',').map(item => item.trim()), // Splitting and trimming
      ingredients: ingredients.split(',').map(item => item.trim()), // Splitting and trimming
    };

    try {
      const storedRecipes = await AsyncStorage.getItem('recipes');
      const recipes = storedRecipes ? JSON.parse(storedRecipes) : [];
      recipes.push(newRecipe);
      await AsyncStorage.setItem('recipes', JSON.stringify(recipes));
      console.log('Recipe added:', newRecipe);
      Alert.alert("Recipe added!", "You are great!");
      navigation.navigate('Home'); // Go back to the Home screen
    } catch (error) {
      console.error('Error saving recipe:', error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.label}>Title</Text>
      <TextInput
        style={styles.input}
        value={title}
        onChangeText={setTitle}
        placeholder="Enter recipe title"
      />

      <Text style={styles.label}>Time</Text>
      <TextInput
        style={styles.input}
        value={time}
        onChangeText={setTime}
        placeholder="30 min"
      />

      <Text style={styles.label}>Details</Text>
      <TextInput
        style={styles.input}
        value={details}
        onChangeText={setDetails}
        placeholder="Enter details separated by commas"
      />

      <Text style={styles.label}>Image</Text>
      <TextInput
        style={styles.input}
        value={image}
        onChangeText={setImage}
        placeholder="Image"
      />

      <Text style={styles.label}>Tools</Text>
      <TextInput
        style={styles.input}
        value={tools}
        onChangeText={setTools}
        placeholder="Enter tools separated by commas"
      />  

      {/* <Text style={styles.label}>Description</Text>
      <TextInput
        style={styles.input}
        value={description}
        onChangeText={setDescription}
        placeholder="Short description about the recipe"
        multiline
      /> */}

      <Text style={styles.label}>Ingredients</Text>
      <TextInput
        style={styles.input}
        value={ingredients}
        onChangeText={setIngredients}
        placeholder="Enter ingredients separated by commas"
        multiline
      />

      {/* <Text style={styles.label}>Instructions</Text>
      <TextInput
        style={styles.input}
        value={instructions}
        onChangeText={setInstructions}
        placeholder="Step-by-step instructions"
        multiline
      /> */}

      <Button title="Submit Reccipe" onPress={handleSubmit} />
      <View>
        <Button title="Show AsyncStorsage Data" onPress={logAsyncStorageData} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 10,
    marginTop: 5,
  },
});

export default AddNewRecipeScreen;
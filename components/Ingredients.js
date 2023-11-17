import React, {useState, useEffect} from 'react';
import { View, FlatList, Text, Pressable, Image, Dimensions } from 'react-native';
import IngredientsData from '../IngredientsData';
import styles from './Styles';
const {width, height} = Dimensions.get('window')

const Item = ({ index, oncf }) => (
  <Pressable
    style={styles.searchContainer}
    onPress={() => oncf(index)}
  >
    <Ingredient index={index} />
  </Pressable>
);

const Ingredients = ({ category, cookingIng, setcookingIng }) => {
  const iData = IngredientsData.filter((item) => item.category === category);

  const handleIngredientPress = (id) => {
    // Check if the ingredient is already in the cookingIng array
    if (!cookingIng.includes(id)) {
      // If not, add it to the array
      setcookingIng([...cookingIng, id]);
    } else {
      // If it's already in the array, remove it to deselect
      const updatedIngredients = cookingIng.filter((ingredient) => ingredient !== id);
      setcookingIng(updatedIngredients);
    }
  };

  return (
    <View style={styles.imageContainer}>
      <FlatList
        data={iData}
        style={styles.imageContainer}
        renderItem={({ item }) => <Item oncf={(id) => handleIngredientPress(id)} index={item.id} />}
        keyExtractor={(item) => item.id.toString()} // Ensure key is a string
        horizontal
        pagingEnabled
        
      />
    </View>
  );
};

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

export default Ingredients;

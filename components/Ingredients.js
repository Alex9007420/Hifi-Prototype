import React, { useState, useEffect, useRef } from 'react';
import { View, FlatList, Text, Image, Dimensions } from 'react-native';
import IngredientsData from '../IngredientsData';
import styles from './Styles';

const { width } = Dimensions.get('window');

const Ingredients = ({ category, cookingIng, setcookingIng }) => {
  const iData = IngredientsData.filter((item) => item.category === category);
  const flatListRef = useRef(null);
  const [visibleIndex, setVisibleIndex] = useState(0);
  if(iData.length ===1){
    const firstIngredientId = iData[0].id;
      // If the first ingredient is not in cookingIng, add it to the list
      if (!cookingIng.includes(firstIngredientId)) {
        setcookingIng((prevCookingIng) => [...prevCookingIng, firstIngredientId]);
      }

  }
  
  const handleScroll = (event) => {
    const xOffset = event.nativeEvent.contentOffset.x;
    const index = Math.round(xOffset / width);
    setVisibleIndex(index);
  };

  const handleMomentumScrollEnd = () => {
    const visibleIngredientId = iData[visibleIndex]?.id;
    const visibleIngredient = iData.find((ingredient) => ingredient.id === visibleIngredientId);
  
    setcookingIng((prevCookingIng) => {
      const updatedCookingIng = [...prevCookingIng];
  
      // Find the index of the current category in the cookingIng list
      const categoryIndex = updatedCookingIng.findIndex((id) =>
        iData.some((ingredient) => ingredient.id === id)
      );
  
      const otherIngredients = iData.filter((ingredient) => prevCookingIng.includes(ingredient.id));
      
      // Check if the visibleIngredient has the same category as any other category in cookingIng
      const matchingCategoryIndex = otherIngredients.findIndex(
        (ingredient) => ingredient.category === visibleIngredient.category
      );
  
      // If the category is already in the cookingIng list, update its ID
      if (matchingCategoryIndex !== -1) {
        console.log("This should be called! "+ visibleIngredientId+ " the other's id is: "+ updatedCookingIng[matchingCategoryIndex])
        // Swap IDs with the matching category
        const matchingCategoryId = otherIngredients[matchingCategoryIndex].id;
        updatedCookingIng[matchingCategoryIndex] = visibleIngredientId;
        //updatedCookingIng.push(matchingCategoryId);
        console.log("here i would like to see something else "+ updatedCookingIng[matchingCategoryIndex]+ " the matching category id is: "+ matchingCategoryId)
        const chelp =  updatedCookingIng.filter((index) => index !== matchingCategoryId);
        console.log("chelpo "+ chelp)
        return chelp;
      }else if (categoryIndex !== -1) {
        updatedCookingIng[categoryIndex] = visibleIngredientId;
      } else {
        console.log("please don't be you!")
        // If the category is not in the cookingIng list, add the ID
        updatedCookingIng.push(visibleIngredientId);
      }
  
      return updatedCookingIng;
    });
  };
  
  
  
  
  

  // useEffect(() => {
  //   // Check if the category has only one ingredient
  //   if (iData.length === 1) {
  //     const firstIngredientId = iData[0].id;

  //     // If the first ingredient is not in cookingIng, add it to the list
  //     if (!cookingIng.includes(firstIngredientId)) {
  //       setcookingIng((prevCookingIng) => [...prevCookingIng, firstIngredientId]);
  //     }
  //   }
  // }, [iData, cookingIng, setcookingIng]);

  return (
    <View style={styles.imageContainer}>
      <FlatList
        ref={flatListRef}
        data={iData}
        style={styles.flatList}
        renderItem={({ item }) => <Ingredient index={item.id} />}
        keyExtractor={(item) => item.id.toString()}
        horizontal={true}
        pagingEnabled={true}
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        onMomentumScrollEnd={handleMomentumScrollEnd}
      />
    </View>
  );
};

const Ingredient = ({ index }) => {
  const iData = IngredientsData.find((item) => item.id === index);

  return (
    <View style={{ flex: 1, width: width }}>
      <Text style={styles.titel}>{iData.name}</Text>
      <Image style={styles.imageItem} source={{ uri: iData.picture }} />
      {iData.ingredients.map((bla, index) => (
        <Text style={styles.ingredients} key={index}>
          {bla}
        </Text>
      ))}
    </View>
  );
};

export default Ingredients;

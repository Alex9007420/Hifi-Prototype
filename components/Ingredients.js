import React, { useState, useEffect, useRef } from 'react';
import { View, FlatList, Text, Image, Dimensions } from 'react-native';
import IngredientsData from '../IngredientsData';
import styles from './Styles';

const { width } = Dimensions.get('window');

const Ingredients = ({ category, cookingIng, setcookingIng }) => {
  const iData = IngredientsData.filter((item) => item.category === category);
  const flatListRef = useRef(null);
  const [visibleIndex, setVisibleIndex] = useState(0);

  useEffect(() => {
    const firstIngredientId = iData[0]?.id;
    
    if (firstIngredientId) {
      // If the first ingredient is not in cookingIng, add it to the list
      const cookingIngIngredients = iData.filter((ingredient) => cookingIng.includes(ingredient.id));
      const visibleIngredient = iData.find((ingredient) => ingredient.id === firstIngredientId);
      const matchingCategoryIndex = cookingIngIngredients.findIndex(
        (ingredient) => ingredient.category === visibleIngredient.category
      );
  
      if (!cookingIng.includes(firstIngredientId) && matchingCategoryIndex === -1) {
        setcookingIng((prevCookingIng) => [...prevCookingIng, firstIngredientId]);
      }
    }
  }, []); // Empty dependency array for componentDidMount behavior
  
  
  
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
      //console.log("_________________"+ category+ "____________________________")
  
      const otherIngredients = IngredientsData.filter((ingredient) => prevCookingIng.includes(ingredient.id));
      // console.log("the length of otherIngredients is: "+ otherIngredients.length)
      // console.log("prevCookingIng has: "+ prevCookingIng)
      // otherIngredients.map((ingredient)=> console.log("the ingredient in otherIngredients is: "+ ingredient.id))
      
      
      // Check if the visibleIngredient has the same category as any other category in cookingIng
      const matchingCategoryIndex = otherIngredients.findIndex(
        (ingredient) => ingredient.category === visibleIngredient.category
      );
      
      if(!updatedCookingIng.includes(visibleIngredientId)){
         // If the category is already in the cookingIng list, update its ID
      if (matchingCategoryIndex !== -1) {
        // Swap IDs with the matching category
        
        const matchingCategoryId = otherIngredients[matchingCategoryIndex].id;
        const updatedmatchingCategoryIndex = updatedCookingIng.findIndex((id) => id === otherIngredients[matchingCategoryIndex].id)
        updatedCookingIng[updatedmatchingCategoryIndex] = visibleIngredientId;
        //updatedCookingIng.push(matchingCategoryId);
        // console.log("the matching category index is: "+ matchingCategoryIndex)
        // console.log("The visible Ingredient id is: "+ visibleIngredientId)
        // console.log("matchingCategoryId is: "+ matchingCategoryId)
        // console.log("I hope that this helped the problem..."+ updatedCookingIng)
        
        
      }else if (categoryIndex !== -1) {
        updatedCookingIng[categoryIndex] = visibleIngredientId;
      }
  
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

  {/* PILL-SHAPED INDICATORS: logic */}
  var pills = [];
  for (var i = 0; i < iData.length; ++i) {
    pills.push(<View style={{
      width: i == visibleIndex ? 18 : 6,
      height: 6,
      borderRadius: 3,
      backgroundColor: i == visibleIndex ? '#454545' : '#aaa',
      margin: 4,
      marginTop: 0,
      marginBottom: 0,
    }}></View>);
  };

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
      {/* PILL-SHAPED INDICATORS: elements */}
      <View style={{
        marginTop: -10, // TODO: using negative margins is cheating...
        marginBottom: 15,
        width: '100%',
        flex: 2,
        flexDirection: 'row',
        justifyContent: 'center',
      }}>
        { pills }
      </View>
    </View>
  );
};

upperCaseWords = (string) => {
  var r = "";
  for (var i = 0; i < string.length; ++i) {
    if (i == 0 || string[i-1] == " ")
      r += string[i].toUpperCase();
    else
      r += string[i];
  }    
  return r;
}

ingredientQuantity = (ingredientString) => {
  const separator = ingredientString.search(" ");
  return separator > 0
    ? ingredientString.substring(0, separator)
    : '';
}

ingredientDescription = (ingredientString) => {
  const separator = ingredientString.search(" ");
  return separator > 0
    ? upperCaseWords(ingredientString.substring(separator))
    : upperCaseWords(ingredientString);
}

const Ingredient = ({ index }) => {
  const iData = IngredientsData.find((item) => item.id === index);

  return (
    <View style={{ flex: 1, width: width }}>
      {/* Nested view for styling. This ensures that the outer view remains unchanged,
          so that styling does not interfere with the scrolling/selection mechanism. */}
      <View style={{
          margin: 20,
          padding: 10,
          borderWidth: 1,
          borderRadius: 15,
          borderColor: '#bdf',
          backgroundColor: '#fff',
          shadowRadius: 5,
          flex: 2,
          flexDirection: 'column',
        }}>
        <Image style={{
            width: '100%',
            height: 200,
            borderWidth: 1,
            borderRadius: 12,
            borderColor: '#eef',
          }}
          source={{ uri: iData.picture }}
        />
        <View style={{
        }}><Text style={{
          marginTop: 15,
          marginLeft: 1,
          marginBottom: 5,
          fontSize: 15,
          fontWeight: 'bold',}}>{upperCaseWords(iData.name)}</Text>
        </View>
        <View style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'center',
        }}>
          <View style={{padding: 10}}>
          {
            iData.ingredients.map((ingredient, index) => (
              <Text key={index} style={{ textAlign: 'right'}}>{ingredientQuantity(ingredient)}</Text>
            ))
          }
          </View>
          <View style={{padding: 10}}>
          {
            iData.ingredients.map((ingredient, index) => (
              <Text>{ingredientDescription(ingredient)}</Text>
            ))
          }
          </View>
        </View>
      </View>
    </View>
  );
};

export default Ingredients;

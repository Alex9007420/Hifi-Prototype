import React, { useState, useEffect, useRef } from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';
import DropdownMenu from './DropdownMenu';
import Ingredients from './Ingredients';
import IngredientsData from '../IngredientsData';
import styles from './Styles';

const ComponentA = ({ingredients, handleIngredientSelect, styles, cookingIng}) => {


    return (
        <>
            {ingredients && ingredients.map((item) => (
                <>
                {/* INGREDIENT CATEGORY NAME (e.g. dough, sauce, toppings, ...) */}
                <Text style={styles.subheader}>{item}</Text>
                <View style={styles.ingredientImageContainer}>
                <View style={styles.dropdownView} key={item.id}>
                    <DropdownMenu ingredient={item} onIngredientSelect={handleIngredientSelect} />
                    <Ingredient ingredient={item} cookingIng={cookingIng}/>
                </View>
                </View>
                </>
            ))}
        </>
    );

}


const Ingredient = ({ingredient, cookingIng}) => {
  //console.log("___________________"+ ingredient+ "_____________________________")
    const ingredientCategory = IngredientsData.filter((item) => item.category === ingredient);
    //ingredientCategory.map((item)=> console.log(item.name));
    const [iData, setiData]= useState(ingredientCategory[0]);
    
    //console.log(ingredientCategory[0] + " has something in there")
    //console.log(cookingIng+ " is please something! ")
    const iftemp = ingredientCategory.find((item) => cookingIng.includes(item.id));
    useEffect(() => {
      if(iftemp){
        setiData( ingredientCategory.find((item) => cookingIng.includes(item.id)));
      }else{
        setiData(ingredientCategory[0]);
      }
      
    }, [cookingIng]); // Empty dependency array for componentDidMount behavior
    
    //console.log("is idata undef?"+ iData)

    return (
        <>
        <Image style={styles.ingredientImage}
          source={{ uri: iData.picture }}
        />
      <View style={styles.ingredientTextContainer}>
        
        <View style={styles.ingredientPadding}>
          {
            iData.ingredients && iData.ingredients.map((ingredient, index) => (
             <Text key={index} style={styles.ingredientText}>{ingredientQuantity(ingredient)}</Text>
            ))
          }
          </View>
          <View style={styles.ingredientPadding}>
          {
            iData.ingredients && iData.ingredients.map((ingredient, index) => (
              <Text>{ingredientDescription(ingredient)}</Text>
            ))
          }
          </View>
        </View>
        </>
    );
  };
  export default ComponentA;
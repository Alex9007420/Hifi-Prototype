import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import DropdownMenu from './DropdownMenu';
import Ingredients from './Ingredients';
import IngredientsData from '../IngredientsData';
import styles from './Styles';

const ComponentA = ({ingredients, handleIngredientSelect, styles}) => {

    return (
        <>
            {ingredients && ingredients.map((item) => (
                <View style={styles.dropdownView} key={item.id}>
                    <DropdownMenu ingredient={item} onIngredientSelect={handleIngredientSelect} />
                    <Ingredient index={item.id}/>
                </View>
            ))}
            
        </>
    );

}

export default ComponentA;

const Ingredient = ({ index }) => {
    console.log("Index " + index);
    const iData = IngredientsData.find((item) => item.id === index);
    console.log("hdslfhlkdsajflkasdfjlkafdsj" +iData.ingredients)

    return (
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
    );
  };
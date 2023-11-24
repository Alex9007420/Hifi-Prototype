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
                    <Ingredient ingredient={item}/>
                </View>
            ))}
            
        </>
    );

}


const Ingredient = ({ingredient}) => {
  console.log("what is ingredient? "+ ingredient)
    const iData = IngredientsData.find((item) => item.category === ingredient);
    

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
  export default ComponentA;
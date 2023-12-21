import React, { useState } from 'react';
import { StyleSheet, View, Text, Image, Modal, TouchableWithoutFeedback, TouchableOpacity, FlatList } from 'react-native';
import IngredientsData from '../IngredientsData';
import styles from './Styles'
import upperCaseWords from './UpperCaseWords';

const ingredientQuantity = (ingredientString) => {
const separator = ingredientString.search(" ");
return separator > 0
    ? ingredientString.substring(0, separator)
    : '';
};

const ingredientDescription = (ingredientString) => {
const separator = ingredientString.search(" ");
return separator > 0
    ? upperCaseWords(ingredientString.substring(separator + 1))
    : upperCaseWords(ingredientString);
};

const TwoColumnIngredientList = ({ selectedOption }) =>
{
    return (
        <View style={styles.ingredientTextContainer}>
            <View style={styles.ingredientPadding}>
            {
                selectedOption.ingredients.map((ingredient) => (
                    <Text style={styles.ingredientText}>{ingredientQuantity(ingredient)}</Text>
                ))
            }
            </View>
            <View style={styles.ingredientPadding}>
            {
                selectedOption.ingredients.map((ingredient) => (
                    <Text>{ingredientDescription(ingredient)}</Text>
                ))
            }
            </View>
        </View>
    );
};

export default TwoColumnIngredientList;
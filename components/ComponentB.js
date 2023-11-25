import React,{useState} from 'react';
import { StyleSheet, View, Text, TextInput, ScrollView, Image, TouchableOpacity, Pressable, Dimensions, ListView } from 'react-native';
import Ingredients from './Ingredients';


const ComponentB = ({ recipe, cookingIng, setcookingIng, styles }) => {
    return (
        <View>
            {recipe.ingredients && recipe.ingredients.map((ingredientCategory, index) => (
                <React.Fragment key={index}>
                    {/* INGREDIENT CATEGORY NAME (e.g. dough, sauce, toppings, ...) */}
                    <Text style={styles.subheader}>{ingredientCategory}</Text>
                    {/* AVAILABLE INGREDIENTS PER CATEGORY */}
                    <Ingredients category={ingredientCategory} cookingIng={cookingIng} setcookingIng={setcookingIng}/>
                </React.Fragment>
            ))}
        </View>
    );
};

export default ComponentB;
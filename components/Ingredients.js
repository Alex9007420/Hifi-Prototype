import React, {useState} from 'react';
import { StyleSheet, View, Text, TextInput, ScrollView, Image, TouchableOpacity, Pressable } from 'react-native';
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs"
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FlatList } from 'react-native-gesture-handler';
import RecipeData from '../data';
import IngredientsData from '../IngredientsData';
import styles from './Styles';

export default function Ingredients({category}){
    const iData = IngredientsData.filter((item) => item.category == category);
    return(
       <View style={styles.searchContainer}>
            <ScrollView horizontal={true} >
            {iData.map((item) => (
                <Ingredient index={item.id}/>
            ))}
            </ScrollView>
            
      </View>  
    );
}
const Ingredient = ({index}) =>{
    const iData = IngredientsData.find((item) => item.id == index)
    return(
        <View style={styles.container}>
            <Text>
                {iData.name}
            </Text>
            <Image style={styles.imageItem} source={{ uri: iData.src}}/>
            {iData.ingredients.map((bla) => (
                <Text>
                    {bla}
                </Text>
            ))}
        </View>
    );
}



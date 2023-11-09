import React, {useState} from 'react';
import { StyleSheet, View, Text, TextInput, ScrollView, Image, TouchableOpacity, Pressable } from 'react-native';
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs"
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FlatList } from 'react-native-gesture-handler';
import RecipeData from '../data';
import IngredientsData from '../IngredientsData';

export default function Ingredients({category}){
    const iData = IngredientsData.filter((item) => item.category == category);
    console.log(category)
    iData.map((item) => console.log(item.id))
    return(
       <View style={styles.searchContainer}>
            
            {iData.map((item) => (
                <ScrollView horizontal={true} >
                <Ingredient index={item.id}/>
                </ScrollView>
            ))}
            
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
const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: 30,
      backgroundColor: '#f0f0f0',
    },
    searchContainer: {
      padding: 10,
      backgroundColor: '#fff',
    },
    searchInput: {
      height: 40,
      backgroundColor: '#f0f0f0',
      borderRadius: 20,
      paddingLeft: 10,
    },
    dashboard: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      padding: 5,
    },
    imageItem: {
      height: 160,
      margin: 5,
      width: '45%', // Approximately 2 columns, depending on container width
      borderRadius: 10,
    },
    footer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      backgroundColor: '#fff',
      borderTopWidth: 1,
      borderTopColor: '#e1e1e1',
      paddingVertical: 10,
      paddingBottom: 20, // Padding to avoid overlap with home gesture
    },
    iconContainer: {
      alignItems: 'center',
    },
    iconText: {
      fontSize: 16,
    },
    });


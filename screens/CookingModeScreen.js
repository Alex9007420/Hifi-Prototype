import React from 'react';
import { StyleSheet, View, Text, FlatList, Dimensions, TextInput, ScrollView, Image, TouchableOpacity, Pressable } from 'react-native';
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs"
import Infoscreen from './InfoScreen';
import CookScreen from './CookScreen';
import MenuScreen from './MenuScreen';
import SettingsScreen from './SettingsScreen';
import Tools from '../components/Tools';
import RecipeData from '../data';
import Ingredients from '../components/Ingredients';
import IngredientsData from '../IngredientsData';
// TODO: only import what is actually needed

export default function CookingMode (){
    // const Data = RecipeData.find((item) => item.id == 1);
    return (
        <FlatList
            horizontal //={true}
            pagingEnabled //={true}
            data={RecipeData}
            contentContainerStyle={styles.CookingMode}
            keyExtractor={RecipeData => RecipeData.id}
            showsHorizontalScrollIndicator={false}
            renderItem={({item}) => {
                return (
                    <View style={styles.imageContainer}>
                        <Image style={styles.image} source={{uri: item.src}} />
                        <ScrollView contentContainerStyle={styles.CookingMode}>
                            <Text >
                                {item.name}
                            </Text>
                            {item.ingredients.map((item) => (
                            <View>
                                <Text> {item}</Text>
                                <Ingredients category={item}/>
                            </View> 
                            ))}
                        </ScrollView>
                    </View>
                );
            }}
        />
    ) ;
}


// TODO: add correct styles; just copy pasted the styles for now
const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: 30,
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
    CookingMode: {
        // no width with flexlist, otherwise it does not work
        padding: 5,
        backgroundColor: '#0a0',
    },
    imageContainer: {
        //height: 150,
        margin: 17,
        width: Dimensions.get("window"),
    },
    image: {
        height: 120,
        // width: '100%', 
    },
    });



// Stuff that did not work

// HomeStack.js
// import CookingMode from '../screens/CookingmodeScreen';
// ...
//        <Stack.Screen name="CookingMode" component={CookingMode} />

// Taken from RecipeScreen.js
//     <Pressable style={styles.dashboard}
//     onPress={()=> route.navigation.navigate("CookingMode", {
//       id: Data.id
//     })}>
//       <View style={styles.iconContainer}>
//         <Text style={styles.iconText}>Cooking Mode</Text>
//       </View>
//   </Pressable>

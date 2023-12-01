import React from 'react';
import { StyleSheet, View, Text, TextInput, ScrollView, Image, TouchableOpacity, Pressable } from 'react-native';
import RecipeData from '../data';
import TextOverImage from '../components/TextOverImage';





  export default function Infoscreen ({navigation, showComponentA}){ 
  // You need to put this in the function if you want to navigate (everything you need to do to be able to navigate)
    return(
        <View style={styles.container}>
      {/* Search Bar Header */}
      <View style={styles.searchContainer}>
        <Pressable style={styles.searchContainer}
        onPress={()=> navigation.navigate("Searchbar", {
          showComponentA: showComponentA,
        })}> 
         <Text> 🔍 Search for Recipes...</Text>
        </Pressable>
      </View>

      {/* Dashboard */}
      <ScrollView contentContainerStyle={styles.dashboard}>
          {RecipeData.map((item) => (
            <Pressable style={styles.dashboard}
            onPress={()=> navigation.navigate("Recipe", {
              id: item.id,
              showComponentA: showComponentA,
            })}>
              <TextOverImage 
                source={{ uri: item.src }} // Replace with your image source
                text={item.name}
                width={180}
                height={150}
              />
            </Pressable>
          
        ))}
      </ScrollView>
    </View>
    );
  };
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
    addPress: {
      position: 'absolute',
      zIndex: 1,
      fontSize: 30,
      top: -20,      // Adjust this value to move it below the status bar
      right: 10,    // Distance from the right
      padding: 10,  // Padding for better touch area
      // Additional styling
    }

});
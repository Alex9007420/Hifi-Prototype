// import { StatusBar } from 'expo-status-bar';
// import { StyleSheet, Text, View } from 'react-native';

// export default function App() {
//   return (
//     <View style={styles.container}>
//       <Text>Open up App.js to start working on your app!</Text>
//       <StatusBar style="auto" />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
import React from 'react';
import { StyleSheet, View, Text, TextInput, ScrollView, Image, TouchableOpacity, Pressable } from 'react-native';
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs"
import Infoscreen from './InfoScreen';
import CookScreen from './CookScreen';
import MenuScreen from './MenuScreen';
import SettingsScreen from './SettingsScreen';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import CookingMode from './CookingModeScreen';
import NotebookScreen from './NotebookScreen';

const Tab = createBottomTabNavigator();

export default function Home() {
  return (
      <Tab.Navigator initialRouteName="Info" 
      screenOptions={{ headerShown: false }}>
          
        <Tab.Screen
        name= "Info"
        component={Infoscreen}
        options= {{title: "Home" , 
        tabBarIcon: () =>(
        <MaterialCommunityIcons name='home' size={20}/>
            
      )}}
        ></Tab.Screen>

        <Tab.Screen 
        name= "Notebook"
        component={NotebookScreen}
        options= {{ 
      tabBarIcon: () =>(
        <MaterialCommunityIcons name='home' size={20}/>
            
      )}}
        ></Tab.Screen>

        

        <Tab.Screen
        name='Settings'
        component={SettingsScreen}
        options= {{
      tabBarIcon: () =>(
        <MaterialCommunityIcons name='cog' size={20}/>
            
      )}}
        ></Tab.Screen>
      </Tab.Navigator>
      
      
  );
}

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
});
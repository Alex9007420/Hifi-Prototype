import React from 'react';
import { StyleSheet, View, Text, TextInput, ScrollView, Image, TouchableOpacity, Pressable, Dimensions, Button } from 'react-native';
const {width, height} = Dimensions.get('window');



export default function SettingsScreen ({showComponentA, setShowComponentA}){

  const toggleComponent = () => {
    setShowComponentA(!showComponentA);
  };
    return(
        <ScrollView >
          <Image style={{width: width}}source={require('../assets/Settings.png')} />
          <Button title="Toggle Component" onPress={toggleComponent} />
        </ScrollView>
     ) ;
};
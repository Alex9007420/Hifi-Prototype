import React from 'react';
import { StyleSheet, View, Text, TextInput, ScrollView, Image, TouchableOpacity, Pressable, Dimensions } from 'react-native';
const {width, height} = Dimensions.get('window');

export default function SettingsScreen (){
    return(
        <View >
        <Image style={{width: width, height: height}}source={require('../assets/Settings.png')} />
      </View>
     ) ;
};
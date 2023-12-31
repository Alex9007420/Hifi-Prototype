import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const Testimage = require('../data/testPicture.jpg');

const TextOverImage = ({ source, text, width, height }) => {
    return (
      <View style={[styles.container, { width, height }]}>
        <Image source={source} style={styles.image} />
        <Text style={styles.text}>{text}</Text>
      </View>
    );
  };

export default TextOverImage;

const styles = StyleSheet.create({
    container: {
      position: 'relative',
      // width: 180, // Set an explicit width
      // height: 150, // Set an explicit height
      flexDirection: 'row',
      marginTop: 10
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover', // This ensures the image covers the entire area
        borderWidth: 5, 
        borderColor: 'white', // White color for the border
        borderRadius: 10, // Rounded corners
        overflow: 'hidden' // This ensures the image respects the border radius
    },
    text: {
      position: 'absolute',
      bottom: 10, // Position text at the bottom of the image
      left: 10, // Position text from the left of the image
      color: 'white', // Ensure the text color is visible on the image
      fontSize: 15,
      textShadowColor: 'rgba(0, 0, 0, 0.75)',
      textShadowOffset: {width: -1, height: 1},
      textShadowRadius: 10
    },
  });
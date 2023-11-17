import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const RecipeNotebookIcon = ({ source, text, width, height }) => {
    return (
      <View style={[styles.container, { width, height }]}>
        <Image source={source} style={styles.image} />
        <Text style={styles.text}>{text}</Text>
      </View>
    );
  };

export default RecipeNotebookIcon;

const styles = StyleSheet.create({
    container: {
      position: 'relative',
      flexDirection: 'column',
      marginVertical: 40
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover', // This ensures the image covers the entire area
        overflow: 'hidden' // This ensures the image respects the border radius
    },
    text: {
        marginTop: 8,
        fontSize: 25,
        color: 'rgba(0, 0, 0, 0.8)', // Semi-transparent white
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 3,
        paddingHorizontal: 10, // Spacing around text
        lineHeight: 24,
        letterSpacing: 1,
        textAlign: 'center',
    },
  });
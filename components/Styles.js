import { StyleSheet, View, Text, TextInput, ScrollView, Image, TouchableOpacity, Pressable, Dimensions } from 'react-native';
const {width, height} = Dimensions.get('window')

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
    imageItem: {
      height: 160,
      margin: 5,
      width: '97%', // Approximately 2 columns, depending on container width
      borderRadius: 10,
    },iconContainer: {
      alignItems: 'center',
    },
    CookingMode: {
        width: width, // important for flatlist
        paddingToppadding: 0,
        backgroundColor: '#080',
    },
    imageContainer: {
        flex: 1, // important for flatlist
        width: width,
    },
    image: {
        height: 120,
        // width: '100%', 
    },
    CookingMode: {
      width: width, // important for flatlist
      paddingToppadding: 0,
      backgroundColor: '#080',
  },
  titel: {
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: '#111',
    padding: 10,
    borderWidth: 1,
    borderColor: '#fff',
  },
  ingredients: {
    backgroundColor: '#111',
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
    userSelect: 'text',
    padding: 2,
  },
    });
    export default styles;
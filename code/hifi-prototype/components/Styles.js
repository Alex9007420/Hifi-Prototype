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
    flatList: {
      width: width,
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
      backgroundColor: '#f0f0f0',
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
  header: {
    fontSize: 26,
    margin: 20,
    textAlign: 'center',
  },
  subheader: {
    fontSize: 15,
    margin: 20,
    padding: 10,
    textAlign: 'center',
    borderWidth: 1,
    borderRadius: 10,
    borderColor: 'black',
  },
  cookingModeButton: {
    backgroundColor: '#02e5da',
    color: 'white',
    width: width - 50,
    borderWidth: 1,
    borderRadius: 15,
    borderStyle: 'solid',
    borderColor: '#00c6bc',
    margin: 25,
    marginTop: 5,
    padding: 12,
  },
  ingredientImageContainer: {
    margin: 20,
    padding: 10,
    borderWidth: 1,
    borderRadius: 15,
    borderColor: '#bdf',
    backgroundColor: '#fff',
    shadowRadius: 5,
    flex: 2,
    flexDirection: 'column',
  },
  ingredientImage: {
    width: '100%',
    height: 200,
    borderWidth: 1,
    borderRadius: 12,
    borderColor: '#eef',
  },
  ingredientHeading: {
    marginTop: 15,
    marginLeft: 1,
    marginBottom: 10,
    fontSize: 15,
    fontWeight: 'bold',
  },
  ingredientTextContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  ingredientText: { textAlign: 'right'},
  ingredientPadding: {padding: 10},
  stepContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  stepNumber: {
    fontWeight: 'bold',
    marginRight: 5,
    marginLeft: 10,
  },
  stepText: {
    flex: 1,
  },
    });
    export default styles;
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import IngredientsData from '../IngredientsData';


const DropdownMenu = ({ingredient, onIngredientSelect}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState('Select ' + ingredient);

  const items = IngredientsData.filter(item => item.category === ingredient);

  console.log("ITEMSS: "  + items);
  return (
    <View style={styles.container}>
      {console.log(onIngredientSelect)}
      <TouchableOpacity
        style={[styles.button, isOpen && styles.buttonActive]}
        onPress={() => setIsOpen(!isOpen)}
      >
        <Text style={styles.buttonText}>{selectedItem}</Text>
      </TouchableOpacity>

      {isOpen && (
        <ScrollView style={styles.dropdown} nestedScrollEnabled={true}>
          {items.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.item}
              onPress={() => {
                setSelectedItem(item.name);
                setIsOpen(false);
                onIngredientSelect(ingredient, item.name); // Call the callback function with the new item
              }}
            >
              <Text style={styles.itemText}>{item.name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
      <Text></Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    alignItems: 'center',
    width: '80%',
  },
  button: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    width: '100%',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
  buttonActive: {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  dropdown: {
    borderWidth: 1,
    borderColor: '#007bff',
    borderTopWidth: 0,
    maxHeight: 200,
    width: '100%',
  },
  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#007bff',
    backgroundColor: 'white',
  },
  itemText: {
    fontSize: 16,
    textAlign: 'center',
  },
});

export default DropdownMenu;
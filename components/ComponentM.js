import React, { useState } from 'react';
import { StyleSheet, View, Text, Image, Modal, TouchableWithoutFeedback, TouchableOpacity, FlatList } from 'react-native';
import IngredientsData from '../IngredientsData';


const DropdownMenu = ({ options, onSelect, selectedOption }) => {
    const [modalVisible, setModalVisible] = useState(false);

    const handleOptionSelect = (option) => {
      onSelect(option);
      setModalVisible(false);
    };

    return (
      <View style={mstyles.container}>
        <TouchableWithoutFeedback onPress={() => setModalVisible(true)}>
          <View style={mstyles.selectedOption}>
            <Text>{selectedOption.name}</Text>
          </View>
        </TouchableWithoutFeedback>

        <Modal
          transparent
          animationType="fade"
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
            <View style={mstyles.modalOverlay} />
          </TouchableWithoutFeedback>

          <View style={mstyles.modalContent}>
            <FlatList
              data={options}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableWithoutFeedback onPress={() => handleOptionSelect(item)}>
                  <View style={mstyles.optionItem}>
                    <Text>{item.name}{ item.id === selectedOption.id && " (active)"}</Text>
                  </View>
                </TouchableWithoutFeedback>
              )}
            />
          </View>
        </Modal>
      </View>
    );
};

const mstyles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    selectedOption: {
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#fff',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        paddingBottom: 50,
    },
    optionItem: {
        margin: 5,
        marginBottom: 0,
        padding: 15,
        backgroundColor: '#ccc',
        borderRadius: 8,
        /*borderBottomWidth: 1,
        borderBottomColor: '#ccc',*/
        alignItems: 'left',
    },
});


const IngredientSection = ({ category, styles }) => {
    const options = IngredientsData.filter((item) => (item.category === category));
    const [selectedOption, setSelectedOption] = useState(options[0]);

    const handleSelect = (option) => {
      setSelectedOption(option);
    };
    return (
        <>
            <Image style={styles.ingredientImage}
                source={{ uri: selectedOption.picture }}
            />
            <DropdownMenu options={options} onSelect={handleSelect} selectedOption={selectedOption}/>
        </>
    );
};


const ComponentM = ({ recipe, cookingIng, setcookingIng, styles }) => {
    return (
        <View>
            { recipe.ingredients && recipe.ingredients.map((category) => (
                <>
                    <Text style={styles.subheader}>{category}</Text>
                    <IngredientSection category={category} styles={styles}/>
                </>
            ))}
        </View>
    );
};

export default ComponentM;
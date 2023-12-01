import React, { useState } from 'react';
import { StyleSheet, View, Text, Image, Modal, TouchableWithoutFeedback, TouchableOpacity, FlatList } from 'react-native';
import IngredientsData from '../IngredientsData';
import TwoColumnIngredientList from './TwoColumnIngredientList';
import { MaterialCommunityIcons } from '@expo/vector-icons';


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
                    <Text style={{ fontWeight: 'bold', fontSize: 15, marginLeft: 0 }}>{selectedOption.name}</Text>
                    <MaterialCommunityIcons
                        name={
                        modalVisible
                        ? "arrow-up-bold-circle-outline"
                        : "arrow-down-bold-circle-outline" }
                        size={20}
                    />
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
                                    <View style={{
                                    width: 6,
                                    height: item.id == selectedOption.id ? 18 : 6,
                                    borderRadius: 3,
                                    backgroundColor: item.id == selectedOption.id ? "#000" : "#ccc",
                                    }}></View>
                                    <Text style={{ marginLeft: 20, fontSize: 14, lineHeight: 18 }}>{item.name}</Text>
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
        alignItems: 'flex-start',
        justifyContent: '',
    },
    selectedOption: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        width: '100%',
        marginTop: 20,
        marginBottom: 10,
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
        paddingBottom: 75,
    },
    optionItem: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        margin: 5,
        marginBottom: 0,
        padding: 15,
        paddingBottom: 0,
    },
});


const IngredientSection = ({ category, styles, cookingIng, setcookingIng }) => {
    const options = IngredientsData.filter((item) => (item.category === category));
    const [selectedOption, setSelectedOption] = useState(options[0]);

    const handleSelect = (option) => {
        const backup = selectedOption.id;
        setSelectedOption(option);

        const updatedCookingIng = cookingIng.map((id) => {
            if (id == backup)
                return option.id;
            return id;
        });
        setcookingIng(updatedCookingIng);
    };
    return (
        <View style={{ padding: 20 }}>
            <Image style={styles.ingredientImage}
                source={{ uri: selectedOption.picture }}
            />
            <DropdownMenu options={options} onSelect={handleSelect} selectedOption={selectedOption}/>
            <TwoColumnIngredientList selectedOption={selectedOption}/>
        </View>
    );
};


const ComponentM = ({ recipe, cookingIng, setcookingIng, styles }) => {

    if (cookingIng.length === 0)
    {
        const firstOfEverything = recipe.ingredients.map((category) => {
            return IngredientsData.filter((item) => (item.category === category))[0].id;
        });
        cookingIng = firstOfEverything;
        setcookingIng(firstOfEverything);
    }

    return (
        <View>
            { recipe.ingredients && recipe.ingredients.map((category) => (
                <>
                    <Text style={styles.subheader}>{category}</Text>
                    <IngredientSection category={category} styles={styles} cookingIng={cookingIng} setcookingIng={setcookingIng}/>
                </>
            ))}
        </View>
    );
};

export default ComponentM;
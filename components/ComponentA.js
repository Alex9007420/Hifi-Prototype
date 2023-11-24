import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import DropdownMenu from './DropdownMenu';

const ComponentA = ({ingredients, handleIngredientSelect, styles}) => {

    return (
        <>
            {ingredients && ingredients.map((item) => (
                <View style={styles.dropdownView} key={item.id}>
                    <DropdownMenu ingredient={item} onIngredientSelect={handleIngredientSelect} />
                </View>
            ))}
        </>
    );

}

export default ComponentA;
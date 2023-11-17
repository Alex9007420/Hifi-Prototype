import React from 'react';
import { Pressable, Text } from 'react-native';

const HeaderButton = ({ navigation  }) => {
  return (
    <Pressable onPress={() => navigation.navigate('AddNewRecipe')}>
      <Text>Add new Recipe</Text>
    </Pressable>
  );
};

export default HeaderButton;
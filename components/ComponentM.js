import React, { useState } from 'react';
import { StyleSheet, View, Text, Image, Modal, TouchableWithoutFeedback, TouchableOpacity, FlatList } from 'react-native';


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
            <Text>{selectedOption}</Text>
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
                    <Text>{item}{ item === selectedOption && " (active)"}</Text>
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
  

const ComponentM = () => {
    const options = ['Option 1', 'Option 2', 'Option 3'];
    const [selectedOption, setSelectedOption] = useState(options[0]);
  
    const handleSelect = (option) => {
      setSelectedOption(option);
    };
    return <View style={{ overflow: 'visible' }}><DropdownMenu options={options} onSelect={handleSelect} selectedOption={selectedOption}/></View>
};

export default ComponentM;
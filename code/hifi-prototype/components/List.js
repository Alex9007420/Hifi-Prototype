import React from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  SafeAreaView,
  Pressable,
  Image,
} from "react-native";

// definition of the Item, which will be rendered in the FlatList
const Item = ({ name, details, index, oncf }) => (
  <Pressable style={styles.searchContainer}
  onPress={()=> oncf(index)}>
    <Text style={styles.title}>{name}</Text>
    <Text style={styles.details}>{details}</Text>
  </Pressable>
);



// the filter
export default function List (props){
  const renderItem = ({ item }) => {
    // when no input, show all
    if (props.searchPhrase === "") {
      return <Item name={item.name} details={item.details} index={item.id} oncf={props.navigationf}/>;
    }
    // filter of the name
    if (item.name.toUpperCase().includes(props.searchPhrase.toUpperCase().trim().replace(/\s/g, ""))) {
      return <Item name={item.name} details={item.details} index={item.id} oncf={props.navigationf}/>;
    }
    // filter of the description
    if (item.details.toString().toUpperCase().includes(props.searchPhrase.toUpperCase().trim().replace(/\s/g, ""))) {
      return <Item name={item.name} details={item.details} index={item.id} oncf={props.navigationf}/>;
  };
  }
  return (
    <SafeAreaView style={styles.list__container}>
      <View
        onStartShouldSetResponder={() => {
          props.setClicked(false);
        }}
      >
        
        <FlatList
          data={props.data}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      </View>
    </SafeAreaView>
  );
};



const styles = StyleSheet.create({
  list__container: {
    margin: 10,
    height: "85%",
    width: "100%",
  },
  item: {
    margin: 30,
    borderBottomWidth: 2,
    borderBottomColor: "lightgrey"
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
    fontStyle: "italic",
  },
  container: {
    flex: 1,
    marginTop: 30,
  },
  searchContainer: {
    padding: 10,
    backgroundColor: '#fff',
  },
});

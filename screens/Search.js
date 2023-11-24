// Home.js
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  SafeAreaView,
  ActivityIndicator,
  Pressable,
} from "react-native";

import List from "../components/List";
import SearchBar from "../components/SearchBar";
import RecipeData from "../data";

export default function Search ({navigation}) {
  const [searchPhrase, setSearchPhrase] = useState("");
  const [clicked, setClicked] = useState(false);



  

  return (
    <SafeAreaView style={styles.root}>
      {/* Removed to achieve a minimalistic design. */}
      {/* !clicked && <Text style={styles.title}>Recipes</Text> */}

      
      

      <SearchBar
        searchPhrase={searchPhrase}
        setSearchPhrase={setSearchPhrase}
        clicked={clicked}
        setClicked={setClicked}
      />
          <List
            searchPhrase={searchPhrase}
            data={RecipeData}
            setClicked={setClicked}
            navigationf={(index)=> navigation.navigate("Recipe", {
              id: index
            })}
          />
        
    </SafeAreaView>
  );
};



const styles = StyleSheet.create({
  root: {
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    width: "100%",
    marginTop: 20,
    fontSize: 25,
    fontWeight: "bold",
    marginLeft: "10%",
  },
});

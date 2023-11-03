// import { StatusBar } from 'expo-status-bar';
// import { StyleSheet, Text, View } from 'react-native';

// export default function App() {
//   return (
//     <View style={styles.container}>
//       <Text>Open up App.js to start working on your app!</Text>
//       <StatusBar style="auto" />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Alert,
} from 'react-native';

const recipes = [
  { id: '1', title: 'Spaghetti Carbonara' },
  { id: '2', title: 'Margherita Pizza' },
  { id: '3', title: 'Classic Cheesecake' },
  { id: '4', title: 'Caesar Salad' },
];

export default function App() {
  const renderRecipeItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.recipeItem}
        onPress={() => Alert.alert('Recipe Pressed', `You pressed ${item.title}`)}
      >
        <Text style={styles.title}>{item.title}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Recipe App</Text>
      <FlatList
        data={recipes}
        renderItem={renderRecipeItem}
        keyExtractor={(item) => item.id}
      />
      <View style={styles.footer}>
        <TouchableOpacity style={styles.iconContainer}>
          <Text style={styles.iconText}>🏠 Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconContainer}>
          <Text style={styles.iconText}>🔍 Search</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconContainer}>
          <Text style={styles.iconText}>❤ Recipe Notebooks</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconContainer}>
          <Text style={styles.iconText}>👤 Setting</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50, // to ensure the content is not overlapped by status bar
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  recipeItem: {
    backgroundColor: 'white',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 5,
    elevation: 1,
    shadowOpacity: 0.1,
    shadowRadius: 1,
    shadowOffset: { width: 0, height: 1 },
  },
  title: {
    fontSize: 18,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 30,
    borderTopWidth: 1,
    borderTopColor: '#e1e1e1',
  },
  iconContainer: {
    alignItems: 'center',
  },
  iconText: {
    fontSize: 16,
  },
});

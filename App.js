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
import { StyleSheet, View, Text, TextInput, ScrollView, Image, TouchableOpacity } from 'react-native';

// Dummy data for dashboard images
const foodImages = [
  { id: '1', src: 'https://picsum.photos/200/300?random=1' },
  { id: '2', src: 'https://picsum.photos/200/300?random=2' },
  { id: '3', src: 'https://picsum.photos/200/300?random=3' },
  { id: '4', src: 'https://picsum.photos/200/300?random=4' },
  { id: '5', src: 'https://picsum.photos/200/300?random=5' },
  { id: '6', src: 'https://picsum.photos/200/300?random=6' },
  // Add more if needed
];

export default function App() {
  return (
    <View style={styles.container}>
      {/* Search Bar Header */}
      <View style={styles.searchContainer}>
        <TextInput
          placeholder="Search for recipes..."
          style={styles.searchInput}
        />
      </View>

      {/* Dashboard */}
      <ScrollView contentContainerStyle={styles.dashboard}>
        {foodImages.map((item) => (
          <Image key={item.id} style={styles.imageItem} source={{ uri: item.src }} />
        ))}
      </ScrollView>

      {/* Footer with Icons */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.iconContainer}>
          <Text style={styles.iconText}>🏠 Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconContainer}>
          <Text style={styles.iconText}>📒 Notebook</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconContainer}>
          <Text style={styles.iconText}>🍴 Menu</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconContainer}>
          <Text style={styles.iconText}>⚙️ Settings</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 30,
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
});

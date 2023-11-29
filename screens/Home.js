import React, { useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Infoscreen from './InfoScreen';
import SettingsScreen from './SettingsScreen';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import NotebookScreen from './NotebookScreen';

const Tab = createBottomTabNavigator();

export default function Home() {
  const [showComponentA, setShowComponentA] = useState(true);

  return (
    <Tab.Navigator initialRouteName="Info" screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name="Info"
        options={{
          title: 'Home',
          tabBarIcon: () => <MaterialCommunityIcons name="home" size={20} />,
        }}
      >
        {(props) => <Infoscreen {...props} showComponentA={showComponentA} />}
      </Tab.Screen>

      <Tab.Screen
        name="Notebook"
        component={NotebookScreen}
        options={{
          tabBarIcon: () => <MaterialCommunityIcons name="notebook" size={20} />,
        }}
      />

      <Tab.Screen
        name="Settings"
        options={{
          tabBarIcon: () => <MaterialCommunityIcons name="cog" size={20} />,
        }}
      >
        {(props) => (
          <SettingsScreen
            showComponentA={showComponentA}
            setShowComponentA={setShowComponentA}
          />
        )}
      </Tab.Screen>
    </Tab.Navigator>
  );
}

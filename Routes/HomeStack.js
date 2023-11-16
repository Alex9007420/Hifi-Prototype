import { NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Search from "../screens/Search";
import Home from "../screens/Home";
import Recipe from '../screens/RecipeScreen';
import CookingMode from '../screens/CookingModeScreen';

const Stack = createNativeStackNavigator();

function Stacks() {
  return(
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home" //screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="CookingMode" component={CookingMode}/>
        <Stack.Screen name="Recipe" component={Recipe}/>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Searchbar" component={Search} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default Stacks;
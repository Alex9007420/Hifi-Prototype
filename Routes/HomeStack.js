import { NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Search from "../screens/Search";
import Home from "../screens/Home";

const Stack = createNativeStackNavigator();

function Stacks() {
  return(
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Searchbar" component={Search} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default Stacks;
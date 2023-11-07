import {createStackNavigator} from "@react-navigation/stack";
import {createAppContainer}  from "@react-navigation/native";
import Search from "../screens/Search";
import Home from "../screens/Home";


const screens = {
    Home: {
        screen: Home
    },
    Search:{
        screen: Search
    }

}

const HomeStack = createStackNavigator(screens);

export default createAppContainer(HomeStack);
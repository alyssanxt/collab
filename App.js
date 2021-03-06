import 'react-native-gesture-handler';
import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet } from "react-native";

// scenes imports
import AddOrderButton from './src/scenes/main/offers/AddOrderButton';
import Login from './src/scenes/login/Login';
import Signup from './src/scenes/login/Signup';
import Profile from './src/scenes/main/profile/Profile';
import Groups from './src/scenes/main/groups/Groups';
import Search from './src/scenes/main/search/Search';
import Chat from './src/scenes/main/chat/Chat';
import StorePromo from './src/scenes/main/offers/StorePromo'
import AddOrder from './src/scenes/main/offers/AddOrder'
import Splash from './src/components/Splash';
import OfferDetails from './src/scenes/main/offers/OfferDetails';
import EditProfile from './src/scenes/main/profile/EditProfile';
import MyOffers from './src/scenes/main/profile/MyOffers';
import Settings from './src/scenes/main/profile/Settings';

// icons imports
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

// firebase
import * as firebase from 'firebase';
import firestore from 'firebase/firestore';
import {decode, encode} from 'base-64';

if (!global.btoa) {  global.btoa = encode }
if (!global.atob) { global.atob = decode } 

//API key for configuration
var firebaseConfig = {
  apiKey: "AIzaSyAOkCekXGgLyBJE3XXvPDdCqSeFOcD5F7c",
  authDomain: "collab-testfb.firebaseapp.com",
  databaseURL: "https://collab-testfb.firebaseio.com",
  projectId: "collab-testfb",
  storageBucket: "collab-testfb.appspot.com",
  messagingSenderId: "714062311887",
  appId: "1:714062311887:web:88bdfac792c73cdb24a2ba"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

firebase.firestore();
//User navigated to Login page by default
const Root = createStackNavigator();
const RootScreen = () => (
<Root.Navigator 
  screenOptions = {{
    gestureEnabled: true,
    headerShown: false 
  }}
> 
    <Root.Screen name = "Login" component = {Login} />
    <Root.Screen name = "Tabs" component = {TabNavigator} />
    <Root.Screen name = "Signup" component = {Signup} />  
</Root.Navigator>
);

// bottom tabs with Search, Groups, Offer, Chat, Profile
const Tab = createBottomTabNavigator();
const TabNavigator = (props) => (
    <Tab.Navigator
      screenOptions = {({ route }) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;
          if (route.name == 'Search') {
            iconName = focused ? "search" : "search";
          } else if (route.name == 'Groups') {
            iconName = focused ? "group" : "group";
          } else if (route.name == 'Offer') {
            return <AddOrderButton/>;
          } else if (route.name == 'Chat') {
            return <AntDesign name="message1" color={color} size={26} />;
          } else if (route.name == 'Profile') {
            return <MaterialCommunityIcons name="account" color={color} size={26} />;
          } 
          return <FontAwesome name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions = {{
        showLabel: true,
        activeTintColor: "#266E7D",
        inactiveTintColor:  "#C4C4C4",
        labelStyle: { fontSize: 12 },
        tabStyle: { backgroundColor: '#ffffff' }
      }}
      >
      <Tab.Screen name = "Search" component = {OfferDetailsScreen} initialParams={props.route.params}/>
      <Tab.Screen name = "Groups" component = {Groups} initialParams={props.route.params}/>
      <Tab.Screen name = "Offer" component = {Offers} initialParams={props.route.params}/>
      <Tab.Screen name = "Chat" component = {Chat} initialParams={props.route.params} />
      <Tab.Screen name = "Profile" component = {ProfileScreen} initialParams={props.route.params}/>
  </Tab.Navigator>
);
//^ initialParams to pass over the docID to these pages 

const OffersStack = createStackNavigator();
function Offers(props) {
  return (
    <OffersStack.Navigator
      initialRouteName = "StorePromo"
      screenOptions = {{
        gestureEnabled: true,
        headerShown: false
      }}
    >
      <OffersStack.Screen name = "StorePromo" component = {StorePromo} initialParams={props.route.params}/>
      <OffersStack.Screen name = "AddOrder" component = {AddOrder} initialParams={props.route.params}/>
    </OffersStack.Navigator>
  );
}

const OfferDetailsStack = createStackNavigator();
const OfferDetailsScreen = (props) => (
  <OfferDetailsStack.Navigator
    initialRouteName = "Search"
    screenOptions = {{
      gestureEnabled: true,
      headerShown: false
    }}
  >
    <OfferDetailsStack.Screen name = "Landing" component = {Search} initialParams={props.route.params} />
    <OfferDetailsStack.Screen name = "OfferDetails" component = {OfferDetails} initialParams={props.route.params} />
  </OfferDetailsStack.Navigator>
);

const ProfileScreenStack = createStackNavigator();
function ProfileScreen(props) {
  return (
    <ProfileScreenStack.Navigator
      initialRouteName = "Profile"
      screenOptions = {{
        gestureEnabled: true,
        headerShown: false
      }}
    >
      <ProfileScreenStack.Screen name = "Profile" component = {Profile} initialParams={props.route.params}/>
      <ProfileScreenStack.Screen name = "EditProfile" component = {EditProfile} initialParams={props.route.params}/>
      <ProfileScreenStack.Screen name = "MyOffers" component = {MyOffers} initialParams={props.route.params}/>
      <ProfileScreenStack.Screen name = "Settings" component = {Settings} initialParams={props.route.params}/>
    </ProfileScreenStack.Navigator>
  );
}

//onStateChange for own debugging purposes, not required for the application
function Navigation() {
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  }, []);

  if (isLoading) {
    return <Splash />;
  }

  return (
    <NavigationContainer 
      //onStateChange={(state) => console.log('New state is', state)}
    >
      <RootScreen/> 
    </NavigationContainer>
  );
};;

export default Navigation;

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
    padding: 35,
    flex: 1,
  },
  header: {
      fontSize: 24,
      marginBottom: 18,
      marginTop: 0,
      fontWeight: 'bold',
      alignItems: 'center',
      textAlign: 'center',
  },
  Button: {
      backgroundColor: "#266E7D",
      marginHorizontal: 70,
      marginVertical: 25,
      borderRadius: 10,
      paddingVertical: 10
  },
  buttonText: {
      textAlign: 'center',
      fontSize: 23,
      fontWeight: '600',
      color: '#ffffff',
  },
});

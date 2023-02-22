import React, { useContext } from "react";
import { initializeApp, getApps } from "firebase/app";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { useTheme, themeColor } from "react-native-rapi-ui";
import TabBarIcon from "../components/utils/TabBarIcon";
import TabBarText from "../components/utils/TabBarText";
//Screens
import Home from "../screens/Home";
import SecondScreen from "../screens/SecondScreen";
import About from "../screens/About";
import Profile from "../screens/Profile";
//import Profile from "../screens/Profile.tsx";
import Loading from "../screens/utils/Loading";
//import EditProfile from "../screen/EditProfile";
// Auth screens
import Login from "../screens/auth/Login";
import Register from "../screens/auth/Register";
import ForgetPassword from "../screens/auth/ForgetPassword";
import CreateForm from "../screens/form/CreateForm";
import AddForm from "../screens/form/AddForm";
import EditProfile from "../screens/EditProfile";
import { AuthContext } from "../provider/AuthProvider";

//import firebase from "firebase/compat/app";
//import "firebase/compat/auth";
//import "firebase/compat/firestore";

// Better put your these secret keys in .env file
const firebaseConfig = {
  apiKey: "AIzaSyDnTGgtAE2JWY_HKDlZ4iIkgfZr0WxG0Ts",
  authDomain: "tcc-migra.firebaseapp.com",
  projectId: "tcc-migra",
  storageBucket: "tcc-migra.appspot.com",
  messagingSenderId: "919535895740",
  appId: "1:919535895740:web:18e0a2f057cb7c18053cb9"
};

if (getApps().length === 0) {
  initializeApp(firebaseConfig);
}

const AuthStack = createNativeStackNavigator();
const Auth = () => {
  return (
    <AuthStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <AuthStack.Screen name="Login" component={Login} />
      <AuthStack.Screen name="Register" component={Register} />
      <AuthStack.Screen name="ForgetPassword" component={ForgetPassword} />
    </AuthStack.Navigator>
  );
};

const MainStack = createNativeStackNavigator();
const Main = () => {
  return (
    <MainStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <MainStack.Screen name="MainTabs" component={MainTabs} />
      <MainStack.Screen name="CreateForm" component={CreateForm} />
      <MainStack.Screen name="AddForm" component={AddForm} />
      <MainStack.Screen name="SecondScreen" component={SecondScreen} />
      <MainStack.Screen name="EditProfile" component={EditProfile} />
            
    </MainStack.Navigator>
  );
};


const Tabs = createBottomTabNavigator();
const MainTabs = () => {
  const { isDarkmode } = useTheme();
  return (
    <Tabs.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          borderTopColor: isDarkmode ? themeColor.dark100 : "#c0c0c0",
          backgroundColor: isDarkmode ? themeColor.dark200 : "#ffffff",
        },
      }}
    >
      {/* these icons using Ionicons */}
      <Tabs.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: ({ focused }) => (
            <TabBarText focused={focused} title="   " />
          ),
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} icon={"md-home"} />
          ),
        }}
      />
      <Tabs.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: ({ focused }) => (
            <TabBarText focused={focused} title="    " />
          ),
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} icon={"person"} />
          ),
        }}
      />
      <Tabs.Screen
        name="About"
        component={About}
        options={{
          tabBarLabel: ({ focused }) => (
            <TabBarText focused={focused} title="   " />
          ),
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} icon={"ios-information-circle"} />
          ),
        }}
      />
    </Tabs.Navigator>
  );
};

export default () => {
  const auth = useContext(AuthContext);
  const user = auth.user;
  return (
    <NavigationContainer>
      {user == null && <Loading />}
      {user == false && <Auth />}
      {user == true && <Main />} 
      
       </NavigationContainer>
  );
};

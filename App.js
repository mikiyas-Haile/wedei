import React, {useEffect, useState} from 'react';
import {createStackNavigator} from '@react-navigation/stack'
import {NavigationContainer} from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppLoading from 'expo-app-loading';
import { useFonts } from 'expo-font';
import { StyleSheet, Text, View, Image, Dimensions,Pressable } from 'react-native';
import {Home} from './home'
import {url} from './url'
import {LoginComponent} from './auth/login'
import {BookDetailPage} from './main'
import {WriteBook,BookList,SearchPage} from './main'
const {width, height} = Dimensions.get("screen")

const host = url()
const homeStyles = {
  headerStyle:{
    height:0
  }
}
const Stack = createStackNavigator();
export default function App() {
  const [loggedIn, setLoggedIn] = useState(false)
  const [tok, settok] = useState()
  const getData = async (callback) => {
    try {
      const value = await AsyncStorage.getItem('Token')
      if (value){
        var token = value.replace('"', '').replace('"', '')
        callback(token)
      }
    } catch(e) {
      console.log(e)
    }
  }
  useEffect(() =>{
    const mycallback = (token) =>{
      if (token){
      setLoggedIn(true)
      settok(token)
      }else{
        setLoggedIn(false)
      }
    }
    getData(mycallback)
  })

  const initName = loggedIn ? 'home' : 'login'

  const [loading, setloading]= useState(false)
  let [fontsLoaded] = useFonts({
    'Bold': require("./assets/fonts/Quicksand-Bold.ttf"),
    'ExtraLight': require("./assets/fonts/Quicksand-Light.ttf"),
    'Light': require("./assets/fonts/Quicksand-Light.ttf"),
    'Medium': require("./assets/fonts/Quicksand-Medium.ttf"),
    'Regular': require("./assets/fonts/Quicksand-Regular.ttf"),
    'SemiBold': require("./assets/fonts/Quicksand-SemiBold.ttf"),
  })
  
  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
  return (
    <>
        <NavigationContainer>
          <Stack.Navigator initialRouteName={initName}>
            <Stack.Screen initialParams={{"token": tok}} options={homeStyles} name="home" component={Home} />
            <Stack.Screen initialParams={{"token": tok}} name="Read Book" component={BookDetailPage} />
            <Stack.Screen initialParams={{"token": tok}} name="Write a Book" component={WriteBook} />
            <Stack.Screen options={homeStyles} name="login" component={LoginComponent} />
          </Stack.Navigator>
        </NavigationContainer>
        </>
  );
  }
}

const styles = StyleSheet.create({
});

import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState} from 'react';
import {Dimensions,StyleSheet,TouchableOpacity,Pressable,Text, Image,View} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import Ionicons from 'react-native-vector-icons/Ionicons'
import AsyncStorage from '@react-native-async-storage/async-storage';
import {MyProfile,BookList,SearchPage} from './main'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import {faShareAlt, faThumbsUp, faThumbsDown, faUser} from '@fortawesome/free-solid-svg-icons';
import {faComment, faEdit,faHeart, faTrashAlt} from '@fortawesome/free-regular-svg-icons';

const {width, height} = Dimensions.get("screen")

const Tab = createBottomTabNavigator();
const homeName = "Home";
const addName = "Write Book";
const groupsName = "topics";
const profileName = "Profile";

const chatName = "search";
const Stack = createStackNavigator();
const navbarStyles = {
  headerStyle:{
    borderBottomWidth:1,
    height:0,
  },
  headerLeft: null,
}
const addStyles = {
  title:'',
  headerStyle:{
    borderBottomWidth:1,
    height:0,
  },
  headerLeft: null,
}
export function Home(props) {
  return (<>
        {/* <StatusBar hidden/> */}
          <Tab.Navigator
          initialRouteName={homeName}
          screenOptions={({route}) =>({
            tabBarActiveTintColor:'#fc0bff',
            tabBarInactiveTintColor:'white',
            tabBarStyle:{
              backgroundColor:'black',
              height:40,
            },
              tabBarIcon: ({focused, color, size})=>{
                  let iconName;
                  let rn = route.name
                  if (rn === homeName){
                      iconName = 'home'
                      return <Ionicons name={iconName} size={20} color={color}/>
                  }
                  else if (rn === chatName){
                    iconName = 'search'
                  return <Ionicons name={iconName} size={20} color={color}/>
                }
                else if (rn === profileName){
                  iconName = 'Profile'
                return <FontAwesomeIcon icon={faUser} size={20} color={color}/>
                }
              }
            })}
          >
              <Tab.Screen options={navbarStyles} initialParams={{"token":props.route.params.token}} name={homeName} component={BookList} />
              <Tab.Screen options={navbarStyles} initialParams={{"token":props.route.params.token}} name={chatName} component={SearchPage} />
              <Tab.Screen options={navbarStyles} initialParams={{"token":props.route.params.token}} name={profileName} component={MyProfile} />
          </Tab.Navigator>
          </>
          );
      
  }
  
const styles= StyleSheet.create({
  writeBook:{
    position:"absolute",
    backgroundColor:'#9f00a1',
    borderRadius:10,
    width:80,
    alignItems:'center',
  },
  button: {
    position: 'absolute',
    right:0,
    bottom:65,
    alignItems: 'center',
    justifyContent: 'center',
    padding:20,
    paddingBottom:30,
    borderRadius: 100,
    backgroundColor: '#2c3e50',
  },
  text: {
    fontSize: 40,
    lineHeight: 21,
    color: 'white',
  },
  input:{
    backgroundColor:"white",
    borderWidth:1,
    borderColor:'#2c3e50',
    width: width/1.3,
    padding:10,
    margin:10,
  }
  })
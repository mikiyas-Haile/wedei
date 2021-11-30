import React,{useState,useEffect} from 'react'
import {Text, View, FlatList, Pressable,StyleSheet, Dimensions, Image} from 'react-native'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
const Tab = createMaterialTopTabNavigator();
import {SearchPage} from './searchPage'
import { UserBooks } from './myProfile/books'
import {UserComments} from './myProfile/comments'
import {ProfileStatus} from './myProfile/profile'
import { MainLookup } from '../lookup/mainlookup';
import { FormattedProfile } from './myProfile/profile';
export function MyProfile(props){
  const { token } = props.route.params
  const [profile, setProfile] = useState({})
    
  useEffect(() =>{
      const myCallback = (response, status) => {
          if (status === 200){
              setProfile(response)
          }
      }
      MainLookup(myCallback, {
          method:'GET',
          endpoint:'/api/profile/me',
          token:props.token
      })
  },[profile])
  return (
      <>
      <FormattedProfile navigation={props.navigation} token={token} UserProfile={profile}/>
      <Tab.Navigator initialRouteName="Books">
        <Tab.Screen name="Books" children={()=><UserBooks navigation={props.navigation} token={token} profile={profile}/>} />
        <Tab.Screen name="Comments" children={()=><UserComments navigation={props.navigation} token={token} profile={profile}/>} />
      </Tab.Navigator>
      </>
    );
}
const styles = StyleSheet.create({

})
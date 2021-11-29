import React,{useState,useEffect} from 'react'
import {Text, View, FlatList, Pressable,StyleSheet, Dimensions, Image} from 'react-native'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
const Tab = createMaterialTopTabNavigator();
import {SearchPage} from './searchPage'
import { UserBooks } from './myProfile/books'
import {UseComments} from './myProfile/comments'
import {ProfileStatus} from './myProfile/profile'

export function MyProfile(props){
    const { token } = props.route.params
    return (
        <>
        <ProfileStatus token={token}/>
        <Tab.Navigator>
          <Tab.Screen initialParams={{"token":token}} name="Books" component={UserBooks} />
          <Tab.Screen initialParams={{"token":token}} name="Comments" component={UseComments} />
        </Tab.Navigator>
        </>
      );
}
const styles = StyleSheet.create({

})
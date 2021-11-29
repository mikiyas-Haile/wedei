import React,{useState, useEffect} from 'react';
import {Text, View, FlatList, Pressable,StyleSheet, Dimensions} from 'react-native'
import {Book} from './book'
export function BookDetailPage(props){
    const { token, book } = props.route.params
    return <Book item={book}/>
}
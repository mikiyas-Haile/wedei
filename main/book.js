import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState} from 'react';
import {Text, View, FlatList, Pressable,StyleSheet, Dimensions, Image} from 'react-native'
import { MainLookup } from '../lookup/mainlookup';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import Ionicons from 'react-native-vector-icons/Ionicons'
import {faShareAlt, faThumbsUp, faDownload, faAd, faAngleDoubleDown} from '@fortawesome/free-solid-svg-icons';
import {url} from '../url'
const host = url()
const {width, height} = Dimensions.get("screen")

export function Book(props){
    const {item} = props
    return (
        <>
        <View style={styles.book}>
            <View style={styles.topPart} className='topPart'>
                <View style={styles.leftPart} className='leftPart'>
                    <Image style={{width: 250, height: 250}} source={{uri: `${host}${item.thumbnail}`}} />
                </View>
                <View style={styles.rightPart} className='rightPart'>
                    <Text style={styles.titleText}>{item.title}</Text>
                    <Text>
                    <Text style={styles.fullnameText}>by {item.author.first_name} {item.author.last_name}</Text><Text style={styles.usernameText}> @{item.author.username}</Text>
                    </Text>
                </View>
            </View>
            <View style={styles.bottomPart} className='bottomPart'>
                <View style={styles.bottomTopPart} className='bottomTopPart'>
                    <Text style={styles.discriptionText}>{item.discription}</Text>
                </View>
                <View style={styles.bottomBottomPart} className='bottomBottomPart'>
                </View>
            </View>     
        </View>
        </>
    )
}

const styles = StyleSheet.create({
    titleText:{
        fontFamily:"Bold",
        fontSize:24
    },
    usernameText:{
        fontFamily:"Regular",
        fontSize:18,
    },
    fullnameText:{
        fontFamily:"Bold",
        fontSize:20
    },
    discriptionText:{
        fontFamily:"Bold",
        fontSize:20,
        padding:20,
    },
    addbutton: {
        position: 'absolute',
        right:5,
        bottom:30,
        alignItems: 'center',
        justifyContent: 'center',
        padding:15,
        paddingBottom:15,
        borderRadius: 100,
        // backgroundColor: 'white',
      },
      addtext: {
        fontSize: 50,
        alignItems: 'center',
        justifyContent: 'center',
        color: 'red',
      },
    book:{
        height:height,
        width:width,
        // backgroundColor:'#9f00a1',
    },
    topPart:{
        // backgroundColor:'white',
        height:height/2,
        width:width,
    },
    bottomPart:{
        // backgroundColor:'black',
        height:height/2,
        width:width,
    },
    leftPart:{
        height:height/3,
        position:'absolute',
        bottom:height/18,
        left:10,
        borderRadius:50,
        alignItems:'center',
        justifyContent:'center',
    },
    rightPart:{
        alignItems:'center',
        justifyContent:'center',
        // backgroundColor:'grey',
        width:width/2.5,
        height:height/3,
        position:'absolute',
        bottom:height/18,
        right:10,
        borderRadius:50,
    },
    bottomTopPart:{
        alignItems:'center',
        justifyContent:'center',
        // backgroundColor:'grey',
        width:width,
        height:height/3,
        position:'absolute',
        bottom:height/7,
        borderRadius:50,
    },
    bottomBottomPart:{
        // backgroundColor:'black',
        width:width,
        height:100,
        position:'absolute',
        bottom:height/20,
        borderRadius:50,
    }
});

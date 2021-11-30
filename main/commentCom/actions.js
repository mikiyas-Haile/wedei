import React,{useState, useEffect} from 'react'
import {View, Text, FlatList,StyleSheet,Dimensions,Image,Pressable} from 'react-native'
import {url} from '../../url'
// import {apiStatusList,apiStatusAction} from './apiLookup'
import AppLoading from 'expo-app-loading';
import { useFonts } from 'expo-font';
import Ionicons from 'react-native-vector-icons/Ionicons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import {faShareAlt, faThumbsUp, faThumbsDown} from '@fortawesome/free-solid-svg-icons';
import {faComment, faEdit,faHeart, faTrashAlt} from '@fortawesome/free-regular-svg-icons';
import Icon from "react-native-vector-icons/Ionicons";
import {FullLike} from './fullLike'
import {EmptyLike} from './emptyLike'
import { MainLookup } from '../../lookup/mainlookup'

const host = url()
const {width, height} = Dimensions.get("screen")

export function ActionBtns(props){
    const [csrf, setCSRF] = useState()
    const {status,action, didPerformAction,token} = props 
    const [hasLiked, setHasLiked] = useState(status.has_liked? status.has_liked : false)
    const [likes, setLikes] = useState(status.likes ? status.likes : 0)
    let comments = status.comments
    const [csrfToken, setcsrfToken] = useState()
    useEffect(() =>{
        fetch(`${host}/csrf`,{
            method: "GET", 
            headers: {
                'Content-Type': 'application/json',
            },
            })
            .then(data => data.json()).then(
                data => {
                    // console.log(data)
                    setcsrfToken(data.csrf)
            })
            .catch(error => console.error())
    },[])
    const handleClick = (event) =>{
        console.log(status.book.id)
        console.log(status.id)
      event.preventDefault()
      const mycallback = (response, code) =>{
        console.log(response, code)
        if (code === 200){
            if (action.type === 'like'){
                setHasLiked(true)
            }else if (action.type === 'unlike'){
                setHasLiked(false)
            }
            setLikes(response.likes ? response.likes : 0)
        }else if(code === 403){
            if (action.type === 'like'){
                setHasLiked(false)
            }else if (action.type === 'unlike'){
                setHasLiked(true)
            }
            alert(`Couldn't like ${status.author.username}'s Comment'`)            
        }
        else if(code === 404){
            if (action.type === 'like'){
                setHasLiked(false)
            }else if (action.type === 'unlike'){
                setHasLiked(true)
            }
            alert(`Couldn't like ${status.author.username}'s Comment'`)            
        }
      }
      if (action.type === 'like'){
        if (hasLiked){
            MainLookup(
                mycallback, {
                token:token,
                csrf:csrfToken,
                endpoint:`/${status.book.id}}/action`,
                method:'POST',
                data:{
                    action:'unlike',
                    id:status.id,
                }
            }
        )
        setHasLiked(false)
        }else{
            MainLookup(
                mycallback, {
                token:token,
                csrf:csrfToken,
                endpoint:`/${status.book.id}}/action`,
                method:'POST',
                data:{
                    action:'like',
                    id:status.id,
                    }
                }
            )
        setHasLiked(true)
        }
      }
    }
    if (action.type === 'like'){
        if (hasLiked === true){
            return <Text><Pressable onPress={handleClick}><FullLike size={25}/></Pressable></Text>
        }else if (hasLiked === false){
        return <Text><Pressable onPress={handleClick}><EmptyLike size={25}/></Pressable></Text>
        }else{
            return ''
        }
    }
    else if (action.type === 'comment'){
        return <Text onPress = {() => props.navigation.navigate('createCom', {statusId:status.id, status:status})}><FontAwesomeIcon onClick = {() => props.navigation.navigate('comment', {statusId:status.id})} className='hover:text-red-500' style={styles.actionBtns} size={ 25 } icon={faComment} /></Text>
    }else if (action.type === 'reply'){
        return <Text onPress = {() => props.navigation.navigate('reply', {statusId:status.id, status:status})} style={styles.actionBtns}><FontAwesomeIcon onClick = {() => props.navigation.navigate('reply', {statusId:status.id})} style={styles.actionBtns} size={ 25 } icon={faShareAlt} /></Text>
    }
    if (status.is_me){
    //     if (action.type === 'edit'){
    //         return <Text><FontAwesomeIcon onClick = {() => props.navigation.navigate('update', {statusId:status.id})} style={styles.actionBtns} size={ 30 } icon={faEdit} /></Text>
    //     }
     if (action.type === 'delete'){
            return <Text><FontAwesomeIcon onPress = {() => props.navigation.navigate('delete', {statusId:status.id, status:status})} style={styles.actionBtns} size={ 30 } icon={faTrashAlt} /></Text>
        }
    // else{
    //         return ''
    //     }
    }
    else{
        return ''
    }
}

const styles = StyleSheet.create({
    dateAdded:{
        marginLeft:5,
    },
    actionBtns:{
        color:'#2c3e50',
    },
    lastPart:{
        width:width * 1.5,
        flexDirection:  'row',
        justifyContent: 'space-around',
    },
    authorStyle:{
        marginLeft:5,
        fontFamily: "Poppins-ExtraLight",
    },
    middlePart:{
        paddingLeft:50,
        marginTop:5,
        marginBottom:20,
    },
    bodyStyle:{
        fontSize:17,
        fontFamily: "Poppins-Regular",
    },
    lightStyle:{
        fontSize:15,
        fontFamily: "Poppins-Regular",
    },
    boldStyle:{
        fontWeight:"bold",
        fontSize:15,
        // fontFamily: "Poppins-Bold",
        fontFamily: "Poppins-ExtraLight",
    },
    topPart:{
        flexDirection: 'row',
    },
    text:{
        fontSize:20,
        fontFamily: "Poppins-ExtraLight",
    },
    status:{
        width:width,
        padding:10,
        borderRadius: 20,
        borderWidth:1,
        borderColor: '#fe2c55',
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        margin: 5,
        backgroundColor: 'white',
    } 
})
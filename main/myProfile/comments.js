import React,{useState,useEffect} from 'react'
import {Text, View, FlatList, Pressable,StyleSheet, Dimensions, Image} from 'react-native'
import { MainLookup } from '../../lookup/mainlookup';
import  {url} from '../../url'
import {Status} from '../commentCom/singleStatus'
const host = url()
export function UserComments(props){
    const {profile} = props
    const [Books, setBooks] = useState([])
    useEffect(() => {
        const myCallBack = (response, status) =>{
        // console.log("8:",response, status)
        if (status === 200){
            setBooks(response)
            setloading(false)
            }
        }
        setloading(true)
        MainLookup(myCallBack,{method:'GET',endpoint:`/${profile.username}/comments`})
      },[Books])
      const renderRow = ({item, index}) =>{
        return (
            <Status navigation={props.navigation} status={item} key={`${item.id}`}/>
        )
    }
    const [loading, setloading] = useState(false)
    return (
        <>
        <FlatList
            data = {Books}
            renderItem = {renderRow}
            refreshing={loading}
            keyExtractor={(i, k) => k.toString()}
            />
        </>
    );
}

const styles = StyleSheet.create({
    prompt:{
        fontFamily:"Bold",
        fontSize:16,
        paddingLeft:20,
    },
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
    rightPart:{
        marginLeft:20,
    },
    leftPart:{
        // backgroundColor:"black",
        width:"80%"
    },
    thumbnailStyle:{
        height:100,
        // backgroundColor:"black",
        width:100,
        justifyContent:'center',
        alignItems:"center"
    },
    bookContainer:{
        backgroundColor:"white",
        height:100,
        flexDirection:"row",
        paddingBottom:10,
        borderTopWidth:1,
    },
    inputContainerStyle:{
        borderRadius:30
        ,fontFamily:'Bold'
    },
    inputStyle:{
        fontFamily:'Light'
    }
})
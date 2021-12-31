import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState} from 'react';
import {Text, View, FlatList, Pressable,StyleSheet, Dimensions} from 'react-native'
import { MainLookup } from '../lookup/mainlookup';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import {faShareAlt, faThumbsUp, faDownload, faAd, faAngleDoubleDown} from '@fortawesome/free-solid-svg-icons';
import Ionicons from 'react-native-vector-icons/Ionicons'
import {Book} from './book'
const {width, height} = Dimensions.get("screen")
export function BookList(props){
    const {token} = props.route.params
    const [Books, setBooks] = useState([])
    const [loading, setLoading] = useState(false)
    const [bookCount, setbookCount] = useState(Books.length ? Books.length : 0)
    var lastBook = Books[0]
    useEffect(() => {
        const myCallBack = (response, status) =>{
        // console.log("8:",response, status)
        if (status === 200){
            setBooks(response)
            setLoading(false)
            }
        }
        setLoading(true)
        MainLookup(myCallBack,{method:'GET',endpoint:'/'})
      }, [setBooks])
      const loadBooks = (event) =>{
        setLoading(true)
        const handlereload = (response, status) => {
            if (status === 200){
                setBooks(response)
                setLoading(false)
                }
        }  
        MainLookup(handlereload,{method:'GET',endpoint:'/'})
    }
    const renderRow = ({item, index}) =>{
        return (
            <Pressable onPress={() => (props.navigation.navigate("Read Book", {book:item}))}>
            <Book item={item}/>
            </Pressable>
        )
    }

    return (
        <>
        {/* <StatusBar translucent/> */}
        <FlatList
        viewabilityConfig={{ itemVisibleThreshold: 90 }}
        pagingEnabled={true}
        snapToInterval={height}
        decelerationRate={'fast'}
        snapToAlignment={"top"}
        data = {Books}
        renderItem = {renderRow}
        refreshing={loading}
        onRefresh={loadBooks}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        />
        <View onPress={() => (props.navigation.navigate("Write a Book"))}>
            <Pressable style={styles.addbutton} onPress={() => (props.navigation.navigate("Write a Book"))} >
                <Ionicons onPress={() => (props.navigation.navigate("Write a Book"))} name='pencil' size={40} color='#9f00a1'/>
            </Pressable>
            </View>
        </>
    )
}
const styles = StyleSheet.create({
    addbutton: {
        position: 'absolute',       
        right:5,
        bottom:30,
        alignItems: 'center',
        justifyContent: 'center',
        height:80,
        width:80,
        borderRadius: 40,
        backgroundColor: 'white',
        shadowColor: '#9f00a1',
        elevation: 20,
        
      },
    lightStyle:{
        fontSize:15,
        fontFamily: "Regular",
    },
    boldStyle:{
        color:'black',
        // fontWeight:"bold",
        fontSize:15,
        fontFamily: "Bold",
        // fontFamily: "ExtraLight",
    },
    requiredText:{
        fontSize:20,
        fontFamily:"Bold",
        alignSelf:'center',
        marginTop:50,
        color:'red',
    },
    writeText:{
        fontSize:20,
        fontFamily:"Bold",
        alignSelf:'center',
        marginTop:50,
    },
    container:{
        margin:30,
    },
    input:{
        borderRadius:10,
        borderBottomWidth:1,
        fontFamily: "Light",
        width:width/1.2, 
        padding:10,
        margin:10,
    },
    container:{
        // flex:1,
        // height:height,
        // width:width,
        // backgroundColor:'#2c3e50',
    },
    book:{
        height:height,
        backgroundColor:'#2c3e50',
    },
    thumbnail:{
        width:width/2,
        height:height/3,
        backgroundColor:'#9f00a1',
        position:'absolute',
        top:10, 
        left:10,
        borderRadius:20
    },
    rightPart:{
        top:100, 
        left:width/1.7,
        position:'absolute',
    },
    discription:{
        position:'absolute',
        bottom:height/2,
        left:10,
        width:width/1.5,
    },
    actions:{
        position:'absolute',
        bottom:100,
        alignItems:'center',
        width:width,
        height:0,
        flexDirection:'row',
        justifyContent:'space-between'
    }
});

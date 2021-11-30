import React,{useState,useEffect} from 'react'
import {Text, View, FlatList, Pressable,StyleSheet, Dimensions, Image} from 'react-native'
import { MainLookup } from '../../lookup/mainlookup';
import  {url} from '../../url'
const host = url()
export function UserBooks(props){
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
        MainLookup(myCallBack,{method:'GET',endpoint:`/${profile.username}/books`})
      },[Books])
      const renderRow = ({item, index}) =>{
        return (
            <Pressable onPress={() => (props.navigation.navigate("Read Book", {book:item}))}>
                <View style={styles.bookContainer}>
                    <View style={styles.thumbnailStyle}>
                        <Image style={{width: 70, height: 70}} source={{uri: `${host}${item.thumbnail}`}} />
                    </View>
                    <View style={styles.leftPart}>
                        <View style={styles.rightPart} className='rightPart'>
                            <Text style={styles.titleText}>{item.title}</Text>
                            <Text>
                                <Text style={styles.fullnameText}>by {item.author.first_name} {item.author.last_name}</Text><Text style={styles.usernameText}> @{item.author.username}</Text>
                            </Text>
                        </View>
                    </View>
                </View>
            </Pressable>
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
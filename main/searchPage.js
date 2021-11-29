import React, {useState, useEffect} from 'react'
import {Text, View, FlatList, Pressable,StyleSheet, Dimensions,Image} from 'react-native'
import { SearchBar } from 'react-native-elements';
import { cos } from 'react-native-reanimated';
import {MainLookup} from '../lookup/mainlookup'
import {Book} from './book'
import {url} from '../url'
const {width, height} = Dimensions.get("screen")
const host = url()
export function SearchPage(props){
    const [state, setState] = useState({
    search: '',
    })
    const [Books, setBooks] = useState([])
    const [FeedBooks, setFeedBooks] = useState([])
    const [None, setNone] = useState(false)
    useEffect(() =>{
        const feedCallback = (response, status) =>{
            if (status === 200){
                setFeedBooks(response)
            }
        }
        MainLookup(feedCallback,{method:'GET',endpoint:`/`})
    },[])
    const updateSearch = (search) => {
    setState({ search });
    setloading(true)
    const myCallBack = (response, status) =>{
        setBooks([])
        if (response.length > 0){
            if (status === 200){
                setloading(false)
                setBooks(response)
            }
            setNone(false)
        }else{
            setNone(true)
        }
    }
    MainLookup(myCallBack,{method:'GET',endpoint:`?search=${search}`})
    };
    
    const { search } = state;
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
        <SearchBar
            placeholder="Search Wedei"
            onChangeText={updateSearch}
            value={search}
            lightTheme 
            placeholderTextColor={"black"}
            color={'black'}
            inputContainerStyle={styles.inputContainerStyle}
            inputStyle={styles.inputStyle}
            showLoading={loading}
        />
        {None ? <Text style={styles.prompt}>No Results Found</Text> : null}
        {state.search ? 
        <>
        <Text style={styles.prompt}>Showing Results for {state.search}</Text>
        <FlatList
            data = {Books}
            renderItem = {renderRow}
            keyExtractor={(i, k) => k.toString()}
            refreshing={loading}
            />
            </>
            :  
            <>
            <Text style={styles.prompt}>Recomended</Text>
        <FlatList
            data = {FeedBooks}
            renderItem = {renderRow}
            keyExtractor={(i, k) => k.toString()}
            />
            </>
            }
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
        // backgroundColor:"#9f00a1",
        height:100,
        margin:10,
        flexDirection:"row",
        paddingBottom:10,
        paddingTop:10,
        borderTopWidth:2,
    },
    inputContainerStyle:{
        borderRadius:30
        ,fontFamily:'Bold'
    },
    inputStyle:{
        fontFamily:'Light'
    }
})
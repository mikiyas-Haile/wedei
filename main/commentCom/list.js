import React,{useEffect,useState} from 'react'
import {View, Text, FlatList,StyleSheet,Dimensions,Image,Pressable} from 'react-native'
import {url} from '../urls'
import {Status} from '../components/singleStatus'

const host = url()
const {width, height} = Dimensions.get("screen")

function apiStatusList(callback, token,from){
    fetch(`${host}${from}`,{
        method: "GET", 
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`,
        },
        })
        .then(data => data.json()).then(
            data => {
                    callback(data, 200)
        })
        .catch(error => console.error())
}

export function List(props){
    const {from, token} = props
    const [statussInit, setStatussInit] = useState([])
    const [state, setState] = useState([])
    const [csrf, setCsrf] = useState()
    const [loading, setLoading] = useState(false)
    const [statussDidSet, setstatussDidSet] = useState(false)
    useEffect(()=>{
        // setLoading(true)
        const final = [...props.newStatuss].concat(statussInit)
        if (final.length !== state.length) {
            setState(final)
            // setLoading(false)
        }
      }, [props.newStatuss, state, statussInit])
  
    useEffect(() => {
    if (statussDidSet === false){
        const handleTweetListLookup = (response, status) => {
            if (status === 200){
                setStatussInit(response)
            setstatussDidSet(true)
        }
        }
        apiStatusList(handleTweetListLookup, token,from)
    }
    }, [statussInit, statussDidSet, setstatussDidSet])
    const loadStatuss = (event) =>{
        setLoading(true)
            const handlereload = (response, status) => {
                setStatussInit(response)
                setLoading(false)
        }  
        apiStatusList(handlereload, token,from)
    }

    const renderRow = ({item, index}) =>{
        return (
            <Pressable onPress={() => (props.navigation.navigate('detail', {status:item}))}>
                <Status navigation={props.navigation} status={item} key={`${item.id}`}/>
                </Pressable>
        )
    }
    return (
            <FlatList
            data = {state}
            renderItem = {renderRow}
            refreshing={loading}
            onRefresh={loadStatuss}
            keyExtractor={(i, k) => k.toString()}
            />
    )
}

const styles = StyleSheet.create({
   
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
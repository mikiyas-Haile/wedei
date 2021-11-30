import React,{useState, useEffect} from 'react'
import {View, Text, FlatList,StyleSheet,Dimensions,Image,Pressable} from 'react-native'
import {url} from '../../url'
// import {apiStatusList,apiStatusAction} from './apiLookup'
import AppLoading from 'expo-app-loading';
import { useFonts } from 'expo-font';
import {GetFormattedDate} from '../../getTime.js';
import Icon from "react-native-vector-icons/Ionicons";
import {ActionBtns} from './actions'
import AwesomeAlert from 'react-native-awesome-alerts';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import {faShareAlt, faThumbsUp, faThumbsDown} from '@fortawesome/free-solid-svg-icons';
import {faComment, faEdit,faHeart, faTrashAlt} from '@fortawesome/free-regular-svg-icons';

const host = url()
const {width, height} = Dimensions.get("screen")

function StatusAuthorProfile(props){
    const {status} = props
    if (status.author.verified){
        return <>
        <Text style={styles.boldStyle}>{status.author.first_name} {status.author.last_name}</Text>
        <Text style={styles.lightStyle}>@{status.author.username}</Text>
         <Icon
        name="md-checkmark-circle"
        color="#1d9bf0"
        size={20}
      />
        </>
    }else{
        return <>
            <Text style={styles.boldStyle}>{status.author.first_name} {status.author.last_name}</Text>
            <Text style={styles.lightStyle}>@{status.author.username}</Text>
        </>
    }
}
function StatusAuthor(props){
    const {status} = props
    const isreply = status.is_reply ? true : false
        return (
            <>
            <View>
                <View style={{flexDirection:'row'}}>
                    <Text style={styles.authorStyle} >
                        <StatusAuthorProfile status={status}/>
                    </Text>
                </View>
                <View >
                    <Text style={styles.dateAdded}>
                        <GetFormattedDate  time={status.date_added}/>  
                        <Text style={{fontSize:5, color:'grey'}}>   ●   </Text>
                        <ParsedDate date={status.date_added}/>
                    </Text>
                </View>
            </View>
        </>
    )
}
function ParsedDate(props){
    var {date} = props
    var d = new Date(date)
    var ddate = d.getFullYear()
    var mmonth = d.getMonth()
    return <Text>{mmonth}/{ddate} </Text>
  }
export function Status(props){
    const {status, token} = props
    const isreply = status.is_reply ? true : false
    const [showAlert, setshowAlert] = useState(false)
    const [loading, setloading]= useState(false)
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
    const Delete = (event) => {
        setloading(true)
        event.preventDefault()
        fetch(`${host}/api/status/${status.id}/delete`,{
        method: "DELETE", 
        headers: {'Content-Type': 'application/json',
        'Authorization': `Token ${token}`,
        "Referer": `${host}`,
        "X-CSRFToken": csrfToken,

    },
        body: JSON.stringify({body:'hi'})
        })
        .then( data => data.json()).then(
            data => {
                
                setshowAlert(false)
                console.log(data)
                if (data.detail){
                    alert("Network Issue, Please try again")
                }else if (data.success){
                    alert("Deleted succesfully, please refresh your feed")
                    props.navigation.navigate("home", {screen:'Home'})
                    setloading(false)
                }else{
                    props.navigation.navigate("home", {screen:'Home'})
                }
            }
        )
        .catch(error => console.error())
      }
    return (
        <>
            <View onPress={() => (props.navigation.navigate('detail', {status:status}))} className="status" style={styles.status}>
                <Pressable onPress={() => (props.navigation.navigate('viewProfile', {username:status.author.username}))}>
                    <View onPress={() => (props.navigation.navigate('viewProfile', {username:status.author.username}))} style={styles.topPart} className="topPart">
                      <View style={{flexDirection:'row'}}> 
                        <View style={{width:40}}>
                                <Image onPress={() => (props.navigation.navigate('viewProfile', {username:status.author.username}))} style={{borderRadius: 100,width: 40, height: 40}} source={{uri: `${host}${status.author.pfp_url}`}} />
                            </View>
                            {isreply ? 
                                <View style={{
                                    position:'absolute',
                                    height:100,
                                    borderLeftWidth:5,
                                    left:18,
                                    top:40,
                                    borderColor:'#fe2c55'
                                }}/>
                                : null}
                            <View>
                                <StatusAuthor  status={status}/>
                            </View>
                        </View>
                    </View>
                </Pressable>
                <View style={styles.rightPart}>
                    <View style={{width:width}}className="middlePart">
                        <StatusBody status={status} navigation={props.navigation}/>
                    </View>
                    <View style={styles.lastPart}>
                        <Text><ActionBtns token={token} status={status} action={{type:'like'}}/></Text>
                        <Pressable onPress={() => props.navigation.navigate('createCom', {status:status})}>
                        <Text><ActionBtns token={token} navigation={props.navigation} status={status} action={{type:'comment'}}/></Text>
                        </Pressable>
                         <Text><ActionBtns token={token} navigation={props.navigation} status={status} action={{type:'reply'}}/></Text>
                        {status.is_me ? <Text><FontAwesomeIcon  onPress={() => (setshowAlert(true))} style={styles.actionBtns} size={ 20 } icon={faTrashAlt} /></Text>:null}
                    </View>
                </View>
            </View>
            <AwesomeAlert
                show={showAlert}
                showProgress={false}
                // title="AwesomeAlert"
                messageStyle={styles.boldStyle}
                confirmButtonTextStyle={styles.lightStyle}
                cancelButtonTextStyle={styles.lightStyle}
                message="Are you sure you want to delete?"
                closeOnTouchOutside={false}
                closeOnHardwareBackPress={false}
                showCancelButton={true}
                showConfirmButton={true}
                cancelText="cancel"
                confirmText="delete"
                confirmButtonColor="#fe2c55"
                cancelButtonColor="#2c3e50"
                onCancelPressed={() => {
                    setshowAlert(false);
                }}
                onConfirmPressed={Delete}
            />
        </>
        )
}
function StatusBody(props){
    const {status} = props
    if (status.is_reply){
        return (
            <View>
                <View style={{width:width/1.1}}>
                    <Status navigation={props.navigation} status={status.parent} key={`${status.parent.id}`}/>
                </View>
                <View style={{width:width/1.1}}>
                    <Text onPress={() => (props.navigation.navigate('detail', {status:status}))}
                        style={styles.bodyStyle}>
                        {status.body}
                    </Text>
                    
                </View>
            </View>
        )
    }else{
        return (
        <View style={{width:width/1.1}}>
            <Text onPress={() => (props.navigation.navigate('detail', {status:status}))}
                style={styles.bodyStyle}>
                {status.body}
            </Text>
        </View>
    )
}
}
const styles = StyleSheet.create({
    dateAdded:{
        marginLeft:5,
        fontFamily: "ExtraLight",
    },
    actionBtns:{
        color:'#2c3e50',
    },
    authorStyle:{
        marginLeft:5,
        fontFamily: "ExtraLight",
    },
    bodyStyle:{
        fontSize:17,
        fontFamily: "Regular",
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
    topPart:{
        width: '100%',
        flexDirection: "row",
        backgroundColor:'black'
    },
    text:{
        fontSize:20,
        fontFamily: "ExtraLight",
    },
    // 2c3e50, ExtraLight "Regular
    lastPart:{
        justifyContent:'space-between',
        flexDirection: "row",
    },
    rightPart:{
        width: '90%',
    },
    middlePart:{
        width: "100%",
        marginTop:10,
        marginBottom:10,
    },
    topPart:{
        paddingRight:5
    },
    status:{
        flexDirection: "row",
        borderColor: '#9f00a1',
        borderColor: '#2c3e50',
        borderWidth:1,
        margin:5,
        borderRadius:20,
        width:'100%',
        padding:10,
        backgroundColor: 'white',
        flexWrap: 'wrap',
        alignItems: 'flex-start',
    }
})
import React,{useState, useEffect} from 'react'
import {View, Text, FlatList,StyleSheet,Dimensions,Image,Pressable, TouchableOpacity} from 'react-native'
import {url} from '../../url'
import Icon from "react-native-vector-icons/Ionicons";
import {MainLookup} from '../../lookup/mainlookup'
const host = url()
const {width, height} = Dimensions.get("screen")
export function ProfileStatus(props){
    const [profile, setProfile] = useState([])
    
    useEffect(() =>{
        const myCallback = (response, status) => {
            if (status === 200){
                setProfile(response)
            }
        }
        MainLookup(myCallback, {
            method:'GET',
            endpoint:'/api/profile/me',
            token:props.token
        })
    })
    return (
        <>
        <FormattedProfile navigation={props.navigation} token={props.token} UserProfile={profile}/>
        </>
      );
}
export function FormattedProfile(props){
    const {UserProfile, token} = props
    const Bio = UserProfile.bio ? UserProfile.bio : ''

    return (
        <View  className="status" style={styles.status}>
            <View classname='left-part'>
                <ProfilePic UserProfile={UserProfile}/>
            </View>
            <View style={{flexDirection:'column', width:width, alignItems:'center'}} className="right-part">
                <View style={{paddingRight:10,flexDirection:'row'}}>
                    <StatusAuthor UserProfile={UserProfile}/>
                </View>
                <View>
                    <Follow navigation={props.navigation} token={token} UserProfile={UserProfile}/>
                </View>
            </View>
            {Bio ? 
                <View style={{flexDirection:'column', width:width/1.2, alignItems:'center'}}>
                   <Text style={styles.bodyStyle}>{Bio}</Text>
                </View>
                :null}
        </View>
    )
  }
function Follow(props){
    const {UserProfile, token} = props
    const followers = UserProfile.follower_count ? UserProfile.follower_count : 0
    const following = UserProfile.following_count ? UserProfile.following_count : 0
    const bookcount = UserProfile.books ? UserProfile.books : 0
    const [isMe, setIsMe] = useState(false)
    useEffect(() =>{
        if(UserProfile.request_user === UserProfile.username){
            setIsMe(true)
        }else{
            setIsMe(false)
        }
    })
    return (
        <>
        {isMe ?
            <>
            <View style={{width:width,flexDirection:'row', justifyContent:'space-evenly',margin:10}}>
                <Text style={styles.boldStyle}>
                    {bookcount} books
                </Text>
                <Text style={styles.boldStyle}>
                    {followers} followers
                </Text>
                <Text style={styles.boldStyle}>
                    {following} following
                </Text>
            </View>
            </>
        : null}
        {isMe ?
        <View style={{width:width,flexDirection:'row', justifyContent:'space-evenly', alignItems:'center'}}>
        <TouchableOpacity>
            <Pressable onPress={() => (props.navigation.navigate('Setting'))} style={styles.Editbutton}>
                <Text style={{color:'white',fontFamily: "Bold"}}>Edit Profile</Text>
            </Pressable>
        </TouchableOpacity>
    </View>
        :
        null}
        </>
    )
}
function StatusAuthor(props){
    const {UserProfile}  = props

    if (UserProfile.verified){
        return <>
        <Text style={styles.boldStyle}>{UserProfile.first_name} {UserProfile.last_name}</Text>
        <Text style={{fontSize:17,color:'black',fontFamily: "Regular"}}>@{UserProfile.username} </Text><Icon
        name="md-checkmark-circle"
        color="#1d9bf0"
        size={20}
        />
        </>
    }else{
        return <>
            <Text style={styles.boldStyle}>{UserProfile.first_name} {UserProfile.last_name}</Text>
            <Text style={{fontSize:17,color:'black',fontFamily: "Regular"}}>@{UserProfile.username}</Text>
        </>
    }
}
function ProfilePic(props){
    const {UserProfile} = props
    return <Image style={{borderRadius: 100,width: 150, height: 150}} source={{uri: `${host}${UserProfile.pfp_url}`}} />
}
const styles = StyleSheet.create({
    Editbutton:{
        padding:10,
        margin:5,
        alignItems: 'center',
        justifyContent: 'center',
        width:width/2,
        borderRadius: 20,
        backgroundColor: '#9f00a1',
      },
    addbutton: {
        padding:10,
        margin:5,
        alignItems: 'center',
        justifyContent: 'center',
        width:width/4,
        borderRadius: 20,
        backgroundColor: '#2c3e50',
      },
    dateAdded:{
        marginLeft:5,
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
        color:'white',
        fontSize:17,
        fontFamily: "Regular",
    },
    boldStyle:{
        // fontWeight:"bold",
        fontSize:17,
        fontFamily: "Bold",
        // fontFamily: "ExtraLight",
    },
    topPart:{
        flexDirection: 'row',
    },
    text:{
        fontSize:20,
        fontFamily: "ExtraLight",
    },
    // 2c3e50, ExtraLight "Regular
    lastPart:{
        justifyContent:'space-between',
        width: width/1.3,
        flexDirection: "row",

    },
    middlePart:{
        width: width/1.2,
        marginTop:10,
        marginBottom:10,
    },
    topPart:{
        paddingRight:5
    },
    status:{
        flexDirection: "column",
        // borderColor: '#fe2c55',
        borderColor: '#2c3e50',
        width:width,
        backgroundColor: 'white',
        alignItems: 'center',
    }
})
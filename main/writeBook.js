import React, {useState, useEffect} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons'
import {url} from '../url'
import {TextInput,Pressable, StyleSheet,Dimensions,View,Text,TouchableOpacity,ScrollView} from 'react-native'
import Spinner from 'react-native-loading-spinner-overlay';
import {MainLookup} from '../lookup/mainlookup'
import AwesomeAlert from 'react-native-awesome-alerts';
const {width, height} = Dimensions.get("screen")
const host = url()
export function WriteBook(props){
    const {token} = props.route.params
    const [loading, setloading]= useState(false)
    const [title, setTitle] = useState('')
    const [Description, setDescription] = useState('')
    const [body, setBody] = useState('')
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
    
    const mycallback = (response, status) =>{
        console.log(response, status)
        if (status === 200){
            setloading(false)
            alert("You have Successfully Published your Book")
            props.navigation.navigate("Read Book", {book:response})
        }else{
            alert(`Uncaught Error, please try again later.\n Error ${response} \n Error Code ${status}`)
        }
    }
    const handleSubmit = (event) => {
        setshowAlert(false)
        event.preventDefault()
        if (title && body && Description){
            setrequired(false)
        setloading(true)
            MainLookup(
                    mycallback, {
                    token:token,
                    csrf:csrfToken,
                    endpoint:'/action',
                    method:'POST',
                    data:{
                        action:'create',
                        title:title,
                        discription:Description,
                        body:body
                    }
                }
            )
        }else{
            setrequired(true)
        }
      }
      const [required,setrequired] = useState(false)
    const [post, setPost] = useState(false)
    const [showAlert, setshowAlert] = useState(false)
    return<>
            <Spinner
                visible={loading}
                textContent={'loading..'}
                animation={"fade"}
                textStyle={{color: '#FFF'}}
            />
            <ScrollView>
            <View style={styles.container}>
            <Text style={styles.writeText}>Write a Book!</Text>
            {required ? <Text style={styles.requiredText}>Please fill all the empty spaces</Text> : null}
                <Text style={styles.writeText}>{title}</Text>
                <TextInput 
                    multiline
                    maxLength={30}
                    onChangeText={(val) => {setTitle(val)}}
                    value={title}
                    data-name='title' 
                    placeholder='Title' 
                    style={styles.input}
                />
                <TextInput 
                    multiline
                    maxLength={200}
                    onChangeText={(val) => {setDescription(val)}}
                    value={Description}
                    data-name='about' 
                    placeholder='Description' 
                    style={styles.input}
                />
                <TextInput 
                multiline
                onChangeText={(val) => {setBody(val)}}
                value={body}
                data-name='body' 
                placeholder='Body' 
                style={styles.input}
            />
             <AwesomeAlert
                show={showAlert}
                showProgress={false}
                // title="AwesomeAlert"
                messageStyle={styles.boldStyle}
                confirmButtonTextStyle={styles.lightStyle}
                cancelButtonTextStyle={styles.lightStyle}
                message="Are you sure you want to Publish?"
                closeOnTouchOutside={false}
                closeOnHardwareBackPress={false}
                showCancelButton={true}
                showConfirmButton={true}
                cancelText="cancel"
                confirmText="Yes"
                confirmButtonColor="#fe2c55"
                cancelButtonColor="#2c3e50"
                onCancelPressed={() => {
                    setshowAlert(false);
                }}
                onConfirmPressed={handleSubmit}
            />
            </View>
            </ScrollView>
            <View onPress={() => (setshowAlert(true))} style={styles.addbutton}>
            <Pressable onPress={() => (setshowAlert(true))} >
                <Ionicons onPress={() => (setshowAlert(true))} name='pencil' size={40} color='#9f00a1'/>
            </Pressable>
            </View>
        </>
}
const styles= StyleSheet.create({
    addbutton: {
        position: 'absolute',       
        right:5,
        bottom:30,
        alignItems: 'center',
        justifyContent: 'center',
        padding:15,
        paddingBottom:15,
        borderRadius: 100,
        backgroundColor: 'white',

        shadowColor: '#9f00a1',
        shadowOpacity: 1,
        shadowRadius: 10,
        elevation: 5,
        
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
})
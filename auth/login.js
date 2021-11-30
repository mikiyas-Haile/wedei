import React, {useState, useEffect} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import {url} from '../url'
import {StyleSheet,TextInput, Dimensions,Pressable,Text,View,Image} from 'react-native'
import AppLoading from 'expo-app-loading';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useFonts } from 'expo-font';
import {reloadApp} from '../reload'
import Spinner from 'react-native-loading-spinner-overlay';
import { MainLookup } from '../lookup/mainlookup';
const {width, height} = Dimensions.get("screen")
const host = url()
export function LoginComponent (props) {
  const [username, setusername] = useState()
  const [password, setPassword] = useState()
  const  [csrf, setCsrf] = useState()
  const [loading, setloading]= useState(false)
  const [Required, setRequired] = useState(false)
  const [Incorrect,setIncorrect] = useState(false)
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
    const storeData = async (value) => {
            try {
              const jsonValue = JSON.stringify(value)
              await AsyncStorage.setItem('Token', jsonValue)
              console.log("Welcome")
            } catch (e) {
              console.log(e)
            }
          }
    const mycallback = (response, status) =>{
      setloading(false)
      if (status === 200){
        console.log(response.token)
        setIncorrect(false)
        setRequired(false)
        storeData(response.token)
        props.navigation.navigate("home", {screen:'Home'})
        reloadApp()
      }else if (status === 400){
        setIncorrect(true)
      }else{
        console.log(status)
      }
      if (status === 403){
        setIncorrect(false)
        setRequired(false)
        alert("Network Error, Please try again.")
      }
  }
  const Login = (event) => {
      if (username && password){
      setloading(true)
          MainLookup(
                  mycallback, {
                  // token:token,
                  csrf:csrfToken,
                  endpoint:'/api/login',
                  method:'POST',
                  data:{
                      username:username,
                      password:password,
                  }
              }
          )
      }else{
        setRequired(true)
      }
    }
    return (
      <>
      <Spinner
          visible={loading}
          textContent={'loading..'}
          animation={"fade"}
          textStyle={{color: '#FFF'}}
        />
        <View style={styles.container}>
          {/* <Image style={{width:200, height:200}} source={require( '../assets/logo_six.png')}/> */}
            <Text style={{fontFamily: "Bold", fontSize:30}}>Login to Wedei</Text>
            <View>
        {Incorrect ? <Text style={{paddingLeft:2,paddingRight:2,borderRadius:10,borderWidth:2,borderColor:'red',fontFamily: "Light", fontSize:20}}>Username and password didn't match</Text>:null}

              <TextInput 
                onChangeText={(val) => setusername(val)}
                maxLength={10}
                data-name='username' 
                placeholder='Username' 
                style={styles.input}
                  />
            </View>
            <View>
               <TextInput
               secureTextEntry={true}
               onChangeText={(val) => setPassword(val)}
                maxLength={10} 
                data-name='password' 
                placeholder='Password' 
                style={styles.input} 
                />
        {Required ? <Text style={{paddingLeft:2,paddingRight:2,borderRadius:10,borderWidth:2,borderColor:'red',fontFamily: "Light", fontSize:20}}>Please Fill both of the fields correctly</Text>:null}
            </View>
            <TouchableOpacity onPress={Login}><Pressable style={styles.LoginButton} onPress={Login}>
              <Text style={styles.text} onPress={Login}>Login</Text>
            </Pressable></TouchableOpacity>
            
            <Text style={{fontFamily: "Regular",fontSize:20}}>don't have an account?</Text>

            <TouchableOpacity><Pressable style={styles.button} onPress={() => props.navigation.navigate('register')}>
              <Text style={styles.text}>Register</Text>
            </Pressable></TouchableOpacity>
        </View>
        </>
        )
}

const styles = StyleSheet.create({
  OrangeWarning:{
    fontFamily: "Light",
    backgroundColor:"orange", 
    height:50, 
    alignItems:'center', 
    justifyContent:'center', 
    margin:20, 
    borderRadius:20
  },
  viewOne:{
    fontFamily: "Light",
    backgroundColor:"orange", 
    height:50,
    alignItems:'center',
    justifyContent:'center',
    margin:20,
    borderRadius:20
  },
  input:{
    borderRadius:10,
    borderBottomWidth:1,
    fontFamily: "Bold",
    width:width/1.2, 
    padding:10,
    margin:10,
  },
  container:{
    flex:1,
    alignItems:'center',
    justifyContent:'center',
  },
  LoginButton:{
    width:width/1.3,
    fontFamily: "Bold",
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    margin:20,
    borderRadius: 30,
    backgroundColor: '#9f00a1',
  },
    button: {
      width:width/1.3,
      fontFamily: "Bold",
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 12,
      paddingHorizontal: 32,
      margin:20,
      borderRadius: 30,
      backgroundColor: 'black',
    },
    text: {
      fontFamily: "Light",
      fontSize: 16,
      lineHeight: 21,
      fontWeight: 'bold',
      letterSpacing: 0.25,
      color: 'white',
    },
  });
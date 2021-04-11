import {createStackNavigator} from '@react-navigation/stack'
import {createDrawerNavigator} from '@react-navigation/drawer'
import { StyleSheet, Text, View,TextInput,Button,TouchableOpacity } from 'react-native';
import firestore from '@react-native-firebase/firestore'
import { NavigationContainer } from '@react-navigation/native';
import {Entypo} from "react-native-vector-icons";
import React from 'react';
const Changepassword =({navigation,route})=>
{
  const db =firestore().collection('users')
  const [newPassword, setNewPassword] =  React.useState("");
  const [passwordConfirm, setPasswordConfirm] = React.useState("");
  const [users,setuser]= React.useState("")
  async function dulieu()
              {
               await db.
               doc(route.params.user)
               .update(
                 {
                   password:newPassword
                 }
               )
                }
  
  function doimatkhau()
  {
            console.log(route.params.user)
        
            if(newPassword!="" && newPassword == passwordConfirm)
            {
              dulieu()
        
                navigation.navigate('login'); 

            }
            else
            {
                alert("password confirm khong trung")
            }

  }
  return(
    <View style={styles.container_2}>
    <Text style={styles.text_2}> ĐỔI MẬT KHẨU </Text>
    <TextInput  placeholder="New password" secureTextEntry={true} style = {styles.textinput_2}
        onChangeText = {text=>setNewPassword(text)}/>
     <TextInput  placeholder="Password confirm" secureTextEntry={true} style = {styles.textinput_2}
         onChangeText = {text=>setPasswordConfirm(text)}/>
            
    <TouchableOpacity style={styles.button_2} 
     onPress={doimatkhau}
     >
            <Text style ={styles.textbutton_2}> Change </Text>
    </TouchableOpacity>
</View>

  )
}
const styles = StyleSheet.create({
container_2:{
    flex:1, 
    padding:10,
  },
  text_2:{
    color: 'blue',
    fontWeight: 'bold',
    fontSize: 40,
    alignSelf: 'center',
    padding: 50,
  },
  textinput_2:{
    height:50,
    fontWeight:"bold",
    fontSize: 20,
    borderRadius: 5,
    borderWidth:1,
    margin:10,
  },
  
  button_2:{
    backgroundColor:'aqua',
    height: 50,
    borderRadius:10,
    justifyContent:"center",
    alignItems: 'center',
    margin:10,
  }
  ,
  textbutton_2:{
    color:'blue',
    fontSize: 24,
    fontWeight: 'bold'
  }
  
  
  
  
  
  
  
  });
export default Changepassword;
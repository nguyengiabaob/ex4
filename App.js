import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack'
import {createDrawerNavigator} from '@react-navigation/drawer'
import { StyleSheet, Text, View,TextInput,Button,TouchableOpacity } from 'react-native';
import firestore from '@react-native-firebase/firestore'
import { NavigationContainer } from '@react-navigation/native';
import {Entypo} from "react-native-vector-icons";
import Changepassword from './changepassword'
export default function App() {
const [users,setuser]= React.useState("")
const db =firestore().collection('users')
const [listid,setlistid]=React.useState([])
React.useEffect(
  ()=>{
    return db.onSnapshot(querysnapshot=>{
      const list=[]
      querysnapshot.forEach(doc=>{
      setuser(doc.data())
      const {user,password}=doc.data()
      // console.log(user)
      list.push(
        {
          id:doc.id,
          user,
          password
        }
      )
      
     })
     setlistid(list)
    console.log(listid)
    }) 
  }
,[])
const Home =({navigation})=>
{
  return(
    <View style={styles.container_1}>
         <TouchableOpacity style={styles.menu}
                onPress={()=>{navigation.openDrawer()}}
            >   
                <Entypo name ="menu" color="#3c4043" size={50}></Entypo>
                
            </TouchableOpacity>
            <View style={styles.container_1} >
                <Text>Home.js</Text>
            </View>
        </View>

  )
}
  

const Login =({navigation})=>
{

  const [username,setusername]=React.useState("")
  const [userpassword,setuserpassword]=React.useState("")
 
  function dangnhap()
  {
  
   
    console.log(listid)
    let user_own= listid.find(user=>user.user===username&& user.password===userpassword)
   
    if(user_own!=null)
    {
      let id= user_own.id
      navigation.navigate('menu',id={id})
    }
    else
      alert("sai username hoặc passsword")
  }
  return(
    <View style={{           flex:1, 
      padding:10,
}}>
    <Text style={styles.text}> ĐĂNG NHẬP </Text>
    <TextInput  placeholder="Username"  style = {styles.textinput}
        onChangeText = {(text)=> setusername(text)}/>
    <TextInput  placeholder="Password" secureTextEntry={true} 
    style = {styles.textinput}
        onChangeText = {(text)=>setuserpassword(text)}/>
    <TouchableOpacity style={styles.button} 
     onPress={dangnhap}
     >
            <Text style ={styles.textbutton}> Login </Text>
    </TouchableOpacity>
</View>

  )
}


 

const Drawer = createDrawerNavigator()
const stack= createStackNavigator()
const Menu =({route})=>{
const user= route.params.id
console.log(user)
  return(
    <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={Home}>

        </Drawer.Screen>
        <Drawer.Screen name="login" component={Login}></Drawer.Screen>
        <Drawer.Screen name="changepassword" component={Changepassword} initialParams={{user:user}} />
    </Drawer.Navigator>
  )
}
  return (
      <NavigationContainer>
        <stack.Navigator 
        initialRouteName="login"
        screenOptions={{headerShown:false}}>
          <stack.Screen name="menu" component={Menu}/>
          <stack.Screen name="login" component={Login}/>
        </stack.Navigator>
      </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text:{
    color: 'blue',
    fontWeight: 'bold',
    fontSize: 44,
    alignSelf: 'center',
    padding: 50,
},
textinput:{
  height:50,
  fontWeight:"bold",
  fontSize: 20,
  borderRadius: 5,
  borderWidth:1,
  margin:10,
},
button:{
  backgroundColor:'aqua',
  height: 50,
  borderRadius:10,
  justifyContent:"center",
  alignItems: 'center',
  margin:10,
},

textbutton:{
  color:'blue',
  fontSize: 24,
  fontWeight: 'bold'
},
container_1:{
  flex:1,
  justifyContent:'center',
  alignItems:'center',
},
menu:{
  height:60, 
  alignSelf:"flex-end",
},

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

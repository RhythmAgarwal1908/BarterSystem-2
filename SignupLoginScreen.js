import * as React from 'react';
import { Text, View, StyleSheet,TextInput,TouchableOpacity, Touchable, Alert,Modal,ScrollView,KeyboardAvoidingView } from 'react-native';
import db from '../config'
import firebase from 'firebase'


export default class SignupLoginScreen extends React.Component{
    constructor(){
        super()
        this.state={
            username:'',
            password:'',
            confirmPassword:'',
            firstName:'',
            lastName:'',
            address:'',
            contact:'',
            confirmPassword:'',
            isModalVisible:'false'
          }
    }

    userLogIn=(username,password)=>{
        firebase.auth().signInWithEmailAndPassword(username,password)
        .then(()=>{
          this.props.navigation.navigate('ExchangeScreen')
          console.log('Correct')
          
            return Alert.alert('Successfully Loged In')
            
        })
        .catch((error)=>{
          console.log("Wrong")
            var errorCode = error.code;
            var errorMessage = error.message;
            return Alert.alert(errorMessage)
           
        })
    }
    
    UserSignUp = (username, password,confirmPassword) =>{
      if(password !== confirmPassword){
          return alert("password doesn't match\nCheck your password.")
      }else{
        firebase.auth().createUserWithEmailAndPassword(username, password)
        .then((response)=>{
          db.collection('users').add({
            firstname:this.state.firstName,
            lastname:this.state.lastName,
            phonenumber:this.state.contact,
            username:this.state.username,
            address:this.state.address
          })
          return  alert(
               'User Added Successfully',
               '',
               [
                 {text: 'OK', onPress: () => this.setState({"isModalVisible" : false})},
               ]
           );
        })
        .catch((error)=> {
          // Handle Errors here.
          console.log("Sorry")
          var errorCode = error.code;
          var errorMessage = error.message;
          return alert(errorMessage)
        });
      }
    }
  
  showModal=()=>{
      return(
          <Modal
          animationType='fade'
          transparent={true}
          visible={this.state.isModalVisible}>
          <View style={styles.modalContainer}>
  <ScrollView style={{width:'100%'}}>
  <KeyboardAvoidingView style={styles.keyboardAvoidingView}>
  <Text style={styles.modalTitle}>
      Registration
  </Text>
  <TextInput style={styles.fontTextInput} placeholder={"First Name"} maxLength={8} onChangeText={(text)=>{
      this.setState({firstname:text})
  }}/>
  <TextInput style={styles.fontTextInput} placeholder={"Last Name"} maxLength={8} onChangeText={(text)=>{
      this.setState({lastname:text})
  }}/>
  <TextInput style={styles.fontTextInput} placeholder={"Contact No."} maxLength={10} keyboardType={'numeric'} onChangeText={(text)=>{
      this.setState({contact:text})
  }}/>
  <TextInput style={styles.fontTextInput} placeholder={"Address"} multiline={true} onChangeText={(text)=>{
      this.setState({address:text})
  }}/>
  <TextInput style={styles.fontTextInput} placeholder={"E-mail Address"} keyboardType={'email-address'} onChangeText={(text)=>{
      this.setState({username:text})
  }}/>
  <TextInput style={styles.fontTextInput} placeholder={"Password"} secureTextEntry={true} onChangeText={(text)=>{
      this.setState({password:text})
  }}/>
  <TextInput style={styles.fontTextInput} placeholder={"Confirm Password"} secureTextEntry={true
  } onChangeText={(text)=>{
      this.setState({confirmPassword:text})
  }}/>
  <View>
      <TouchableOpacity style={styles.registerbutton} onPress={()=>{
              this.UserSignUp(this.state.username,this.state.password,this.state.confirmPassword)
              }}>
  <Text style={styles.registerButtonText}>Register</Text>
      </TouchableOpacity>
  </View>
  
  <View>
      <TouchableOpacity style={styles.registerbutton} onPress={()=>this.setState({isModalVisible:false})}>
  <Text>Cancel</Text>
      </TouchableOpacity>
  </View>
  
  </KeyboardAvoidingView>
  </ScrollView>
          </View>
          </Modal>
          
          )
      }
 render(){
 return (

  <View style={styles.container}>
        <View style={{justifyContent: 'center',alignItems: 'center'}}>
          </View>
    {
            this.showModal()
          }     
    <TextInput
            style={styles.loginBox}
            placeholder="Username"
            keyboardType ='email-address'
            onChangeText={(text)=>{
              this.setState({
                username: text
              })
            }}
          />
          <TextInput
          style={styles.loginBox}
          secureTextEntry = {true}
          placeholder="Password"
          onChangeText={(text)=>{
            this.setState({
              password: text
            })
          }}
        />
<View>
<TouchableOpacity
           style={[styles.button,{marginBottom:20, marginTop:20}]}
           onPress = {()=>{
             this.userLogIn(this.state.username, this.state.password)
           }}
           >
           <Text style={styles.buttonText}>Login</Text>
         </TouchableOpacity>

         <TouchableOpacity
           style={styles.button}
           onPress={()=>{this.UserSignUp(this.state.username,this.state.password)}}
           >
           <Text style={styles.buttonText}>SignUp</Text>
         </TouchableOpacity>
</View>
  </View>
 )}
}
const styles = StyleSheet.create({ 
  container:{ flex:1, backgroundColor:'#F8BE85' }, 
  profileContainer:{ flex:1, justifyContent:'center', 
  alignItems:'center'}, 
  title :{ fontSize:65, fontWeight:'300', paddingBottom:30, color : '#ff3d00' }, 
  loginBox:{ width: 300, height: 40, borderBottomWidth: 1.5, borderColor : '#ff8a65', fontSize: 20, margin:10, paddingLeft:10 }, 
  button:{ width:300, height:50, justifyContent:'center', alignItems:'center', borderRadius:25, 
  backgroundColor:"#ff9800", shadowColor: "#000", shadowOffset: { width: 0, height: 8, }, shadowOpacity: 0.30, shadowRadius: 10.32, elevation: 16, }, 
  buttonText:{ color:'#ffff', fontWeight:'200', fontSize:20 }, 
  buttonContainer:{ flex:1, alignItems:'center' },
    profileContainer:{
      flex:1,
      justifyContent:'center',
      alignItems:'center',
    },
    title :{
      fontSize:65,
      fontWeight:'300',
      paddingBottom:30,
      color : '#ff3d00'
    },
    loginBox:{
      width: 300,
      height: 40,
      borderBottomWidth: 1.5,
      borderColor : '#ff8a65',
      fontSize: 20,
      margin:10,
      paddingLeft:10
    },
    KeyboardAvoidingView:{
      flex:1,
      justifyContent:'center',
      alignItems:'center'
    },
    modalTitle :{
      justifyContent:'center',
      alignSelf:'center',
      fontSize:30,
      color:'#ff5722',
      margin:50
    },
    modalContainer:{
      flex:1,
      borderRadius:20,
      justifyContent:'center',
      alignItems:'center',
      backgroundColor:"#ffff",
      marginRight:30,
      marginLeft : 30,
      marginTop:80,
      marginBottom:80,
    },
    formTextInput:{
      width:"75%",
      height:35,
      alignSelf:'center',
      borderColor:'#ffab91',
      borderRadius:10,
      borderWidth:1,
      marginTop:20,
      padding:10
    },
    registerButton:{
      width:200,
      height:40,
      alignItems:'center',
      justifyContent:'center',
      borderWidth:1,
      borderRadius:10,
      marginTop:30
    },
    registerButtonText:{
      color:'#ff5722',
      fontSize:15,
      fontWeight:'bold'
    },
    cancelButton:{
      width:200,
      height:30,
      justifyContent:'center',
      alignItems:'center',
      marginTop:5,
    },
   
    button:{
      width:300,
      height:50,
      justifyContent:'center',
      alignItems:'center',
      borderRadius:25,
      backgroundColor:"#ff9800",
      shadowColor: "#000",
      shadowOffset: {
         width: 0,
         height: 8,
      },
      shadowOpacity: 0.30,
      shadowRadius: 10.32,
      elevation: 16,
      padding: 10
    },
    buttonText:{
      color:'#ffff',
      fontWeight:'200',
      fontSize:20
    }})
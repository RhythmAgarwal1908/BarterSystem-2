import * as React from 'react';
import { Text, View, StyleSheet,TextInput,TouchableOpacity,KeyboardAvoidingView,ToastAndroid} from 'react-native';
import Constants from 'expo-constants';
import db from '../config'
import firebase from '@firebase/app';
import '@firebase/firestore';

export default class ExchangeScreen extends React.Component{
  constructor(){
    super()
    this.state={
      itemNames:'',
      about:''
    }
  }
  additem=()=>{
db.collection('Items').add({'DescriptionofItem':this.state.about,'ItemsName':this.state.itemNames})
ToastAndroid.show("Your Item Have Been Succesfully Added",)
this.setState({
author:'',
      title:'',
      story:'',
})
}
render(){
  return (
    <KeyboardAvoidingView>
   <View style = {styles.container}>
  
    <TextInput
    style={styles.inputBox}
    placeholder="Item Name"
    onChangeText={(text)=>{
  this.setState({itemNames:text})
    }}
    />
     <TextInput
     multiline='true'
    style={styles.inputBox2}
    placeholder="Description"
    onChangeText={(text)=>{
  this.setState({about:text})
    }}
    />
   <TouchableOpacity style={styles.buttonstyle} onPress={this.submitStory}>
   <Text>Add Item</Text>
   </TouchableOpacity>
    </View>
    </KeyboardAvoidingView>
  );
}}

const styles = StyleSheet.create({
 container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
   inputBox: {
    width: 250,
    height: 40,
    borderWidth: 1.5,
    borderRightWidth: 1,
    fontSize: 20,
    marginTop:10
  },
  inputBox2: {
    width: 250,
    height: 220,
    borderWidth: 1.5,
    borderRightWidth: 1,
    fontSize: 20,
    marginTop:10
  },
  buttonstyle:{
backgroundColor:'#FFC0CB',
 justifyContent : 'center',
    alignSelf : 'center',
    borderWidth : 2,
    borderRadius : 15,
    marginTop:5,
    width : 200,
    height:50,
    textAlign:"center",
  },
  },
);
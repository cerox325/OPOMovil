import React from 'react';
import { Text,TextInput,View,Button ,Image,ImageBackground, StyleSheet, Alert, AsyncStorage } from 'react-native';
import { Icon, } from 'react-native-elements'
import useForm from '../hooks/useForm'

const imgbg = require('../assets/the-market-3147758_1280.jpg');
const styles = StyleSheet.create({
    container:{
        flex:1,
        flexDirection: 'column',
        justifyContent:'center',
        alignItems: 'stretch',
      },
      containerSignIn:{
        height: 60,
        marginLeft:'6%',
        marginRight:'6%',
        paddingTop:'2%'
      },
      containerUserName:{
        height: 60,
        flexDirection:'row',
        justifyContent:'center',
        backgroundColor:'#ffff',
        marginLeft:'10%',
        marginRight:'10%',
      },
      containerPassword:{
        height: 60,
        flexDirection:'row',
        justifyContent:'center',
        backgroundColor:'#ffff',
        marginLeft:'10%',
        marginRight:'10%',
      },
      containerRegister:{
        height: 60,
        marginLeft:'6%',
        marginRight:'6%',
        alignItems: 'center',
      },
      icon:{
        flex:1
      },
      textInput:{
        backgroundColor:'transparent',
        flex:5,
        color:'black',
        paddingLeft:'25%'
      }
})

export default ({navigation}) => {
    const initialState = {
        email: '',
        password: ''
    }
    const onSubmit = values => {
      fetch('https://opo.cerox325.vercel.app/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'Application/json'
        },
        body : JSON.stringify(values),

      })
      .then(x => x.text())
      .then( x => {
       try {
         return JSON.parse(x)
       } catch (error) {
         throw x
       }
      })
      .then (x => {
        AsyncStorage.setItem('token', x.token)
        navigation.navigate('Products')
      })
      .catch(e => Alert.alert('Error',e))
    }
    const {subscribe,inputs, handleSubmit} = useForm(initialState, onSubmit)
    return (
        
        <ImageBackground source={imgbg} style={{width: '100%', height: '100%'}}>
        <View style={styles.container}>
          <View style={styles.containerUserName}>
            <Icon type="font-awesome" name="user" color="black" containerStyle={styles.icon}/>
            <TextInput 
            autoCapitalize= 'none'
            onChangeText={subscribe('email')} value={inputs.email} placeholder="Correo electronico" placeholderTextColor="gray"
            style={styles.textInput}/> 
          </View>

          <View style={styles.containerPassword}>
            <Icon type="entypo" name="key" color="black" containerStyle={styles.icon}/>
            <TextInput onChangeText={subscribe('password')}  value={inputs.password} placeholder="Contraseña" placeholderTextColor="gray"
            style={styles.textInput} secureTextEntry={true}/> 
          </View>

          <View style={styles.containerSignIn}>
            <Button  title='Iniciar' color='#cb3234'
            onPress={handleSubmit}
            />
          </View>
          
          <View style={styles.containerRegister}> 
            <Text style={{color:'#00FF43',fontWeight: 'bold', fontSize: 20}}>¿No tienes cuenta?
              <Text  
              onPress={() => {
                  navigation.navigate('Registrate')
              }}
              style={{color:'#FFE805',fontWeight: 'bold'}}>  Registrate</Text>
            </Text>
          </View>
          
        </View>        
      </ImageBackground>
     
    )
}
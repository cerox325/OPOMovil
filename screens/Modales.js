import React, { useEffect,  useState, useRef  } from 'react';
// import { makeStyles } from '@material-ui/core/styles';
import { StyleSheet, Text, View, Button, TextInput, Alert, Dimensions, AsyncStorage } from 'react-native';
import MapView, {Marker} from 'react-native-maps'
import useFetch from '../hooks/useFetch';
import * as Location from 'expo-location'
import Constants from 'expo-constants';

import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';


Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: true,
    }),
  });

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    maps : {
        width: 300,
        height: 400
    },
    text1: {
        fontSize: 25,
        alignItems: 'center'
    }
  });



export default ({navigation}) => {
    const [expoPushToken, setExpoPushToken] = useState('');
    const [notification, setNotification] = useState(false);
    const notificationListener = useRef();
    const responseListener = useRef();


    const [location, setLocation] = useState({})
    const buscarLocation = async () => {
        const {status} = await Location.requestPermissionsAsync()
        if (status !== 'granted'){
            return Alert.alert('Sin permisos de localizacion')
        } 
        const location = await Location.getCurrentPositionAsync({})
        setLocation(location)
    }
  
    useEffect(() => {
        buscarLocation()
        registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
     // console.log(response);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener);
      Notifications.removeNotificationSubscription(responseListener);
    };

    }, [])

   
    const id = navigation.getParam('_id')
    const precio = navigation.getParam('precio')
    const {loading, data} = useFetch(`https://opo.cerox325.vercel.app/api/products/${id}`)
 
    const [text2, setText2] = useState('');
    return (
        <View style={styles.container}>
        {loading ? <Text>Cargando...</Text> :
         <>
         <Text style={styles.text1}>{data.desc}</Text>
         <Text>Existentes:{data.canti} {data.tipocanti}</Text>
         <Text>Marca:{data.marca} </Text>
         <Text>Precio:{data.precio}</Text>
      
         <TextInput
         keyboardType = "numeric"
         placeholder="Cantidad"
         onChangeText={text2 => setText2(text2)}
         defaultValue={text2}
         />
        
         <Button title="Pedir" onPress={async () => {  
             await sendPushNotification(expoPushToken);
             AsyncStorage.getItem('token')
             .then(x =>{
                 if (x) {
                    fetch('https://opo.cerox325.vercel.app/api/orders',{
                        method: 'POST',
                        headers: {
                            'Content-Type':'application/json',
                            authorization: x
                        },
                        body: JSON.stringify({
                           products_id: id,
                           direccion: location.coords.latitude+""+location.coords.longitude,
                           total: precio,
                           cantidad: text2
                        })
                    }).then(x => {
                        if (x.status !== 201){
                           return alert('Orden no generada')
                        }
                        alert('Orden generada con exito')
                        navigation.navigate('Products')
                    })
                 }
             })
         
         }}/>
         <Button title="Cancelar" onPress={() => navigation.navigate('Products')}/>
         </>
        }
       <MapView 
       showsUserLocation
       loadingEnabled
       zoomEnabled = {true}
       initialRegion={{
        latitude: 16.6188546,
        longitude: -98.7687699,
        latitudeDelta: 6.0,
        longitudeDelta: 6.0,
      }}
       style={styles.maps}>
           {location.coords ?
             <Marker 
             coordinate={location.coords}
             title= "Tu ubicacion"
             description="Aqui vamos a enviarte tu pedido"
             onPress={() => { console.log(location.coords.latitude+""+location.coords.longitude)}}
             />
             :
             null
           }
       </MapView>
    </View>   
    )
}


async function sendPushNotification(expoPushToken) {
    const message = {
      to: expoPushToken,
      sound: 'default',
      title: 'Gracias por comprar en OPO',
      body: 'Bien echo tu pedido esta en camino',
    };
  
    await fetch('https://exp.host/--/api/v2/push/send', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Accept-encoding': 'gzip, deflate',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(message),
    });
  }
  
  async function registerForPushNotificationsAsync() {
    let token;
    if (Constants.isDevice) {
      const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
      //console.log(token);
    } else {
      alert('Must use physical device for Push Notifications');
    }
  
    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }
  
    return token;
  }
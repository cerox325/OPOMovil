import React from 'react';
import { StyleSheet, View, FlatList, Text, Button, AsyncStorage} from 'react-native';
import ListItem from '../components/ListItem'

import useFetch from '../hooks/useFetch'


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'flex-start',
      justifyContent: 'flex-start',
    },
    list: {
        alignSelf: 'stretch'
    }
  });




const Products = ({navigation}) => {
    const {loading, data: products} = useFetch('https://opo.cerox325.vercel.app/api/products')
    return (
        <View style={styles.container}>
            {loading? <Text>Cargando...</Text> :
           
            <FlatList
            style={styles.list}
            data={products}
            keyExtractor= {x => x._id}
            renderItem={({ item }) =>
            <ListItem 
            onPress={ () => navigation.navigate('Modal', { _id: item._id, name: item.name, precio: item.precio})}
            name={item.name}
            /> } 
            />
             
            }
            

<Button
       title='salir'
       onPress={() => {
        AsyncStorage.clear()
        navigation.navigate('OnBording')
       }}
       
       />
        </View>
    )
}

Products.navigationOptions = ({
    title: 'Productos'
})

export default Products
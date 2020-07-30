import React from 'react'
import {TouchableOpacity, Text, StyleSheet, Image} from 'react-native'
import { Card } from 'react-native-elements'

const styles = StyleSheet.create({
    container: {
      paddingHorizontal: 15,
      height: 60,
      justifyContent: 'center',
      borderBottomWidth: 1,
      borderBottomColor: '#eee',
      alignItems: 'center'
    },
    text: {
        fontSize: 15,
        alignContent: 'center',
        justifyContent: 'center'
    },
    card: {
        fontSize: 30,
    }
  });


  export default ({name,onPress}) => {
      let url = "../assets/"+ name + '.jpg'
      return (
        <Card
        title={name}
        titleStyle={styles.card}
        image={require(url)}
        >
          <TouchableOpacity onPress={onPress} style={styles.container}>
              <Text style={styles.text}>Ver Más</Text>
          </TouchableOpacity>

        </Card>
      )
  }
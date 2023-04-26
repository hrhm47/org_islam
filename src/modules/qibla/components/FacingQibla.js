import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const FacingQibla = () => {
  return (
    <View
    style={{
      backgroundColor: 'black',
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    }}> 
            <Image 
            source={require('../images/facingKaaba.jpg')}
            style={{width: '100%', height: '100%'}}
            resizeMode='cover'
            />
      
        
      
  </View>
  )
}

export default FacingQibla;

const styles = StyleSheet.create({})
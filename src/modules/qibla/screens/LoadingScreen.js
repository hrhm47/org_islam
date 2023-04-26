import { StyleSheet, Text,Dimensions ,View,StatusBar,ImageBackground, Image,Button,TouchableOpacity,Platform } from 'react-native';
import React from 'react'
import {
    responsiveHeight,
    responsiveWidth,
    responsiveFontSize
  } from "react-native-responsive-dimensions";


export default function LoadingScreen({navigation}) {
    return (

            <View style={styles.container}>
              <ImageBackground source={require('../images/bg.jpg')} resizeMode="cover" style={styles.bgImage}></ImageBackground>
              <View style={styles.inner}>
                <Image source={require('../images/qibla.png')} style={styles.logo}></Image>
                <View style={styles.text}>
                  <Text style={styles.title}>Qibla Finder</Text>
                  <Text style={styles.subtitle}>Locate the Qibla, wherever you are.</Text>


                </View>
                <TouchableOpacity
                  style={styles.loginScreenButton}
                  onPress={() => {
                    navigation.navigate('RequestAccess')
                  }}
                  underlayColor='#fff'>
                  <Text style={styles.loginText}>Let's go</Text>
                </TouchableOpacity>
                
              </View>
            </View>
          );
}

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        // backgroundColor: '#fff',
        // paddingTop:StatusBar.currentHeight,
      },
      
      bgImage:{
        width:responsiveWidth('100'),
        height:responsiveHeight('100'),
        justifyContent:'center',
        flex:1,
        // opacity:0.9
      },
      inner:{
        // flex:1,
        // flexDirection:'column',
        justifyContent:'center',
        alignItems:'center',
        
    
      },
      logo:{
        width:responsiveWidth('70'),
        height:responsiveHeight('40'),
        // flex:0,
        // justifyContent:'center',
        // alignItems:'center',
        // backgroundColor:'red',
        marginTop:responsiveHeight('15'),
        marginLeft:responsiveWidth('6'),
    
      },
      text:{
        // flex:1,
        color:'white',
        lineHeight:responsiveHeight('5'),
    
    
    
      },
      title:{
        fontSize:responsiveFontSize(5),
        color:'white',
      },
      subtitle:{
        color:'white',
    
      },
    
      loginScreenButton:{
        // marginRight:40,
        // marginLeft:40,
       marginTop:responsiveHeight('5'),
        paddingTop:10,
        paddingBottom:10,
        backgroundColor:'#fff',
        borderRadius:10,
        borderWidth: 1,
        borderColor: '#fff',
        width:responsiveWidth('60'),
        height:responsiveHeight('7'),
        // shadowColor: "#000",
        // shadowOpacity: 0.25,
      },
      loginText:{
        color:'#000',
        // justifyContent:'center',
        textAlign:'center',
    
        paddingLeft : 10,
        paddingRight : 10,
        fontSize:responsiveFontSize(3),
        // backgroundColor:'red',
        // height:responsiveHeight('4'),
    }
})
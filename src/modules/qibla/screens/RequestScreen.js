import { StyleSheet, Text,Dimensions ,View,StatusBar,ImageBackground, Image,Button,TouchableOpacity,Platform } from 'react-native';
import React from 'react'
import {
    responsiveHeight,
    responsiveWidth,
    responsiveFontSize
  } from "react-native-responsive-dimensions";
  

  
  const{height,width}=Dimensions.get('window');
export default function RequestAccess({navigation}) {
  return (
    <View style={styles.container}>

      {/* <ImageBackground source={require('../images/bg3.png')} resizeMode="cover" style={styles.bgImage}>
      </ImageBackground> */}
        <View style={styles.inner}>
            <Image source={require('../images/qibla.png')} style={styles.logo}></Image>
            <View style={styles.text}>
            <Text style={styles.title}>OK, let's face Qibla</Text>

            <Text style={styles.subtitle}>First we will request access to your {'\n'}  camera and current location to point you {'\n'} in the right direction</Text>

            </View>
            <TouchableOpacity
              style={styles.loginScreenButton}
              onPress={() => {
                navigation.navigate('FaceQibla')
              }}
              underlayColor='#fff'>
              <Text style={styles.loginText}>Got it</Text>
            </TouchableOpacity>
          
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      // paddingTop:StatusBar.currentHeight,
    },
    
    // bgImage:{
    //   width:responsiveWidth('100'),
    //   height:responsiveHeight('100'),
    //   justifyContent:'center',
    //   flex:1,
    //   opacity:1
    // },
    inner:{
    //   flex:1,
      // flexDirection:'column',
    //   justifyContent:'center',
        top:height/10,
        alignItems:'center',
        width:responsiveWidth('100'),
        height:responsiveHeight('100'),
      
  
    },
    logo:{
    left:responsiveWidth(5),

    
  
    },
    text:{
      // flex:1,
      color:'black',
      lineHeight:responsiveHeight('5'),
        alignItems:'center',
        
  
    },
    title:{
      fontSize:responsiveFontSize(4),
      color:'black',
    lineHeight:responsiveHeight(8),
    },
    subtitle:{
      color:'black',
      textAlign:'center',
        fontSize:responsiveFontSize(2),
        lineHeight:responsiveHeight(3),
    },
  
    loginScreenButton:{
      // marginRight:40,
      // marginLeft:40,
     marginTop:responsiveHeight('5'),
      paddingTop:10,
      paddingBottom:10,
      backgroundColor:'#104586',
      borderRadius:10,
      borderWidth: 1,
      borderColor: '#fff',
      width:responsiveWidth('50'),
      height:responsiveHeight('7'),
      // shadowColor: "#000",
      // shadowOpacity: 0.25,
    },
    loginText:{
      color:'#fff',
      // justifyContent:'center',
      textAlign:'center',
  
      paddingLeft : 10,
      paddingRight : 10,
      fontSize:responsiveFontSize(2.5),
      // backgroundColor:'red',
      // height:responsiveHeight('4'),
  }
  });
  
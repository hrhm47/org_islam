//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet,ImageBackground, TouchableOpacity, Image,Dimensions, Platform, FlatList } from 'react-native';
import {Data} from '../../utills/config/Icons';
import { widthPercentageToDP as WP, heightPercentageToDP as HP, scale as SC} from '../../utills/pixelratio';
// import { heightPercentageToDP as HP} from '../../utills/pixelratio';
import { ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
// create a component
const MyComponent = () => {
    const navigation=useNavigation();

    const {width, height} = Dimensions.get('window');
    return (
        <View style={styles.mainArea}>
            <ImageBackground source={require('../../images/homeBack.png')} resizeMode='cover' style={{width:WP('100'),height:HP("85"), flex:1}}>
                <View style={styles.homeScreenTextArea}>
                <Image source={require('../../images/My-Islam-logo-design.webp')} style={{width:WP('40'), height:HP('8'), tintColor:"#104586", alignSelf:"center",top:HP('1')}} resizeMode='contain'/>
                <View style={{top:HP('2'), alignSelf:"center", alignItems:"center"}}>

                    {/* left pr date right pr time namaz ka */}
                    <Text style={styles.homePrayerTitle}>Prayer Times</Text>
                    <Text style={styles.homePrayerTitle}>00:00</Text>
                    <Text style={styles.homePrayerTitle}>Date ani hy </Text>
                </View>
                </View>
                    <ScrollView style={{flex:1}}>
                <View style={{justifyContent:"center",flexDirection:"row",flexWrap:"wrap",
                
                // backgroundColor:"#0F2247",
                 width:WP('100'),}}>


                {Data.map((item,index)=>{
                    return(
                    <TouchableOpacity style={styles.icons} key={item.id} 
                    
                    onPress={()=>navigation.navigate(item.screenName)}
                    
                    >
                        <Text style={styles.iconstext}>{item.title}</Text>

                        <Image source={item.uri} resizeMode='contain' style={styles.iconsimage}/>
                    </TouchableOpacity>
                    )
                })} 
            </View>
                </ScrollView>
            </ImageBackground>
                    
                
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    mainArea:{
        width:WP('100'),
        // height:HP('20'), 
        // backgroundColor:"#fff" ,
        flex:1  
    },
    homeScreenTextArea:{
        width:WP('100'),
        height:HP('40'),
        justifyContent:"center",
        alignItems:"center",
        // backgroundColor:"rgba(0,0,0,0.1)"
    },
    homePrayerTitle:{
        fontSize:SC(21),
        color:"#104586",
        fontStyle:"italic",
        fontWeight:"400",
        lineHeight:26,

    },
    icons:{
        width:Platform.OS=='android'?WP('27'):WP('25'),
        height:HP('11.9'),
        borderRadius:10,
        margin:10,
        justifyContent:"center",
        alignItems:"center",
        backgroundColor:"#104586",
    },
    iconstext:{
        textAlign:"center",
        color:"#fff",
        fontSize:SC(15),
        fontWeight:"600",
        flexWrap:"wrap",
        paddingBottom:10,
        letterSpacing:1/2
    },
    iconsimage:{
        width:WP('40'),
        height:HP('4'),
        tintColor:"#fff"
    }
});

//make this component available to the app
export default MyComponent;

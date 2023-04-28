import { StyleSheet, Text, View,TouchableOpacity,Image,ImageBackground, FlatList } from 'react-native'
import React from 'react'
import {widthPercentageToDP as WP} from '../../../utills/pixelratio'
import {heightPercentageToDP as HP} from '../../../utills/pixelratio'
import {scale as SC} from '../../../utills/pixelratio'
import Quran from 'quran-json'
import { NavigationContainer, useNavigation } from '@react-navigation/native';
// import data from '../quran-json/data/editions/en.json';


export default function Surah({route,navigation}) {
    // const navigation=useNavigation();
    const {quran}=route.params
    // console.log("this is json ",data[0].id);



    function Ayat() {
        return(
            <View style={styles.surahAyat}>
                {/* <Text style={{color:'pink'}}>this is,{quran.id==data}</Text> */}
            {/* <FlatList
                data={data}
                keyExtractor={(item)=>item.id}
                renderItem={({item})=>{
                    return( */}
                <View style={styles.ayatDetail}>
                    {/* {data.map((item,index)=>{
                        return(
                            <Text>{item}</Text>
                            
                        )

    })} */}
                    
                    
                    <ImageBackground source={require("../images/tag-black-shape.png")} style={{width:WP('10.9'),height:HP('5.4'),justifyContent:'center',alignItems:'center',textAlign:'center' }} imageStyle={{tintColor:'#004C9B'}}>
                    <Text style={{color:'white'}}>1</Text>
                    </ImageBackground>
                    
                    <View style={{flexDirection:'row',justifyContent:'center'}}>
                        <TouchableOpacity>
                        <ImageBackground source={require("../images/play-button.png")} style={{width:WP('9'),height:HP('5.4') }} imageStyle={{tintColor:'#004C9B'}}/>
                        </TouchableOpacity>
                        <TouchableOpacity>
                        <ImageBackground source={require("../images/saved.png")} style={{width:WP('9'),height:HP('5.4') }} imageStyle={{tintColor:'#004C9B'}}/>
                        </TouchableOpacity>
                        <TouchableOpacity>
                        <ImageBackground source={require("../images/share.png")} style={{width:WP('9'),height:HP('5.4') }} imageStyle={{tintColor:'#004C9B'}}/>
                        </TouchableOpacity>
                    </View>
                    


                </View>
                <View style={styles.renderAyat}>

                </View>
                {/* )}} 
                    /> */}

            </View>
        )
        
    }


  return (
    <View style={styles.container}>
            <View style={styles.heading}>
                <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                    <Image source={require("../images/back.png")}  style={styles.images}/>
                </TouchableOpacity>
                <Text style={styles.headText}>{quran.transliteration}</Text>
            
            </View>
            <View style={styles.surahDetail}>
            <ImageBackground source={require("../images/bg.png")} style={styles.bg}
        borderRadius={20} >
            <View style={styles.explain}>
                <Text style={styles.surahText}>{quran.transliteration}</Text>
                <Text style={[styles.surahText,styles.border]}>{quran.translation}</Text>
                <View style={{flexDirection:'row',justifyContent:'center',paddingTop:WP('2')}}>
                    <Text style={{color:'white',fontSize:16}}>{quran.type}</Text>
                    <Text style={{color:'white',fontSize:16}}>   • {quran.total_verses} Verses</Text>
                </View>
                <Text style={{color:'white',fontSize:25, paddingTop:WP('5')}}>بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ</Text>
            </View>
            
            </ImageBackground>
            
            
            <Ayat/>
            

        </View>
            
    </View>
    
  )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
    },
    heading:{
        flex:1/9.5,
        backgroundColor:"pink",
        flexDirection:"row",
        // justifyContent:"space-evenly",
        alignItems:"center",

    },
    images:{
        width:WP('3'),
        height:HP('3'),
        padding:WP('4'),
        margin:WP('2'),
        tintColor:"#004C9B"

    },
    headText:{
        // flex:1,
       
        fontSize:30,
        fontWeight:'bold',
        justifyContent:'space-evenly',
        // alignItems:'center',
        // textAlign:'center',
        color:"#0F2247",
        marginLeft:WP('5'),
    },
    surahDetail:{
        flex:1,
        padding:WP('5'),
        // marginTop:WP('0.1'),

    },
    bg:{
        width:WP('90.5'),
        height:HP('30'),
        shadowColor: '#000',
        
       
        

    },
    explain:{
        flex:1,
        alignItems:'center',
        textAlign:'center',

    },
    surahText:{
        fontSize:SC(22.5),
        // fontWeight:'bold',
        color:"white",
        margin:WP('1.5')
    },
    border:{
        paddingBottom:WP('4'),
        // marginBottom:WP('15'),
        borderBottomWidth:1,
        borderBottomColor:"white",
        flexWrap:'wrap',
        
    },
    
    surahAyat:{
        flex:1,
        backgroundColor:"red",
        marginTop:WP('3'),
    },
    ayatDetail:{
        flex:1/8.5,
        // backgroundColor:"#9dbde8",
        backgroundColor:'#e8eff4',
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center",

        borderRadius:12,
        padding:WP('3'),
        // rowGap:WP('5'),
      

    },
    renderAyat:{
        flex:1,
        backgroundColor:"green",
        flexWrap:'wrap',
        marginTop:WP('3'),
        // gap:WP('7'),

    },
})
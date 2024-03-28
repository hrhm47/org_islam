import React,{useState,useEffect} from 'react'
import { StyleSheet, Text, View,TouchableOpacity,ImageBackground,FlatList,ScrollView,Alert } from 'react-native'
import {useNavigation,useIsFocused,  } from '@react-navigation/native';
import {widthPercentageToDP as WP} from '../../../utills/pixelratio';
import {heightPercentageToDP as HP} from '../../../utills/pixelratio';
import {scale as SC} from '../../../utills/pixelratio';
import Quran from 'quran-json'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { quran } from '@quranjs/api';

const BookMark = () => {
    const [ayaOfSurah,setAyaOfSurah]=useState([])
    const isFocused = useIsFocused();
    const navigation=useNavigation();
    // console.log("in focus", Quran);
    // console.log("in focus",Quran.id);
    useEffect(()=>{
        const ActualBookMakr=[]
        const getAyaOfSurah=async()=>{
            try {
                const value = JSON.parse(await AsyncStorage.getItem('bookMarkAya'));
                
                setAyaOfSurah(value);
                // console.log(value,"bookMarkAya");
               
            } catch(e) {
                // error reading value
            }
        }
        getAyaOfSurah()
    },[isFocused])




    return (
    <View style={styles.surah}>
         
        <FlatList
            data={ayaOfSurah}
            horizontal={false}
            keyExtractor={(item)=>item.id}
            renderItem={({item})=>{
                
                return (
                    <View style={{flex:1, backgroundColor:"white",  width:WP('100'),alignSelf:"center", padding:WP('4')}}>
                        <TouchableOpacity onPress={() => {
                            let data=null;
                         Quran.filter((Qitem)=>{
                            Qitem.id==item.surahId?
                                data={"id": Qitem.id, "link": Qitem.link, "name": Qitem.name, "total_verses":Qitem.total_verses, "translation": item.translation, "transliteration": Qitem.transliteration, "type": Qitem.type}:null
                            
                            
                        })
                        navigation.navigate('Surah',{quran:data})}}
                        >

                       
                    
                  <View style={{backgroundColor:"white",width:WP('92'), alignSelf:"flex-start", borderRadius:5, padding:WP('2'),paddingRight:WP('6'), paddingLeft:WP('4'),borderBottomWidth:1,borderBottomColor:"grey",}}>
    
                    <Text style={[styles.transText,{fontWeight:"bold", fontStyle:"italic", color:"#104586"}]}>{item.surahName}    {"("+item.surahId+")"}</Text>

                    <Text style={[styles.arabicAyatText,{fontFamily:'Amiri-Regular'}]}>{item.ayaId+"\b\b\b"}{item.ayaText} </Text>
                    
                    <Text style={styles.transText}>{item.ayaTranslation}</Text>
                    
                  </View>
                  </TouchableOpacity>
                  </View>
                );
            }}
        />
      
    </View>
  )
}

export default BookMark

const styles = StyleSheet.create({
    surah:{
        flex:1,
        backgroundColor:'white',

    },
    names: {
        flexDirection: 'row',
        // justifyContent:"space-evenly",
        width: WP('100'),
        alignItems: 'center',
        textAlign: 'center',
        padding: WP('3'),
        paddingLeft: WP('6'),
        // lineHeight:13,
        borderColor: '#d3d3d3',
        borderBottomWidth: WP('0.3'),
      },
      arabicAyatText:{
        fontSize:SC(21),color:"#104586",  textAlign:"right", marginBottom:HP('1')
      },
      transText:{
        fontSize:SC(16.5),color:"black", fontFamily:'Normal',lineHeight:HP('3'),marginBottom:HP('1')
      }
})
import React,{useState,useEffect} from 'react'
import { StyleSheet, Text, View,TouchableOpacity,ImageBackground,FlatList,ScrollView,Alert } from 'react-native'
import {useNavigation,useIsFocused } from '@react-navigation/native';
import {widthPercentageToDP as WP} from '../../../utills/pixelratio';
import {heightPercentageToDP as HP} from '../../../utills/pixelratio';
import {scale as SC} from '../../../utills/pixelratio';
import Quran from 'quran-json'
import AsyncStorage from '@react-native-async-storage/async-storage';

const BookMark = () => {
    const [ayaOfSurah,setAyaOfSurah]=useState([])
    const isFocused = useIsFocused();

    useEffect(()=>{
        const getAyaOfSurah=async()=>{
            console.log("in focus");
            try {
                const value = JSON.parse(await AsyncStorage.getItem('bookMarkAya'));
                setAyaOfSurah(value);
                // console.log(ayaOfSurah,"ayaOfSurah");
               
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
                    
                  <View style={{backgroundColor:"white",width:WP('92'), alignSelf:"flex-start", borderRadius:5, padding:WP('2'),paddingRight:WP('6'), paddingLeft:WP('4'),borderBottomWidth:1,borderBottomColor:"grey",}}>
    
                    <Text style={[styles.transText,{fontWeight:"bold", fontStyle:"italic", color:"#104586"}]}>{item.surahName}</Text>
                    <Text style={[styles.arabicAyatText,{fontStyle:'italic'}]}>{item.ayaText}</Text>
                    
                    <Text style={styles.transText}>{item.ayaTranslation}</Text>
                    
                  </View>
                  
                  </View>
                );
            }}
        />
       {/* <ScrollView>
            {Quran.map((item,index)=>{
                        return(
                            <View style={styles.names} key={item.id}>
                            <TouchableOpacity style={{flexDirection:'row',padding:WP('1')}} onPress={() => navigation.navigate('Surah',{quran:item})}>
                                <ImageBackground source={require("../images/shape.png")}
                                 style={{width:WP('14'),height:HP('8'),
                                 justifyContent:'space-around',alignItems:"center", 
                                 marginRight:WP('3') }} 
                                 imageStyle={{tintColor:"#004C9B",borderWidth:3}} >
                                    <Text style={{fontWeight:'500'}}>{item.id}</Text>
                                </ImageBackground >
                                <View style={{flexDirection:"row",width:WP('70'),justifyContent:"space-between",alignItems:"center"}}>
                                    <View style={{flexDirection:'column'}}>
                                    <Text style={{fontWeight:'500',fontSize:17,color:"black"}}>{item.transliteration}</Text>
                                    <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                                    <Text style={{color:'grey'}}>{item.type}</Text>
                                    <Text style={{color:'grey'}}>   • {item.total_verses} Verses</Text>
                                    </View>
                                    </View>
                                    <Text style={{fontWeight:'600',fontSize:20,color:"#004C9B"}}>{item.name}</Text>
                                </View>
                            </TouchableOpacity>
                            </View>)
            })}
          </ScrollView> */}
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
        // marginTop:10,
        // marginBottom:10
      },
      arabicAyatText:{
        fontSize:SC(21),color:"#104586", fontWeight:"bold", textAlign:"right", marginBottom:HP('1')
      },
      transText:{
        fontSize:SC(16.5),color:"black", fontFamily:'Normal',lineHeight:HP('3'),marginBottom:HP('1')
      }
})
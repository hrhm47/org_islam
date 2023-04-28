import { StyleSheet, Text, View,TouchableOpacity,ImageBackground,FlatList,ScrollView } from 'react-native'
import React from 'react'
import {useNavigation } from '@react-navigation/native';
import {widthPercentageToDP as WP} from '../../../utills/pixelratio';
import {heightPercentageToDP as HP} from '../../../utills/pixelratio';
import {scale as SC} from '../../../utills/pixelratio';
import Quran from 'quran-json'

const SurahScreen = () => {
    const navigation=useNavigation();

    // console.log(Quran.map((item,index)=>item.name));
    return(

        <View style={styles.surah}>
            {/* <Text>{Quran[0].name}</Text> */}
            <ScrollView>
            {Quran.map((item,index)=>{
                        return(
                            <View style={styles.names}>
                            <TouchableOpacity style={{flexDirection:'row',padding:10}} onPress={() => navigation.navigate('Surah',{quran:Quran.item})}>
                                <ImageBackground source={require("../images/shape.png")} style={{width:WP('13.3'),height:HP('8'),justifyContent:'space-around',alignItems:"center", marginRight:7,marginLeft:1 }} imageStyle={{tintColor:"#004C9B",borderWidth:3}} >
                                    <Text style={{fontWeight:'500'}}>{item.id}</Text>
                                </ImageBackground >
                                <View style={{flexDirection:"row",width:WP('70'),justifyContent:"space-between",alignItems:"center"}}>
                                    <View style={{flexDirection:'column'}}>
                                    <Text style={{fontWeight:'500',fontSize:17}}>{item.transliteration}</Text>
                                    <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                                    <Text style={{color:'grey'}}>{item.type}</Text>
                                    <Text style={{color:'grey'}}>   • {item.total_verses} Verses</Text>
                                    </View>
                                    </View>
                                    <Text style={{fontWeight:'600',fontSize:20,color:"#004C9B"}}>{item.name}</Text>
                                </View>
                            </TouchableOpacity>
                            

                            </View>
            )

            })}
          </ScrollView>
            {/* {Quran.map((item,index)=> */}

              {/* <Text>{Quran}</Text> */}
                    {/* <FlatList
                        data={Quran}
                        renderItem={(Quran)=>{
                            return(
                        <View style={styles.names}>
                            <TouchableOpacity style={{flexDirection:'row',padding:10}} onPress={() => navigation.navigate('Surah',{quran:Quran.item})}>
                                <ImageBackground source={require("../images/shape.png")} style={{width:WP('13.3'),height:HP('8'),justifyContent:'space-around',alignItems:"center", marginRight:7,marginLeft:1 }} imageStyle={{tintColor:"#004C9B",borderWidth:3}} >
                                    <Text style={{fontWeight:'500'}}>{Quran.item.id}</Text>
                                </ImageBackground >
                                <View style={{flexDirection:"row",width:WP('70'),justifyContent:"space-between",alignItems:"center"}}>
                                    <View style={{flexDirection:'column'}}>
                                    <Text style={{fontWeight:'500',fontSize:17}}>{Quran.item.transliteration}</Text>
                                    <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                                    <Text style={{color:'grey'}}>{Quran.item.type}</Text>
                                    <Text style={{color:'grey'}}>   • {Quran.item.total_verses} Verses</Text>
                                    </View>
                                    </View>
                                    <Text style={{fontWeight:'600',fontSize:20,color:"#004C9B"}}>{Quran.item.name}</Text>
                                </View>
                            </TouchableOpacity>
                            

                            </View>
                            )}
                        }
                        keyExtractor={Quran=>Quran.id}
                        // id={item.id}
                    /> */}
                    {/* <Text>{item.name}</Text> */}
                
            
           
        </View>
    )
}

export default SurahScreen

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
      }
})
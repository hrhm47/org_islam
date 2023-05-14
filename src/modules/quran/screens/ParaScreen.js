import { StyleSheet, Text, View,TouchableOpacity,ImageBackground,FlatList } from 'react-native'
import React,{useEffect} from 'react'
import {widthPercentageToDP as WP} from '../../../utills/pixelratio';
import {heightPercentageToDP as HP} from '../../../utills/pixelratio';
import {scale as SC} from '../../../utills/pixelratio';
import {PARAS} from '../../../utills/data/paraNames/ParaNames';
import Quran from 'quran-json';
import { useNavigation } from '@react-navigation/native';
// import Para_Juz from './Para_Juz';
const ParaScreen = () => {
    const navigation=useNavigation();

    return(

        <View style={styles.para}>
            
  
              <FlatList
              
                data={PARAS}
                keyExtractor={(item)=>item.id}
                renderItem={({item})=>{
                    return( 
                         <View style={styles.names}>
                           <TouchableOpacity style={{flexDirection:'row',padding:10}} 
                           onPress={()=>navigation.navigate('Para',{juz:item.id})}>
                                <ImageBackground source={require("../images/shape.png")} style={{width:WP('13.3'),height:HP('8'),justifyContent:'space-around',alignItems:"center", marginRight:7,marginLeft:1 }} imageStyle={{tintColor:"#004C9B",borderWidth:3}} >
                                    <Text style={{fontWeight:'500'}}>{item.id}</Text>
                                </ImageBackground >
                                <View style={{flexDirection:"row",width:WP('70'),justifyContent:"space-between",alignItems:"center"}}>
                                    <View style={{flexDirection:'column'}}>
                                    <Text style={{fontWeight:'500',fontSize:17,color:"black"}}>{item.transliteration}</Text>
                                    <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                                    {/* <Text style={{color:'grey'}}>jj</Text> */}
                                    {/* <Text style={{color:'grey'}}>{Quran.type}</Text> */}
                                    {/* <Text style={{color:'grey'}}>• {Quran.item} Verses</Text>  */}
                                    </View>
                                    </View>
                                    <Text style={{fontWeight:'600',fontSize:20,color:"#004C9B"}}>{item.name}</Text>
                                </View>
                            </TouchableOpacity>
                            {/* //  <Text style={{fontWeight:'600',fontSize:20,color:"#004C9B"}}>{item.transliteration}</Text>
                            //  <Text  style={{fontWeight:'500',fontSize:17}}>{item.name}</Text> */}
                        </View> 
                    

                )
            
            }} 
            /> 
            </View>
      
    )
}

export default ParaScreen

const styles = StyleSheet.create({
    para:{
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



// {/* {PARAS.map((item,index)=>{
                
//                  return(
//                     <View style={styles.names}>
//                         <TouchableOpacity style={{flexDirection:'row',padding:10}}>
//                             <ImageBackground source={require("../images/shape.png")} style={{width:WP('13.3'),height:HP('8'),justifyContent:'space-around',alignItems:"center", marginRight:7,marginLeft:1 }} imageStyle={{tintColor:"#004C9B",borderWidth:3}} >
//                                 <Text style={{fontWeight:'500'}}>{item.id}</Text>
//                             </ImageBackground >
//                             <View style={{flexDirection:"row",width:WP('70'),justifyContent:"space-between",alignItems:"center"}}>
//                                 <View style={{flexDirection:'column'}}>
//                                 <Text style={{fontWeight:'500',fontSize:17}}>{item.transliteration}</Text>
//                                 <View style={{flexDirection:'row',justifyContent:'space-between'}}>
//                                 {/* <Text style={{color:'grey'}}>{Quran.item.type}</Text>
//                                 <Text style={{color:'grey'}}>   • {Quran.item.total_verses} Verses</Text> */}
//                                 </View>
//                                 </View>
//                                 <Text style={{fontWeight:'600',fontSize:20,color:"#004C9B"}}>{item.name}</Text>
//                             </View>
//                         </TouchableOpacity>
//                          {/* <Text style={{fontWeight:'600',fontSize:20,color:"#004C9B"}}>{item.transliteration}</Text>
//                          <Text  style={{fontWeight:'500',fontSize:17}}>{item.name}</Text> */}
//                     </View>

//             )})} */}
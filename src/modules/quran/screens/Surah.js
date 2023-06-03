import { StyleSheet, Text, View,TouchableOpacity,Image,ImageBackground, FlatList, Alert } from 'react-native'
import React from 'react'
import {widthPercentageToDP as WP} from '../../../utills/pixelratio'
import {heightPercentageToDP as HP} from '../../../utills/pixelratio'
import {scale as SC} from '../../../utills/pixelratio'
import Quran from 'quran-json'
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
// import data from '../quran-json/data/editions/en.json';
import QuranAyat from '../components/QuranAyat'
import { QariesNames,qariesName,QariesWithIndentifier } from '../../../utills/data/qaries/Qaries'
import { ChartsContext } from '../../../contextApi/ApiProvider'
// menu props
import {
    Menu,MenuProvider,MenuOptions,MenuOption,MenuTrigger,} from 'react-native-popup-menu';

export default function Surah({route,navigation}) {
    // const navigation=useNavigation();
    
    const {quran, searchText}=route.params
    const [selectTranslation,setSelectTranslation]=React.useState("en")
    const [selectQari,setSelectQari]=React.useState("ar.abdulbasitmurattal")
    const [surahTranslation,setSurahTranslation]=React.useState("")
    const [tafseerId,setTafseerId]=React.useState(9)
    const {isVisible,setIsVisible}=React.useContext(ChartsContext);
    
    // console.log("this is quran",quran);
    const fontFamily = Icon.getFontFamily(styles.surahText)
    // console.log(QariesNames[1]," this is qaries names",qariesName);
    // console.log(QariesNames.find((item)=>item['AlFatih']);
    // console.log("this is json ",data[0].id);
    



    function TriggerMenu() {
        // alert('hello')
        return(
              
            <Menu >
                <MenuTrigger style={{backgroundColor:"#104586"}}>
                    <Icon name='list' size={30} color='white' style={{marginLeft:10}}/>
                </MenuTrigger>
                    <MenuOptions >
                            <MenuOptions >
                        <MenuOption>
                            <Text style={{color:"black"}}>Translations</Text>
                            <MenuOptions >
                                <MenuOption onSelect={() => {setSelectTranslation('ur')}} text='Urdu' />
                                <MenuOption onSelect={() => {setSelectTranslation('en')}} text='English' />
                                <MenuOption onSelect={() => {setSelectTranslation('tr')}} text='Turkish' color= 'black'/>
                            </MenuOptions>
                            <Text style={{color:"black"}}>Qaries</Text>
                            <MenuOptions>
                                <MenuOption onSelect={() => {setSelectQari('ar.abdulbasitmurattal')}} text='Abdul Basit'/>
                                <MenuOption onSelect={() => {setSelectQari('ar.abdullahbasfar')}} text='Abdullah Basfar' />
                                <MenuOption onSelect={() => {setSelectQari('ar.abdurrahmaansudais')}} text='Abdurrahmaan As-Sudais' />
                            </MenuOptions>
                        </MenuOption>
                        </MenuOptions> 
                    </MenuOptions>
             </Menu>
            // </View>
        )
    }

  return (
    <MenuProvider >
    <View style={styles.container}>
        
        {/* heading with image details */}
            <View style={styles.heading}>
                <TouchableOpacity onPress={() => {navigation.navigate('QuranHome'), setIsVisible(false)}}>
                    {/* <Image source={require("../images/back.png")}  style={styles.images}/> */}
                    <Icon name='arrow-back-ios' size={25} color='white'/>
                </TouchableOpacity>
                <Text style={styles.headText}>{quran.transliteration}</Text>
                <TouchableOpacity onPress={()=>TriggerMenu()}>
                    {/* this icon is for selecting different translation of different Qarires voices with differect tafseer  */}
                    {/* <Icon name='list' size={30} color='white' style={{marginLeft:10}}/> */}
                    <TriggerMenu/>
                </TouchableOpacity>
            </View>
            {/*  card details  */}
            <View style={styles.surahDetail}>
            <ImageBackground source={require("../images/bg.png")} style={styles.bg} resizeMode='cover'
        borderRadius={15} >
            <View style={styles.explain}>
                
                <Text style={styles.surahText}>{quran.transliteration}</Text>
                <Text style={[styles.surahText,styles.border]}>{surahTranslation?surahTranslation:quran.translation
                }</Text>
                <View style={{flexDirection:'row',justifyContent:'center',paddingTop:WP('3')}}>
                    <Text style={{color:'white',fontSize:SC(16), textTransform:'uppercase'}}>{quran.type}</Text>
                    <Text style={{color:'white',fontSize:SC(16), textTransform:'uppercase'}}>   • {quran.total_verses} Verses</Text>
                </View>
                <Text style={{color:'#fff',fontSize:SC(25), paddingTop:WP('0'), fontFamily:'Amiri-Regular'}}>
                
                {/* AmiriQuran-Regular */}
                    بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ</Text>
            </View>
            </ImageBackground>
            
            
            <QuranAyat quran={quran} translation={selectTranslation} qari={selectQari} tafseerId={tafseerId} searchText={searchText}/>
            

        </View>
            
    </View>
    </MenuProvider>
    
  )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"white"
    },
    heading:{
        flex:.1,
        backgroundColor:"#104586",
        flexDirection:"row",
        // justifyContent:"space-evenly",
        alignItems:"center",
        justifyContent:'space-around'
    },
    images:{
        width:WP('3'),
        height:HP('3'),
        padding:WP('4'),
        margin:WP('2'),
        tintColor:"white"
    },
    headText:{

        fontSize:SC(25),
        fontWeight:'bold',
        justifyContent:'space-evenly',
        fontFamily:'serif',
        color:"white",
        marginLeft:WP('5'),
    },
    surahDetail:{
        flex:1,
        marginTop:WP('6'),
    },
    bg:{
        width:WP('94'),
        height:HP('30'),
        padding:WP('5'),
        shadowColor: '#000',
        alignSelf:"center"
    },
    explain:{
        flex:1,
        alignItems:'center',
        textAlign:'center',

    },
    surahText:{
        fontSize:SC(29),
        fontFamily:'serif',
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
        fontSize:SC(18),
        // fontFamily:'Serif',
        // fontFamily:fontFamily(),
        
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
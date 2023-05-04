import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Platform,
  StatusBar,
  Image,
  ImageBackground,
  FlatList,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
// import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState} from 'react';
import {widthPercentageToDP as WP} from '../../../utills/pixelratio';
import {heightPercentageToDP as HP} from '../../../utills/pixelratio';
import {scale as SC} from '../../../utills/pixelratio';
import Quran from 'quran-json';

import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {useHeaderHeight} from '@react-navigation/elements';
import axios from 'axios';
import {PARAS} from '../../../utills/data/paraNames/ParaNames';
// import Surah from './Surah';

import SurahScreen from './SurahScreen';
import ParaScreen from './ParaScreen';
import QuickAcces from '../components/QuickAcces';
import LastReadSurah from '../components/LastReadSurah';


import {QuranHomeTabNavigator} from '../components/QuranHomeTabNavigator';

const Tab = createMaterialTopTabNavigator();

// function NewScreen(){
//     return(
//         <View style={styles.container}>
//         <View style={styles.header}>

//             <Image source={require("../images/back.png")} style={styles.images}/>
//             <Text style={styles.headText}>Quran</Text>
//             <Image source={require("../images/search.png")} style={styles.images}/>

//         </View>
//         <View style={styles.lastRead}>
//         <ImageBackground source={require("../images/bg.png")} style={styles.bg}
//         borderRadius={6}>

//             <View style={styles.parent}>

//                 <View style={styles.left}>
//                     <View style={styles.first}>
//                         <Image source={require("../images/quran-read.png")} style={{tintColor:'white',width:WP(5.5),height:HP(5.5)}}/>
//                         <Text style={[styles.text,{}]}>Last Read</Text>
//                     </View>
//                     <View style={[styles.second,styles.text]}>
//                         <Text style={[styles.text,{fontWeight:'700',fontSize:25}]}>Al-Fatiha</Text>
//                     </View>
//                     <View style={styles.third}>
//                         <Text style={[styles.text,{letterSpacing:WP('0.5'),marginTop:WP('2')}]}>Ayah No:1</Text>
//                     </View>

//                 </View>
//             <View style={styles.right}>
//                 <Image source={require("../images/reading-quran.png")} style={styles.quran}/>
//             </View>
//             </View>
//             </ImageBackground>
//         </View>
//         <View style={styles.QuickAcess}>
//             <Text style={{color:'#d3d3d3', fontWeight:500}}>QUICK ACCESS</Text>
//             <View style={styles.tabsContainer}>
//                 <FlatList
//                 data={jobTypes}
//                 renderItem={({item})=>(
//                     <TouchableOpacity
//                         style={styles.tab(activeJobType,item)}
//                         onPress={()=>{
//                         setActiveJobType(item);
//                     }}>
//                     <Text style={styles.tabText}>{item}</Text>
//                     </TouchableOpacity>)}
//                 keyExtractor={item=>item}
//                 contentContainerStyle={{columnGap:12}}
//                 horizontal
//                 />
//             </View>
//         </View>
//         <View style={styles.heading}>

//         </View>
//         <View style={styles.Surah}>

//         </View>

//     </View>
//     )
// }
// function SurahScreen(){
//     const navigation=useNavigation();

//     return(

//         <View style={styles.surah}>

//             {/* {Quran.map((item,index)=> */}

//                 <View  >
//                     <FlatList
//                         data={Quran}
//                         renderItem={(Quran)=>
//                         <View style={styles.names}>
//                             <TouchableOpacity style={{flexDirection:'row',padding:10}} onPress={() => navigation.navigate('Surah',{quran:Quran.item})}>
//                                 <ImageBackground source={require("../images/shape.png")} style={{width:WP('13.3'),height:HP('8'),justifyContent:'space-around',alignItems:"center", marginRight:7,marginLeft:1 }} imageStyle={{tintColor:"#004C9B",borderWidth:3}} >
//                                     <Text style={{fontWeight:'500'}}>{Quran.item.id}</Text>
//                                 </ImageBackground >
//                                 <View style={{flexDirection:"row",width:WP('70'),justifyContent:"space-between",alignItems:"center"}}>
//                                     <View style={{flexDirection:'column'}}>
//                                     <Text style={{fontWeight:'500',fontSize:17}}>{Quran.item.transliteration}</Text>
//                                     <View style={{flexDirection:'row',justifyContent:'space-between'}}>
//                                     <Text style={{color:'grey'}}>{Quran.item.type}</Text>
//                                     <Text style={{color:'grey'}}>   • {Quran.item.total_verses} Verses</Text>
//                                     </View>
//                                     </View>
//                                     <Text style={{fontWeight:'600',fontSize:20,color:"#004C9B"}}>{Quran.item.name}</Text>
//                                 </View>
//                             </TouchableOpacity>

//                             </View>}
//                         keyExtractor={Quran=>Quran.id}
//                         // id={item.id}
//                     />
//                     {/* <Text>{item.name}</Text> */}
//                 </View>

//         </View>
//     )
// }

const Home = () => {
  const headerHeight = useHeaderHeight();
  // const callData=()=>{
  //     axios.get('https://api.quran.com/api/v4/verses/by_juz/1?language=en&words=true&page=1&per_page=10')
  //     axios.get('https://api.quran.com/api/v4/juzs')
  //     .then((response)=>{
  //         console.log(response);
  //     })
  //     .catch((error)=>{
  //         console.log(error);
  //     })

  //     Quran.map((item,index)=>{
  //             // console.log(item.link);
  //             axios.get(item.link`${index}`)
  //     })
  // }

  const [isSearchActive, setIsSearchActive] = useState(true);
  const [searchText, setSearchText] = useState('');

  const HideKeyboard = ({children}) => (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
        setIsSearchActive(isSearchActive);
      }}>
      {children}
    </TouchableWithoutFeedback>
  );

  return (
    <>
      <ScrollView 
        nestedScrollEnabled={true}
        
        // style={{flex: 1}}
      >
        <KeyboardAvoidingView
          keyboardVerticalOffset={headerHeight}
          style={{flex: 1}}
          behavior={Platform.OS === 'ios' ? 'padding' : null}
          contentContainerStyle={{flex: 1}}
          resetScrollToCoords={{x: 0, y: 0}}
          scrollEnabled={true}
          >
          <View 
          style={styles.header}
          >
            <TouchableOpacity>
              <Image
                source={require('../images/back.png')}
                style={[styles.images,{tintColor:"white"}]}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setIsSearchActive(false)}>
              <Text style={styles.headText}>Quran</Text>
            </TouchableOpacity>

            {!isSearchActive ? (
              <TouchableOpacity
                onPress={() => setIsSearchActive(!isSearchActive)}>
                <Image
                  source={require('../images/search.png')}
                  style={[styles.images,{tintColor:"white"}]}
                />
              </TouchableOpacity>
            ) : null}
            {isSearchActive && (
              <TextInput
                style={{width: '100%'}}
                value={searchText}
                onChangeText={value => {
                  setSearchText(value);
                }}
                placeholder="Search"
              />
            )}
          </View>
        </KeyboardAvoidingView>
      
      {/* </ScrollView> */}
      <View style={styles.lastRead}>
        {/* <ImageBackground
          source={require('../images/bg.png')}
          style={styles.bg}
          borderRadius={6}>
          <View style={styles.parent}>
            <View style={styles.left}>
              <View style={styles.first}>
                <Image
                  source={require('../images/quran-read.png')}
                  style={{tintColor: 'white', width: WP(5.5), height: HP(5.5)}}
                />
                <Text style={[styles.text, {}]}>Last Read</Text>
              </View>
              <TouchableOpacity style={[styles.second, styles.text]}>
                <Text style={[styles.text, {fontWeight: '700', fontSize: 25}]}>
                  Al-Fatiha
                </Text>
              </TouchableOpacity>
              <View style={styles.third}>
                <Text
                  style={[
                    styles.text,
                    {letterSpacing: WP('0.5'), marginTop: WP('2')},
                  ]}>
                  Ayah No:1
                </Text>
              </View>
            </View>
            <View style={styles.right}>
              <Image
                source={require('../images/reading-quran.png')}
                style={styles.quran}
              />
            </View>
          </View>
        </ImageBackground> */}
        <LastReadSurah/>
      </View>

      <View style={styles.QuickAcess}>
        <Text style={{color: 'grey', fontWeight: '700',marginLeft:WP('1.5')}}>QUICK ACCESS</Text>
        <View style={styles.tabsContainer}>
          <QuickAcces />
        </View>
      </View>

      </ScrollView>
      <View style={styles.heading}>
        <QuranHomeTabNavigator />
      </View>
      {/* </KeyboardAvoidingView> */}
    </>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    // paddingTop:Platform.OS==='android'?StatusBar.currentHeight:0,
  },
  header: {
    flex: 1 ,
    // backgroundColor:'#FAFAFC',
    backgroundColor: '#104586',
    flexDirection: 'row',
    justifyContent: 'space-between',
    // position:"absolute"
  },
  headText: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    // color: '#0F2247',
  },
  images: {
    width: WP('3'),
    height: HP('3'),
    padding: WP('4'),
    margin: WP('2'),
    tintColor: '#004C9B',
    // backgroundColor:"black",
  },
  lastRead: {
    flex: 1,
    marginTop: WP('3'),
    width: WP('100'),
    height: HP('23'),
    justifyContent: 'center',
    alignItems: 'center',
  },

  QuickAcess: {
    padding: WP('4'),
    flex: 1,
  },

  // container: {
  //     width: "100%",
  //   },
  //   userName: {
  //     // fontFamily: FONT.regular,
  //     fontSize: 20,
  //     color: "black",
  //   },
  //   welcomeMessage: {
  //     fontFamily: FONT.bold,
  //     fontSize: SIZES.xLarge,
  //     color: COLORS.primary,
  //     marginTop: 2,
  //   },
  //   searchContainer: {
  //     justifyContent: "center",
  //     alignItems: "center",
  //     flexDirection: "row",
  //     marginTop: 20,
  //     height: 50,
  //   },
  //   searchWrapper: {
  //     flex: 1,
  //     backgroundColor: "#F3F4F8",
  //     marginRight: 12,
  //     justifyContent: "center",
  //     alignItems: "center",
  //     borderRadius: 16,
  //     height: "100%",
  //   },
  //   searchInput: {
  //     // fontFamily: FONT.regular,
  //     width: "100%",
  //     height: "100%",
  //     paddingHorizontal: 16,
  //   },
  //   searchBtn: {
  //     width: 50,
  //     height: "100%",
  //     backgroundColor: "#FF7754",
  //     borderRadius: 16,
  //     justifyContent: "center",
  //     alignItems: "center",
  //   },
  //   searchBtnImage: {
  //     width: "50%",
  //     height: "50%",
  //     tintColor: "#F3F4F8",
  //   },

  tabsContainer: {
    width: '100%',
    marginTop: WP('4'),
    // alignSelf: 'center',
    // backgroundColor:'green',
    // paddingVertical: WP(1),
    // paddingHorizontal: WP(4),
  },
  heading: {
    // flex: Platform.OS === 'ios' ? 2/1.5 : 1/2,
    flex: 25,
    // backgroundColor:"red"
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
});

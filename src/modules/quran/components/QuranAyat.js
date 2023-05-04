import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ImageBackground,
  FlatList,
  Share,
  Alert,
  Animated,
} from 'react-native';
import React, {useEffect, useMemo, useState,useContext} from 'react';
import {widthPercentageToDP as WP} from '../../../utills/pixelratio';
import {heightPercentageToDP as HP} from '../../../utills/pixelratio';
import {scale as SC} from '../../../utills/pixelratio';
import SoundPlayer from 'react-native-sound-player'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Quran from 'quran-json';
import {NavigationContainer, useIsFocused, useNavigation} from '@react-navigation/native';
import axios, { all } from 'axios';
import http from '../hooks/http/index'
import Icon from 'react-native-vector-icons/MaterialIcons';
import { QariesNames,QariesIdentifier } from '../../../utills/data/qaries/Qaries'
import { surahsWithVerses } from '../../../utills/data/getSurahNumber';
import { ChartsContext } from '../../../contextApi/ApiProvider';
import TafseerAyat from './TafseerAyat';

const QuranAyat = ({quran,translation,qari,tafseerId}) => {
  // console.log("this is quran",quran);
  const [SurahAyat, setSurahAyat] = useState({});
  const [ayahs, setAyahs] = useState(null);
  const [verseNumber, setVerseNumber]=useState(null);
  const [isBookMark, setIsBookMark]=useState(false);
  const [bookMarkForFilling, setBookMarkForFilling]=useState(null);
  const {isVisible,setIsVisible}=useContext(ChartsContext);
  const [tafsir,setTafsir]=useState(null);
  const [urlInfo,setUrlInfo]=useState(null);
  const isFocused=useIsFocused()
  useEffect(() => {
    
    // fetch('https://api.globalquran.com/complete/ur.junagarhi.jsonp')
    // .then((res)=>console.log("this is res",res.json)
    // .catch((err)=>console.log("this is err",err))
    
    // fetch('https://api.quran.com/api/v4/resources/tafsirs')
    // .then(response => response.json(
    // .then(data => console.log(data.tafsirs[1].id))
    // .catch(error => console.error(error));

  //   fetch('http://api.quran-tafseer.com/tafseer/'+tafseerId+'/'+1+'/'+1)
  // .then(response => response.json())
  // .then(data => console.log(data))
  // 
  // .catch(error => console.error(error));
  // // {"author": "A. J. Arberry", "book_name": "The Koran Interpreted", "id": 9, "language": "en", "name": "Arberry"}, {"author": "Abdullah Yusuf Ali", "book_name": "The Meaning of the Glorious Koran", "id": 10, "language": "en", "name": "Yusuf Ali"},
  // api.quran-tafseer.com/tafseer/{tafseer_id}/{sura_number}/{ayah_number}
    // console.log("this is quran",ur.default[0]);
    // console.log("this is quran",quran.id);
    // (async()=>{
    //   const getBookMarkData=JSON.parse(await AsyncStorage.getItem('isBookMark'));
    //   setBookMarkForFilling(getBookMarkData);
    //   // console.log("this is getBookMarkData",getBookMarkData);
    const quranLinkModified="https://cdn.jsdelivr.net/npm/quran-json@3.1.2/dist/chapters/"+translation+"/"+quran.id+".json"
    // })()
    // setVerseNumber((surahsWithVerses.find(item => Object.keys(item)[0] === (quran.transliteration))[quran.transliteration])+1)
    // console.log("this is quran",verseNumber);
    // (async()=>{
    //   const number=1;
    //   // console.log("this is quran",surahsWithVerses.find(item => Object.keys(item)[0] === (quran.transliteration))[quran.transliteration]);
    //   // const { data } = await http.get(`/v1/surah/${number}/ar.husarymujawwad`);
    //   // const { data } = await http.get(`/v1/surah/${quran.id}/${QariesIdentifier[1]}`);
    //   // // console.log("this is data",data.data.ayahs);
    //   // setAyahs(data.data.ayahs);
    //   // // console.log("this is data",ayahs);

    //   // // console.log("this is route",QariesNames,"\n",QariesIdentifier);
    //   // const res= await fetch(`http://api.alquran.cloud/v1/edition/language/ar`).then((response)=>response.json()).then((data)=>data.data)                                            
    //   // const d=res.filter((item)=>item.format=="audio");
    //   // // console.log("extracting data from alquran=> ",d);
    //   // const item=3

    //   // console.log("extracting data from alquran=> ",d);
    //   // const res2 = await fetch(`http://api.alquran.cloud/v1/quran/${QariesIdentifier[0]}`).then((response)=>response.json()).then((data)=>data.data.surahs);
    //   // console.log('res2', res2);
    //   const ayahs=await fetch(`http://api.alquran.cloud/v1/surah/${item}/${d[0].identifier}`).then((response)=>response.json()).then((data)=>data.data.ayahs);
    //     // console.log('res2', ayahs);
    // })();
    axios.get(quranLinkModified).then(res => {
        // console.log(res.data.translation, 'res.data');
      //   setSurahAyat(res.data);
    //   quranObj = res.data;
      setSurahAyat(res.data);
    //   console.log(SurahAyat, 'quranObj');
    });
    
  }, [isFocused,translation,tafseerId]);

// share functionality
const onShare = async ({item}) => {
    try {
        console.log(item.id);
        const result = await Share.share({
            message:item.text+"\n"+item.translation,
            title:"this is share title",
            url:"https://www.google.com/"
        });
        if (result.action === Share.sharedAction) {
            if (result.activityType) {
                // shared with activity type of result.activityType
                console.log(result.action,"result.activityType")
            } else {
                // shared
                console.log("shared")
            }
        } else if (result.action === Share.dismissedAction) {
            // dismissed
            console.log("dismissed")
        }
    } catch (error) {
        alert(error.message);
    }
};


const playAudio = (surahNameFromList,surahId) => {
  // console.log(surahNameFromList);
  // console.log((surahsWithVerses.find(item => Object.keys(item)[0] === (surahNameFromList))[surahNameFromList])+1);
  const verseNumber=(surahsWithVerses.find(item => Object.keys(item)[0] === (surahNameFromList))[surahNameFromList])+surahId;
  // console.log("this is quran",surahsWithVerses.find(item => Object.keys(item)[0] === (surahNameFromList)[surahNameFromList])+1);
  SoundPlayer.addEventListener('FinishedLoadingURL', ({ success, name }) => {
    console.log('finished loading url', success, name)
  })
  try {
    SoundPlayer.playUrl('https://cdn.islamic.network/quran/audio/64/'+qari+'/'+verseNumber+'.mp3')
    // SoundPlayer.setVolume();
  } 
  catch (e) {
    Alert.alert('Network Error')
}
}

// bookmarking filling aya icons

const callBookMark=async(item,quran)=>{
  const isBookMark={
    surahName:quran.transliteration,
    surahId:quran.id,
    ayaId:item.id,
  };
  const firstGetBookMark=JSON.parse(await AsyncStorage.getItem("isBookMark"));
  let firsGetBookMark2,addingPreviousBookMark;
  if (firstGetBookMark===null){
    console.log("bookamrk null data");
  }else{

    firsGetBookMark2=firstGetBookMark;
  }
  firstGetBookMark.map((item)=>{
    if (item.ayaId===isBookMark.ayaId){
      console.log("already saved item");
      return
    }
    else{
      addingPreviousBookMark=firstGetBookMark?[...firsGetBookMark2,isBookMark]:[isBookMark];
      console.log("now saved");
    }
  })
  // console.log("this is addingPreviousBookMark",addingPreviousBookMark);
  await AsyncStorage.setItem("isBookMark", JSON.stringify(addingPreviousBookMark));
}


// bookMarking AYas
const saveAyaWithSurah=async(item,quran)=>{
  callBookMark(item,quran);
  const bookMarkAya={
    surahName:quran.transliteration,
    surahId:quran.id,
    ayaId:item.id,
    ayaText:item.text,
    ayaTranslation:item.translation,
  }
  // console.log(bookMarkAya);
  // item.id.toString() ======> this is aya id
  const firstGetData=JSON.parse(await AsyncStorage.getItem("bookMarkAya"));
  // console.log("this is firstGetData",firstGetData);
  let firstGetData2;
  let addingPreviousData;
  if (firstGetData===null){
    console.log("null data");
  }
  else {
    firstGetData2=firstGetData;
  }
  firstGetData.map((item)=>{
    if (item.ayaId===bookMarkAya.ayaId){
      console.log("this is already saved");
      return;
    }
    else{
      addingPreviousData=firstGetData?[...firstGetData2,bookMarkAya]:[bookMarkAya];
    }
  })
  // console.log("adding with previous data-> ",addingPreviousData);

  await AsyncStorage.setItem("bookMarkAya", JSON.stringify(addingPreviousData));
  
  // console.log("this is bookMarkAya2",JSON.parse(bookMarkAya2));
  // console.log("this is bookMarkAya",JSON.parse(await AsyncStorage.getItem("bookMarkAya")));
}

// checking bookmark for filling
// const checkIsBookMark=(item)=>{
//   // const firstGetData=JSON.parse(await AsyncStorage.getItem("bookMarkAya"));
//   bookMarkForFilling.map(()=>{
//       if (item.id==bookMarkForFilling.ayaId){
//         setIsBookMark(true);
//       }
//   })
// }
// const [visibility, setVisibility] = useState(false)


// tafseer model
const displayModal=()=>{
  if(isVisible){
  setIsVisible(!isVisible)
}
  else{
    setIsVisible(!isVisible)
  }
}

// tafseer function
const getTafseer=async(item)=>{
  setUrlInfo({"qid":quran.id,"sid":item.id})
  // setUrlInfo({item})
  await axios.get('https://quranenc.com/api/v1/translation/aya/urdu_junagarhi/'+quran.id+'/'+item.id)
  .then((res)=>{
    setTafsir(res.data.result);
    console.log("quran data ",res.data.result);
  })
  
  
}  



  return (
    <View style={styles.surahAyat}>
      <View style={styles.ayatDetail} onTouchEndCapture={()=>
        {if (isVisible){
          setIsVisible(!isVisible)
        }}
      }>
        {/* <Text>{translation}</Text> */}
        <FlatList

          data={SurahAyat.verses}
          keyExtractor={item => item.id}
          renderItem={({item}) => {
            return (
                <View style={{flex:1, backgroundColor:"white", marginBottom:WP('7'), width:WP('100'),alignSelf:"center", padding:WP('4')}}>
                
              <View style={{width:WP('92'),flexDirection: 'row', justifyContent: 'space-between', backgroundColor: '#e8eff4', alignItems:"center", paddingLeft:WP('2'),paddingRight:WP('2'),borderRadius:5,height:HP('6'),marginBottom:HP('2')}}>
                <ImageBackground
                  source={require('../images/tag-black-shape.png')}
                  style={{
                    width: WP('10'),
                    height: HP('5'),
                    justifyContent: 'center',
                    alignItems: 'center',
                    // textAlign: 'center',
                  }}
                  imageStyle={{tintColor: '#004C9B'}}>
                  <Text style={{color: 'white'}}>{item.id}</Text>
                  
                </ImageBackground>
                <View style={{flexDirection:"row", justifyContent:"space-around"}}>
                    <TouchableOpacity onPress={()=>{
                      displayModal();
                      getTafseer(item);}} >
                        <Icon name='menu-book' size={30} color='#004C9B' style={{marginLeft:10}}/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>onShare({item})}>
                        <Icon name='share' size={30} color='#004C9B' style={{marginLeft:10}}/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>{
                        playAudio(quran.transliteration, item.id);
                    }}>
                        <Icon name='play-arrow' size={30} color='#004C9B' style={{marginLeft:10}}/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>{
                      saveAyaWithSurah(item,quran);
                      // checkIsBookMark(item);
                    }}>
                       <Icon name='bookmark-border' size={30} color='#004C9B' style={{marginLeft:10}}/>
                    </TouchableOpacity>

                </View>
                   
                   
              </View>
              <View style={{backgroundColor:"white",width:WP('92'), alignSelf:"flex-start", borderRadius:5, padding:WP('2'),paddingRight:WP('6'), paddingLeft:WP('4')}}>

                <Text style={styles.arabicAyatText}>{item.text}</Text>
                <Text style={[styles.transText,{fontStyle:'italic'}]}>{item.transliteration+"\n"}</Text>
                
                <Text style={styles.transText}>{item.translation}</Text>
                
              </View>

              
              </View>
            );
          }}
        />

      </View>
      {/* bottom sheet for tafseer */}
      {isVisible && <TafseerAyat tafsir={tafsir} geturl={urlInfo}/>
        // <View  style={{backgroundColor:"red", flex:4,height:HP('40'),width:WP("100"), alignSelf:"center",justifyContent:"center",position:"absolute", bottom:1}}>
        //   <View style={{backgroundColor:"white", width:WP('95'), height:HP('35'),alignSelf:"center", borderRadius:10}}>
        //     <Text>hello</Text>
        //   </View> 
        // </View>
      }
     
    </View>
  );
};

export default QuranAyat;

const styles = StyleSheet.create({
  surahAyat: {
    flex: 1,
    // backgroundColor: 'yellow',
    marginTop: WP('3'),
  },
  ayatDetail: {
    flex: 1,
    width: WP('98'),
    alignSelf: 'center',
    flexDirection: 'row',
    margin: WP('1'),
    borderRadius: 5,
    padding: WP('2'),
  },
  renderAyat: {
    flex: 1,
    backgroundColor: 'yellow',
    flexWrap: 'wrap',
    marginTop: WP('3'),
  },
  arabicAyatText:{
    fontSize:SC(21),color:"black", fontWeight:"bold", textAlign:"right", marginBottom:HP('2')
  },
  transText:{
    fontSize:SC(18),color:"black", fontFamily:'Normal',lineHeight:HP('4')
  },
  // modal
  container: {
    // padding: 25,
    // flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    // height:HP('10'),
  },
  button: {
    display: 'flex',
    height: 60,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#2AC062',
    shadowColor: '#2AC062',
    shadowOpacity: 0.5,
    shadowOffset: { 
      height: 10, 
      width: 0 
    },
    shadowRadius: 25,
  },
  closeButton: {
    display: 'flex',
    height: 60,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FF3974',
    shadowColor: '#2AC062',
    shadowOpacity: 0.5,
    shadowOffset: { 
      height: 10, 
      width: 0 
    },
    shadowRadius: 25,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 22,
  },
  image: {
    marginTop: 150,
    marginBottom: 10,
    width: '100%',
    height: 350,
  },
  text: {
    fontSize: 24,
    marginBottom: 30,
    padding: 40,
  },
  closeText: {
    fontSize: 24,
    color: '#00479e',
    textAlign: 'center',
  }
});

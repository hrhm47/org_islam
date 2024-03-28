import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Image,
  ScrollView,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon1 from 'react-native-vector-icons/Ionicons';
import SoundPlayer from 'react-native-sound-player';
import {
  widthPercentageToDP as WP,
  heightPercentageToDP as HP,
  scale as SC,
} from '../../../utills/pixelratio';
import {useNavigation, useIsFocused} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TrackPlayer,{ TrackType,  } from 'react-native-track-player';

import {setupPlayer, addTracks} from '../../../../trackServices.js';

import {PARAS} from '../../../utills/data/paraNames/ParaNames';
import {ArrayofUrl} from '../hooks/http/ReturnArrayUrl';

const Para_Juz = ({route}) => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [internetIsSlow, setInternetIsSlow] = useState(false);
  const [setOfAya, setSetOfAya] = useState(null);
  const {juz} = route.params;
  const [selectColor, setSelectColor] = useState(null);
  // declaring states for juz data
  const [juzData, setJuzData] = useState(null);
  let b;
  const [surahName, setSurahName] = useState(PARAS[juz - 1].name);
  const [isPlaying, setIsPlaying] = useState(false);
  const [ayatNumber,setAyatNumber]=useState({ayatNumber:null,ayat:null})
  const [updateAya,setUpdateAya]=useState(0)
  useEffect(() => {
    getJuzData();
    callSetup();
  }, [isFocused]);

  // fetcing data from api
  const getJuzData = () => {
    GetAsyncData().then(data => {
      if (data === null) {
        fetch('https://api.alquran.cloud/v1/juz/' + juz + '/quran-uthmani')
          .then(res => res.json())
          .then(async data => {
            setJuzData(data.data.ayahs);
            await AsyncStorage.setItem(
              juz.toString(),
              JSON.stringify(data.data.ayahs),
            );
          })
          .catch(err => console.log('err', err));
      } else {
        // b = data;
        console.log('at else');
        setJuzData(data);
      }
    });
  };

  // fetching data from asyncStorage
  const GetAsyncData = async () => {
    // console.log("at async");
    const ayaData = JSON.parse(await AsyncStorage.getItem(juz.toString()));
    // console.log("ayaData",ayaData);
    return ayaData;
    // setJuzData(ayaData?ayaData:null)
  };


 const lastReadStoreAya = async () => {
  let data;
  juzData.map((item,index)=>{
      
    // data=item.number==selectColor?item:null;
    if (selectColor==item.number){
      data={
        ParaName: surahName,
        paraId: item.juz,
        ayaId: item.number,
        // ayaId: data.id,
        ayaText: item.text,
      };
    }
    })
  console.log('current track pause');
  await TrackPlayer.pause();
  await AsyncStorage.setItem('lastReadAya', JSON.stringify(data));

 }

  const stopAudio = async () => {
    lastReadStoreAya();
    await TrackPlayer.pause();
    // await TrackPlayer.reset();
    setIsPlaying(false);
  };

  const callSetup=async()=>{
    
    const setupReady=await setupPlayer();
    if (setupReady){
      
      return true;
    }
  }

  const addUrls=async(ayatNumber,ayat)=>{
        console.log("ayatNumber",ayatNumber);
        const setupReady=await setupPlayer();
        
          if(setupReady){

            await TrackPlayer.reset();
            const startingAyat = ayatNumber
            const endingAyat = juzData[juzData.length - 1].number;
            const tracks = ArrayofUrl(
              startingAyat,
              endingAyat,
              'ar.abdulbasitmurattal',
            );
            for (const url of tracks) {
            
              await TrackPlayer.add({
                url: url.url,
                id: url.id,
              }).then(async res=>{
                await TrackPlayer.play();
              })
            }}
            else{
              // console.log("not setup");
            }
  }
  const playAudio = async (verseNumber, ayat) => {
    addUrls(verseNumber,ayatNumber.ayat);
    const startingAyat = ayatNumber.ayatNumber;
   
    TrackPlayer.addEventListener('playback-track-changed', async event => {
      if (event.nextTrack !== null) {
        // Get the current track index
        const currentTrackIndex = await TrackPlayer.getCurrentTrack();
        if (currentTrackIndex == (await TrackPlayer.getCurrentTrack())) {
         
          console.log(
            'current track index update once',
            startingAyat + currentTrackIndex,
          );
          setSelectColor(startingAyat + currentTrackIndex);
          setAyatNumber({ayatNumber:startingAyat + currentTrackIndex,ayat:ayat})
        }
      }
    });
    let update = ayat.number;

    
  };


  return (
    <>
      <StatusBar backgroundColor="#104586" />
      <View style={styles.container}>
       
        <View style={styles.heading}>
          <TouchableOpacity

            onPress={() => {
              lastReadStoreAya();
              navigation.navigate('PARA');
            }}
            style={{
              width: WP('10'),
              height: HP('5'),
              justifyContent: 'center',
            }}>
            <Icon name="arrow-back-ios" size={25} color="white" />
          </TouchableOpacity>
          <Text style={styles.headText}>{PARAS[juz - 1].name}</Text>
          <Icon
            name="list"
            size={25}
            color="transparent"
            style={{marginLeft: 10}}
          />
        </View>
        <View
          style={{
            flex: 1,
            backgroundColor: '#ffffff',
            alignSelf: 'center',
            justifyContent: 'center',
          }}>
          <Image
            source={require('../images/bismillah.png')}
            style={{
              width: WP('95'),
              height: HP('8'),
              marginBottom: HP('1.5'),
              marginTop: HP('1'),
              alignSelf: 'center',
            }}
            resizeMode="stretch"
          />

          {juzData ? (
            <ScrollView style={styles.scroll}>
              <Text style={styles.surahPage} adjustsFontSizeToFit>
                {juzData &&
                  juzData.map((ayat, index) => 
                    
               
                   ( 
                    <>
                    
                    <Text
                      key={index}
                      allowFontScaling={true}
                      selectable={true}
                      style={{ textAlign:"right",fontSize:SC(22)}}
                      onPress={async() => {
                        
                        setAyatNumber({ayatNumber:ayat.number,ayat:ayat})
                        // addUrls(verseNumber,ayatNumber.ayat);

                        setSelectColor(ayat.number);
                        console.log(ayat.number, isPlaying);
                        
                      }}>
                      <Text
                        selectable={true}
                        style={[
                          styles.ayat,
                          {
                            color:
                              ayat.number === selectColor ? 'blue' : 'black',
                          },
                        ]}>
                        {ayat.text + '\b'}
                      </Text>
                      
                      <Text
                        style={[
                          styles.number,
                          {color: ayat.number === selectColor ? 'blue' : 'black'},
                        ]}>
                        {'\u{FD3F}' + (index + 1) + '\u{FD3E}' + '\b'}
                      </Text>
                      
                      
                    </Text>
                    </>)

                  
                  
                  )}
              </Text>
            </ScrollView>
          ) : (
            <View
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <ActivityIndicator size={30} color={'blue'} />
              {internetIsSlow ? (
                <Text>Internet Is Slow.....</Text>
              ) : (
                <Text>Data Fetching.....</Text>
              )}
            </View>
          )}
        </View>
        <View style={{ backgroundColor: '#104586',}}>
          <View
            style={{
              flexDirection: 'row',
              // backgroundColor: '#105582',
              paddingHorizontal: WP('3'),
              paddingVertical: HP('1'),
              justifyContent:"space-between",
              alignItems: 'center',
            }}>
            {/* <Icon name="settings" size={30} color={'white'} /> */}
            <TouchableOpacity 
                onPress={async()=>{
                  BookMarkThePara();
                }}
              >
                <Icon name="bookmark-border" size={30} color={'transparent'} />
              </TouchableOpacity>
            {isPlaying ? (
              <TouchableOpacity
              style={{}}
                onPress={() => {
                  stopAudio();
                  
                     console.log("not working");
                  
                  setIsPlaying(false)
                }}>
                <Icon1 name="stop-circle-outline" size={30} color={'white'} />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
              style={{ }}
              onPress={async() => {
               
                  playAudio(ayatNumber.ayatNumber,ayatNumber.ayat);
                  
                setIsPlaying(true);
                
                }}>
                <Icon1 name="play-circle-outline" size={30} color={'white'} />
              </TouchableOpacity>
            )}
            <TouchableOpacity 
              onPress={async()=>{
                if (ayatNumber.ayatNumber==null){
                  alert('Please Select Ayat')
                }
                else{
                  navigation.navigate("Tajweed",{ayatData:ayatNumber})
                }
              
              }}
            >
                <Text
                  style={{
                    color: 'white',
                    alignSelf: 'center',
                    alignItems:"center",
                    fontSize: SC(15),
                  }}>
                  Tajweed
                </Text>
              </TouchableOpacity>
           
            
          </View>
          
        </View>
      </View>
    </>
  );
};

export default Para_Juz;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  container1: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#112',
  },
  heading: {
    // flex: 0.1,
    backgroundColor: '#104586',
    flexDirection: 'row',
    // justifyContent:"space-evenly",
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: HP('1'),
    paddingHorizontal: WP('4'),
  },
  headText: {
    fontSize: SC(25),
    fontFamily:'Amiri-Regular',
    color: 'white',
    marginLeft: WP('5'),
  },
  scroll: {
    flex: 1,
  },
  surahPage: {
    // flex: 1,
    width: WP('100'),
    fontSize: SC(23),
    lineHeight:50,

    // paddingRight:4,
    // paddingLeft:4,
    writingDirection:'auto',
    textAlign: 'justify',
    fontFamily:'Amiri-Regular',

  },
  
  ayat: {},
  number: {
    fontSize: SC(16),
    color: '#104586',
  },
  selectedText: {
    color: 'blue',
  },
  normalText: {
    color: 'black',
  },
});

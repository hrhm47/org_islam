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
import TrackPlayer, {
  usePlaybackState,
  useTrackPlayerProgress,
  PlayerOptions,
  Track,
} from 'react-native-track-player';
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
  const [isPlaying, setIsPlaying] = useState(true);
  const [isPlayerReady, setIsPlayerReady] = useState(null);
  const [isBuffering, setIsBuffering] = useState(true);
  const [getIndex, setGetIndex] = useState(null);
  useEffect(() => {
    getJuzData();
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
        b = data;
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

  // calculate time for slow internet
  const calculateTime = () => {
    console.log('calculating time');
    setInterval(() => {
      setInternetIsSlow(true);
    }, 1000);
  };

  // changing color
  const changeColor = (number, index) => {
    if (number === index) {
      setSelectColor(true);
    }
    console.log('number', number, 'index', index);
  };

  const stopAudio = async () => {
    console.log('current track pause');
    await TrackPlayer.pause();
    // await TrackPlayer.reset();
    setIsPlaying(false);
  };


  const playAudio = async (verseNumber, ayat) => {
    // TrackPlayer.destroy();
    const startingAyat = ayat.number ? ayat.number : juzData[0].number;
    const endingAyat = juzData[juzData.length - 1].number;
    // audioPlayer();
    const tracks = ArrayofUrl(
      startingAyat,
      endingAyat,
      'ar.abdulbasitmurattal',
    );
    console.log('tracks', tracks[0]);
    let flag = false;

    if (isPlaying == true) {
      setup();
    } else if (isPlaying == false) {
      console.log('stop the queue');

      // try {
      //   TrackPlayer.stop;
      // } catch (error) {
      //   console.log('error while stoppping ', error);
      // }
    }
    let update = ayat.number;
    async function setup() {
      
      try {
        let isSetup = await setupPlayer();
        let queue = await TrackPlayer.getQueue();
        if (queue.length > 0) {
          await TrackPlayer.reset();
        }
        if (isSetup) {
          console.log('adding tracks');
          // TrackPlayer.stop();
          for (const url of tracks) {
            // console.log(url);
            await TrackPlayer.add({
              url: url.url,
              id: url.id,
            }).then(() => {
              TrackPlayer.play().then(res => {});
            });
          }
        } else {
          console.log('Queue is full');
        }
      } catch (err) {
        console.log('error while playing and loading ', err);
      }
      // console.log("issetup",isSetup,"queue", queue);
    }

    TrackPlayer.addEventListener('playback-track-changed', async event => {
      if (event.nextTrack !== null) {
        // Get the current track index
        const currentTrackIndex = await TrackPlayer.getCurrentTrack();
        if (currentTrackIndex == (await TrackPlayer.getCurrentTrack())) {
          // update=update+1;
          console.log(
            'current track index update once',
            startingAyat + currentTrackIndex,
          );
          setSelectColor(startingAyat + currentTrackIndex);
        }
      }
    });
  };

  //   const [paused, setPaused] = useState(true);
  // const playbackState = usePlaybackState();
  // const { position, duration } = useTrackPlayerProgress();
  const handlePlayPause = async () => {
    // if (playbackState === TrackPlayer.STATE_PLAYING) {
      await TrackPlayer.pause();
      setPaused(true);
      console.log('paused');
    // } else {
    // await TrackPlayer.stop();
    // setPaused(false);
    // }
  };

  const handlePlay = async () => {
    await TrackPlayer.play();
    console.log('playing');
    
    setIsPlaying(true)
    // setPaused(true);
  };

  return (
    <>
      <StatusBar backgroundColor="#104586" />
      <View style={styles.container}>
        <View style={styles.heading}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Home');
            }}
            style={{
              width: WP('10'),
              height: HP('5'),
              justifyContent: 'center',
              paddingLeft: WP('2'),
            }}>
            <Icon name="arrow-back-ios" size={30} color="white" />
          </TouchableOpacity>
          <Text style={styles.headText}>{PARAS[juz - 1].name}</Text>
          <Icon
            name="list"
            size={30}
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
                  juzData.map((ayat, index) => (
                    // <TouchableOpacity onPress={()=>console.log(index)}>
                    <Text
                      key={index}
                      allowFontScaling={false}
                      selectable={true}
                      style={{}}
                      onPress={() => {
                        if (isPlaying == false) {
                          setIsPlaying(true);
                          // setSelectColor(null)
                        } else if (isPlaying == true) {
                          setIsPlaying(true);
                          setSelectColor(index);
                          playAudio(ayat.number, ayat);
                        }
                        console.log(ayat.number, isPlaying);
                        // setIsPlayerReady(false)
                      }}>
                      {/* <TouchableOpacity style={styles.ayat}> */}
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
                      {/* <Text style={styles.number}>&#1757;{"\b"}</Text> */}
                      <Text
                        style={[
                          styles.number,
                          {color: ayat.number === selectColor ? 'blue' : 'black'},
                        ]}>
                        {'\u{FD3F}' + (index + 1) + '\u{FD3E}' + '\b'}
                      </Text>
                      {/* </TouchableOpacity> */}
                    </Text>
                  ))}
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
        <View style={{flex: 1 / 7, backgroundColor: 'red'}}>
          <View
            style={{
              flexDirection: 'row',
              backgroundColor: 'black',
              paddingHorizontal: WP('3'),
              paddingVertical: HP('1'),
            }}>
            <Icon name="settings" size={30} color={'white'} />
            <Text
              style={{
                color: 'white',
                alignSelf: 'center',
                flex: 1,
                textAlign: 'center',
                fontSize: SC(20),
              }}>
              {surahName}
            </Text>
            <Text
              style={{
                color: 'white',
                alignSelf: 'center',
                flex: 1,
                textAlign: 'center',
                fontSize: SC(20),
              }}>
              {getIndex - 1}
              {selectColor}
            </Text>
            {/* <Icon name='skip-next' size={30} /> */}
          </View>
          <View
            style={{
              flexDirection: 'row',
              backgroundColor: 'red',
              paddingHorizontal: WP('3'),
              alignSelf: 'center',
              alignItems: 'center',
            }}>
            <Icon name="bookmark-border" size={30} color={'white'} />
            {isPlaying ? (
              <TouchableOpacity
                onPress={() => {
                  stopAudio();
                  // setIsPlaying(true)
                }}>
                <Icon1 name="play-circle-outline" size={30} color={'white'} />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
              onPress={() => {
                  handlePlay();
                }}>
                <Icon1 name="stop-circle-outline" size={30} color={'white'} />
              </TouchableOpacity>
            )}
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
    flex: 0.1,
    backgroundColor: '#104586',
    flexDirection: 'row',
    // justifyContent:"space-evenly",
    alignItems: 'center',
    justifyContent: 'space-around',
    marginBottom: HP('1'),
  },
  headText: {
    fontSize: SC(25),
    fontWeight: 'bold',
    justifyContent: 'space-evenly',
    fontFamily: 'serif',
    color: 'white',
    marginLeft: WP('5'),
  },
  scroll: {
    flex: 1,
    // padding: 7,
  },
  surahPage: {
    flex: 1,
    marginBottom: 20,
    marginTop: 15,
    // alignSelf:'center',
    fontSize: SC(23),
    // flexWrap:"wrap",
    lineHeight: HP('5'),
    // backgroundColor:"red",
    paddingRight: WP('2'),
    paddingLeft: WP('4'),
    textAlign: 'justify',
    fontWeight: '600',
  },

  ayat: {},

  number: {
    fontSize: SC(18),
    color: '#104586',
  },
  selectedText: {
    color: 'blue',
  },
  normalText: {
    color: 'black',
  },
});

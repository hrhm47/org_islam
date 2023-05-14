import React, {useState, useEffect, useMemo} from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Permission,
  PermissionsAndroid,
  Text,
  FlatList,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AudioRecorderPlayer, {
  AudioEncoderAndroidType,
  AudioSourceAndroidType,
  RecordBackType,
} from 'react-native-audio-recorder-player';
import {useNavigation} from '@react-navigation/native';
import {uploadFile} from '../hooks/http';
import {callPermissions} from '../hooks/permissions/permissions';
// import {AudioRecorder, AudioUtils} from 'react-native-audio';
import SearchScreenParaList from '../components/SearchScreenParaList';
import {searchSurah} from '../hooks/http/searchFucntion';
import {widthPercentageToDP as WP} from '../../../utills/pixelratio';
import {heightPercentageToDP as HP} from '../../../utills/pixelratio';
import {scale as SC} from '../../../utills/pixelratio';
const audioRecorderPlayer = new AudioRecorderPlayer();

var RNFS = require('react-native-fs');

const SearchScreen = () => {
  const navigation = useNavigation();

  const [searchText, setSearchText] = useState('');
  const [isListening, setIsListening] = useState(true);
  const [jsonText, setJsonText] = useState(null);
  const [suran_nos, setSurah_Nos] = useState([]);
  const [audioRecord, setAudioRecord] = useState({
    recordSecs: 0,
    recordTime: '00:00:00',
  });
  audioRecorderPlayer.setSubscriptionDuration(0.09);
  const [recordBackListener, setRecordBackListener] = useState(null);
  const [pathUri, setPathUri] = useState({
    path: '',
    uri: '',
  });
  const [bySearch, setBySearch] = useState(false);
  const audioSet = {
    AudioEncoderAndroid: AudioEncoderAndroidType.AAC,
    AudioSourceAndroid: AudioSourceAndroidType.MIC,
    AudioEncoderAndroidType: AudioEncoderAndroidType.AAC,
  };

  const onStartRecord = async () => {
    callPermissions();

    const recordingDirectory = `${RNFS.DocumentDirectoryPath}/recordings`;
    const path = `${recordingDirectory}/myrecording.m4a`;

    // Create directory if it doesn't exist
    const directoryExists = await RNFS.exists(recordingDirectory);
    if (!directoryExists) {
      await RNFS.mkdir(recordingDirectory);
    }
    setPathUri({
      path: path,
    });
    setIsListening(false);
    // const path = 'hello.m4a';

    try {
      const uri = await audioRecorderPlayer.startRecorder(path, audioSet);
      audioRecorderPlayer.addRecordBackListener(e => {
        setAudioRecord({
          recordSecs: e.currentPosition,
          recordTime: audioRecorderPlayer.mmssss(Math.floor(e.currentPosition)),
        });
      });
      console.log(`uri: ${uri}`);
    } catch (error) {
      console.log('error', error.message);
    }
  };

  const onStopRecord = async () => {
    setIsListening(true);
    try {
      const result = await audioRecorderPlayer.stopRecorder();

      audioRecorderPlayer.removeRecordBackListener(recordBackListener);
      setAudioRecord({
        recordSecs: 0,
      });
      console.log('path', pathUri.path, result);
      const recordingDirectory = `${RNFS.DocumentDirectoryPath}/recordings`;
      const recordingPath = `${recordingDirectory}/myrecording.m4a`;

      const fileExists = await RNFS.exists(recordingPath);
      if (fileExists) {
        const fileUri = `file://${recordingPath}`;
        setPathUri({
          uri: fileUri,
        });
        // uploadFile(fileUri)
        const response = await uploadFile(fileUri);
        setJsonText(response.aya_text);
        response.surah_no.sort();
        console.log('response after sort', response.surah_no);
        setSurah_Nos(response.surah_no);
      } else {
        console.log('File not found:', recordingPath);
      }
    } catch (err) {
      console.log('error', err);
    }
  };

  // const onStartPlay = async () => {
  //   await audioRecorderPlayer.stopPlayer();
  //   audioRecorderPlayer.removePlayBackListener();
  //   console.log('onStartPlay', pathUri.uri);
  //   const path = pathUri.uri;
  //   const msg = await audioRecorderPlayer.startPlayer(path);
  //   audioRecorderPlayer.setVolume(1.0);
  //   console.log(msg);
  //   audioRecorderPlayer.addPlayBackListener((e) => {
  //     if (e.currentPosition === e.duration) {
  //       console.log('finished');
  //       audioRecorderPlayer.stopPlayer();
  //     }
  //     setCurrentPositionSec(e.currentPosition);
  //     setCurrentDurationSec(e.duration);
  //     setPlayTime(audioRecorderPlayer.mmssss(Math.floor(e.currentPosition)));
  //     setDuration(audioRecorderPlayer.mmssss(Math.floor(e.duration)));
  //   });
  // };
 
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
 
  const SurahList = ({ data }) => {
    

    return(
      <FlatList
      style={{top:10, width:"100%"}}
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          return(
            
          <TouchableOpacity 
            onPress={()=>navigation.navigate("Surah", {quran:item})}
            style={{height:50, padding:4, justifyContent:"center", backgroundColor:"lightblue",margin:10, paddingHorizontal:20,}}>
            <Text style={{color:"black", fontSize:SC(18)}}>{item.id}. {item.name} - {item.transliteration}</Text>
          </TouchableOpacity>
          )
        }}
        scrollEnabled={true}
        scrollsToTop={true}
      />
    )
  }






  const handleInputChange = (text) => {
    setSearchQuery(text);
    setSearchResults(searchSurah(text));
  };

  return (
    <View style={{backgroundColor: 'white', flex: 1, alignItems: 'center'}}>
      <View style={styles.container}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Icon name="arrow-back-ios" size={24} color="#6e6e6e" />
        </TouchableOpacity>
        <TextInput
        style={{height: 40, borderColor: 'gray', borderWidth: 1, width:"80%",}}
          placeholder="Search Surah by Name / Number"
          value={searchQuery}
          onChangeText={text => {handleInputChange(text); setBySearch(true)}}
          onFocus={() => {setSearchQuery(""); setBySearch(false)}}
        />
        
        <TouchableOpacity
          onPress={() => {
            isListening ? onStartRecord() : onStopRecord();
          }}>
          <Icon
            name={isListening ? 'mic-none' : 'mic'}
            size={24}
            color="#6e6e6e"
          />
        </TouchableOpacity>
      </View>

      {bySearch?(
        <View style={{top:70, width:"100%"}}>
          
        {searchResults.length >0 ?(
          // <ScrollView>
            <SurahList data={searchResults} />
          // </ScrollView>
          ) : ( null)}
          </View>

      ):(
        <>
        
        {jsonText == null ? (
          null
          // <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <View style={{flex: 1, backgroundColor: 'white', width: '100%', top:100}}>  
            <View style={{flex: .3, backgroundColor: 'lightblue'}}>
              <ScrollView>
                <Text style={{fontSize: 24}}>Search Text : {'\n' + jsonText}</Text>
              </ScrollView>
            </View>
              <SearchScreenParaList surah_no={suran_nos} searchText={jsonText} />
          
        </View>
        )}
        </>
      )}
      
      
    </View>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
    // backgroundColor: '#000',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    position:"absolute",
    width:"100%",
    justifyContent:"space-between"
    // flex:1
  },
  input: {
    flex: 1,
    marginLeft: 8,
    paddingVertical: 0,
    fontSize: 16,
    color: '#6e6e6e',
  },
});

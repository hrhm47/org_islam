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
  BackHandler,
  ScrollView,
  ActivityIndicator
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation, useRoute } from '@react-navigation/native';
import AudioRecorderPlayer, {
    AudioEncoderAndroidType,
    AudioSourceAndroidType,
    RecordBackType,
  } from 'react-native-audio-recorder-player';
import { callPermissions } from '../hooks/permissions/permissions';
import { uploadFile } from '../hooks/http/TajweedIndex';
  const audioRecorderPlayer = new AudioRecorderPlayer();
import SearchScreenParaList from '../components/SearchScreenParaList';
var RNFS = require('react-native-fs');

const Tajweed = () => {
    const route=useRoute();
    const navigation=useNavigation();
    // console.log(route.params.ayatData);
    BackHandler.addEventListener('hardwareBackPress', function() {
        // navigation.navigate('Para');
        navigation.goBack();
        return true;
    })

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
    const [isLoading, setIsLoading] = useState(null);
    const audioSet = {
      AudioEncoderAndroid: AudioEncoderAndroidType.AAC,
      AudioSourceAndroid: AudioSourceAndroidType.MIC,
      AudioEncoderAndroidType: AudioEncoderAndroidType.AAC,
    };

    const onStartRecord = async () => {
        setIsLoading(true);
        callPermissions()
        // .then((res)=>{
        //   if(res){
        //     console.log("permissions granted");
        //   }else{
        //     callPermissions();
        //   }
        // })
        
        await audioRecorderPlayer.stopPlayer();
        audioRecorderPlayer.removeRecordBackListener();
        // setRecordBackListener(null);
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
          // console.log(`uri: ${uri}`);
        } catch (error) {
          console.log('error', error.message);
        }
      };
    
      const onStopRecord = async () => {
        setIsLoading(false);
        setIsListening(true);
        try {
           await audioRecorderPlayer.stopRecorder();
    
          audioRecorderPlayer.removeRecordBackListener(recordBackListener);
          setAudioRecord({
            recordSecs: 0,
          });
        //   audioRecorderPlayer.startPlayer(pathUri.path);
          // console.log('path', pathUri.path, result);
          const recordingDirectory = `${RNFS.DocumentDirectoryPath}/recordings`;
          const recordingPath = `${recordingDirectory}/myrecording.m4a`;
    
          const fileExists = await RNFS.exists(recordingPath);
          if (fileExists) {
            const fileUri = `file://${recordingPath}`;
            setPathUri({
              uri: fileUri,
            });
            // uploadFile(fileUri)
            const response = await uploadFile(fileUri,route.params.ayatData.ayat.text);
            setJsonText({tajweed:response.tajeed,smiliarity:response.similarity});
            // console.log('response', response.tajeed);
            // response.surah_no.sort();
            console.log('response after sort', response);
            // setSurah_Nos(response.surah_no);
          } else {
            console.log('File not found:', recordingPath);
          }
        } catch (err) {
          console.log('error', err);
        }
      };
      


  return (
    <View style={{flex:1, backgroundColor:"#FFF",}}>
        <View style={{flex:1/7, backgroundColor:"#104586", flexDirection:"row", justifyContent:"space-between"}}>
          <Icon name="arrow-back" size={30} color="white" style={{padding:10}} onPress={()=>navigation.goBack()}/>
            <Text style={{fontSize:23, color:"white", alignItems:"center", alignSelf:"center", paddingVertical:2}}>Tajweed</Text>
          <Icon name="arrow-back" size={30} color="transparent" style={{padding:10}} onPress={()=>navigation.goBack()}/>
        </View>
        <View style={{flex:1, backgroundColor:"#fff", alignSelf:"auto", top:10, paddingHorizontal:10}}>
            <Text style={{fontSize:23, color:"#104586",alignSelf:"auto",fontFamily:'Amiri-Regular',}}>{route.params.ayatData.ayat.text}</Text>
            <TouchableOpacity style={{backgroundColor:"grey", width:"50%", alignItems:"center", justifyContent:"center", alignSelf:"center",margin:10, flexDirection:"row", borderRadius:10 }} 
            onPress={() => {
                isListening ? onStartRecord() : onStopRecord();
              }}>
                <Text style={{fontSize:20, paddingVertical:10, color:"white",paddingHorizontal:6}}>
                    {isListening?"Record Tajweed":"Stop Recording"}
                </Text>
              <Icon
                name={isListening ? 'mic-none' : 'mic'}
                size={24}
                color="#104586"
              />
            </TouchableOpacity>
                {/* <Text>Audio Viuusaliszation</Text> */}
        </View>
            <View style={{flex:1, backgroundColor:"lightblue",alignSelf:"auto", top:30, borderRadius:20}}> 
            
            {jsonText == null ? (
          // null
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
        

          <>
              <Text style={{fontSize:23, color:"#104586",alignSelf:"auto",fontFamily:'Amiri-Regular', left:10}}> Similarity { Math.round(jsonText.smiliarity,0)} P </Text>
              <FlatList 
                data={jsonText.tajweed}
                renderItem={({item}) => (
                  <>
                      <Text style={{fontSize: 24,top:0, left:10}}>input- {item.word}  actual-{item.correct_word}</Text>
                
                  </>
                )
              }
                keyExtractor={(item, index) => index.toString()}
              />
                       
                       </>
        )}
        </View>
    </View>
  )
}

export default Tajweed

const styles = StyleSheet.create({})
import { ScrollView, StyleSheet, Text, View,ActivityIndicator } from 'react-native'
import React,{useContext} from 'react'
import {widthPercentageToDP as WP, heightPercentageToDP as HP} from '../../../utills/pixelratio';
import {scale as SC} from '../../../utills/pixelratio';
import { ChartsContext } from '../../../contextApi/ApiProvider';
import {
    Menu,MenuProvider,MenuOptions,MenuOption,MenuTrigger,} from 'react-native-popup-menu';
import Icon from 'react-native-vector-icons/MaterialIcons';
import axios from 'axios';

const TafseerAyat = ({tafsir,geturl}) => {
    const {isVisible,setIsVisible}=useContext(ChartsContext);
    const [tafseerLangauge,setTafseerLangauge]=React.useState('english_saheeh') // for changing tafseer language
    const [tafseerbyLan,setTafsirbyLan]=React.useState(null) // getting new tafseer by language data
    // console.log("this is tafseer",tafsir);
//   React.useMemo(() => {

//     (async()=>{
//         // console.log("this is tafseer",geturl.);
//         await axios.get('https://quranenc.com/api/v1/translation/aya/'+tafseerLangauge+'/'+geturl.qid+'/'+geturl.sid)
//         .then((res)=>{
//           setTafsirbyLan(res.data.result);
//           console.log("quran data ",res.data.result);
//         })
//     })()
//   }, [tafseerLangauge])
   
  return (
      <View  style={{backgroundColor:"#104586", flex:4,height:HP('40'),width:WP("100"), alignSelf:"center",justifyContent:"center",position:"absolute", bottom:1}} >
        

          <View style={{backgroundColor:"white", width:WP('95'), height:HP('35'),alignSelf:"center", borderRadius:10,padding:WP('4')}}>
            <View style={{alignSelf:"center",justifyContent:"center",marginBottom:HP('2')}}>
            {/* <Menu >
                <MenuTrigger style={{backgroundColor:"#e8eff4"}}>
                    <Icon name='list' size={30} color='#004C9B' style={{marginLeft:10}}/>
                </MenuTrigger>
                    <MenuOptions customStyles={{optionsContainer:{
                        padding:WP('2'),
                    }, optionText:{
                        fontSize:SC(14),
                    }}}>
                            <Text style={{color:"black"}}>Tafseer</Text>
                            <MenuOptions>
                                <MenuOption onSelect={() => {setTafseerLangauge('english_saheeh')}}  text='Saheeh International (en)' />
                                <MenuOption onSelect={() => {setTafseerLangauge('english_hilali_khan')}} text='Taqi-ud-Din Al-Hilali and Muhsen Khan (en)'/>
                                <MenuOption onSelect={() => {setTafseerLangauge('urdu_junagarhi')}} text='Muhammad Ibrahim Gunakry (ur)'/>
                                <MenuOption onSelect={() => {setTafseerLangauge('turkish_shaban')}} text='Shaaban Britsh (tr)'/>
                            </MenuOptions>
                    </MenuOptions>
             </Menu> */}
               <Text style={[styles.testStyle,{color:"black",fontSize:SC(20)}]}>
                سورہ {geturl.qid} آیت {geturl.sid}
                    </Text> 
            </View>
        <ScrollView  showsVerticalScrollIndicator={false}>
            {tafsir?
            <>
                {/* <Text style={styles.testStyle}>aya: {tafsir.aya}</Text>  */}
                {/* <Text>{tafsir.arabic_text}</Text>  */}
                {/* <Text style={styles.testStyle}>{tafseerbyLan?tafseerbyLan.arabic_text:"no data"}</Text> */}
                {/* <Text style={[styles.testStyle,{color:"blue",fontSize:SC(23)}]}>
                    {tafseerbyLan==null?tafsir.arabic_text:tafseerbyLan.arabic_text}
                    </Text>  */}
              
                <Text style={[styles.testStyle,{color:"blue",fontSize:SC(23)}]}>
                    {tafsir.arabic_text}
                    </Text> 
                {/* <Text style={styles.testStyle}>{tafseerbyLan==null?tafsir.footnotes:tafseerbyLan.footnotes}</Text> */}
                <Text style={styles.testStyle}>{tafsir.footnotes}</Text>
             </> 
                :
                <ActivityIndicator size="large" color="#004C9B" />}
          
         </ScrollView>
          </View> 
        
        </View> 
  )
}

export default TafseerAyat

const styles = StyleSheet.create({
    testStyle:{fontSize:SC(19), lineHeight:HP('5'),color:"black", fontWeight:'400',writingDirection:"rtl"
    }
})
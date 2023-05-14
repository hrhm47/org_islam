import {StyleSheet, Text, View,TouchableOpacity,FlatList, ActivityIndicator,Image, ScrollView} from 'react-native';
import React,{useEffect,useState} from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons'
import {widthPercentageToDP as WP,heightPercentageToDP as HP, scale as SC} from '../../../utills/pixelratio'
import { useNavigation,useIsFocused } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { PARAS } from '../../../utills/data/paraNames/ParaNames';

const Para_Juz = ({route}) => {
    const navigation=useNavigation();
    const isFocused=useIsFocused();
    const [internetIsSlow,setInternetIsSlow]=useState(false);
    const [setOfAya,setSetOfAya]=useState(null);
    const {juz}=route.params;
    const [selectColor,setSelectColor]=useState(null);
    // declaring states for juz data
    const [juzData,setJuzData]=useState(null);
    let b;

    useEffect(()=>{
        getJuzData()
    },[isFocused])

    // fetcing data from api
    const getJuzData=()=>{
        GetAsyncData().then((data)=>{
            if (data===null){
                fetch('https://api.alquran.cloud/v1/juz/'+juz+'/quran-uthmani')
                .then(res=>res.json())
                .then(async(data)=>{
                    setJuzData(data.data.ayahs);                   
                    await AsyncStorage.setItem(juz.toString(),JSON.stringify(data.data.ayahs));
                })
                .catch(err=>console.log("err",err))
            }
            else{
                b=data;
                setJuzData(data)
            }
        })
        
    }

    // fetching data from asyncStorage
    const GetAsyncData=async()=>{
        // console.log("at async");
        const ayaData= JSON.parse(await AsyncStorage.getItem(juz.toString()));
        // console.log("ayaData",ayaData);
        return ayaData;
        // setJuzData(ayaData?ayaData:null)
     }

     // calculate time for slow internet
     const calculateTime=()=>{
        console.log("calculating time");
        setInterval(()=>{
            setInternetIsSlow(true)
        },1000)
     }

     // changing color
     const changeColor=(number,index)=>{
        if (number===index){
            setSelectColor(true)
        }
        console.log("number",number,"index",index);
     }


  return (
    <View style={styles.container}>
      <View style={styles.heading}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Home')
          }}
            style={{width:WP('10'),height:HP('5'),justifyContent:'center',paddingLeft:WP('2')}} 
          >
          <Icon name="arrow-back-ios" size={30} color="white" />
        </TouchableOpacity>
        <Text style={styles.headText}>{PARAS[juz-1].name}</Text>
          <Icon name='list' size={30} color='transparent' style={{marginLeft:10}}/>
      </View>
      <View style={{flex:1,backgroundColor:"#ffffff",alignSelf:"center",justifyContent:"center"}}>
        <Image source={require('../images/bismillah.png')} style={{width:WP('95'),height:HP('8'),marginBottom:HP('1.5'),marginTop:HP('1'),alignSelf:"center"}}  resizeMode='stretch'/>
        
      
        {juzData? 
        <ScrollView style={styles.scroll}>
        <Text style={styles.surahPage} adjustsFontSizeToFit >
          {juzData &&
            juzData.map((ayat, index) => (
                // <TouchableOpacity onPress={()=>console.log(index)}>
              <Text key={index} allowFontScaling={false} selectable={true} style={{}} onPress={()=>{setSelectColor(index);console.log(index); }}>
                <Text selectable={true} style={[styles.ayat,{color:index===selectColor? "blue": "black"}]}>
                  {ayat.text+"\b"}
                </Text>
                {/* <Text style={styles.number}>&#1757;{"\b"}</Text> */}
                <Text style={[styles.number,{color:index===selectColor? "blue": "black"}]}>{"\u{FD3F}"+(index+1)+"\u{FD3E}"+"\b"}</Text>
              </Text>
                // </TouchableOpacity>
            ))}
        </Text>
      </ScrollView>
          
        // <ScrollView>
                
        // <FlatList
        //     data={juzData}
        //     key={(item)=>item.number}
        //     renderItem={({item})=>{
        //         return(

        //             <Text style={{}} adjustsFontSizeToFit>
        //                 <Text style={{fontSize:30,color:"#000",writingDirection:"rtl"}} allowFontScaling={false} selectable={true}>

        //                  <Text selectable={true}>{item.text}</Text>
        //                 <Text>{" \u{FD3F}"+item.number+"\u{FD3E}"}</Text>
        //                 </Text>
                        
        //             </Text>
        //         )
        //     }}
            // horizontal={true}
            
        //     style={{flex:1, backgroundColor:"red",flexWrap:"wrap",padding:10,}}

        //     // ItemSeparatorComponent={()=><View style={{width:WP('1')}}><Text></Text></View>}
        // />
        : 
        <View style={{flex:1, justifyContent:"center", alignItems:"center"}}>
            <ActivityIndicator size={30} color={'blue'} />
            {internetIsSlow?<Text>Internet Is Slow.....</Text>:<Text>Data Fetching.....</Text>
            }    
        </View>
        
        }
      </View>
      <View style={{flex:1/8, backgroundColor:"red"}}>
        <Text style={{fontSize:30}}>AUDIO PLAYER</Text>
      </View>
    </View>
  );
};

export default Para_Juz;

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
        justifyContent:'space-around',
        marginBottom:HP('1')
    }, 
    headText:{

        fontSize:SC(25),
        fontWeight:'bold',
        justifyContent:'space-evenly',
        fontFamily:'serif',
        color:"white",
        marginLeft:WP('5'),
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
        fontSize:SC(23),
        // flexWrap:"wrap",
        lineHeight:HP('5'),
        // backgroundColor:"red",
        paddingRight:WP('1'),
        paddingLeft:WP('3'),
        textAlign: "justify",
        fontWeight:"600"
      },
    
      ayat: {
      },
    
      number: {
        fontSize: SC(18),
        
      },
      selectedText: {
        color: 'blue',
      },
      normalText: {
        color: 'black',
      },
});

import { StyleSheet, Text, View, ScrollView, Button,Image,TouchableOpacity,SafeAreaView,Platform,StatusBar, FlatList  } from 'react-native'
import React, {useState, useEffect} from 'react'
import { Table, TableWrapper, Row, Col } from 'react-native-table-component';
import {useIsFocused} from '@react-navigation/native';
// import Salah_Times from './Salah_Times';
 import axios from 'axios';
 import NetInfo from "@react-native-community/netinfo";
import AsyncStorage from '@react-native-async-storage/async-storage';
// import { StatusBar } from 'expo-status-bar';



export default function Monthly_Timings({route,navigation}) {



  const { location, methodvalue } = route.params;
  // let location;
  const [times,setTimes] = useState({});
  const[isready,setIsready] = useState(false);
  const [tabledata,setTabledata]=useState([[]]);
  const isFocused = useIsFocused();
  const tableData =[[]];

  // const {location, setLocation} = useState(itemId);         //get currrent location

useEffect(() => {

let lat,lng;
let mm= new Date().getMonth()+1;
  NetInfo.fetch().then(async(state) => {
  if(state.isConnected==true){

  
  (async()=>{
    try{
      const data=JSON.parse(await AsyncStorage.getItem('locationCoor'));
      lat=data[0];
      lng=data[1];
    }catch(err){
      
    }
    // console.log("method value is ",methodvalue," with lat and longitudeq",lat,lng);
    axios
    .get(
      "https://api.aladhan.com/v1/calendar?latitude=" +
         lat+
        "&longitude=" +
        lng+
        "&method=" +
        methodvalue +
        "&month=" +
        mm 
        ).then( async function (response) {
          
          var tt=(response.data["data"]);
          // setTimes(tt);
          // console.log(tt);
          // await AsyncStorage.setItem("monthly_timings", JSON.stringify(tt));
          // console.log(JSON.parse(await AsyncStorage.getItem("apiData")));
          // console.log(response.data["data"][0]["timings"]," data");
          // console.log(tt.length);
          // setIsready[true];
          for (let i = 0; i <tt.length; i++) {
            // console.log(tt[i]["timings"]," called");
            const rowData = [];
            rowData[0]=(i+1)+" "+(months[new Date().getMonth()]);
            // for (let j = 1; j < 2; j += 1) {
              rowData[1]=tt[i]["timings"].Fajr.split('(')[0];
              rowData[2]=tt[i]["timings"].Sunrise.split('(')[0];
              rowData[3]=tt[i]["timings"].Dhuhr.split('(')[0];
              rowData[4]=tt[i]["timings"].Asr.split('(')[0];
              rowData[5]=tt[i]["timings"].Sunset.split('(')[0];
              rowData[6]=tt[i]["timings"].Maghrib.split('(')[0];
              rowData[7]=tt[i]["timings"].Isha.split('(')[0];
              tableData.push(rowData);
            }
            // console.log(tableData," rowData");
            setTabledata(tableData);
    })
        
    })();  
  }   
  else{

    tt= JSON.parse(await AsyncStorage.getItem("apiData"));
    tt=tt.data["data"];
    // setTimes(tt);
    for (let i = 0; i <tt.length; i++) {
      // console.log(tt[i]["timings"]," called");
      const rowData = [];
      rowData[0]=(i+1)+" "+(months[new Date().getMonth()]);
      // for (let j = 1; j < 2; j += 1) {
        rowData[1]=tt[i]["timings"].Fajr.split('(')[0];
        rowData[2]=tt[i]["timings"].Sunrise.split('(')[0];
        rowData[3]=tt[i]["timings"].Dhuhr.split('(')[0];
        rowData[4]=tt[i]["timings"].Asr.split('(')[0];
        rowData[5]=tt[i]["timings"].Sunset.split('(')[0];
        rowData[6]=tt[i]["timings"].Maghrib.split('(')[0];
        rowData[7]=tt[i]["timings"].Isha.split('(')[0];
        tableData.push(rowData);
      }
      // console.log(tableData," rowData");
      setTabledata(tableData);
  }
})

},[tableData]);

  useEffect(() => {
 
  },[isready]);


  const state = {
    tableHead: ['Date','Fajr', 'Sunrise', 'Zohr', 'Asr', 'Sunset' ,'Maghrib', 'Isha'],
    // tableTitle: ['Row', 'Row 2', 'Row 3', 'Row 4', 'Row 5', 'Row 6', 'Row 7', 'Row 8', 'Row 9', 'Row 10'],
    widthArr: [100, 100, 100, 100, 100, 100, 100, 100],
    
  };

    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
  return (

    <>
    <StatusBar backgroundColor='#104586' style='auto'  ></StatusBar>
      <SafeAreaView style={{flex:1,backgroundColor:"#104586"}}>

        {/* topbar */}
    <View style={{width:"100%", 
    // backgroundColor:"#104586",
    height: Platform.OS === 'ios' ? '8%' : '9%',
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.6,
    elevation:45,
    flexDirection:"row",
    justifyContent:"space-between",
    alignItems:"center",
    padding:15,
        // paddingTop:Platform.OS === 'ios' ? null : '10%',
     }}>
        <TouchableOpacity onPress={()=>navigation.goBack()}>
        <Image source={require('./images/back.png')} style={{width:30,height:30, tintColor:"white"}}></Image>
        </TouchableOpacity>
      <Text style={{fontWeight:"bold",fontSize:22,fontFamily: Platform.OS === 'ios' ? 'AvenirNext-DemiBold' : 'monospace', letterSpacing: Platform.OS === 'ios' ? 2: null, color:"white" 
     }}>Salah Times</Text>
     <TouchableOpacity >
        <Image source={{}} style={{width:30,height:30}}></Image>
     </TouchableOpacity>
     </View>



    <View style={styles.container}>
      <Text style={styles.month}>Monthly Prayers Timings for</Text>
      <Text style={[styles.month,{fontStyle:"italic", fontSize:16, color:"#104586",fontFamily: Platform.OS === 'ios' ? 'AvenirNext-DemiBold' : 'monospace', letterSpacing: Platform.OS === 'ios' ? 2: null}]}> {location[0]}, {location[1]}</Text>
      <View style={{ shadowColor: 'white',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.6,
     elevation:45,top:4}}>
        <Text style={{justifyContent:'center', fontSize:20,fontWeight:'bold',backgroundColor:'#ffffff',color:'#104586', textAlign:"center",fontFamily: Platform.OS === 'ios' ? 'AvenirNext-DemiBold' : 'monospace', letterSpacing: Platform.OS === 'ios' ? 2: null}}>Upcoming 30 Days Salah Timings for </Text>
        <Text style={{justifyContent:'center', fontSize:20,fontWeight:'bold',backgroundColor:'#ffffff',color:'#ffffff', textAlign:"center",fontFamily: Platform.OS === 'ios' ? 'AvenirNext-DemiBold' : 'monospace', letterSpacing: Platform.OS === 'ios' ? 2: null}}> {months[new Date().getMonth()]}, {new Date().getFullYear()} </Text>
        

      </View>
    <ScrollView horizontal={true} >
        <Table borderStyle={{borderWidth: 1, borderColor: '#104586'}} >
          <Row data={state.tableHead} widthArr={state.widthArr} style={styles.header} textStyle={{color:"#fff", textAlign:"center", fontWeight:"bold", fontSize:18}} />
        <ScrollView >
          {/* <TableWrapper style={styles.wrapper}> */}
          <Col
            data={state.tableTitle}
            style={styles.title}
            heightArr={[30, 30]}
            
            textStyle={styles.text}
          /> 
             {
               tabledata.map((rowData, index) => (
                 <Row
                  key={index}
                  data={rowData}
                  height={20}
                  widthArr={state.widthArr}
                  style={[styles.row, index%2 && {backgroundColor: 'lightgrey', color:'black'}]}
                  textStyle={styles.text}
                />
                ))
              }  
          {/* </Table> */}
          {/* </TableWrapper> */}
        </ScrollView>
        </Table>
              </ScrollView >
  </View>
  
  </SafeAreaView>
    </>
  )
}


const styles = StyleSheet.create({
  container: { flex: 1,top:5,paddingTop: 8, backgroundColor: 'white'},
  month:{justifyContent: 'center',textAlign:'center',  fontSize: 20, fontWeight: 'bold',margin:2,fontFamily: Platform.OS === 'ios' ? 'AvenirNext-DemiBold' : 'monospace', letterSpacing: Platform.OS === 'ios' ? 2: null, color:"#104586"},
  header: { height: 50,fontSize:35, fontWeight: '900',backgroundColor:'#004C9B',padding:10,color:"#fff" },
  title: { backgroundColor:"#fff" },
  text: { textAlign: 'center', color:"black",fontSize:15,backgroundColor:"white"},
  dataWrapper: { marginTop: -1 },
  row: { height: 40,justifyContent:"center", alignItems:"center",backgroundColor:"white" },
  
  
})

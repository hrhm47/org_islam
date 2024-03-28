


import { StatusBar } from "expo-status-bar";
import React, { useState,useEffect,useContext } from "react";
import { Alert, StyleSheet, Text, View,ActivityIndicator } from "react-native";
import ProgressCircle from 'react-native-progress-circle'
import { useIsFocused } from "@react-navigation/native";
import { ChartsContext } from "../../../contextApi/ApiProvider";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import moment from "moment";
import AsyncStorage from "@react-native-async-storage/async-storage";
export default function Streaks() {
  // const [count, setCount] = useState(0);
  const isFocused = useIsFocused();
  const {countstreak,today,calculatestreak,setCalculatestreak,streakstartdate,setStreakstartdate,last4months,setCountstreak}=useContext(ChartsContext);
  const [isready,setIsready]=useState(false);
  // const[streakdate,setStreakdate]=useState(0);
  
  
  useEffect(()=>{
  //  console.log("useEffect",last4months);
  
  },[isFocused]);


const longeststreakdates=[];


useEffect(()=>{
  // use of isFocused to avoid dual call of fucntion when component is not focused
  if (isFocused){
  const longestrange=async()=>{
    try {
      let monthname=last4months;
      let count=0;
      for (let i = 0; i <monthname.length; i++) {
        try {
          let localvalue=JSON.parse(await AsyncStorage.getItem(monthname[i]));
          if(localvalue!=null){
            if (((localvalue.fjrind == true)|| (localvalue.fjrcong == true)) &&
            ((localvalue.dhrind == true) || (localvalue.dhrcong == true)) &&
            ((localvalue.asrind == true) || (localvalue.asrcong == true)) &&
            ((localvalue.maghribind == true) || (localvalue.maghribcong == true)) &&
            ((localvalue.ishaind == true) || (localvalue.ishacong == true))){
              count=count+1;
              if (count>=1){
                longeststreakdates.push(monthname[i]);
              }
            }
            else{
                longeststreakdates=[];
                count=0;
            }
          }
        } catch (error) {
          
        }
      }
// this function is for calculating daily streak before the current date
      async function dailyStreak(){
        let temp=0;
        let longest=0;
        const tempdates=[];
          // try {
    
    
            for (let i = 0; i <last4months.length-1; i++) {
              try{
                  if (longeststreakdates.includes(last4months[i])){
                        tempdates.push(last4months[i]);
                        temp=tempdates.length;
                      }
                      else{
                        temp=0;
                        tempdates.length=0;
                        // setCountstreak(0);
                      }
                    }catch(error){
                    }
                  }
                  
                  //  this some lines is for adding the current day to the streak if it is true then +1 else the previous streak will be same 
                  try {
                    const currentdata=JSON.parse(await AsyncStorage.getItem(last4months[last4months.length-1]));
                    if (currentdata!==null){
                      if (((currentdata.fjrind == true)|| (currentdata.fjrcong == true)) &&
                      ((currentdata.dhrind == true) || (currentdata.dhrcong == true)) &&
                      ((currentdata.asrind == true) || (currentdata.asrcong == true)) &&
                      ((currentdata.maghribind == true) || (currentdata.maghribcong == true)) &&
                      ((currentdata.ishaind == true) || (currentdata.ishacong == true))){
                        // setCountstreak(prev=>prev+1);
                        temp=temp+1;
                      }
                    }
                  } catch (error) {
                    
                  }
                  // console.log("temp value ",temp);
                  setCountstreak(temp)
      }
      dailyStreak();

    

// this is for longest streak
      // console.log(longeststreakdates);
      let temp=0;
      let longest=0;
      const tempdates=[];
      let s_date=monthname[0];
      let e_date=monthname[0];
      for (let i = 0; i <=monthname.length; i++) {
        try{
            if (longeststreakdates.includes(monthname[i])){
                  tempdates.push(monthname[i]);
                  temp=tempdates.length;
                }
                else{
                  if(temp>=longest){
                    longest=temp;
                     await AsyncStorage.setItem("longeststreakdates",JSON.stringify(tempdates));
                  }
                  temp=0;
                  tempdates.length=0;
                }
              }catch(error){
              }
            }
            const datesvalue=JSON.parse(await AsyncStorage.getItem("longeststreakdates"));
            setCalculatestreak(longest);
            if (datesvalue!=null){
              setStreakstartdate(datesvalue);
            }
          
        
      } catch (error) {
      
    }
   
  }
    
    longestrange();
    setIsready(true)
  }
    },[isFocused])
  return (
    <View style={styles.container}>
      <Text style={[styles.headerText,{color:"#104586"}]}>DAILY STREAK</Text>
      <ProgressCircle
      
        percent={isready?(countstreak>0?countstreak:0) :<ActivityIndicator/>}
        radius={100}
        borderWidth={18}
        color="#104586"
        shadowColor="grey"
        // bgColor="#164B79"
        bgColor="#fff"
      >
         <Text style={styles.streakCounter}>{countstreak>0?countstreak:0}</Text> 
      </ProgressCircle>
      <View style={styles.streakView}>

      <Text style={[styles.streakText,styles.streakHeader]}>Longest Streak ({calculatestreak?calculatestreak:`0`})</Text>
      {calculatestreak>0?  
      <>
      <Text style={[styles.streakText,styles.startingEndingDate]}> { setStreakstartdate? streakstartdate[0]:<ActivityIndicator/>}</Text>

      <Text style={[styles.streakText,styles.to]}> { setStreakstartdate? `to`:<ActivityIndicator/>}</Text>

      <Text style={[styles.streakText,styles.streakText,styles.startingEndingDate]}> {setStreakstartdate?streakstartdate[streakstartdate.length-1]:<ActivityIndicator/>}</Text>
      </>
      : null} 
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "#FFF8EB",
    backgroundColor: "#fff",
  },
  headerText: {
    fontSize: RFValue(23,680),
    textAlign: "center",
    margin: 12,
    fontWeight: "bold",
    color:"navy",
    
  },
  streakCounter:{
    fontSize: RFValue(22,680),fontWeight:"bold",
    textAlign:"center",backgroundColor:"#273B69",borderRadius:60/2,padding:11,width:60,height:60,color:"whitesmoke" , alignSelf:"center", justifyContent:"center"
  },
  streakView:{
    backgroundColor:"#104586",borderRadius:30,top:10,width:wp("90%"),height:hp("35%")
  },
  streakText:{
    fontSize: RFValue(20,680),
    textAlign: "center",
    margin: 10,
    // fontWeight: "bold",
    color:"#104586",
    // backgroundColor:"white"
    justifyContent:"center",
    alignSelf:"center"
  },
  streakHeader:{
    color:"white",letterSpacing:1,fontSize:RFValue(19,680),fontFamily:"monospace",textAlign:"center",fontWeight:"bold"
  },
  startingEndingDate:{
    color:"whitesmoke",letterSpacing:1,margin:0
  },
  to:{
    color:"whitesmoke",margin:5,letterSpacing:1
  }

});
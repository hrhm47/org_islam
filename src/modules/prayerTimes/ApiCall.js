



import {
    StyleSheet,RefreshControl,Text,View,SafeAreaView,Platform,Image,TouchableOpacity,ImageBackground,ScrollView,Alert,StatusBar,ActivityIndicator,AppState, Button, PermissionsAndroid,BackHandler
  } from "react-native";
  import NetInfo from "@react-native-community/netinfo";
  import React, { useState, useEffect, useMemo, useContext, useRef } from "react";
  import moment from "moment";
  import { useFocusEffect, useIsFocused } from "@react-navigation/native";
  import CountDown from "react-native-countdown-component";
  // import { MyContext } from "./Global/MyContext";
  import AsyncStorage from "@react-native-async-storage/async-storage";

  import RNLocation from 'react-native-location';
import notifee,{TimestampTrigger,TriggerType, TimeUnit,TriggerNotification,Trigger, EventType,IntervalTrigger, RepeatFrequency,AndroidImportance,AndroidDefaults, AndroidGroupAlertBehavior} from '@notifee/react-native';
import axios from "axios";
import BackgroundTimer from 'react-native-background-timer';
// import 'react-native-simple-local-storage';
import { Linking } from "react-native";
// import RNSettings from 'react-native-settings';
import Geolocation from 'react-native-geolocation-service';
// import RNSettings from "react-native-settings";
  export default function SalahTimes({ navigation }) {
    let fjrhours,fjrmint,fjrscds;
    let dhrhours,dhrmint,dhrscds;
    let asrhours,asrmint,asrscds;
    let mghhours,mghmint,mghscds;
    let ishours,ishmint,ishscds;
    const isFocused = useIsFocused();
    const [isready, setIsready] = useState(false);
  
    // alarms for Salahs
    const [Fjralarm, setFjrAlarm] = useState(true);
    const [Zuhralarm, setZuhrAlarm] = useState(true);
    const [Asralarm, setAsrAlarm] = useState(true);
    const [Maghribalarm, setMaghribAlarm] = useState(true);
    const [Ishaalarm, setIshrAlarm] = useState(true);
    const [obj,setObj] = useState(null);
  
    const [refreshing, setRefreshing] = useState(false);
    const [location, setLocation] = useState([]); //   current location
    const [times, setTimes] = useState({}); //   salah times
    const [times1, setTimes1] = useState({}); //   salah times
    const [remr, setRemr] = useState([]); //   remianing time
    // const { remtime, setRemtime, latlang, setLantlang } = useContext(MyContext);
    const [latlang, setLantlang]=useState("");
    const [remtime, setRemtime]=useState(0);
    const [noInternet, setNoInternet] = useState(false);
    const [methodvalue, setMethodvalue] = useState(2);
    const [alaramready,setAlaramready]=useState();
    // const [dd,setDD]=useState(new Date().getDate());
    const appstate=useRef(AppState.currentState);
    const [refreshme,setRefreshme]=useState(false);

    useEffect(()=>{
      // getData()
     
      AppState.addEventListener("change",_handleAppStateChange);
      BackHandler.addEventListener``
      
      
      return()=>{
        AppState.addEventListener("change",_handleAppStateChange);
      }
    },[])

    
    const _handleAppStateChange=(nextAppState)=>{
       if (appstate.current.match(/inactive|background/) && nextAppState==='active'){
        BackgroundTimer.stopBackgroundTimer();
        // setAlaramready(true);
    }
        appstate.current=nextAppState;
    
    if (appstate.current==='background'){
    console.log("==== App is in Background Mode ====");
    
    BackgroundTimer.runBackgroundTimer(async()=>{
      // (async()=>{
        var today = new Date();
      var dd = String(today.getDate()).padStart(2, "0");
      var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
      var yyyy = today.getFullYear();
      today = dd + "-" + mm + "-" + yyyy;
      // console.log("date is ",today);
      
      const data=JSON.parse(await AsyncStorage.getItem(today));
      let fjr=JSON.parse(await AsyncStorage.getItem("fjr-alarm"));
      let dhr=JSON.parse(await AsyncStorage.getItem("dhr-alarm"));
      let asr=JSON.parse(await AsyncStorage.getItem("asr-alarm"));
      let mgh=JSON.parse(await AsyncStorage.getItem("mgh-alarm"));
      let ish=JSON.parse(await AsyncStorage.getItem("ish-alarm"));
      // console.log("value of Dhuhr Alram is ->",dhr.Dhuhr);
      // console.log("value of Fajr Alram is ->",fjr.Fajr);
      // console.log("value of Asr Alram is ->",asr.Asr);
      // console.log("value of Maghrib Alram is ->",mgh.Maghrib);
      // console.log("value of Isha Alram is ->",ish.Isha);
      if (fjr.Fajr===true){
        updatethefjr(data.Fajr);
      }
      if (dhr.Dhuhr===true){
        updatethedhr(data.Dhuhr);
      }
      if (asr.Asr===true){
        updatetheasr(data.Asr);
      }
      if (mgh.Maghrib===true){
        updatethemgh(data.Maghrib);
      }
      if (ish.Isha===true){
        updatetheish(data.Isha);
      }
          },1000);
        }


        // forground mode
        if (appstate.current==='active'){
          BackgroundTimer.stopBackgroundTimer();
          setRefreshme(true);
          setTimeout(async()=>{
            try {
              BackgroundTimer.stopBackgroundTimer();
              
            } catch (error) {
              
            }
          },1000);
        }
      }
async function checkNotificationPermission() {
  const settings = await notifee.getNotificationSettings();
// console.log(settings.authorizationStatus);
  if (settings.authorizationStatus == 1) {
    // console.log('Notification permissions has been authorized');
  } else if (settings.authorizationStatus == 0) {
    Alert.alert("OPEN NOTIFICATIONS","Notification permissions has been denied", [
      {
        text: "No",
        onPress: () => console.log("Cancel Pressed"),
      },
      { text: "Yes", onPress: () => notifee.openNotificationSettings() }
    ]);
  }
}

// ===================== update functions that will update the notifications in background =====================
// =========== FAJR UPDATED FUNCTION ===========
async function updatethefjr(fjrtime){
  let channelId;
  channelId = await notifee.createChannel({
    id: 'fajr',
    name: 'fajr Channel',
    importance: AndroidImportance.HIGH,
    sound:'adhan',
    // visibility: AndroidVisibility.PUBLIC,
    
  });
  const date = new Date(Date.now());

  date.setHours(fjrtime[1]);
  date.setMinutes(fjrtime[3]+fjrtime[4])
  date.setSeconds(0);
  const trigger = {
    type: TriggerType.TIMESTAMP,
    timestamp: date.getTime(), // fire at 11:10am (10 minutes before meeting)
    alarmManager: true, // use Android AlarmManager instead of default JobScheduler
    // repeatFrequency:RepeatFrequency.DAILY,
  };
  const notification={
    id:"fajr",
      title: 'myIslam.org',
      body: 'Fajr SalahTime ',
      android: {
        channelId,
        palysound:true,
        sound:'adhan',
        timestamp:date.getTime()
      }
  }
    try {
  await notifee.createTriggerNotification(notification,trigger);
    } catch (error) {
  }
}
// updata the dhr time in notifications
async function updatethedhr(dhrtime){
  let channelId;
  // this false is actually according to the condition of the alarm image.
  channelId = await notifee.createChannel({
    id: 'dhr',
    name: 'dhr Channel',
    sound:'adhan',
    importance: AndroidImportance.HIGH,

  });
 const date = new Date(Date.now());
 date.setHours(dhrtime[0]+dhrtime[1]);
 date.setMinutes(dhrtime[3]+dhrtime[4]);
 date.setSeconds(0);

 const trigger = {
   type: TriggerType.TIMESTAMP,
   timestamp: date.getTime(), // fire at 11:10am (10 minutes before meeting)
   alarmManager: true, // use Android AlarmManager instead of default JobScheduler
   repeatFrequency:RepeatFrequency.DAILY,
 };
 const notification={
  id:"dhr",
   title: 'myIslam.org',
   body: 'Dhuhr SalahTime ',
     android: {
       channelId,
       sound:'adhan',
       palysound:true, 
       timestamp:date.getTime()
     }
  }
    try {
    await notifee.createTriggerNotification(notification,trigger)
      } catch (error) {
  }
}

// ================= asr 
async function updatetheasr(asrtime){
  let channelId;
  channelId = await notifee.createChannel({
    id: 'asr',
    name: 'asr Channel',
    sound:'adhan',
    importance: AndroidImportance.HIGH,

  });
  const date = new Date(Date.now());
  date.setHours(asrtime[0]+asrtime[1]);
  date.setMinutes(asrtime[3]+asrtime[4])
  date.setSeconds(0);

  // Create a time-based trigger
  // const trigger=new TimestampTrigger();
  const trigger = {
    type: TriggerType.TIMESTAMP,
    timestamp: date.getTime(), // fire at 11:10am (10 minutes before meeting)
    alarmManager: true, // use Android AlarmManager instead of default JobScheduler
    repeatFrequency:RepeatFrequency.DAILY,
  };
  const notification={
    id:'asr',
    title: 'myIslam.org',
    body: 'Asr SalahTime ',
      android: {
        channelId,
        sound:'adhan',
        palysound:true,
        timestamp:date.getTime()
      }
  }
  try {
  await notifee.createTriggerNotification(notification,trigger);
    } catch (error) {
  }
}

// ================== maghirb
async function updatethemgh(mghtime){
  let channelId;
  channelId = await notifee.createChannel({
    id: 'mgh',
    name: 'mgh Channel',
    sound:'adhan',
    importance: AndroidImportance.HIGH,

  });
  const date = new Date(Date.now());
  date.setHours(mghtime[0]+mghtime[1]);
  date.setMinutes(mghtime[3]+mghtime[4])
  date.setSeconds(0);

  // Create a time-based trigger
  // const trigger=new TimestampTrigger();
  const trigger = {
    type: TriggerType.TIMESTAMP,
    timestamp: date.getTime(), // fire at 11:10am (10 minutes before meeting)
    alarmManager: true, // use Android AlarmManager instead of default JobScheduler
    repeatFrequency:RepeatFrequency.DAILY,
  };
  const notification={
   id:'mgh',
    title: 'myIslam.org',
    body: 'Maghrib SalahTime ',
      android: {
        channelId,
        sound:'adhan',
        palysound:true,
        timestamp:date.getTime()
      }
  }
  try {
    await notifee.createTriggerNotification(notification,trigger)
    } catch (error) {
  }
}

//=============  isha
async function updatetheish(ishtime){
  let channelId;
  channelId = await notifee.createChannel({
    id: 'ish',
    name: 'ish Channel',
    sound:'adhan',
    importance: AndroidImportance.HIGH,

  });
  const date = new Date(Date.now());
  date.setHours(ishtime[0]+ishtime[1]);
  date.setMinutes(ishtime[3]+ishtime[4])
  date.setSeconds(0);
  const trigger = {
    type: TriggerType.TIMESTAMP,
    timestamp: date.getTime(), // fire at 11:10am (10 minutes before meeting)
    alarmManager: true, // use Android AlarmManager instead of default JobScheduler
    repeatFrequency:RepeatFrequency.DAILY,
  };
  const notification={
   id:'ish',
    title: 'myIslam.org',
    body: 'Isha SalahTime ',
      android: {
        channelId,
        sound:'adhan',
        palysound:true,
        timestamp:date.getTime()
      }
  }
  try {
    await notifee.createTriggerNotification(notification,trigger)
      } catch (error) {
    }
  }




    const wait = (timeout) => {
      return new Promise((resolve) => setTimeout(resolve, timeout));
    };
    
  
    //  checkinternet connectivity
   
    let rem = 0;
    let apiData;
    let apiobj;
    let localdata;
    useEffect(() => {
      
     
      let lat, lng,granted=false,countryname;
      checkNotificationPermission();
      getData();
      // console.log("at Home Screen");
      const unsubscribe = navigation.addListener('focus', () => {
        NetInfo.fetch().then(async(state) => {
          if (state.isConnected==true) {
      ( () => {
        RNLocation.requestPermission({
          ios: "whenInUse",
          android: {
            detail: "coarse"
          }
        })
        .then(granted => {
            if (granted) {
                
              if (PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION))
               {
                // Geolocation.requestAuthorization()
                Geolocation.getCurrentPosition(async(position) => {
                  lat = position.coords.latitude;
                      lng = position.coords.longitude;
                      await AsyncStorage.setItem("locationCoor",JSON.stringify([position.coords.latitude, position.coords.longitude]));
                      getLocationC(position.coords.latitude, position.coords.longitude).then(async(res)=>{
                        let nam=getFirstAndLastWords(res.data.display_name);
                        console.log("location that im geting-> ",nam.split(",")[0],nam.split(" ")[1]);
                        setLocation([nam.split(",")[0],nam.split(" ")[1]]);
                        // countryname=nam.split(" ")[1];
                        await AsyncStorage.setItem("countryname",JSON.stringify([nam.split(",")[0],nam.split(" ")[1]]))
                        })
                        if (JSON.parse(await AsyncStorage.getItem("countrycheckvalue"))==null){
                          
                        }
                        apifetch(lat,lng);
                
                },(error) => {
                  (async()=>{
                    // alert("locations is still of")
                    const loct=JSON.parse(await AsyncStorage.getItem("locationCoor"));
                    // console.log("location that im geting-> ",loct);
                    (loct!=null) 
                      // Alert.alert("location is off")
                      let cname=JSON.parse(await AsyncStorage.getItem("countryname"));
                      setLocation(cname); 
                      let dd = new Date().getDate();
                  // Alert.alert("No Internet Connection");
                  let res=JSON.parse(await AsyncStorage.getItem("apiData"));
                  // console.log("res",res);
                  apiData=res.data.data[dd-1].timings;
                  // console.log("location name",cname);
                  apiobj = {
                    Fajr: formatDate(apiData.Fajr).split("(")[0],
                    Sunrise: formatDate(apiData.Sunrise).split("(")[0],
                    Dhuhr: formatDate(apiData.Dhuhr).split("(")[0],
                    Asr: formatDate(apiData.Asr).split("(")[0],
                    Sunset: formatDate(apiData.Sunset).split("(")[0],
                    Maghrib: formatDate(apiData.Maghrib).split("(")[0],
                    Isha: formatDate(apiData.Isha).split("(")[0],
                  };
                  // console.log("apiobj",apiobj);
                  setTimes(apiobj);
                  // console.log("times ->",times);
                  setIsready(true);
                  settimer();
                  // setNoInternet(true);
})();})
              }}
            
        })
        .finally(()=>{
              (async()=>{
                // alert("locations is still of")
                const loct=JSON.parse(await AsyncStorage.getItem("locationCoor"));
                // console.log("location that im geting-> ",loct);
                (loct!=null) 
                  // Alert.alert("location is off")
                  let cname=JSON.parse(await AsyncStorage.getItem("countryname"));
                  // setLocation(cname); 
                  let dd = new Date().getDate();
              // Alert.alert("No Internet Connection");
              let res=JSON.parse(await AsyncStorage.getItem("apiData"));
              apiData=res.data.data[dd-1].timings;
              // console.log("location name",cname);
              apiobj = {
                Fajr: formatDate(apiData.Fajr).split("(")[0],
                Sunrise: formatDate(apiData.Sunrise).split("(")[0],
                Dhuhr: formatDate(apiData.Dhuhr).split("(")[0],
                Asr: formatDate(apiData.Asr).split("(")[0],
                Sunset: formatDate(apiData.Sunset).split("(")[0],
                Maghrib: formatDate(apiData.Maghrib).split("(")[0],
                Isha: formatDate(apiData.Isha).split("(")[0],
              };
              // console.log("apiobj",apiobj);
              setTimes(apiobj);
              // console.log("times ->",times);
              setIsready(true);
              settimer();
              // setNoInternet(true);
})()
            })   
          })(); 
        }
        else{
          let dd=new Date().getDate();
          let res=JSON.parse(await AsyncStorage.getItem("apiData"));
          apiData=res.data.data[dd-1].timings;
          let cname=JSON.parse(await AsyncStorage.getItem("countryname"));
          setLocation(cname);
          apiobj = {
            Fajr: formatDate(apiData.Fajr).split("(")[0],
            Sunrise: formatDate(apiData.Sunrise).split("(")[0],
            Dhuhr: formatDate(apiData.Dhuhr).split("(")[0],
            Asr: formatDate(apiData.Asr).split("(")[0],
            Sunset: formatDate(apiData.Sunset).split("(")[0],
            Maghrib: formatDate(apiData.Maghrib).split("(")[0],
            Isha: formatDate(apiData.Isha).split("(")[0],
          };
          // console.log("apiobj",apiobj);
          setTimes(apiobj);
          // console.log("times ->",times);
          setIsready(true);
          settimer();
          setNoInternet(true);

        }
      })
    });
    return unsubscribe;
    }, [isFocused, refreshing,methodvalue,noInternet]);
  
    function getFirstAndLastWords(text) {
      var text_arr = text.split(" ");
      return text_arr[0] + " " + text_arr[text_arr.length-1];
    }
    // this function checks for the first time if its value is === null else it will not run
    async function checkingCountryMethodFirstTime(country){
      // const boolvalue=JSON.parse(await AsyncStorage.getItem("boolvalue"));
      // if(boolvalue==null){
        // console.log("is im called even?");
      const method5 = ["africa", "syria", "iraq", "lebanon", "malaysia"];
      const method2 = ["canada", "united states"];
      const method12 = ["france"];
      const method11 = ["singapore"];
      const method1 = ["pakistan", "india", "bangladesh", "afghanistan"];
      let mvalue;
      if (method5.includes(country.toLowerCase())) {
        mvalue = 5;
      } else if (method2.includes(country.toLowerCase())) {
        mvalue = 2;
        //   console.log("in unnited states");
      } else if (method12.includes(country.toLowerCase())) {
        mvalue = 12;
      } else if (method11.includes(country.toLowerCase())) {
        mvalue = 11;
      } else if (method1.includes(country.toLowerCase())) {
        //   console.log("in pakistan");
        mvalue = 1;
      } else {
        mvalue = 2;
      }
      await AsyncStorage.setItem("method",JSON.stringify(mvalue));
      await AsyncStorage.setItem("countrycheckvalue",JSON.stringify(true));
  };

    // this function returns the country name and village name
    async function getLocationC(lat, lon) {
      // console.log("lat and long is ",lat, lon);
      let res = await axios.get('https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat='+lat+'&lon='+lon+'&accept-language=en');
      // let data = await res.json();
      return res
  }
    // this fuction get the data from api and convert the 24 hours in 12 hours
    
    const apifetch =async (lat,lng) => {
      let dd = new Date().getDate();
      let method;
      // console.log("when will i call ,",lat,lng,dd);
      let mm = new Date().getMonth() + 1;
      let yy = new Date().getFullYear();
        try {
          let countryname=JSON.parse(await AsyncStorage.getItem("countryname"));
          method = JSON.parse(await AsyncStorage.getItem("method"));
          method = method !== null ? method : checkingCountryMethodFirstTime(countryname[1]);;
          // console.log("method value ", method);
          setMethodvalue(method);
        } catch (error) {}
        // console.log("final method value ", method);
        axios
        .get(
          "https://api.aladhan.com/v1/calendar?latitude=" +
            lat +
            "&longitude=" +
            lng+
            "&method=" +
            method +
            "&month=" +
            mm 
            )
            .then(async(res) => {
              // console.log(res.data);
              localdata=res.data.data;
              // console.log(res.data.data[dd-1].date.gregorian.date);
          apiData = res.data.data[dd-1].timings;
          // console.log(res.data.data[1]);
          setTimes1(apiData);
          await AsyncStorage.setItem("apiData",JSON.stringify(res));
          apiobj = {
            Fajr: formatDate(apiData.Fajr).split("(")[0],
            Sunrise: formatDate(apiData.Sunrise).split("(")[0],
            Dhuhr: formatDate(apiData.Dhuhr).split("(")[0],
            Asr: formatDate(apiData.Asr).split("(")[0],
            Sunset: formatDate(apiData.Sunset).split("(")[0],
            Maghrib: formatDate(apiData.Maghrib).split("(")[0],
            Isha: formatDate(apiData.Isha).split("(")[0],
          };
          
          setTimes(apiobj);
          setIsready(true);
          settimer();
          setLocalData(localdata);
        })
        .catch((err) => {
          // console.log(err);
        });
     

      
    };

    // this function returns the remaning time of salah and salah name
    const settimer = () => {
      // console.log("is me not called again ");
      let fjr_scd, rise_scd, dhur_scd, asr_scd, maghrib_scd, isha_scd;
      let cc_tt;
      let c_t = new Date().getTime();
      c_t = moment(c_t).format("HH:mm");
      cc_tt = (c_t[0] + c_t[1]) * 60 * 60 + (c_t[3] + c_t[4]) * 60;
      // check current and next Salah
      try {
        let namaz;
        let ish=false;
        if (c_t < apiData.Fajr) {
          rem = apiData.Fajr;
          namaz = ["-", "Fajr"];
          // console.log(remr);
        } else if (c_t < apiData.Sunrise) {
          rem = apiData.Sunrise;
          namaz = ["Fajr", "Sunrise"];
        } else if (c_t < apiData.Dhuhr) {
          rem = apiData.Dhuhr;
          namaz = ["Chast", "Dhuhr"];
        } else if (c_t < apiData.Asr) {
          rem = apiData.Asr;
          namaz = ["Dhuhr", "Asr"];
        } else if (c_t < apiData.Maghrib) {
          rem = apiData.Maghrib;
          namaz = ["Asr", "Maghrib"];
        } else if (c_t < apiData.Isha) {
          rem = apiData.Isha;
          namaz = ["Maghrib", "Isha"];
        } else if(c_t > apiData.Isha) {
          rem = apiData.Fajr;ish=true;
          namaz = ["Isha", "Fajr"];
        }
        setRemr(namaz);
        setTimer(rem,ish);
      } catch (error) {
        // console.log(error);
      }
    };


// this function convert the 24 hours in 12 hours
    function formatDate(date) {
      var hh = date[0] + date[1];
      var m = date[3] + date[4];
      // var s = d.getSeconds();
      var dd = "AM";
      var h = hh;
      if (h >= 12) {
        h = hh - 12;
        dd = "PM";
      }
      if (h == 0) {
        h = 12;
      }
      h = hh > 12 ? "0" + h : h;
      var pattern = new RegExp("0?" + hh + ":" + m);
      return date.replace(pattern, h + ":" + m + " " + dd);
    }
  
    const onRefresh = React.useCallback(() => {
      setRefreshing(true);
      wait(2000).then(() => {setRefreshing(false)});
    }, [refreshing]);
    // useEffect(() => {
    //   // setRemtime(remtime=>(remtime));
    //   // console.log("remtime", remtime);
    // }, [remtime]);
  
    const setTimer = (seconds,ish) => {
      try {
        const countertime = seconds;
        const hs = parseInt(countertime[0] + countertime[1]) * 3600;
        const ms = parseInt(countertime[3] + countertime[4]) * 60;
        let rem = hs + ms;
        let c_t = new Date().getTime();
        c_t = moment(c_t).format("HH:mm");
        let cc_tt = (c_t[0] + c_t[1]) * 60 * 60 + (c_t[3] + c_t[4]) * 60;
        let allrem = cc_tt - rem;
        let hhh = parseInt(allrem / 3600);
        let mmm = (allrem / 3600).toString().split(".")[1];
        let fmm = ("." + mmm) * 60;
        let fmmm = parseInt(fmm);
        let forss;
        if (!parseInt(fmm)) {forss = fmm.toString().split(".")[1];}
        forss = parseInt(fmmm);
        let finalss = parseInt(("." + forss) * 60);
        let finaltime =
          Math.abs(hhh * 3600) + Math.abs(fmmm * 60) + Math.abs(finalss);
          if(ish===true){
            finaltime=finaltime/2;
            // console.log(finaltime);
          }
        setRemtime(finaltime);
      } catch (error) {
        
      }
    };
  
// storing data on local storage for background usage in alarm 

async function setLocalData(localdata){
  for (let i=0; i<localdata.length; i++){
        try {
          let ddt=(localdata[i].date.gregorian.date).toString()
       await AsyncStorage.setItem((ddt), JSON.stringify(localdata[i].timings));
      } catch (error) {
        
      }
      }
}
  
    // storing data on alarm state changing
    useEffect(()=>{
      storeAlaram(obj);
      // console.log("obj",obj);
      if (obj!=null){
        setFjrAlarm(obj.Fjralarm);
        setZuhrAlarm(obj.Zuhralarm);
        setAsrAlarm(obj.Asralarm);
        setMaghribAlarm(obj.Maghribalarm);
        setIshrAlarm(obj.Ishaalarm);
      };
    },[obj]);
  useEffect(()=>{
  
    setObj({
      Fjralarm:Fjralarm,
      Zuhralarm:Zuhralarm,
      Asralarm:Asralarm,
      Maghribalarm:Maghribalarm,
      Ishaalarm:Ishaalarm
    })
  },[Fjralarm,Zuhralarm,Asralarm,Maghribalarm,Ishaalarm]);
    let getData= async()=>{
      try {
        const jsonalarm= await AsyncStorage.getItem("alarm");
        // console.log("alarmdata",jsonalarm);
        const alarmdata=jsonalarm?JSON.parse(jsonalarm):null;
        setObj(alarmdata);
      } catch (error) {
      }
  }
  
  let storeAlaram = async(obj)=>{
    try {
      await AsyncStorage.setItem("alarm",JSON.stringify(obj));
    } catch (error) {
    }
  }
  
  const changeFajrAlarm =async () => {
    let channelId;
    setFjrAlarm(!Fjralarm);
    // console.log("fajralarm ",Fjralarm);
    // this false is actually according to the condition of the alarm image.

    var today = new Date();
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    var yyyy = today.getFullYear();
    today = dd + "-" + mm + "-" + yyyy;
    const data=JSON.parse(await AsyncStorage.getItem(today));
    // console.log("data of fajar",data);
    fjrhours=data.Fajr[1];
    
    fjrmint=data.Fajr[3]+data.Fajr[4];
    fjrscds=0;
    channelId = await notifee.createChannel({
      id: 'fajr',
      name: 'fajr Channel',
      importance: AndroidImportance.HIGH,
      sound:'adhan',
      // visibility: AndroidVisibility.PUBLIC,
      
    });
    const date = new Date(Date.now());

    date.setHours(fjrhours);
    date.setMinutes(fjrmint);
    date.setSeconds(fjrscds);
    const trigger = {
      type: TriggerType.TIMESTAMP,
      timestamp: date.getTime(), // fire at 11:10am (10 minutes before meeting)
      alarmManager: true, // use Android AlarmManager instead of default JobScheduler
      repeatFrequency:RepeatFrequency.DAILY,
    };
    const notification={
      id:"fajr",
        title: 'myIslam.org',
        body: 'Fajr SalahTime ',
        android: {
          channelId,
          palysound:true,
          sound:'adhan',
          timestamp:date.getTime(),
        }
    }
    if (Fjralarm === true) {
      // alert
      
      try {
        await AsyncStorage.setItem("fjr-alarm",JSON.stringify({
          Fajr:true,
        }));
      await notifee.createTriggerNotification(notification,trigger);
          // await AsyncStorage.setItem('fjr-notification',idtr);
          } catch (error) {
          }
    }
    if(Fjralarm === false){
      try {
        await AsyncStorage.setItem("fjr-alarm",JSON.stringify({
          Fajr:false,
        }));
        // const notificationIds=await AsyncStorage.getItem('fjr-notification');
        await notifee.cancelTriggerNotification('fajr');
      } catch (error) {
        
      }
    }
    
  };
  
  const changeZuhrAlarm = async() => {
    

    setZuhrAlarm(!Zuhralarm)
    let channelId;
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    var yyyy = today.getFullYear();
    today = dd + "-" + mm + "-" + yyyy;
    const data=JSON.parse( await AsyncStorage.getItem(today));
    dhrhours=data.Dhuhr[0]+data.Dhuhr[1];
    dhrmint=data.Dhuhr[3]+data.Dhuhr[4];
    dhrscds=0;
    // this false is actually according to the condition of the alarm image.
    channelId = await notifee.createChannel({
      id: 'dhr',
      name: 'dhr Channel',
      sound:'adhan',
      importance: AndroidImportance.HIGH,

    });
    const date = new Date(Date.now());
    date.setHours(dhrhours);
    date.setMinutes(dhrmint);
    date.setSeconds(dhrscds);

    const trigger = {
      type: TriggerType.TIMESTAMP,
      timestamp: date.getTime(), // fire at 11:10am (10 minutes before meeting)
      alarmManager: true, // use Android AlarmManager instead of default JobScheduler
      repeatFrequency:RepeatFrequency.DAILY,
    };
    const notification={
    id:"dhr",
      title: 'myIslam.org',
      body: 'Dhuhr SalahTime ',
        android: {
          channelId,
          sound:'adhan',
          palysound:true, 
        }
    }
    if (Zuhralarm === true) {

      try {
        await AsyncStorage.setItem("dhr-alarm",JSON.stringify({
          Dhuhr:true,
        }));
      const idtr=await notifee.createTriggerNotification(notification,trigger)
    
          } catch (error) {
          }
    }
    if(Zuhralarm === false){
      try {
        await AsyncStorage.setItem("dhr-alarm",JSON.stringify({
          Dhuhr:false,
        }));
        await notifee.cancelTriggerNotification('dhr');
      } catch (error) {
        
      }
    }
    
  };


  const changeAsrAlarm =async () => {
    let idd;
    let channelId;
    setAsrAlarm(!Asralarm);
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    var yyyy = today.getFullYear();
    today = dd + "-" + mm + "-" + yyyy;
    const data=JSON.parse(await AsyncStorage.getItem(today));
    asrhours=data.Asr[0]+data.Asr[1];
    asrmint=data.Asr[3]+data.Asr[4];
    asrscds=0;
    // this false is actually according to the condition of the alarm image.
    // alert
      channelId = await notifee.createChannel({
      id: 'asr',
      name: 'asr Channel',
      sound:'adhan',
      importance: AndroidImportance.HIGH,

    });
    const date = new Date(Date.now());
    date.setHours(asrhours);
    date.setMinutes(asrmint)
    date.setSeconds(asrscds);

    // Create a time-based trigger
    // const trigger=new TimestampTrigger();
    const trigger = {
      type: TriggerType.TIMESTAMP,
      timestamp: date.getTime(), // fire at 11:10am (10 minutes before meeting)
      alarmManager: true, // use Android AlarmManager instead of default JobScheduler
      repeatFrequency:RepeatFrequency.DAILY,
    };
    const notification={
      id:"asr",
      title: 'myIslam.org',
      body: 'Asr SalahTime ',
        android: {
          channelId,
          sound:'adhan',
          palysound:true,
          
        }
    }
    if (Asralarm === true) {
      try {
        await AsyncStorage.setItem("asr-alarm",JSON.stringify({
          Asr:true,
        }));
      await notifee.createTriggerNotification(notification,trigger);
          } catch (error) {
          }
    }
    if(Asralarm === false){
      try {
        await AsyncStorage.setItem("asr-alarm",JSON.stringify({
          Asr:false,
        }));
        await notifee.cancelTriggerNotification('asr');
      } catch (error) {
        
      }
    }
    

  };
  
  const changeMaghribAlarm =async () => {
    let channelId;
    setMaghribAlarm(!Maghribalarm);
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    var yyyy = today.getFullYear();
    today = dd + "-" + mm + "-" + yyyy;
    const data=JSON.parse(await AsyncStorage.getItem(today));
    mghhours=data.Maghrib[0]+data.Maghrib[1];
    mghmint=data.Maghrib[3]+data.Maghrib[4];
    mghscds=0;
    // this false is actually according to the condition of the alarm image.
    channelId = await notifee.createChannel({
      id: 'mgh',
      name: 'mgh Channel',
      sound:'adhan',
      importance: AndroidImportance.HIGH,

    });
    const date = new Date(Date.now());
    date.setHours(mghhours);
    date.setMinutes(mghmint)
    date.setSeconds(mghscds);

    // Create a time-based trigger
    // const trigger=new TimestampTrigger();
    const trigger = {
      type: TriggerType.TIMESTAMP,
      timestamp: date.getTime(), // fire at 11:10am (10 minutes before meeting)
      alarmManager: true, // use Android AlarmManager instead of default JobScheduler
      repeatFrequency:RepeatFrequency.DAILY,
    };
    const notification={
    id:'mgh',
      title: 'myIslam.org',
      body: 'Maghrib SalahTime ',
        android: {
          channelId,
          sound:'adhan',
          palysound:true,
          
        }
    }
    if (Maghribalarm === true) {
      try {
        await AsyncStorage.setItem("mgh-alarm",JSON.stringify({
          Maghrib:true,
        }));
        await notifee.createTriggerNotification(notification,trigger)
          } catch (error) {
          }
    }
    if(Maghribalarm === false){
      try {
        await AsyncStorage.setItem("mgh-alarm",JSON.stringify({
          Maghrib:false,
        }));
        await notifee.cancelTriggerNotification('mgh');
      } catch (error) {
      }
    }
    
  };
  
    const changeIshaAlarm = async() => {
      let channelId;
      setIshrAlarm(!Ishaalarm);
      var today = new Date();
      var dd = String(today.getDate()).padStart(2, "0");
      var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
      var yyyy = today.getFullYear();
      today = dd + "-" + mm + "-" + yyyy;
      const data=JSON.parse(await AsyncStorage.getItem(today));
      ishours=data.Isha[0]+data.Isha[1];
      ishmint=data.Isha[3]+data.Isha[4];
      ishscds=0;
      // this false is actually according to the condition of the alarm image.
      channelId = await notifee.createChannel({
       id: 'ish',
       name: 'ish Channel',
       sound:'adhan',
       importance: AndroidImportance.HIGH,

     });
     const date = new Date(Date.now());
     date.setHours(ishours);
     date.setMinutes(ishmint)
     date.setSeconds(ishscds);
     const trigger = {
       type: TriggerType.TIMESTAMP,
       timestamp: date.getTime(), // fire at 11:10am (10 minutes before meeting)
       alarmManager: true, // use Android AlarmManager instead of default JobScheduler
       repeatFrequency:RepeatFrequency.DAILY,
     };
     const notification={
      id:'ish',
       title: 'myIslam.org',
       body: 'Isha SalahTime ',
         android: {
           channelId,
           sound:'adhan',
           palysound:true,
         }
     }
      if (Ishaalarm === true) {
        try {
          await AsyncStorage.setItem("ish-alarm",JSON.stringify({
            Isha:true,
          }));
          await notifee.createTriggerNotification(notification,trigger)
            } catch (error) {
            }
      }
      if(Ishaalarm === false){
        try {
          await AsyncStorage.setItem("ish-alarm",JSON.stringify({
            Isha:false,
          }));
          await notifee.cancelTriggerNotification('ish');
          
        } catch (error) {
          
        }
      }
    
    };
  
    return (
      <>
        {/* <StatusBar style="dark"></StatusBar> */}
      {isready?(
        <SafeAreaView style={{ flex: 1, backgroundColor:"#0F2247" }}>
         
          {/* topbar */}
          <View style={styles.viewHeading}>
          <TouchableOpacity
              onPress={() =>
                navigation.push('Home')
              }
            >
              <Image
                source={require('./images/leftarrow.png')}
                style={{width:30,height:30}}
                />
            </TouchableOpacity>
            <TouchableOpacity>
              {noInternet? 
              <Image source={require('./images/no-wifi.png')} style={{ width: 30, height: 30 }}></Image>:<Image source={require('./images/no-wifi.png')} style={{ width: 30, height: 30 }}></Image>
              }
            </TouchableOpacity>
            <Text style={styles.headingText}>Salah Times</Text>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("Settings", { location, methodvalue })
              }
            >
              <Image
                source={require("./images/settings.png")}
                style={{ width: 30, height: 30 }}
              ></Image>
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              margin: 13,
            }}
          >
            {/* sunrise */}
            <View style={styles.remTimeView}>
              <Text style={styles.remTimeText}>Sunrise</Text>
              <Image
                source={require("./images/sunrise.png")}
                style={{ width: 30, height: 30,tintColor:"white"}}
              ></Image>
              <Text style={{ fontWeight: "400", fontSize: 17,color:"white" }}>
                {isready ? times.Sunrise : "Loading..."}
              </Text>
            </View>
            {/* remaining time */}
            <View style={{ alignItems: "center", justifyContent: "center" }}>
              <View style={styles.remTimeView}>
                <Text
                  style={{
                    fontSize: 15,
                    color:"white",
                    fontFamily:
                      Platform.OS === "ios" ? "AvenirNext-DemiBold" : "monospace",
                    fontStyle: "italic",
                  }}
                >
                  {location?location[0]:null}
                </Text>
                <Text
                  style={{
                    fontSize: 15,
                    color:"white",
                    fontFamily:
                      Platform.OS === "ios" ? "AvenirNext-DemiBold" : "monospace",
                    fontStyle: "italic",
                  }}
                >
                 {location?location[1]:null}
                </Text>
              </View>
            </View>
            {/* Sunset time */}
            <View style={styles.remTimeView}>
              <Text style={styles.remTimeText}>Sunset</Text>
              <Image
                source={require("./images/sunset.png")}
                style={{ width: 30, height: 30,tintColor:"white" }}
              ></Image>
              <Text style={{ fontWeight: "400", fontSize: 17,color:"white" }}>
                {isready ? times.Sunset : "Loading..."}
              </Text>
            </View>
          </View>
  
          {/* Remaining time */}
          <View>
            <View style={{ flexDirection: "column", alignItems: "center" }}>
              <View
                style={{
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <View style={{ flexDirection: "row" }}>
                 
                  <Text style={{color:"white"}}>Current Prayer :</Text>
                  <Text style={{ fontWeight: "bold",color:"white" }}> {remr[0]}</Text>
                </View>
  
                <Text
                  style={{ fontWeight: "400", fontSize: 19, letterSpacing: 4,color:"white" }}
                >
                  -------------
                </Text>
                <View style={{ flexDirection: "row" }}>
                  <Text
                    style={{
                      fontSize: 15,
                      color:"white",
                      fontFamily:
                        Platform.OS === "ios"
                          ? "AvenirNext-DemiBold"
                          : "monospace",
                      fontStyle: "italic",
                    }}
                  >
                    Time Remaining till :
                  </Text>
                  <Text style={{ fontWeight: "bold", color:"white" }}> {remr[1]}</Text>
                </View>
              </View>
              {remtime ? (
                <CountDown
                  style={{ top: 5, }}
                  // size={20}
                  
                  until={remtime}
                  digitStyle={{
                    backgroundColor: "navy",
                    marginHorizontal: 8,
                    borderRadius: 10,
                    
                  }}
                  separatorStyle={{ color: "#fff", margin: 3 }}
                  timeToShow={["H", "M", "S"]}
                  digitTxtStyle={{color:"white"}}
                  timeLabels={{ m: null, s: null }}
                  showSeparator
                />
              ) : null}
            </View>
          </View>
  
          {/* times  */}
          <View style={{ flex: 1, marginLeft: 15, marginRight: 15,top:4 }}>
            {/* fajar */}
            {isready ? (
              <ScrollView
                refreshControl={
                  <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
              >
                <ImageBackground
                  source={require("./images/fajr.png")}
                  style={styles.imagebackgroundstyle}
                  imageStyle={{ borderRadius: 10 }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignContent: "center",
                      marginLeft: 10,
                      marginRight: 10,
                    }}
                  >
                    <Text style={styles.namaName}>FAJR</Text>
                    <TouchableOpacity
                      style={{
                        flexDirection: "row",
                        justifyContent: "center",
                        width:"60%",
                        paddingRight:7
                      }}
                      onPress={() =>changeFajrAlarm()}
                    >
                      <Text style={styles.namazTime}>{times.Fajr}</Text>
                      {Fjralarm ? (
                        <Image
                          style={styles.alarm}
                          
                          source={require("./images/bellOf.png")}
                        ></Image>
                      ) : (
                        <Image
                          style={styles.alarm}
                          
                          source={require("./images/bellOn.png")}
                        ></Image>
                      )}
                    </TouchableOpacity>
                  </View>
                </ImageBackground>
                <View>
                  <ImageBackground
                    source={require("./images/duhur.png")}
                    style={styles.imagebackgroundstyle}
                    imageStyle={{ borderRadius: 10 }}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignContent: "center",
                        marginLeft: 10,
                        marginRight: 10,
                      }}
                    >
                      <Text style={styles.namaName}>DHUHR</Text>
  
                      <TouchableOpacity
                        style={{
                          flexDirection: "row",
                          justifyContent: "center",
                          width:"60%",
                          paddingRight:7
                        }}
                        onPress={() =>  
                          changeZuhrAlarm()
                          // 
                        }
                      >
                        <Text style={styles.namazTime}>{times.Dhuhr}</Text>
                        {Zuhralarm ? (
                          <Image
                            style={styles.alarm}
                            source={require("./images/bellOf.png")}
                          ></Image>
                        ) : (
                          <Image
                            style={styles.alarm}
                            
                            source={require("./images/bellOn.png")}
                          ></Image>
                        )}
                      </TouchableOpacity>
                    </View>
                  </ImageBackground>
                </View>
                <View>
                  <ImageBackground
                    source={require("./images/asr.png")}
                    style={styles.imagebackgroundstyle}
                    imageStyle={{ borderRadius: 10 }}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignContent: "center",
                        marginLeft: 10,
                        marginRight: 10,
                      }}
                    >
                      <Text style={styles.namaName}>ASR</Text>
                      <TouchableOpacity
                        style={{
                          flexDirection: "row",
                          justifyContent: "center",
                          width:"60%",
                          paddingRight:7
                        }}
                        onPress={() => changeAsrAlarm()}
                      >
                        <Text style={styles.namazTime}>{times.Asr} </Text>
                        {Asralarm ? (
                          <Image
                            style={styles.alarm}
                            source={require("./images/bellOf.png")}
                          ></Image>
                        ) : (
                          <Image
                            style={styles.alarm}
                            
                            source={require("./images/bellOn.png")}
                          ></Image>
                        )}
                      </TouchableOpacity>
                    </View>
                  </ImageBackground>
                </View>
                <View>
                  <ImageBackground
                    source={require("./images/maghrib.png")}
                    style={styles.imagebackgroundstyle}
                    imageStyle={{ borderRadius: 10 }}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignContent: "center",
                        marginLeft: 10,
                        marginRight: 10,
                      }}
                    >
                      <Text style={styles.namaName}>MAGHRIB</Text>
                      <TouchableOpacity
                        style={{
                          flexDirection: "row",
                          justifyContent: "center",
                          width:"60%",
                          paddingRight:7
                        }}
                        onPress={() => changeMaghribAlarm()}
                      >
                        <Text style={styles.namazTime}>{times.Maghrib}</Text>
                        {Maghribalarm ? (
                          <Image
                            style={styles.alarm}
                            source={require("./images/bellOf.png")}
                          ></Image>
                        ) : (
                          <Image
                            style={styles.alarm}
                            
                            source={require("./images/bellOn.png")}
                          ></Image>
                        )}
                      </TouchableOpacity>
                    </View>
                  </ImageBackground>
                </View>
                <View>
                  <ImageBackground
                    source={require("./images/isha.png")}
                    style={styles.imagebackgroundstyle}
                    imageStyle={{ borderRadius: 10 }}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignContent: "center",
                        marginLeft: 10,
                        marginRight: 10,
                      }}
                    >
                      <Text style={styles.namaName}>ISHA</Text>
                      <TouchableOpacity
                        style={{
                          flexDirection: "row",
                          justifyContent: "center",
                          width:"60%",
                          paddingRight:7
                        }}
                        onPress={() => changeIshaAlarm()}
                      >
                        <Text style={styles.namazTime}>{times.Isha}</Text>
                        {Ishaalarm ? (
                          <Image
                            style={styles.alarm}
                            source={require("./images/bellOf.png")}
                          ></Image>
                        ) : (
                          <Image
                            style={[styles.alarm,{tintColor:"white"}]}
                            
                            source={require("./images/bellOn.png")}
                          ></Image>
                        )}
                      </TouchableOpacity>
                    </View>
                  </ImageBackground>
                </View>
              </ScrollView>
            ) : (
              <ActivityIndicator />
            )}
          </View>
          {/* <TouchableOpacity style={{width:100,height:20, backgroundColor:"white",
        justifyContent:"center",alignItems:"center"}}>
            <Text style={{color:"black"}}>Back To Home</Text>
          </TouchableOpacity> */}
        </SafeAreaView>
           ):null} 
      </>
    );
  }
  
  const styles = StyleSheet.create({
    imagebackgroundstyle: {
      justifyContent: "center",
      marginBottom: 5,
      marginTop: 10,
      height: Platform.OS === "ios" ? 80 : 70,
    },
    viewHeading: {
      width: "100%",
      // backgroundColor: "#eae57e",
      backgroundColor: "#FAFAFC",
      height: Platform.OS === "ios" ? "8%" : "9%",
      shadowColor: "white",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.6,
      elevation: 15,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      padding: 15,
      // paddingTop: Platform.OS === "ios" ? null : "10%",
    },
    headingText: {
      fontWeight: "bold",
      fontSize: 22,
      fontFamily: Platform.OS === "ios" ? "AvenirNext-DemiBold" : "monospace",
      letterSpacing: Platform.OS === "ios" ? 2 : null,
    },
    remTimeView: {
      flexDirection: "column",
      justifyContent: "space-around",
      alignItems: "center",
    },
    remTimeText: {
      fontWeight: "400",
      fontSize: 19,
      fontFamily: Platform.OS === "ios" ? "AvenirNext-DemiBold" : "monospace",
      color:"white"
    },
    namaName: {
      fontWeight: "400",
      fontSize: 22,
      color: "white",
      fontFamily: Platform.OS === "ios" ? "AvenirNext-DemiBold" : "monospace",
    },
    namazTime: {
      textAlign: "center",
      fontWeight: "400",
      fontSize: 23,
      color: "white",
      width:"80%",
      marginLeft:10,
      fontFamily: Platform.OS === "ios" ? "AvenirNext-DemiBold" : "monospace",
    },
    alarm: {
      tintColor:"whitesmoke",
      width: Platform.OS === "ios" ? "25%" : "11%",
      height: Platform.OS === "ios" ? "97%" : "81%",
      // paddingRight:30,
      
    },
  });
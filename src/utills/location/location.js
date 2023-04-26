import react,{useEffect,useState,useMemo,useContext} from 'react';
import NetInfo from '@react-native-community/netinfo';
import {PermissionsAndroid,Alert} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import AsyncStorage from '@react-native-community/async-storage';
import RNLocation from 'react-native-location';


import { ChartsContext } from '../../contextApi/ApiProvider';
const {location,setLocation}= useContext(ChartsContext);



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
                  countryname=nam.split(" ")[1];
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


async function getLocationC(lat, lon) {
    // console.log("lat and long is ",lat, lon);
    let res = await axios.get('https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat='+lat+'&lon='+lon+'&accept-language=en');
    // let data = await res.json();
    return res
}


function getFirstAndLastWords(text) {
    var text_arr = text.split(" ");
    return text_arr[0] + " " + text_arr[text_arr.length-1];
  }
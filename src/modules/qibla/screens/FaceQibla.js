

import {
    Image,
    ImageBackground,
    StyleSheet,
    Text,
    View,
    Button,
    TouchableOpacity,
    PermissionsAndroid,
    Alert,
  } from 'react-native';
  import React, {useState, useEffect, useMemo} from 'react';
  import CompassHeading from 'react-native-compass-heading';
  import Geolocation from 'react-native-geolocation-service';
  import AsyncStorage from '@react-native-async-storage/async-storage';
  import {RNCamera} from 'react-native-camera';
  import RNLocation from 'react-native-location';
  import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
  import { AnimatedCircularProgress } from 'react-native-circular-progress';
  import axios from 'axios';
  import {widthPercentageToDP} from '../../../utills/pixelratio';
  import FacingQibla from '../components/FacingQibla';
  
  let Qibla = require('qibla').Qibla;
  
  export default FaceQibla = ({ navigation }) => {
    const [location, setLocation] = useState({});
    const [compassHeading, setCompassHeading] = useState(0);
    const [qiblad, setQiblad] = useState(0);
    const [isTorch, setIsTorch] = useState(false);
    const [isFacingQibla, setIsFacingQibla] = useState(false);
    const [qiblaValues, setQiblaValues] = useState(0);
    const [sensorAvaiable, setSensorAvaiable] = useState(false);
    const [showImage,setShowImage] = useState(false)
   
    const getLocation = () => {
      RNLocation.requestPermission({
        ios: 'whenInUse',
        android: {
          detail: 'coarse',
        },
      }).then(granted => {
        if (granted) {
          if (
            PermissionsAndroid.check(
              PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            )
          ) {
            Geolocation.getCurrentPosition(
              async position => {
                let lat = position.coords.latitude;
                let lng = position.coords.longitude;
                await AsyncStorage.setItem(
                  'locationCoor',
                  JSON.stringify([
                    position.coords.latitude,
                    position.coords.longitude,
                  ]),
                );
                getLocationC(
                  position.coords.latitude,
                  position.coords.longitude,
                ).then(async res => {
                  let nam = getFirstAndLastWords(res.data.display_name);
                  // console.log("location that im geting-> ",nam.split(",")[0],nam.split(" ")[1]);
                  setLocation([nam.split(',')[0], nam.split(' ')[1]]);
                  // countryname=nam.split(" ")[1];
                  await AsyncStorage.setItem(
                    'countryname',
                    JSON.stringify([nam.split(',')[0], nam.split(' ')[1]]),
                  );
                });
                setQiblaValues(calculateQibla(lat, lng));
              },
              error => {
                (async () => {
                  // alert("locations is still of")
                  const loct = JSON.parse(
                    await AsyncStorage.getItem('locationCoor'),
                  );
                  console.log('location that im geting in error-> ', loct);
                  // (loct!=null)
                  // Alert.alert("location is off")
                  let cname = JSON.parse(
                    await AsyncStorage.getItem('countryname'),
                  );
                  setLocation(cname);
                  setQiblaValues(
                    calculateQibla(
                      location.coords.latitude,
                      location.coords.longitude,
                    ),
                  );
                  calculate(location.coords.latitude, location.coords.longitude);
                })();
              },
            );
          }
        }
      });
  
      // calculate Qibla Values
      function calculateQibla(latitude, longitude) {
        // console.log('lat and long in calculate QIbla is ', latitude, longitude);
        // let qiblaFromTrueNorth = Qibla.degreesFromTrueNorth(latitude, longitude);
        let qiblaFromTrueNorth = Qibla.degreesFromTrueNorth(latitude, longitude);
  
        // console.log("qibla from true north is ",qiblaFromTrueNorth);
  
        return qiblaFromTrueNorth;
      }
      // reverse geolocation
      async function getLocationC(lat, lon) {
        // console.log("lat and long is ",lat, lon);
        let res = await axios.get(
          'https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=' +
            lat +
            '&lon=' +
            lon +
            '&accept-language=en',
        );
        // let data = await res.json();
        return res;
      }
  
      // get first and last word of location
      function getFirstAndLastWords(text) {
        var text_arr = text.split(' ');
        return text_arr[0] + ' ' + text_arr[text_arr.length - 1];
      }
  
      
    };
  
    const calculate = (latitude, longitude) => {
      const PI = Math.PI;
      let latk = (21.4225 * PI) / 180.0;
      let longk = (39.8264 * PI) / 180.0;
      let phi = (latitude * PI) / 180.0;
      let lambda = (longitude * PI) / 180.0;
      let qiblad =
        (180.0 / PI) *
        Math.atan2(
          Math.sin(longk - lambda),
          Math.cos(phi) * Math.tan(latk) -
            Math.sin(phi) * Math.cos(longk - lambda),
        );
      // setQiblad(qiblad);
      console.log('qibla id ', qiblad);
    };
  
    useEffect(() => {
      getLocation();
      const degree_update_rate = 3;
      CompassHeading.hasCompass().then(hasCompass => {
        if (hasCompass) {
          CompassHeading.start(degree_update_rate, degree => {
            setCompassHeading(degree.heading);
          });
          setSensorAvaiable(true);
        } else {
          sensorAvaiable(false);
        }
      });
  
      return () => {
        CompassHeading.stop();
      };
    }),
      [];
  
    useMemo(() => {
      if (
        compassHeading >= qiblaValues - 15 &&
        compassHeading <= qiblaValues + 15
      ) {
        console.log('now facing qibla');
        setIsFacingQibla(true);
        
      } else {
        console.log('not facing qibla');
        setIsFacingQibla(false);
      }
      console.log(compassHeading, ' chaning continuously');
    }, [compassHeading]);
  
    return (
      <>
        {sensorAvaiable ? (
          <View style={styles.container}>
            {!isFacingQibla ? (
              <>
                <TouchableOpacity
                  style={{
                    position: 'absolute',
                    top: 15,
                    right: 20,
                    backgroundColor: 'red',
                  }}
                  onPress={() => {
                    setIsTorch(!isTorch);
                  }}>
                  {isTorch ? (
                    <Icons name="flashlight" size={30} color="white" />
                  ) : (
                    <Icons name="flashlight-off" size={30} color="white" />
                  )}
                </TouchableOpacity>
  
                <RNCamera
                  flashMode={
                    isTorch
                      ? RNCamera.Constants.FlashMode.torch
                      : RNCamera.Constants.FlashMode.off
                  }
                  style={{flex: 1, top: 50}}>
                  <ImageBackground
                    source={require('../images/kompas.png')}
                    style={[
                      styles.image,
  
                      {transform: [{rotate: `${360 - compassHeading}deg`}]},
                    ]}>
                    <View
                      style={{
                        flex: 1,
                        alignItems: 'center',
                        justifyContent: 'center',
                        transform: [{rotate: `${compassHeading}deg`}],
                      }}>
                      <Image
                        source={require('../images/kakbah.png')}
                        style={{
                          marginBottom: '40%',
                          resizeMode: 'contain',
                          flex: 0.7,
                        }}
                      />
                    </View>
                  </ImageBackground>
                  <View
                    style={{
                      backgroundColor: 'black',
                      justifyContent: 'center',
                      alignSelf: 'center',
                      alignItems: 'center',
                      width: widthPercentageToDP(90),
                      top: widthPercentageToDP(20),
                      padding: widthPercentageToDP(2),
                    }}>
                    <Text
                      style={{
                        color: 'white',
                        textAlign: 'center',
                        fontWeight: '900',
                        lineHeight: 20,
                      }}>
                      Your Qibla Direction Heading is {'\n'}
                      {qiblaValues} {'\n'}Please Move it according to get Qibla
                      Direction
                    </Text>
                  </View>
                </RNCamera>
              </>
            ) : (
  
              
              <View
                style={{
                  backgroundColor: 'black',
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                  <AnimatedCircularProgress 
                    size={100}
                    width={15}
                    fill={100}
                    prefill={10}
                    delay={20}
                    duration={1500}
                    // easing={eval}
                    dashedTint={{width: 1, gap: 15}}
                    tintColor='white'
                    tintColorSecondary='white'
                    onAnimationComplete={()=>(
                        // navigation.navigate('Home')
                        navigation.navigate('FacingQibla')
                    
                      
                    )}
                    rotation={120}
                  />
                  
                    
                  
              </View>
            )}
          </View>
        ) : (
          <View
            style={{
              backgroundColor: 'black',
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              // alignSelf: 'center',
            }}>
            <Text
              style={{
                color: 'white',
                fontSize: 40,
                fontWeight: 'bold',
                textAlign: 'center',
                flexWrap: 'wrap',
              }}>
              Magnetometer Not Available on Your Mobile
            </Text>
          </View>
        )}
      </>
    );
  };
  
  const styles = StyleSheet.create({
    image: {
      width: '100%',
      flex: 0.5,
      resizeMode: 'contain',
      alignSelf: 'center',
      justifyContent: 'center',
      alignItems: 'center',
    },
    container: {backgroundColor: '#000', flex: 1},
  });
  
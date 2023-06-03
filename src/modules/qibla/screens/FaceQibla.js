// import {
//   Alert,
//   Image,
//   StyleSheet,
//   Text,
//   View,
//   Dimensions,
//   SafeAreaView,
//   Button,
//   Animated,
//   ImageBackground,
//   PermissionsAndroid,
// } from 'react-native';
// import React, {useState, useEffect, useRef} from 'react';
// import RNLocation from 'react-native-location';
// import {Qibla} from 'qibla';
// // import {RNCamera} from 'react-native-camera';
// // import { Camera} from "react-native-vision-camera";
// // import CircularProgress from "react-native-circular-progress-indicator";
// // import OpenCircle from "../components/OpenCircle";
// import {magnetometer}  from "react-native-sensors";
// const {height, width} = Dimensions.get('window');

// // import React, {
// //   DeviceEventEmitter // will emit events that you can listen to
// // } from 'react-native';

// // import { SensorManager } from 'NativeModules';

// export default function FaceQibla({}) {
//   var cameraId;
//   var device;
//   // const [subscription, setSubscription] = useState(null);
//   const [magnetometerData, setMagnetometerData] = useState(0);
//   const [permission, setPermission] = useState(false);
//   // const [type, setType] = useState(CameraType.back);
//   const [qiblaValues, setQiblaValues] = useState(0);
//   const [facingQibla, setFacingQibla] = useState(true);
//   const [sensorAvaiable, setSensorAvaiable] = useState(false);
//   let userCompassValue;

//   useEffect(() => {
//     // (() => {
//     // const permission = Camera.requestCameraPermissionsAsync();
//     //   const permission =PermissionsAndroid.PERMISSIONS.CAMERA;

//     //   console.log("permission", permission);
//     //   // permission.then((permis) => {
//     //   //   // setPermission(permis.granted);
//     //   // });
//     // })();

//     //  RNCamera.then((data) => {
//     //     console.log(data, "data");

//     //  })

//     (async () => {
//       RNLocation.requestPermission({
//         ios: 'whenInUse',
//         android: {
//           detail: 'coarse',
//         }
//       }).then((granted) =>
//       {
//        if(granted) {
//         if (PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION))
//         {
//           RNLocation.getLatestLocation({timeout: 1000}).then((location) => {
//             console.log("here is the location in QIbla, ", location);
//           }).catch((err) => {
//             console.log("error in getting location", err)
//           })}
//         }
//       else{
//         console.log("You can not use the ACCESS_FINE_LOCATION")
//        }
//       }
//     ).catch((err) => {
//       console.log("error in requesting", err)
//     })})();

//     magnetometer.subscribe(()=>{
//       console.log("magnetometerData", magnetometerData);
//       // setMagnetometerData(magnetometerData);
//     }).unsubscribe();

// // (()=>{
// //   // magnetometer.subscribe((magnetometerData) => {
// //   //   console.log("magnetometerData", magnetometerData);
// //   //   // setMagnetometerData(magnetometerData);
// //   // }).unsubscribe();
// //   // const subscription;

// //     // const subscription = magnetometer.subscribe(({ x, y, z, timestamp }) =>
// //     //  console.log({ x, y, z, timestamp })
// //     //  );
// //     new magnetometer
// //     setUpdateIntervalForType( magnetometer.subscribe(({ x, y, z, timestamp }) =>
// //     console.log({ x, y, z, timestamp })
// //     ), 10000); // defaults to 100ms

// //     // subscription.unsubscribe();

// //       // console.log("setUpdateIntervalForType", setUpdateIntervalForType)

// // // Later, unsubscribe

// // })()

//     //accessing sensors from expo-sensors
//     // Magnetometer.isAvailableAsync().then((permiAvailable) => {
//     //   console.log("is available", permiAvailable);
//     // });

//   }, []);

//   // const devices = Camera.getAvailableCameraDevices()

//   // setQiblaValues(
//   //   calculateQibla(location.coords.latitude, location.coords.longitude)
//   // );
//   //   DeviceSensor.isAvailableAsync().then()
//   //   // Magnetometer.isAvailableAsync().then((permiAvailable) => {
//   //   //   permiAvailable.valueOf()
//   //   //     ? Magnetometer.getPermissionsAsync().then((permi) => {
//   //   //       console.log("is request permission available", permi)
//   //   //     })
//   //   //     : setSensorAvaiable(false)
//   //   //     });
//   // })();

//   // SensorManager.startMagnetometer(100);

//   //   _toggle();
//   //   return () => {
//   //     _unsubscribe();
//   //   };
//   // }, []);

//   // const _toggle = () => {
//   //   if (subscription) {
//   //     _unsubscribe();
//   //   } else {
//   //     _subscribe();
//   //   }
//   // };

//   // const _subscribe = () => {
//   //   // Magnetometer.isAvailableAsync().then(()=>{
//   //   //   console.log("magnetometer is available");
//   //   // })
//   //   setSubscription(
//   //     Magnetometer.addListener((data) => {
//   //       setMagnetometer(_angle(data));
//   //       Magnetometer.setUpdateInterval(700);
//   //     })
//   //   );
//   // };

//   // const _unsubscribe = () => {
//   //   subscription && subscription.remove();
//   //   setSubscription(null);
//   // };

//   // const _angle = (magnetometer) => {
//   //   let angle = 0;
//   //   if (magnetometer) {
//   //     let { x, y, z } = magnetometer;
//   //     if (Math.atan2(y, x) >= 0) {
//   //       angle = Math.atan2(y, x) * (180 / Math.PI);
//   //     } else {
//   //       angle = (Math.atan2(y, x) + 2 * Math.PI) * (180 / Math.PI);
//   //     }
//   //   }
//   //   return Math.round(angle);
//   // };

//   // const _direction = (degree) => {
//   //   if (degree >= 22.5 && degree < 67.5) {
//   //     return 'NE';
//   //   }
//   //   else if (degree >= 67.5 && degree < 112.5) {
//   //     return 'E';
//   //   }
//   //   else if (degree >= 112.5 && degree < 157.5) {
//   //     return 'SE';
//   //   }
//   //   else if (degree >= 157.5 && degree < 202.5) {
//   //     return 'S';
//   //   }
//   //   else if (degree >= 202.5 && degree < 247.5) {
//   //     return 'SW';
//   //   }
//   //   else if (degree >= 247.5 && degree < 292.5) {
//   //     return 'W';
//   //   }
//   //   else if (degree >= 292.5 && degree < 337.5) {
//   //     return 'NW';
//   //   }
//   //   else {
//   //     return 'N';
//   //   }
//   // };

//   // Match the device top with pointer 0° degree. (By default 0° starts from the right of the device.)

//   // testing
//   // function calculateQibla(latitude, longitude) {
//   //   let qiblaFromTrueNorth = Qibla.degreesFromTrueNorth(latitude, longitude);
//   //   return qiblaFromTrueNorth;
//   // }

//   const [count, setCount] = useState(0);
//   // useEffect(() => {
//   //   userCompassValue = _degree(magnetometer);

//   //   if (
//   //     userCompassValue <= qiblaValues + 15 &&
//   //     userCompassValue >= qiblaValues - 15
//   //   ) {
//   //     //
//   //     setCount(1);
//   //     _unsubscribe();
//   //   } else {
//   //     Magnetometer.setUpdateInterval(700);
//   //     _subscribe();
//   //     setFacingQibla(false);
//   //     setCount(0);
//   //   }
//   // }, [magnetometer]);

//   // React.useMemo(() => {
//   //   if (count == 1) {
//   //     setFacingQibla(true);
//   //     setFullScreen(true);
//   //   }
//   // }, [count]);
//   return (
//     <>
//       <View style={styles.container}>
//         <Text style={{color:"black"}}>Hello</Text>

//         {/* <RNCamera
//       style={{flex:1}}

//     /> */}
//       </View>

//       {/* abhi sensors lagany  hain*/}
//       {/* {sensorAvaiable ? (
//         <SafeAreaView style={{ flex: 1, backgroundColor: "black" }}>
//           {permission && (
//             <>
//               {facingQibla ? (
//                 <SafeAreaView style={{ flex: 1 }}>
//                   <OpenCircle />
//                 </SafeAreaView>
//               ) : (
//                 // <Camera style={styles.camera} type={type}>
//                 //   <ImageBackground
//                 //     source={require("../images/kompas.png")}
//                 //     style={[
//                 //       styles.image,
//                 //       {
//                 //         transform: [
//                 //           { rotate: `${360 - _degree(magnetometer)}deg` },
//                 //         ],
//                 //       },
//                 //     ]}
//                 //   >
//                 //     <View
//                 //       style={{
//                 //         flex: 1,
//                 //         alignItems: "center",
//                 //         justifyContent: "center",
//                 //         transform: [{ rotate: `${qiblaValues}deg` }],
//                 //       }}
//                 //     >
//                 //       <Image
//                 //         source={require("../images/kakbah.png")}
//                 //         style={{
//                 //           marginBottom: "45%",
//                 //           resizeMode: "contain",
//                 //           flex: 0.7,
//                 //         }}
//                 //       />
//                 //     </View>
//                 //   </ImageBackground>
//                 // </Camera>
//               )}
//             </>
//           )}
//         </SafeAreaView>) :
//         <SafeAreaView style={{ flex: 1, backgroundColor: "black" }}>
//           <View style={{flex:1,justifyContent:"center", alignItems:"center"}}>
//             <Text>Sensor is Not available</Text>
//           </View>
//         </SafeAreaView>

//       } */}
//     </>
//   );
// }

// const styles = StyleSheet.create({
//   camera: {
//     flex: 1,
//   },
//   image: {
//     width: '90%',
//     flex: 0.5,
//     resizeMode: 'contain',
//     alignSelf: 'center',
//   },
//   container: {backgroundColor: '#fff', flex: 1},
// });

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
                        navigation.navigate('Home')
                      
                      
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
  
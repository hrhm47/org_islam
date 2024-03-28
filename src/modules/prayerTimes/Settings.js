import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    Platform,
    Image,
    TouchableOpacity,
    ImageBackground,
    Alert,
    StatusBar,
  } from "react-native";
  
  import React, { useEffect, useState } from "react";
//   import { StatusBar } from "expo-status-bar";
  import SelectDropdown from "react-native-select-dropdown";
  import AsyncStorage from "@react-native-async-storage/async-storage";
  import { useIsFocused } from "@react-navigation/native";
  export default function Settings({ route, navigation }) {
    // const {selectmethod}
    const [selectmethod, setSelectMethod] = useState(2);
    const isFocused = useIsFocused();
  
    let { location, methodvalue } = route.params;
  methodvalue = selectmethod;
  const method = [
    "Shia Ithna-Ashari, Leva Institude, Qum",
    "University of Islamic Sciences, Karachi",
    "Islamic Society of North America",
    "Muslim World League",
    "Umm Al-Qura University, Makkah",
    "Egyptian General Authority of Survey",
    "",
    "Institude of Geophysics, University of Tehran",
    "Gulf Region",
    "Kuwait",
    "Qatar",
    "Majlis Ugama Islam Singapura, Singapore",
    "Union Organization islamic de France",
    "Diyanet Isleri Başkanlığı, Turkey",
    "Spirtual Administration of Muslims of Russia",
  ];
  useEffect(()=>{
    console.log("At Settings");
    (async () => {
      let method = JSON.parse(await AsyncStorage.getItem("method"));
      method=method!=null?method:2;
      // console.log('====================================');
      // console.log(method);
      // console.log('====================================');
      setSelectMethod(method);
    })();
  },[isFocused]);
  
  
  const setmethodvalueinasync=async(value)=>{
    try {
      await AsyncStorage.setItem("method", JSON.stringify(value));
      // let method=JSON.parse(await AsyncStorage.getItem("method"));
      // console.log('====================================');
      // console.log(method);
      // console.log('====================================');
    } catch (error) {
      
    }
  }
  
  
  
  
  return (
    <>
      <StatusBar backgroundColor="white" style="auto"></StatusBar>
      <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
        {/* topbar */}
        <View
          style={{
            width: "100%",
            backgroundColor: "#104586",
            height: Platform.OS === "ios" ? "8%" : "9%",
            shadowColor: "blue",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.6,
            elevation: 15,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            padding: 15,
            // paddingTop: Platform.OS === "ios" ? null : "10%",
          }}
        >
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("SalahTimes", { params: selectmethod });
            }}
          >
            <Image
              source={require("./images/back.png")}
              style={{ width: 30, height: 30, tintColor:"white" }}
            ></Image>
          </TouchableOpacity>
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 22,
              fontFamily:
                Platform.OS === "ios" ? "AvenirNext-DemiBold" : "monospace",
              letterSpacing: Platform.OS === "ios" ? 2 : null,
              color:"white"
            }}
          >
            Prayer Time
          </Text>
          <TouchableOpacity>
            <Image source={{}} style={{ width: 30, height: 30, tintColor:"white" }}></Image>
          </TouchableOpacity>
        </View>
        {/* <Text>Before Moving a screen please select an updated method</Text> */}
        {/* get monthly salah timing */}
        <View
          style={{
            top: 20,
            justifyContent: "space-between",
          }}
          >
            {/* monthly prayer */}
             <View style={{ width: "100%", paddingBottom:15,borderBottomWidth:.51,
                borderBottomColor: "#bebcbc",justifyContent:"center",alignItems:'center' }}>
            <TouchableOpacity
              style={{
                width: "100%",
                alignItems: "center",
                
              }}
              onPress={() =>
                navigation.navigate("Monthly", { location, methodvalue })
              }
            >
              <Text
                style={{
                  
                  fontWeight: "400",
                  fontSize: 18,
                  color:"#104586",
                  fontFamily:
                    Platform.OS === "ios" ? "AvenirNext-DemiBold" : "monospace",
                  letterSpacing: Platform.OS === "ios" ? 1 : null,
                }}
              >
                Monthly Prayers Timings
              </Text>
            </TouchableOpacity>
          </View>
          {/* prayer method selection */}
          <View style={{ width: "100%", paddingBottom:15,borderBottomWidth:.51,
                borderBottomColor: "#bebcbc",justifyContent:"center",alignItems:'center',top: 10,  }}>
            <TouchableOpacity >
                <Text style={{ fontSize: 18,
                  fontFamily:
                    Platform.OS === "ios" ? "AvenirNext-DemiBold" : "monospace",
                  letterSpacing: Platform.OS === "ios" ? 1 : null, fontWeight: "400", color:"#104586", alignSelf:"center" }}>Prayer Time Conventions</Text>
                <SelectDropdown
                data={method}
                defaultValueByIndex={selectmethod}
                // defaultValue={'England'}
                onSelect={(selectedItem, index) => {
                  setmethodvalueinasync(index);
                  setSelectMethod(index);
                  setTimeout(() => {
                    Alert.alert(selectedItem);
                  }),
                    106;
                  
                }}
                defaultButtonText={"Select Method"}
                buttonTextAfterSelection={(selectedItem, index) => {
                  return selectedItem;
                }}
                rowTextForSelection={(item, index) => {
                  return item;
                }}
                buttonStyle={styles.dropdown2BtnStyle}
                buttonTextStyle={styles.dropdown2BtnTxtStyle}
                dropdownIconPosition={"left"}
                dropdownStyle={styles.dropdown2DropdownStyle}
                rowStyle={styles.dropdown2RowStyle}
                rowTextStyle={styles.dropdown2RowTxtStyle}
              />
                
            </TouchableOpacity>
          </View>
        </View>
  
       
      </SafeAreaView>
    </>
  );
  }
  
  
  const styles = StyleSheet.create({
    // drop down styles
    dropdown2BtnStyle: {
      top:5,
      width: "90%",
      // paddingVertical: 5,
      backgroundColor: "#fff",
      borderRadius: 50,
      height: 25,
      alignSelf: "center",
    },
    dropdown2BtnTxtStyle: {
      color: "#000",
      textAlign: "center",
      fontWeight: "600",
      color:"#104586",
      fontSize: 15,
      fontFamily:
        Platform.OS === "ios" ? "AvenirNext-DemiBold" : "monospace",
      letterSpacing: Platform.OS === "ios" ? 1 : null,
      
    },
    dropdown2DropdownStyle: {
      borderBottomLeftRadius: 12,
      borderBottomRightRadius: 12,
      borderTopLeftRadius: 12,
      borderTopRightRadius: 12,
    },
    dropdown2RowTxtStyle: {
      color: "#104586",
      textAlign: "center",
      fontWeight: "400",
      padding:2,
    },
  });
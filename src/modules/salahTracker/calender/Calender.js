import {
  StyleSheet,
  Text,
  View,
  Switch,
  TouchableOpacity,
  Alert,
  ImageBackground,
  Image,
  SafeAreaView,
  Platform,
  ScrollView,StatusBar,useColorScheme,
} from "react-native";
import { React, useEffect, useState, useContext,memo, useMemo, useCallback } from "react";
import { Calendar, CalendarList, Agenda,CalendarListProps} from "react-native-calendars";
import moment from "moment";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Checkbox from '@react-native-community/checkbox';
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { ChartsContext } from "../../../contextApi/ApiProvider";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
// import TextTicker from 'react-native-text-ticker'
import Icon from 'react-native-vector-icons/MaterialIcons';


export default function Calender() {
  const [fjrind, setFjrind] = useState(false);
  const [fjrcong, setFjrcong] = useState(false);
  const [dhrind, setDhrind] = useState(false);
  const [dhrcong, setDhrcong] = useState(false);
  const [asrind, setAsrind] = useState(false);
  const [asrcong, setAsrcong] = useState(false);
  const [maghribind, setMaghribind] = useState(false);
  const [maghribcong, setMaghribcong] = useState(false);
  const [ishaind, setIshaind] = useState(false);
  const [ishacong, setIshacong] = useState(false);
  const [nafalind, setNafalind] = useState(false);
  const isFocused = useIsFocused();
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, "0");
  var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  var yyyy = today.getFullYear();
  today = yyyy + "-" + mm + "-" + dd;
  const [calenderdate, setCalenderdate] = useState();
  const [datefortoday, setdatefortoday] = useState(today);
  const {setLast4months} = useContext(ChartsContext);
  // const { setLongeststreak,last4months,setCountstreak,streakdates,setStreakdates,markdates,setMarkdates } = useContext(ApiProvider);
  let initialState = {
    fjrind: false,
    fjrcong: false,
    dhrind: false,
    dhrcong: false,
    asrind: false,
    asrcong: false,
    maghribind: false,
    maghribcong: false,
    ishaind: false,
    ishacong: false,
    nafalind: false,
  };
  const [obj, setObj] = useState(null);

  useEffect(() => {
    storeData(calenderdate, obj);
    if (obj != null) {
      setFjrind(obj.fjrind);
      setFjrcong(obj.fjrcong);
      setDhrind(obj.dhrind);
      setDhrcong(obj.dhrcong);
      setAsrind(obj.asrind);
      setAsrcong(obj.asrcong);
      setMaghribind(obj.maghribind);
      setMaghribcong(obj.maghribcong);
      setIshaind(obj.ishaind);
      setIshacong(obj.ishacong);
      setNafalind(obj.nafalind);
    }
    // console.log("hmm-> ",obj);
  }, [obj]);

  // storing the states in the async storage
  const storeData = async (key, objdata) => {
    try {
      if (typeof key !== "undefined") {
        const jsonValue = JSON.stringify(objdata);
        await AsyncStorage.setItem(key, jsonValue);
      }
    } catch (error) {
      console.log("error at store data ", error);
    }
  };

  useEffect(() => {
    getData(today);
    // completedsalahDates();
  }, [dummydate]);
  let getData = async (key) => {
    try {
      // console.log("key at get data ", key);
      if (typeof key !== "undefined" && key !== null) {
        const jsonValue = await AsyncStorage.getItem(key);
        const data = jsonValue !== null ? JSON.parse(jsonValue) : null;
        if (data !== null || data !== "undefined") {
          setObj(data);
        }
        return data;
      }
    } catch (e) {}
  };

  useEffect(() => {
    // completedsalahDates();
    if (typeof calenderdate !== "undefined" && calenderdate !== null) {
      getData(calenderdate).then((result) => {
        if (typeof result === "undefined") {
        } else if (result === null) {
          setObj(initialState);
          storeData(calenderdate, obj);
        }
      });
    }
  }, [calenderdate]);

  let checkvalue = 0;
  const addDates=[];
  const [selectedates,setSelectedates] = useState([]);
  async function storestreakdates(datevalue) {

    //  await AsyncStorage.clear();
        try {
          // alert("hello")
          const datesdata=JSON.parse(await AsyncStorage.getItem("selectedDates"));
          if (!datesdata.includes(datevalue)){
            datesdata.push(datevalue);
            await AsyncStorage.setItem("selectedDates",JSON.stringify(datesdata));
            // await AsyncStorage.setItem('selectedDates',JSON.stringify(streakdates));          
          }
          // console.log("again testing-> ",JSON.parse(await AsyncStorage.getItem("selectedDates")));
          // completedsalahDates();
        } catch (error) {}
      
  }
  // useEffect(()=>{
  //  storestreakdates();
  // },[streakdates])
  // setting the states of the checkboxes
  useEffect(() => {
   
    if ((fjrind == true) || (fjrcong == true)) {
      if ((dhrind == true) || (dhrcong == true)) {
        if ((asrind == true)  || (asrcong == true)) {
          if ((maghribind == true) || (maghribcong == true)) {
            if ((ishaind == true) || (ishacong == true)) {
              storestreakdates( calenderdate);
             
            }
          }
        }
      }
    }
    setObj({
      fjrind: fjrind,
      fjrcong: fjrcong,
      dhrind: dhrind,
      dhrcong: dhrcong,
      asrind: asrind,
      asrcong: asrcong,
      maghribind: maghribind,
      maghribcong: maghribcong,
      ishaind: ishaind,
      ishacong: ishacong,
      nafalind: nafalind,
    });
  }, [
    fjrind,
    dhrind,
    asrind,
    maghribind,
    ishaind,
    fjrcong,
    dhrcong,
    asrcong,
    maghribcong,
    ishacong,
    nafalind,
    dummydate
  ]);

  // calendar date
  const onDayPress = (selecdate) => {
    // console.log("selected date ", selecdate);
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    var yyyy = today.getFullYear();
    today = yyyy + "-" + mm + "-" + dd;
    if (selecdate.dateString <= today) {
      setCalenderdate(selecdate.dateString);
    } else {
      Alert.alert("You can not go for future dates");
    }
  };


    const  objjjs=[];
    let mark = {};
     
  
  useEffect(() => {
  
  
  
  function getDatesInRange() {
      // giving us array of 4 months
      let currentdate = new Date();
      let monthname=[(currentdate.getMonth()-2),(currentdate.getMonth()-1),(currentdate.getMonth()),(currentdate.getMonth()+1)];
      // 4 months
      let monthslastdates=[
        (new Date(new Date().getFullYear(), currentdate.getMonth()-2)),
        (new Date(new Date().getFullYear(), currentdate.getMonth()-1)),
        (new Date(new Date().getFullYear(), currentdate.getMonth())),
        (new Date())];
  
      // for start date
      let startdate=new Date(monthslastdates[0]);
      let dd=String("01");
      let mm=String(startdate.getMonth()).padStart(2, "0"); //January is 0!
      let yyyy=startdate.getFullYear();
      startdate=yyyy+"-"+mm+"-"+dd;
      startdate=new Date(startdate);
      // for end date
      let enddate=new Date(monthslastdates[3]);
      const date =new Date(startdate.getTime());
      const dates = [];
      while (date <= enddate) {
        let dd1=String(date.getDate()).padStart(2, "0");
        let mm1=String(date.getMonth()+1).padStart(2, "0"); //January is 0!
        let yyyy1=date.getFullYear();
        let updatedate=yyyy1+"-"+mm1+"-"+dd1;
        dates.push(updatedate);
        date.setDate(date.getDate() + 1);
      }
      // console.log(dates);
      setLast4months(dates)
      // return dates;
  }
  getDatesInRange();

    

  }, []);
  // let markedDay = {};

  
  const [ dummydate, setDummydate ] = useState([]);
  const navigation = useNavigation();
  
  return (
    <>
      <StatusBar showHideTransition={"none"}></StatusBar>
      <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
        {/* <View style={{flexDirection:"row"}}> */}
        <View style={{ marginBottom:8,height:55,alignItems:"center",justifyContent:"center",flexDirection:"row", backgroundColor:"#104586" }}>
      
        <Icon name="arrow-back" size={30} color="#fff" style={{left:10, position:"absolute"}} onPress={()=>navigation.goBack()}/>
        <Text style={{alignSelf:"center",textAlign:"center",color:"#fff",fontSize:25,fontWeight:"bold",letterSpacing:1}}> Salah Habbit</Text>
        </View>
        
        {/* </View> */}
        <View style={{ width:"100%" }}>
          <CalendarList
            markingType={"custom"}
            markedDates={{
              [calenderdate]:{
              customStyles: {
                container:{
                  // backgroundColor:"red",
                  borderColor:"#fff",
                  borderWidth:2
                },
                text: {
                  color:"white",
                  // fontWeight:"bold"
                }
              }}}
            }
            
            firstDay={1}
            futureScrollRange={0}
            onDayPress={(date) => {onDayPress(date);}}
            pastScrollRange={4}
            style={{ height:hp(44), width: "100%", backgroundColor: "#fff",borderRadius:20,}}
            // maxDate={new Date()}
            maxDate={new Date}
            hideExtraDays={true}
            headerStyle={{ backgroundColor: "#1A2A52", height: 80,paddingBottom:4, borderTopRightRadius:20,borderTopLeftRadius:20 }}
            theme={{
              calendarBackground: "#104586",
              textSectionTitleDisabledColor: "#d9e1e8",
              selectedDayBackgroundColor: "black",
              textSectionTitleColor: "white",
              selectedDayTextColor: "black",
              todayTextColor: "white",
              todayBackgroundColor: "#1A2A52",
              dayTextColor: "white",
              headerText: "white",
              textDayHeaderColor: "white",
              monthTextColor: "white",
              textMonthFontWeight: "bold",
              textDayHeaderFontWeight: "bold",
              textDayFontSize: 14,
              textMonthFontSize: 16,
              textDayHeaderFontSize: 14,
              // textDayHeaderColor: "yellow",
              // textDayHeaderbacgroundColor: "black",
             
              contentStyle:{
                borderBottomRightRadius:10
              },

              
            }}
            
            calendarStyle={{ backgroundColor: "#fff", borderBottomRightRadius:20,borderBottomLeftRadius:20 }}
            contentContainerStyle={{ width: "100%",borderRadius:10 }}
            horizontal={true}
            scrollEnabled={true}
        
          />
          
        </View>
        {/* namaz tracker  */}
        <ScrollView>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              marginBottom: 40,
            }}
          >
            {/* fajr */}
            <View style={[styles.prayerstyle, { backgroundColor: "#4bc0f0" }]}>
              {/* text view */}
              <View style={[styles.textview, { backgroundColor: "#4bc0f0" }]}>
                <View style={styles.namazview}>
                  <Text style={styles.textstyle}>Fajr</Text>
                </View>
                <View style={{ width: Platform.OS === "ios" ? "30%" : "50%" }}>
                  {fjrind || fjrcong ? (
                    <Text style={styles.textalhumstyle}>ٱلْحَمْدُ لِلّٰهِ</Text>
                  ) : null}
                </View>
              </View>
              {/* image and checkbox view */}
              <View style={styles.imageview}>
                <View style={styles.imageviewmain}>
                  <TouchableOpacity
                    style={styles.imageviewmain1}
                    onPress={() => {setFjrcong(!fjrcong); setFjrind(false);}}>
                    <Checkbox
                      style={{ borderRadius: 50, padding: 8 }}
                      value={fjrcong}
                      // onClick={()=> { setFjrcong(!fjrcong); setFjrind(false) color={fjrcong ? "green" : "grey"}}
                      onValueChange={() => { setFjrcong(!fjrcong); setFjrind(false)}} color={fjrcong ? "green" : "grey"}
                      
                      />
                    <Image
                      source={require("../images/cong.png")}
                      style={{ width: 35, height: 35 }}
                    />
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.imageviewmain2}
                    onPress={() => {setFjrind(!fjrind); setFjrcong(false);}}>
                    <Checkbox
                      style={{ borderRadius: 10, padding: 2 }}
                      value={fjrind}
                      onValueChange={() => { setFjrind(!fjrind);setFjrcong(false); }}
                      color={fjrind ? "green" : "grey"} />
                    <Image
                      source={require("../images/ind.png")}
                      style={{ width: 35, height: 35 }} />
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            {/* dhuhr */}
            <View style={[styles.prayerstyle, { backgroundColor: "#edd76a" }]}>
              {/* text view */}
              <View style={[styles.textview, { backgroundColor: "#edd76a" }]}>
                <View style={styles.namazview}>
                  <Text style={styles.textstyle}>Dhuhr</Text>
                </View>
                <View style={{ width: Platform.OS === "ios" ? "30%" : "50%" }}>
                  {dhrind || dhrcong  ? (
                    <Text style={styles.textalhumstyle}>ٱلْحَمْدُ لِلّٰهِ</Text>
                  ) : null}
                </View>
              </View>
              {/* image and checkbox view */}
              <View style={styles.imageview}>
                <View style={styles.imageviewmain}>
                  <TouchableOpacity
                    style={styles.imageviewmain1}
                    onPress={() => { setDhrcong(!dhrcong); setDhrind(false);}}>
                    <Checkbox
                      style={{ borderRadius: 10, padding: 2 }}
                      value={dhrcong}
                      onValueChange={() => {setDhrcong(!dhrcong); setDhrind(false) }}
                      color={dhrcong ? "green" : "grey"}
                    />
                    <Image
                      source={require("../images/cong.png")}
                      style={{ width: 35, height: 35 }}
                    />
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.imageviewmain2}
                    onPress={() => {setDhrind(!dhrind);setDhrcong(false);}}>
                    <Checkbox
                      style={{ borderRadius: 10, padding: 2 }}
                      value={dhrind}
                      onValueChange={() => { setDhrind(!dhrind);setDhrcong(false); }}
                      color={dhrind ? "green" : "grey"}/>
                    <Image
                      source={require("../images/ind.png")}
                      style={{ width: 35, height: 35 }}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            {/* Asr */}
            <View style={[styles.prayerstyle, { backgroundColor: "#f39367" }]}>
              {/* text view */}
              <View style={[styles.textview, { backgroundColor: "#f39367" }]}>
                <View style={styles.namazview}>
                  <Text style={styles.textstyle}>Asr</Text>
                </View>
                <View style={{ width: Platform.OS === "ios" ? "30%" : "50%" }}>
                  {asrind || asrcong ? (
                    <Text style={styles.textalhumstyle}>ٱلْحَمْدُ لِلّٰهِ</Text>
                  ) : null}
                </View>
              </View>
              {/* image and checkbox view */}
              <View style={styles.imageview}>
                <View style={styles.imageviewmain}>
                  <TouchableOpacity
                    style={styles.imageviewmain1}
                    onPress={() => {setAsrcong(!asrcong); setAsrind(false);}} >
                    <Checkbox
                      style={{ borderRadius: 10, padding: 2 }}
                      value={asrcong}
                      onValueChange={() => {  setAsrcong(!asrcong); setAsrind(false);}}
                      color={asrcong ? "green" : "grey"} />
                    <Image
                      source={require("../images/cong.png")}
                      style={{ width: 35, height: 35 }}
                    />
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.imageviewmain2}
                    onPress={() => {setAsrind(!asrind);setAsrcong(false);}}>
                    <Checkbox
                      style={{ borderRadius: 10, padding: 2 }}
                      value={asrind}
                      onValueChange={() => {
                        setAsrind(!asrind); setAsrcong(false);
                      }}
                      color={asrind ? "green" : "grey"}
                    />
                    <Image
                      source={require("../images/ind.png")}
                      style={{ width: 35, height: 35 }}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            {/* maghrib */}
            <View style={[styles.prayerstyle, { backgroundColor: "#8d9bdd" }]}>
              {/* text view */}
              <View style={[styles.textview, { backgroundColor: "#8d9bdd" }]}>
                <View style={styles.namazview}>
                  <Text style={styles.textstyle}>Maghrib</Text>
                </View>
                <View style={{ width: Platform.OS === "ios" ? "30%" : "50%" }}>
                  {maghribind || maghribcong? (
                    <Text style={styles.textalhumstyle}>ٱلْحَمْدُ لِلّٰهِ</Text>
                  ) : null}
                </View>
              </View>
              {/* image and checkbox view */}
              <View style={styles.imageview}>
                <View style={styles.imageviewmain}>
                  <TouchableOpacity
                    style={styles.imageviewmain1}
                    onPress={() => {
                        setMaghribcong(!maghribcong); setMaghribind(false);
                    }}
                  >
                    <Checkbox
                      style={{ borderRadius: 10, padding: 2 }}
                      value={maghribcong}
                      onValueChange={() => {
                          setMaghribcong(!maghribcong); setMaghribind(false);
                      }}
                      color={maghribcong ? "green" : "grey"}
                    />
                    <Image
                      source={require("../images/cong.png")}
                      style={{ width: 35, height: 35 }}
                    />
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.imageviewmain2}
                    onPress={() => {
                      setMaghribind(!maghribind); setMaghribcong(false);
                    }}
                  >
                    <Checkbox
                      style={{ borderRadius: 10, padding: 2 }}
                      value={maghribind}
                      onValueChange={() => {
                        setMaghribind(!maghribind); setMaghribcong(false);
                      }}
                      color={maghribind ? "green" : "grey"}
                    />
                    <Image
                      source={require("../images/ind.png")}
                      style={{ width: 35, height: 35 }}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            {/* Isha */}
            <View style={styles.prayerstyle}>
              {/* text view */}
              <View style={styles.textview}>
                <View style={styles.namazview}>
                  <Text style={styles.textstyle}>Isha</Text>
                </View>
                <View style={{ width: Platform.OS === "ios" ? "30%" : "50%" }}>
                  {ishaind || ishacong? (
                    <Text style={styles.textalhumstyle}>ٱلْحَمْدُ لِلّٰهِ</Text>
                  ) : null}
                </View>
              </View>
              {/* image and checkbox view */}
              <View style={styles.imageview}>
                <View style={styles.imageviewmain}>
                  <TouchableOpacity
                    style={styles.imageviewmain1}
                    onPress={() => {
                        setIshacong(!ishacong);setIshaind(false);
                    }}
                  >
                    <Checkbox
                      style={{ borderRadius: 10, padding: 2 }}
                      value={ishacong}
                      onValueChange={() => {
                          setIshacong(!ishacong);setIshaind(false);
                      }}
                      color={ishacong ? "green" : "grey"}
                    />
                    <Image
                      source={require("../images/cong.png")}
                      style={{ width: 35, height: 35 }}
                    />
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.imageviewmain2}
                    onPress={() => {
                      setIshaind(!ishaind); setIshacong(false);
                    }}
                  >
                    <Checkbox
                      style={{ borderRadius: 10, padding: 2 }}
                      value={ishaind}
                      onValueChange={() => {
                        setIshaind(!ishaind); setIshacong(false);
                      }}
                      color={ishaind ? "green" : "grey"}
                    />
                    <Image
                      source={require("../images/ind.png")}
                      style={{ width: 35, height: 35 }}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            {/* NAFAL  */}
            <View style={[styles.prayerstyle,{backgroundColor:"green"}]}>
              {/* text view */}
              <View style={[styles.textview,{backgroundColor:"green"}]}>
                <View style={styles.namazview}>
                  <Text style={styles.textstyle}>Nafl</Text>
                </View>
                <View style={{ width: Platform.OS === "ios" ? "30%" : "50%" }}>
                  {nafalind? (
                    <Text style={styles.textalhumstyle}>ٱلْحَمْدُ لِلّٰهِ</Text>
                  ) : null}
                </View>
              </View>
              {/* image and checkbox view */}
              <View style={styles.imageview}>
                <View style={[styles.imageviewmain,{alignItems:'center', justifyContent:"center"}]}>
                  <TouchableOpacity
                    style={styles.imageviewmain2}
                    onPress={() => { setNafalind(!nafalind);  }}
                  >
                    <Checkbox
                      style={{ borderRadius: 10, padding: 2 }}
                      value={nafalind}
                      onValueChange={() => {
                        setNafalind(!nafalind); 
                      }}
                      color={nafalind ? "green" : "grey"}
                    />
                    <Image
                      source={require("../images/ind.png")}
                      style={{ width: 35, height: 35 }}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "skyblue",
    // top: 30,
  },
  calContainer: {
    height: hp(54),
    width: '100%',
    backgroundColor: '#273B69',
    borderRadius: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#1A2A52',
  },
  CalHeaderStyle: {
    backgroundColor: '#1A2A52',
    height: 80,
    borderRadius: 10,
    paddingBottom: 4,
  },
  calendarStyle: {
    backgroundColor: '#273B69',
    borderRadius: 10,
  },
  prayerstyle: {
    flexDirection: "row",
    width: "90%",
    margin: 10,
    height: 40,
    backgroundColor: "#074499",
    borderTopLeftRadius: 15,
    borderBottomLeftRadius: 15,
    borderTopRightRadius: 15,
    borderBottomRightRadius: 15,
  },
  textview: {
    backgroundColor: "#074499",
    width: "50%",
    borderTopLeftRadius: 15,
    borderBottomLeftRadius: 15,
    justifyContent: "space-around",
    flexDirection: "row",
    alignItems: "center",
  },
  imageview: {
    flexDirection: "row",
    backgroundColor: "#f5ecec",
    width: "50%",
    justifyContent: "flex-end",
    borderTopLeftRadius: 15,
    borderBottomLeftRadius: 15,
    borderTopRightRadius: 15,
    borderBottomRightRadius: 15,
  },
  namazview:{
    width:wp("20%"),
    left:10,
  },
  textstyle: {
    fontSize: Platform.OS === "ios" ? 19 : RFValue(14,680),
    color: "white",
    // fontWeight: "",
    fontFamily: Platform.OS === "ios" ? "AvenirNext-DemiBold" : null,
    position: "relative",
  },
  textalhumstyle: {
    fontSize: Platform.OS === "ios" ? 19 : RFValue(14,660),
    color: "white",
    fontWeight: "800",
    letterSpacing: 0.4,
  },
  imageviewmain: {
    width: "90%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  imageviewmain1: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    width: "50%",
  },
  imageviewmain2: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "50%",
  },
});

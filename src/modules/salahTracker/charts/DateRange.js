import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Platform,
} from "react-native";
import  React, {useState, useEffect,useContext, useMemo,useRef  } from "react";
import { Dimensions } from "react-native";
import { BarChart } from "react-native-chart-kit";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from "moment";
import SelectDropdown from 'react-native-select-dropdown';
import { ChartsContext } from "../../../contextApi/ApiProvider";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

export default function DataRange() {
  const dropdownRef = useRef(0); 
  const {chartData,setChartData,backupdata,setBackupdata}=useContext(ChartsContext);

  const [fromDatePickerVisible, setFromDatePickerVisibility] = useState(false);
  const [toDatePickerVisible, setToDatePickerVisibility] = useState(false);
  const [fromready, setFromready] = useState(false);
  const [toready, setToready] = useState(false);

  const screenWidth = Dimensions.get("window").width;
  var date = new Date();
  const [fromdate, setFromdate] = useState();
  const [todate, setTodate] = useState();
  const [selectedValue, setSelectedValue] = useState(["All Salah", "Fjar", "Dhuhr","Asr","Maghrib","Isha","Nfal"]);
  let namaz;

  // counting the days from start date to end date
  function getDatesInRange(startDate, endDate) {
    const date = new Date(startDate.getTime());
    // console.log(date,endDate);
    const dates = [];
    while (date <= endDate) {
      dates.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }
    // console.log(dates);
    return dates;
  }

  // filtering and storing the data in an array to display in the chart
  const filterData = async () => {
    dropdownRef.current.reset();
    let fdd, fmm, fyy, tdd, tmm, tyy;
    fdd = fromdate[0] + fromdate[1];
    fmm = fromdate[3] + fromdate[4];
    fyy = fromdate[6] + fromdate[7] + fromdate[8] + fromdate[9];
    tdd = todate[0] + todate[1];
    tmm = todate[3] + todate[4];
    tyy = todate[6] + todate[7] + todate[8] + todate[9];
// console.log("khali");
    if (typeof fromdate === "undefined" && typeof todate === "undefined") {
      alert("Please select date");
      return;
    } else {
      if (fdd>tdd && fmm==tmm && fyy==tyy) {
        alert("From Date cannot be greater than To Date");
        return;
      }
      else if(fdd>tdd && fmm<tmm && fyy==tyy){
        // alert("you can do any thinh")
      }
      else if(fdd>tdd && fmm<tmm && fyy>tyy){
        alert("From Year cannot be greater than To Year");
        return;
      }
      else{
        fdd = fromdate[0] + fromdate[1];
        fmm = fromdate[3] + fromdate[4];
        fyy = fromdate[6] + fromdate[7] + fromdate[8] + fromdate[9];
        tdd = todate[0] + todate[1];
        tmm = todate[3] + todate[4];
        tyy = todate[6] + todate[7] + todate[8] + todate[9];
      }
    }

    const d1 = new Date(fyy + "-" + fmm + "-" + fdd);
    const d2 = new Date(tyy + "-" + tmm + "-" + tdd);

    const dates = getDatesInRange(d1, d2);
    chartvalues(dates).then((value) => {
      setChartData(value);
      setBackupdata(value);
    })    
  };


  // getting the data from the localstorage and storing in the array
  const chartvalues=async(dates)=>{
    try {
      let namaz = [0,0,0,0,0,0];
      for (let i=0; i<dates.length; i++){
        let d = moment(dates[i]).format("YYYY-MM-DD");
        const jsonData = JSON.parse(await AsyncStorage.getItem(d));
        // console.log(jsonData);
        if (jsonData !== null) {
          if ((jsonData.fjrind === true) || (jsonData.fjrcong === true)) {
            namaz[0] = namaz[0] + 1;
          }
          if ((jsonData.dhrind === true) || (jsonData.dhrcong === true)) {
            namaz[1] = namaz[1] + 1;
          }
          if ((jsonData.asrind === true) || (jsonData.asrcong === true)) {
            namaz[2] = namaz[2] + 1;
          }
          if ((jsonData.maghribind === true) || (jsonData.maghribcong === true)) {
            namaz[3] = namaz[3] + 1;
          }
          if ((jsonData.ishaind === true) || (jsonData.ishacong === true)) {
            namaz[4] = namaz[4] + 1;
          }
          if (jsonData.nafalind === true){
            namaz[5] = namaz[5] + 1;
          }
        }
      }
      return namaz;
    } catch (error) {
      
    }
  }

  // making the visibilty true of the date picker
  const fromshowDatePicker = () => {
    setFromDatePickerVisibility(true);
  };
  const toshowDatePicker = () => {
    setToDatePickerVisibility(true);
  };

  // selecting the namaz wise data for chart
  const selectedata = (value) => {
    if (typeof fromdate === "undefined" && typeof todate === "undefined") {
      alert("Please select date");
      return;
    }
    if (parseInt(value) === 0) {
      setChartData(backupdata);
    }
    if (parseInt(value) === 1) {
      setChartData([backupdata[0], 0, 0, 0, 0,0]);
    } else if (parseInt(value) === 2) {
      setChartData([0, backupdata[1], 0, 0, 0,0]);
    } else if (parseInt(value) === 3) {
      setChartData([0, 0, backupdata[2], 0, 0,0]);
    } else if (parseInt(value) === 4) {
      setChartData([0, 0, 0, backupdata[3], 0,0]);
    } else if (parseInt(value) === 5) {
      setChartData([0, 0, 0, 0, backupdata[4],0]);
    } else if (parseInt(value) === 6) {
      setChartData([0, 0, 0, 0, 0,backupdata[5]]);
    }
  };
  const chartConfig = {
    backgroundGradientFrom: "#FFF8EB",
    backgroundGradientTo: "#FFF8EB",
    barPercentage: 0.7,
    height: 600,
    fillShadowGradient: `rgba(113, 12, 05, 1)`,
    fillShadowGradientOpacity: 1,
    decimalPlaces: 0, 
    color: () => `rgba(123, 122, 205,1)`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, 1)`,
    propsForBackgroundLines: {
      strokeWidth: 1,
      strokeDasharray: "0",
      stroke: "lightgreen",
    },
    propsForLabels: {
      fontSize: RFValue(14, 680),
      fontWeight: "500",
      letterSpacing:1
    },
  };
  const data = {
    labels: ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha","Nafl"],
    datasets: [
      {
        data: chartData,
      },
    ],
  };

  

  return (
    <>
      <View style={styles.container}>
        <View style={{ flex: 1, alignItems: "center",width:"100%"}}>
          <Text
           numberOfLines={1}
           adjustsFontSizeToFit
            style={{
              fontSize: RFValue(18, 680),
              fontWeight: "bold",
              letterSpacing: 2,
              color: "black",
              textAlign: "center",
              margin: 10,
            }}
          >
            By Date 
          </Text>
          <View style={styles.datePicker}>
            <View style={styles.fromDate}>
             <TouchableOpacity style={{width:"80%",justifyContent:"center"}} onPress={fromshowDatePicker}>
              <Text
              numberOfLines={1}// add this
              adjustsFontSizeToFit
                style={{
                  fontSize: RFValue(16, 680),
                  fontWeight: "bold",
                  letterSpacing: 2,
                  color: "black",
                  position: "relative",
                  backgroundColor: "lightgreen",
                  padding: 3,
                  textAlign:"center",
                  borderRadius: 4,
                }}>
                From Date
              </Text>
             </TouchableOpacity>
              {fromready ? (
                <Text
                numberOfLines={1}// add this
           adjustsFontSizeToFit
                  style={{
                    fontSize: RFValue(16, 680),
                    fontWeight: "700",
                    letterSpacing: Platform.OS==='ios'? 2:1,
                    color: "teal",
                    width: "80%",
                    padding: 3,
                    position: "relative",
                  }}
                >
                  {fromdate}
                </Text>
              ) : (
                <Text
                numberOfLines={1}// add this
           adjustsFontSizeToFit
           style={{
            fontSize: RFValue(16, 680),
            fontWeight: "700",
            letterSpacing: Platform.OS==='ios'? 2:1,
            color: "teal",
            // marginBottom: 10,
            width: "80%",
            padding: 3,
            // paddingHorizontal: 6,
            position: "relative",
          }}
                ></Text>
              )}
              <DateTimePickerModal
                isVisible={fromDatePickerVisible}
                date={
                  new Date(new Date().getFullYear(), new Date().getMonth(), 1)
                }
                headerTextIOS="Estimated Start Date"
                mode="date"
                maximumDate={new Date()}
                onConfirm={(date) => {
                  setFromdate(moment(date).format("DD-MM-YYYY"));
                  setFromready(true);
                  setFromDatePickerVisibility(false);
                }}
                onCancel={() => {
                  setFromDatePickerVisibility(false);
                }}
              />
            </View>
            <View style={styles.toDate}>
              <TouchableOpacity style={{width:"80%",justifyContent:"center"}} onPress={toshowDatePicker}>
              <Text
              numberOfLines={1}// add this
              adjustsFontSizeToFit
                style={{
                  fontSize: RFValue(16, 680),
                  fontWeight: "bold",
                  // letterSpacing: 2,
                  color: "black",
                  // marginBottom: 10,
                  // position: "relative",
                  backgroundColor: "lightgreen",
                  padding: 3,
                  textAlign:"center",
                  borderRadius: 4,
                }}>
                   To Date
              </Text>
              </TouchableOpacity>

              {toready ? (
                <Text
                numberOfLines={1}// add this
           adjustsFontSizeToFit
           style={{
            fontSize: RFValue(16, 680),
            fontWeight: "700",
            letterSpacing: Platform.OS==='ios'? 2:1,
            color: "teal",
            // marginBottom: 10,
            width: "80%",
            padding: 3,
            // paddingHorizontal: 6,
            position: "relative",
          }}
                >
                  {todate}
                </Text>
              ) : (
                <Text
                numberOfLines={1}// add this
           adjustsFontSizeToFit
           style={{
            fontSize: RFValue(16, 680),
            fontWeight: "700",
            letterSpacing: Platform.OS==='ios'? 2:1,
            color: "teal",
            // marginBottom: 10,
            width: "80%",
            padding: 3,
            // paddingHorizontal: 6,
            position: "relative",
          }}
                ></Text>
              )}
              <DateTimePickerModal
                isVisible={toDatePickerVisible}
                // date={}
                headerTextIOS="Estimated Start Date"
                mode="date"
                maximumDate={new Date()}
                onConfirm={(e) => {
                  // console.log("A date has been picked: ", e);
                  setTodate(moment(e).format("DD-MM-YYYY"));
                  setToready(true);
                  setToDatePickerVisibility(false);
                }}
                onCancel={() => {
                  setToDatePickerVisibility(false);
                }}
              />
            </View>
          </View>

          <View style={{ width: "80%", }}>
            <Text style={styles.selectSalah}>Or Select Salah</Text>
            <View style={styles.salahContainer}>
              
               <SelectDropdown
              //  defaultValue={"All Salah"}
            data={selectedValue}
            defaultValueByIndex={0}
            
            searchPlaceHolder="Select Salah"
            onSelect={(selectedItem, index) => {
              selectedata(index);
            
            }}
            defaultButtonText={selectedValue[0]}
            ref={dropdownRef}
            buttonStyle={styles.dropdown3BtnStyle}
           buttonTextStyle={{color:'black',fontSize:RFValue(17, 680),fontWeight:'bold',letterSpacing:2}}
            dropdownStyle={styles.dropdown3DropdownStyle}
            rowStyle={styles.dropdown3RowStyle}
           rowTextStyle={{fontSize:RFValue(20, 680), color:"navy",fontWeight:"bold"}}
           selectedRowTextStyle={{backgroundColor:"lightgreen",color:"black",fontWeight:"bold", borderRadius:20}}
          />
            </View>
            <View>
              <TouchableOpacity style={styles.Btn} onPress={() => filterData()}>
                <Text style={{ color: "white" }}>Filter</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.Btn} onPress={()=>{setFromdate(); setTodate(); setBackupdata([]); setChartData([]);dropdownRef.current.reset();}}>
                <Text style={{ color: "white" }}>Clear</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        
        <BarChart
          style={{ bottom: 20,backgroundColor:"#FFF8EB"}}
          fromZero={true}
          
          data={data}
          width={screenWidth}
          height={200}
          chartConfig={chartConfig}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // top: 1,
    backgroundColor: "#FFF8EB",
    // width: 360,
  },
  datePicker: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    width: "90%",
    margin:10
    // flex:1
  },
  fromDate: {
    // flex:.4,
    // height:30,
    justifyContent: "center",
    alignItems: "center",
    width: "50%",
    // backgroundColor:"#000",
  },
  toDate: {
    // flex:.4,
    justifyContent: "center",
    alignItems: "center",
    width: "50%",
  },
  selectSalah: {
    // flex:1,
    flexDirection:"column",
    fontSize: RFValue(17, 680),
    fontWeight: "600",
    letterSpacing: 2,
    textAlign: "center",
  },
  salahContainer: {
    margin:2,
    marginLeft:0,
    width: "100%",
    borderRadius: 10,
    backgroundColor: "lightblue",
  },
  Btn: {
    marginTop: 5,
    alignItems: "center",
    backgroundColor: "darkblue",
    borderRadius: 5,
    padding: 8,
    width: "100%",
    paddingVertical: 10,
  },
  dropdown3BtnStyle: {
    width: '100%',
    height: 35,
    backgroundColor: 'lightgreen',
    paddingHorizontal: 0,
    borderRadius: 5,
  },
  dropdown3BtnTxt: {
    color: 'green',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: RFValue(24, 680),
    marginHorizontal: 12,
  },
  dropdown3DropdownStyle: {backgroundColor: '#FFF8EB',borderRadius:20},
  dropdown3RowStyle: {
    backgroundColor: '#FFF8EB',
    // borderBottomWidth:5,
    borderColor: '#888',
    height: 40,
    borderRadius:20,
    color:"green"
  },
  
});

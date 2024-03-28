import { StyleSheet, Dimensions, Alert, Switch, Text,View } from "react-native";
import { React, useState, useEffect } from "react";
import { StackedBarChart } from "react-native-chart-kit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from "@react-navigation/native";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
export default function Monthly() {
  const [chartData, setChartData] = useState([[]]);
  const [monthname,setMonthname]=useState([]);
  const isFocused = useIsFocused();
  // const screenWidth = Dimensions.get("window").width;

  let namaz = [
    [0, 0, 0, 0, 0,0],
    [0, 0, 0, 0, 0,0],
    [0, 0, 0, 0, 0,0],
    [0, 0, 0, 0, 0,0],
  ];
  useEffect(() => {

    // AsyncStorage.clear();
    (async () => {
      try{
        // await AsyncStorage.getItem()
        let date = new Date();
        // let cmnth=date.getMonth()+1; // current month number
        // let clastdate=new Date(new Date().getFullYear(), cmnth, 0).getDate(); // last date of current month
        let monthname=[(date.getMonth()-2),(date.getMonth()-1),(date.getMonth()),(date.getMonth()+1)];
        let monthslastdates=[(new Date(new Date().getFullYear(), date.getMonth()-2, 0).getDate()),(new Date(new Date().getFullYear(), date.getMonth()-1, 0).getDate()),(new Date(new Date().getFullYear(), date.getMonth(), 0).getDate()),(new Date(new Date().getFullYear(), date.getMonth()+1, 0).getDate())]
        // console.log("monthsname",monthname);
        // console.log("clastdate",monthslastdates[0]);
        setMonthname(monthname);

        for (let i = 1; i <= monthslastdates[0]; i++) {
          let date = new Date();
          const yyyy = date.getFullYear();
          let mm = monthname[0]; // Months start at 0!
          let dd = i;
          if (dd < 10) dd = "0" + dd;
          if (mm < 10) mm = "0" + mm;
          let d = yyyy + "-" + mm + "-" + dd;
          const jsonData = JSON.parse(await AsyncStorage.getItem(d));
          if (jsonData !== null) {
            if ((jsonData.fjrind === true) || (jsonData.fjrcong === true)) {
              namaz[0][0] = namaz[0][0] + 1;
            }
            if ((jsonData.dhrind === true) || (jsonData.dhrcong === true)) {
              namaz[0][1] = namaz[0][1] + 1;
            }
            if ((jsonData.asrind === true) || (jsonData.asrcong === true)) {
              namaz[0][2] = namaz[0][2] + 1;
            }
            if ((jsonData.maghribind === true) || (jsonData.maghribcong === true)) {
              namaz[0][3] = namaz[0][3] + 1;
            }
            if ((jsonData.ishaind === true) || (jsonData.ishacong === true)) {
              namaz[0][4] = namaz[0][4] + 1;
            }
            if (jsonData.nafalind === true) {
              namaz[0][5] = namaz[0][5] + 1;
            }
          }
        }
       

        for (let i = 1; i <= monthslastdates[1]; i++) {
          let date = new Date();
          const yyyy = date.getFullYear();
          let mm = monthname[1]; // Months start at 0!
          let dd = i;
          if (dd < 10) dd = "0" + dd;
          if (mm < 10) mm = "0" + mm;
          let d = yyyy + "-" + mm + "-" + dd;
            const jsonData = JSON.parse(await AsyncStorage.getItem(d));
          if (jsonData !== null) {
            if ((jsonData.fjrind === true) || (jsonData.fjrcong === true)) {
              namaz[1][0] = namaz[1][0] + 1;
            }
            if ((jsonData.dhrind === true) || (jsonData.dhrcong === true)) {
              namaz[1][1] = namaz[1][1] + 1;
            }
            if ((jsonData.asrind === true) || (jsonData.asrcong === true)) {
              namaz[1][2] = namaz[1][2] + 1;
            }
            if ((jsonData.maghribind === true) || (jsonData.maghribcong === true)) {
              namaz[1][3] = namaz[1][3] + 1;
            }
            if ((jsonData.ishaind === true) || (jsonData.ishacong === true)) {
              namaz[1][4] = namaz[1][4] + 1;
            }
            if (jsonData.nafalind === true) {
              namaz[1][5] = namaz[1][5] + 1;
            }
          }
        }

        for (let i = 1; i <= monthslastdates[2]; i++) {
          let date = new Date();
          const yyyy = date.getFullYear();
          let mm = monthname[2]; // Months start at 0!
          let dd = i;
          if (dd < 10) dd = "0" + dd;
          if (mm < 10) mm = "0" + mm;
          let d = yyyy + "-" + mm + "-" + dd;
          const jsonData = JSON.parse(await AsyncStorage.getItem(d));
          if (jsonData !== null) {
           // console.log(jsonData.fjrind);
            if ((jsonData.fjrind === true) || (jsonData.fjrcong === true)) {
              // console.log("fajr true");
              namaz[2][0] = namaz[2][0] + 1;
            }
            if ((jsonData.dhrind === true) || (jsonData.dhrcong === true)) {
              namaz[2][1] = namaz[2][1] + 1;
            }
            if ((jsonData.asrind === true) || (jsonData.asrcong === true)) {
              namaz[2][2] = namaz[2][2] + 1;
            }
            if ((jsonData.maghribind === true) || (jsonData.maghribcong === true)) {
              namaz[2][3] = namaz[2][3] + 1;
            }
            if ((jsonData.ishaind === true) || (jsonData.ishacong === true)) {
              namaz[2][4] = namaz[2][4] + 1;
            }
            if (jsonData.nafalind === true) {
              namaz[2][5] = namaz[2][5] + 1;
            }
          } 
      }

        for (let i = 1; i <= monthslastdates[3]; i++) {
          let date = new Date();
          const yyyy = date.getFullYear();
          let mm = monthname[3]; // Months start at 0!
          let dd = i;
          if (dd < 10) dd = "0" + dd;
          if (mm < 10) mm = "0" + mm;
          let d = yyyy + "-" + mm + "-" + dd;
          const jsonData = JSON.parse(await AsyncStorage.getItem(d));
          if (jsonData !== null) {
            if ((jsonData.fjrind === true) || (jsonData.fjrcong === true)) {
              namaz[3][0] = namaz[3][0] + 1;
            }
            if ((jsonData.dhrind === true) || (jsonData.dhrcong === true)) {
              namaz[3][1] = namaz[3][1] + 1;
            }
            if ((jsonData.asrind === true) || (jsonData.asrcong === true)) {
              namaz[3][2] = namaz[3][2] + 1;
            }
            if ((jsonData.maghribind === true) || (jsonData.maghribcong === true)) {
              namaz[3][3] = namaz[3][3] + 1;
            }
            if ((jsonData.ishaind === true) || (jsonData.ishacong === true)) {
              namaz[3][4] = namaz[3][4] + 1;
            }
            if (jsonData.nafalind === true) {
              namaz[3][5] = namaz[3][5] + 1;
            }
          }
        }



        
            setChartData(namaz)

      }
      catch{

      }
    
    })();
  }, [isFocused]);

  
  const chartConfig = {
    backgroundGradientFrom: "#fff",
    backgroundGradientTo: "#fff",
    backgroundGradientFromOpacity: 1,
    barPercentage: 0.6,
    fillShadowGradient: '#1A2A52',
    fillShadowGradientOpacity: 1,
    decimalPlaces: 0, // optional, defaults to 2dp
    color: (opacity = 1) => "#1A2A52",
    labelColor: (opacity = 1) => "#1A2A52",
    propsForBackgroundLines: {
      strokeWidth: 1,
      stroke: "#1A2A52",
      strokeDasharray: "1",
      // color: "#1A2A52",
      
      
    },
    propsForLabels: {
      fontSize: RFValue(12, 680),
      letterSpacing: 2,
      fontWeight: "bold",
      fontFamily: "Roboto",
      fontStyle: "normal",
      


    },
  };
const monthstringnames=["Jan",
"Feb",
"Mar",
"Apr",
"May",
"Jun",
"Jul",
"Aug",
"Sep",
"Oct",
"Nov",
"Dec",]
  const data = {
    labels: [
      monthstringnames[monthname[0]-1],monthstringnames[monthname[1]-1],monthstringnames[monthname[2]-1],monthstringnames[monthname[3]-1]
    ],
    legend: ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha","Nafl"],
    data: chartData,
    barColors: ["#4bc0f0", "#edd76a", "#f39367", "#8d9bdd", "#965498","green"],
  };


  return (
    <View style={styles.container}>
      <StackedBarChart
        style={{}}
        data={data}
        width={wp(90)}
        height={hp(70)}
        withHorizontalLabels={false}
        chartConfig={chartConfig}
        // fromZero={true}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
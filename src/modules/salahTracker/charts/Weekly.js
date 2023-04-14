import { StyleSheet, Dimensions, Alert,Text, View, FlatList } from 'react-native';
import {React,useState,useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import { setDate } from 'date-fns';
import { useIsFocused } from '@react-navigation/native';
import {
  BarChart
} from "react-native-chart-kit";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
// import { BarChart } from 'react-native-charts-wrapper';
import { RNSVGLinearGradient } from 'react-native-svg';

// let Cdata=[4, 5, 2, 3, 5];
export default function Weekly({navigation}) {

          const[chartData,setChartData]=useState([]);
          const[isready,setIsready]=useState(false);
          const isFocused = useIsFocused();

          useEffect(() => {
            let namaz=[0,0,0,0,0,0];
              ((async()=>{ 
                try {
                 
                for (let i=1; i<8; i++){
                    let date = new Date();
                    date = date.setDate(date.getDate() - i)
                    date = new Date(date);
                    const yyyy = date.getFullYear();
                    let mm = date.getMonth() + 1; // Months start at 0!
                    let dd = date.getDate();
            
                    if (dd < 10) dd = '0' + dd;
                    if (mm < 10) mm = '0' + mm;
            
                    let d = yyyy + '-' + mm + '-' + dd;
                    const jsonData= JSON.parse(await AsyncStorage.getItem(d));
                     console.log(jsonData);
                    if(jsonData!=null){
                    if ((jsonData.fjrind===true)||(jsonData.fjrcong===true)){
                      namaz[0]=namaz[0]+1;
                    }
                    else{
                      namaz[0]=namaz[0]+0;
                    }
                    if ((jsonData.dhrind===true) || (jsonData.dhrcong===true)){
                      namaz[1]=namaz[1]+1;
                    }
                    else{
                      namaz[1]=namaz[1]+0;
                    }
                    if ((jsonData.asrind===true)|| (jsonData.asrcong===true)){
                      namaz[2]=namaz[2]+1;
                    }
                    else{
                      namaz[2]=namaz[2]+0;
                    }
                    if ((jsonData.maghribind===true)||(jsonData.maghribcong===true)){
                      namaz[3]=namaz[3]+1;
                    }
                    else{
                      namaz[3]=namaz[3]+0;
                    }
                    if ((jsonData.ishaind===true)|| (jsonData.ishacong===true)){
                      namaz[4]=namaz[4]+1;
                    }
                    else{
                      namaz[4]=namaz[4]+0;
                    }
                    if (jsonData.nafalind===true){
                      namaz[5]=namaz[5]+1;
                    }
                    else{
                      namaz[5]=namaz[5]+0;
                    }
                  }
                } 
                setChartData(namaz);
                // console.log("namaz",chartData);
  
                } catch (error) {
                  
                }
            })());
                }, [isFocused]);


                const screenWidth = Dimensions.get("window").width;
        
                const chartConfig = {
                // backgroundGradientFrom: "white",
                backgroundGradientFrom: "#273B69",
                backgroundGradientTo: "#273B69",
                backgroundGradientFromOpacity: .8,
                barPercentage: 0.75,
                fillShadowGradient: 'whitesmoke',
                fillShadowGradientOpacity: 1,
                decimalPlaces: 0, // optional, defaults to 2dp
                // color: () => `rgba(0, 0, 0,1)`,
                color: () => `rgba(255, 255, 255,1)`,
                TextStyle: {},
                labelColor: (opacity = .9) => `rgba(255,255,255, 1)`,
                propsForBackgroundLines: {
                  strokeWidth: .8,
                  stroke: "#e3e3e3",
                  strokeDasharray: ".2",
                },
                propsForLabels: {
                  fontSize: RFValue(14,680),
                  fontWeight: "650",
                  letterSpacing: 1,
                },
              };
              
            const data = {
                labels: ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha","Nafl"],
                datasets: [
                  {
                    data: chartData
                  }
                ]
              };
              return(
              
                   <BarChart 
                   style={styles.container}
                    fromZero={true}
                    data={data?data:[0,0,0,0,0,0]}
                   
                    width={screenWidth}
                    showValuesOnTopOfBars={true}
                    height={hp(70)}
                    chartConfig={chartConfig} 
                    barPercentage={1}
                    
                    />
                   

                  

                  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor:"#FFF8EB",
    backgroundColor:"#273B69",
    // margin:10,
    // top:5,
    alignItems: 'center',
    justifyContent: 'center',
  }
})
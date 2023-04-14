import { StyleSheet,Dimensions } from 'react-native';
import {React,useState,useEffect,} from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import DateRange from './DateRange';
import Weekly from './Weekly';
import Monthly from "./Monthly"
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const Tab = createMaterialTopTabNavigator();

export default function Chart() {
  const[loading, setLoading]=useState(false);
  const screenWidth = Dimensions.get("window").width;
  
  return (
  <>
      <Tab.Navigator style={{width:screenWidth,flex:1}}
        screenOptions={{
        tabBarActiveTintColor:"teal",
        
        tabBarInactiveTintColor:"grey",
        tabBarPressColor:"black",
      
        // tabBarInactiveTintColor:"#ADCF9F",
        tabBarLabelStyle: { fontSize: RFValue(13, 680) ,fontWeight:"800",color:"whitesmoke", },
        tabBarStyle: { backgroundColor: 'black',height:hp(6),width:screenWidth,borderTopWidth:0,shadowColor: '#22da3b',shadowOpacity: 1,elevation: 1,shadowRadius: 3,shadowOffset: { height: 2, width: 67 } },tabBarIndicatorContainerStyle:{backgroundColor:"#1A2A52"},  
      }}>
        <Tab.Screen name="Weekly" component={Weekly} />
        <Tab.Screen name="Monthly" component={Monthly}  />
        <Tab.Screen  name="DateRange" component={DateRange} />
      </Tab.Navigator>    
  </>
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    // backgroundColor:"#1A2A52"
    // backgroundColor:"#273B69"
  }
})
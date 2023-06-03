
import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, TextInput } from 'react-native';

import duaData from './../json/GuidanceDua.json';
import { heightPercentageToDP as HP, widthPercentageToDP as WP, scale as SC} from '../../../utills/pixelratio';
import Icon from 'react-native-vector-icons/MaterialIcons';

import DuaDetails from '../components/DuaDetails';
import azkar_massa from './../json/azkar_massa.json'
import azkr_sabah from './../json/azkar_sabah.json';
import GeneralDua from './../json/GeneralDua.json';
import PostPrayer from './../json/PostPrayer_azkar.json';
import QuraniDuas from './../json/QuranicDuas.json';

import { useNavigation } from '@react-navigation/native';

import {searchDua} from '../components/SearchFunction';


const DuaScreen = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');
  const categories = Object.keys(duaData);
  const data=[{"name":'Morning Adhkar',"data":azkr_sabah},{"name":'Evening Adhkar',"data":azkar_massa}, {"name":'Namaz Adhkar', "data":PostPrayer}, {"name":'Quran Adhkar',"data":QuraniDuas}, {"name":"General Dua's","data":GeneralDua}]

  const handleInput=(text)=>{
    setSearchQuery(text);
    searchDua(searchQuery)
  }

  

  return (
    <View style={styles.container}>
      <View style={{width:"100%",backgroundColor:"#104586",height:HP('8'), justifyContent:"center", alignItems:"center",}}>

      <Text style={{ color:"#fff",
        fontSize:SC(23),fontWeight:"bold",letterSpacing:1,textAlign:"center"}}>Dhikr & Dua's</Text>
        </View>

        <FlatList
          data={data}
          style={{ backgroundColor: "#fff",flex:1,  }}
          keyExtractor={(item) => item}
          numColumns={2} // Set the number of columns to 2
          columnWrapperStyle={{ justifyContent: "space-between" }} // Align items in columns
          renderItem={({ item,index }) => {
            return (
              <TouchableOpacity style={{
                backgroundColor: "#104586",
                borderWidth: 4,
                borderColor: "#104586",
                justifyContent:"center",
                borderRadius: 10,
                marginHorizontal: WP('1'),
                width: WP('45'),
                flexDirection: "row",
                top: HP('5'),
                flex:1,
                marginBottom: HP('2'),
              }} 
                onPress={() => {
                  if (index>3){
                    // navigation.navigate('SubahShamAzkar', { item: item.data, name:item.name });
                    navigation.navigate('DuaDetails',{item:item.data});
                  }
                  else{
                    navigation.navigate('SubahShamAzkar', { item: item.data, name:item.name });
                  }
                }}
              >
                <Text
                  style={{
                    width: WP('40'),
                    height:HP('15'),
                    fontSize: SC(18),
                    fontWeight: "bold",
                    color: "#fff",
                    textAlign: "center",
                    paddingHorizontal: WP('1'),
                    paddingVertical: HP('5'),
                  }}
                  >
                  {item.name}
                </Text>
              {/* </View> */}
                  </TouchableOpacity>
            );
          }}
        />
     
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: 16,
    // backgroundColor:"white",
  },
  categoryItem: {
    // marginRight: 10,
    paddingHorizontal: 12,
    // marginTop: HP('2'),
    // paddingVertical: 8,
    borderRadius: 10,
    backgroundColor: '#166990',
    // width: WP('55'),
    height: HP('10'),
    marginRight: 16,
    justifyContent:"center",
    // alignItems: 'center',
    marginBottom:HP('10'),
    borderColor:"#fff",
    borderWidth:1,
    // flex:
  },
  categoryTitle: {
    fontSize: SC(20),
    flexWrap:"wrap",
    // alignItems:"center",
    // alignSelf:"center",
    // justifyContent:"center",
    color: '#000',
    // textAlign:"center",
  },
  duaItem: {
    // flex:1,
    marginHorizontal: 16,
    marginTop:HP("3"),
    borderRadius:10,
    // marginBottom: HP('2'),
    bottom:HP('2'),
    // alignItems: 'center',
    paddingVertical:HP('1'),
    paddingHorizontal: 22,
    backgroundColor: 'lightgrey',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
  },
  noDuasText: {
    fontSize: 16,
    fontStyle: 'italic',
    alignSelf: 'center',

  }});

  export default DuaScreen
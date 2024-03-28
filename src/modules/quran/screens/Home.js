import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  BackHandler,
  ActivityIndicator,
} from 'react-native';
// import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState} from 'react';
import {widthPercentageToDP as WP} from '../../../utills/pixelratio';
import {heightPercentageToDP as HP} from '../../../utills/pixelratio';
import {useHeaderHeight} from '@react-navigation/elements';

import QuickAcces from '../components/QuickAcces';
import LastReadSurah from '../components/LastReadSurah';


import {QuranHomeTabNavigator} from '../components/QuranHomeTabNavigator';
import { useNavigation,useIsFocused } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';



const Home = () => {
  const headerHeight = useHeaderHeight();
  const navigation=useNavigation();
  const [lastRead, setLastRead] = useState(null);
  const isFocused = useIsFocused();


  useEffect(() => {
      // Your code here
    
      getLastReadData();
    }, [isFocused])
    BackHandler.addEventListener('hardwareBackPress', () => {
      
      navigation.navigate('QuranHome');
    })
    
    const getLastReadData = async () => {
      try {
        const lastReadAsync = await AsyncStorage.getItem('lastReadAya');
        // if (lastRead !== null) {
          setLastRead(JSON.parse(lastReadAsync));
          setIfTimeOuts(true);
        // console.log(lastReadAsync,"last read", );
      // }
    } catch (e) {
      console.log(e);
    }
  }
  

  const [isSearchActive, setIsSearchActive] = useState(true);
  const [searchText, setSearchText] = useState('');
  const [iftimeouts, setIfTimeOuts] = useState(false);
 

  return (
    <>
      
          <View style={{flex:1,}}>
          <View 
          style={styles.header}
          >
            <TouchableOpacity onPress={()=> navigation.goBack()}>
              <Image
                source={require('../images/back.png')}
                style={[styles.images,{tintColor:"white"}]}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {
              setIsSearchActive(false);
              //  navigation.navigate('SearchScreen')
              }}
               >
              <Text style={styles.headText}>Quran</Text>
            </TouchableOpacity>

            {/* {!isSearchActive ? ( */}
              <TouchableOpacity
                onPress={() => {
                  // setIsSearchActive(false);
                   navigation.navigate('SearchScreen')}}>
                <Image
                  source={require('../images/search.png')}
                  style={[styles.images,{tintColor:"white"}]}
                />
              </TouchableOpacity>
            
          </View>
        
      
      {/* </ScrollView> */}
      <View style={styles.lastRead}>
       
        <LastReadSurah lastRead={lastRead}/>
      </View>

      <View style={styles.QuickAcess}>
        <Text style={{color: 'grey', fontWeight: '700',marginLeft:WP('1.5')}}>QUICK ACCESS</Text>
        <View style={styles.tabsContainer}>
          <QuickAcces />
        </View>
      </View>
      <View style={styles.heading}>
        
        {iftimeouts==true? <QuranHomeTabNavigator />:null}        
      </View>
</View>
    
    </>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    // paddingTop:Platform.OS==='android'?StatusBar.currentHeight:0,
  },
  header: {
    // flex: 1 ,
    // backgroundColor:'#FAFAFC',
    backgroundColor: '#104586',
    flexDirection: 'row',
    justifyContent: 'space-between',
    // position:"absolute"
  },
  headText: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    // color: '#0F2247',
  },
  images: {
    width: WP('3'),
    height: HP('3'),
    padding: WP('4'),
    margin: WP('2'),
    tintColor: '#004C9B',
    // backgroundColor:"black",
  },
  lastRead: {
    // flex: 1,
    marginTop: WP('3'),
    width: WP('100'),
    height: HP('23'),
    justifyContent: 'center',
    alignItems: 'center',
  },

  QuickAcess: {
    padding: WP('4'),
    // flex: 1,
  },
  tabsContainer: {
    width: '100%',
    marginTop: WP('4'),
  },
  heading: {
    // flex: Platform.OS === 'ios' ? 2/1.5 : 1/2,
    flex: 1,
    // backgroundColor:"red"
  },
  names: {
    flexDirection: 'row',
    // justifyContent:"space-evenly",
    width: WP('100'),
    alignItems: 'center',
    textAlign: 'center',
    padding: WP('3'),
    paddingLeft: WP('6'),
    // lineHeight:13,
    borderColor: '#d3d3d3',
    borderBottomWidth: WP('0.3'),
    // marginTop:10,
    // marginBottom:10
  },
});

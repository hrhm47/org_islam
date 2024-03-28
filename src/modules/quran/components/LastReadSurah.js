import { StyleSheet, Text, View,ImageBackground,Image,TouchableOpacity } from 'react-native'
import React from 'react'

import {widthPercentageToDP as WP} from '../../../utills/pixelratio';
import {heightPercentageToDP as HP} from '../../../utills/pixelratio';
import {scale as SC} from '../../../utills/pixelratio';

const LastReadSurah = ({lastRead}) => {
  return (
    <ImageBackground
    source={require('../images/bg.png')}
    style={styles.bg}
    borderRadius={6}>
    <View style={styles.parent}>
      <View style={styles.left}>
        <View style={styles.first}>
          <Image
            source={require('../images/quran-read.png')}
            style={{tintColor: 'white', width: WP(6.5), height: HP(5.5)}}
          />
          <Text style={[styles.text, {paddingHorizontal:WP('4')}]}>Last Read</Text>
        </View>
        <TouchableOpacity style={[styles.second, styles.text]}>
          <Text style={[styles.text, { fontSize: SC(23),  alignSelf:"center", fontFamily:'Amiri-Regular'}]}>
             {lastRead?" ("+lastRead.paraId+") "+lastRead.ParaName:"Juz Name"}
          </Text>
        </TouchableOpacity>
        <View style={styles.third}>
          <Text
            style={[
              styles.text,
              {letterSpacing: WP('0.5'), marginTop: WP('2')},
            ]}>
            Ayah No: {lastRead?lastRead.ayaId:"1"}
          </Text>
        </View>
      </View>
      <View style={styles.right}>
        <Image
          source={require('../images/reading-quran.png')}
          style={styles.quran}
        />
      </View>
    </View>
  </ImageBackground>
  )
}

export default LastReadSurah

const styles = StyleSheet.create({
    bg: {
        width: WP('96'),
        borderRadius: 20,
        height: HP('22'),
      },
      parent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: WP('4'),
        marginLeft: WP('1'),
      },
      first: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
      },
      second: {
        
      },
      text: {
        color: 'white',
        fontSize: SC(15),
      
      },
      quran: {
        width: WP('36'),
        height: HP('16'),
        tintColor: 'white',
        resizeMode: 'contain',
      },
})
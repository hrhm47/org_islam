import React from 'react';
import { View, StyleSheet,Text } from 'react-native';
import names99 from '../../../utills/data/namesOsAllah/names99.json';
import NamesOfAllah from '../component/NamesOfAllah';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {
  widthPercentageToDP as WP,
  heightPercentageToDP as HP,
  scale as SC,
} from '../../../utills/pixelratio';
import { useNavigation } from '@react-navigation/native';
const NameHome = () => {
  const navigation = useNavigation();
//   const namesOfAllahData = [
//     // Add the JSON data of the names of Allah here
//     // ...
//   ];

  return (
    <View style={styles.container}>
        <View
        style={{
          width: '100%',
          backgroundColor: '#104586',
          height: HP('8'),
          justifyContent: 'space-evenly',
          alignItems: 'center',
          flexDirection: 'row',
        }}>
          <Icon name="arrow-back" size={SC(30)} color="#fff" style={{}} onPress={()=>navigation.goBack()}/>
        <Text
          style={{
            color: '#fff',
            fontSize: SC(23),
            fontWeight: 'bold',
            letterSpacing: 1,
            textAlign: 'center',
          }}>
          99 Names of Allah
        </Text>
            <Icon name="arrow-back" size={SC(30)} color="transparent" style={{}}/>
      </View>
      {/* <Icon name="arrow-back" size={20} color="#fff" style={{left:0, position:"absolute"}} onPress={()=>naviagtion.goBack()}/>
        <Text style={{fontSize:30,fontWeight:'bold',textAlign:'center',marginBottom:10,backgroundColor:"#104586", color:"white",height:50}}>99 Names of Allah</Text> */}
      <NamesOfAllah data={names99} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // flexDirection:'row',
  },
});

export default NameHome;

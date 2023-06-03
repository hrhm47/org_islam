import React from 'react';
import { View, StyleSheet,Text } from 'react-native';
import names99 from '../../../utills/data/namesOsAllah/names99.json';
import NamesOfAllah from '../component/NamesOfAllah';
const NameHome = () => {
//   const namesOfAllahData = [
//     // Add the JSON data of the names of Allah here
//     // ...
//   ];

  return (
    <View style={styles.container}>
        <Text style={{fontSize:30,fontWeight:'bold',textAlign:'center',marginBottom:10,backgroundColor:"#104586", color:"white",height:50}}>99 Names of Allah</Text>
      <NamesOfAllah data={names99} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default NameHome;

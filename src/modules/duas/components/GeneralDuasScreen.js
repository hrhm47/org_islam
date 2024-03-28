import React,{useState} from 'react';
import { StyleSheet, Text, View,FlatList,TouchableOpacity } from 'react-native';
import { widthPercentageToDP as WP, heightPercentageToDP as HP, scale as SC } from '../../../utills/pixelratio';
// import duaData from './../json/GuidanceDua.json';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
// import { useNavigation } from '@react-navigation/native';

const GeneralDuasScreen = ({route}) => {
  const navigation = useNavigation();

    const { description, detail, dua_arabic, keywords, reference, title } = route.params.item;
  return (
    <>
      <View style={{width:WP('100'),height:HP("8"), backgroundColor:"#104586",alignItems:"center", justifyContent:"space-around", flexDirection:"row"}}>
          <Icon name="arrow-back" size={SC(30)} color="#fff" style={{left:10}} onPress={()=>navigation.goBack()}/>
          <Text style={styles.title}>{title}</Text>
        </View>
    <View style={styles.container}>
      <Text style={styles.subTitle}>Arabic:</Text>
      <Text style={styles.content}>{dua_arabic}</Text>
      <Text style={styles.subTitle}>Description:</Text>
      <Text style={styles.content}>{description}</Text>
      <Text style={styles.subTitle}>Detail:</Text>
      <Text style={styles.content}>{detail}</Text>
      {/* <Text style={styles.subTitle}>Keywords:</Text>
      <Text style={styles.content}>{keywords.join(', ')}</Text> */}
      <Text style={styles.subTitle}>Reference:</Text>
      <Text style={styles.content}>{reference}</Text>
    </View> 
    </>
  )
}

export default GeneralDuasScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#fff',
      },
      title: {
        fontSize: SC(19),
        flexWrap: 'wrap',
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#fff',
        alignSelf:"center",
        paddingHorizontal: 10,
        textAlign:"center",
        // backgroundColor: '#104586',
      },
      subTitle: {
        backgroundColor: 'lightgray',
        paddingHorizontal: 10,
        fontSize: SC(18),
        fontWeight: 'bold',
        marginTop: 17,
        color: '#104586',
    
      },
      content: {
        // backgroundColor: 'lightgray',
        marginTop: 6,
        paddingVertical: 7,
        fontSize: SC(19),
        color: 'black',
        fontFamily:'Amiri-Regular'
      },
})
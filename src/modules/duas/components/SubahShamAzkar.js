import React from 'react';
import { StyleSheet, Text, View,FlatList } from 'react-native';
import { widthPercentageToDP as WP, heightPercentageToDP as HP, scale as SC } from '../../../utills/pixelratio';
const SubahShamAzkar = ({ route }) => {
  const data = route.params.item;
   
  const dataName=route.params.name
  if (dataName=='Quran Adhkar') {
    
  }
  
console.log('route.params.item',data);

  return (
    <>
        <View style={{width:WP('100'),height:HP("8"), backgroundColor:"#104586",alignItems:"center", justifyContent:"center"}}>
          <Text style={styles.title}>{dataName}</Text>
        </View>
        {dataName=='Quran Adhkar'?
            <FlatList
            data={data}
            style={{ backgroundColor: "#fff",flex:1,  }}
            keyExtractor={(item) => item.id}
            renderItem={({ item,index }) => {
                return (
                    <View style={{backgroundColor:"#104586", margin:HP('2'),borderWidth:3,borderColor:"lightgrey", borderRadius:10, alignSelf:"auto", paddingVertical:HP('1'), paddingHorizontal:WP('1')}}>
                        <Text style={{color:"#fff", paddingHorizontal:WP('1'), lineHeight:HP('5'), fontSize:SC(18), fontFamily:"JannatRegular", letterSpacing:2}}>{item.dua}</Text>
                        <Text style={{color:"#fff", paddingHorizontal:WP('1'), lineHeight:HP('5'), fontSize:SC(18), fontFamily:"JannatRegular"}}>{item.translation}</Text>
                        <Text style={{color:"#fff", textAlign:"center", fontSize:SC(16)}}>{item.reference}</Text>
                    
                        </View>
                )
            }}
        />
        :
        <FlatList
            data={data.content}
            style={{ backgroundColor: "#fff",flex:1,  }}
            keyExtractor={(item) => item.zekr}
            renderItem={({ item,index }) => {
                return (
                    <View style={{backgroundColor:"#104586", margin:HP('2'),borderWidth:3,borderColor:"lightgrey", borderRadius:10, alignSelf:"auto", paddingVertical:HP('1'), paddingHorizontal:WP('1')}}>
                        <Text style={{color:"#fff", paddingHorizontal:WP('1'), lineHeight:HP('5'), fontSize:SC(18), fontFamily:"JannatRegular"}}>{item.zekr}</Text>
                        <Text style={{color:"#fff", textAlign:"center", fontSize:SC(16)}}>{item.repeat} {item.repeat>1?"Times":"Time"}</Text>
                    
                        </View>
                )
            }}
        />
        }
    {/* <View style={styles.container}>
      <Text style={styles.subTitle}>Arabic:</Text>
      <Text style={styles.content}>{dua_arabic}</Text>
      <Text style={styles.subTitle}>Description:</Text>
      <Text style={styles.content}>{description}</Text>
      <Text style={styles.subTitle}>Detail:</Text>
      <Text style={styles.content}>{detail}</Text>
      <Text style={styles.subTitle}>Keywords:</Text>
      <Text style={styles.content}>{keywords.join(', ')}</Text>
      <Text style={styles.subTitle}>Reference:</Text>
      <Text style={styles.content}>{reference}</Text>
    </View> */}
    </>
  );
};

export default SubahShamAzkar;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: SC(21),
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
    color: '#104586',
    fontFamily:'noorehidayat'
  },
});

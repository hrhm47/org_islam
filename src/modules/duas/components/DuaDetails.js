import React,{useState} from 'react';
import { StyleSheet, Text, View,FlatList,TouchableOpacity } from 'react-native';
import { widthPercentageToDP as WP, heightPercentageToDP as HP, scale as SC } from '../../../utills/pixelratio';
import duaData from './../json/GuidanceDua.json';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
const DuaDetails = ({ route }) => {
  // const { description, detail, dua_arabic, keywords, reference, title } = route.params.item;
  const [selectedCategory, setSelectedCategory] = useState(null);
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');
  const categories = Object.keys(duaData);
  const renderCategoryItem = (category) => {
    return (
      <TouchableOpacity
        style={styles.categoryItem}
        onPress={() => setSelectedCategory(category)}
      >
        <Text style={[styles.categoryTitle,{color:"#fff"}]}>{category}</Text>
      </TouchableOpacity>
    );
  };

  const renderDuaItem = ({ item }) => {
    const { id, title, description, detail, keywords, dua_arabic, reference } = item;

    return (

      <TouchableOpacity style={styles.duaItem} onPress={()=>{navigation.navigate('GeneralDuasScreen',{item:item});}} >
        <Text style={[styles.title,{color:"#000"}]}>{title}</Text>
        {/* <Text style={styles.description}>{description}</Text> */}
        {/* Render other dua details */}
      </TouchableOpacity>
    );
  };

  const renderDuas = () => {
    if (!selectedCategory) {
      return null;
    }
    const selectedCategoryData = duaData[selectedCategory];
    const duas = selectedCategoryData && selectedCategoryData[Object.keys(selectedCategoryData)[0]];

    if (!duas || duas.length === 0) {
      return (
        <Text style={styles.noDuasText}>No duas found for this category</Text>
      );
    }
    return (
      <FlatList
        data={duas}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderDuaItem}
      />
    );
  };



  return (
    <View style={styles.container}>
      <View style={{width:"100%",backgroundColor:"#104586",height:HP('8'), justifyContent:"space-around", alignItems:"center",flexDirection:"row"}}>
      <Icon name="arrow-back" size={SC(30)} color="#fff" style={{left:10}} onPress={()=>navigation.goBack()}/>
      <Text style={{ color:"#fff",
        fontSize:SC(23),fontWeight:"bold",letterSpacing:1,textAlign:"center"}}>General Dua's</Text>
        <Icon name="arrow-back" size={SC(30)} color="transparent" style={{left:10}} onPress={()=>navigation.goBack()}/>
        </View>
     <FlatList
        data={categories}
        keyExtractor={(item) => item}
        renderItem={({ item }) => renderCategoryItem(item)}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{paddingHorizontal:WP('5'), borderRadius: 20, paddingVertical:15 }}
        />

{renderDuas()}
</View>
  
    
  );
};

export default DuaDetails;

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
    backgroundColor: '#104586',
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

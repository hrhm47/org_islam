import { useRoute } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, TextInput, FlatList, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const SearchHadith = () => {
    const route=useRoute();
    const [searchKeyword, setSearchKeyword] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    
    const data = route.params.data;
    // console.log(data);
  const hadithdata = (keyword) => {
    
        const results = [];
        
        for (let i = 0; i < data.length; i++) {
          const hadith = data[i];
          
          // Search in text
          if (hadith.text.toLowerCase().includes(keyword.toLowerCase())) {
            results.push(hadith);
            continue; // Skip searching by hadith number if found in text
          }
          
          // Search by hadith number
          if (hadith.hadithnumber.toString().includes(keyword)) {
            results.push(hadith);
          }
        }
        setSearchResults(results)
      
  };

  const handleSearch = (text) => {
    setSearchKeyword(text);
    hadithdata(text);
  };

  const renderResultItem = ({ item,index }) => {
    return (
      <View style={{backgroundColor:"#fff", borderWidth:2, borderRadius:10, margin:10, borderColor:'#104586'}}>
        {/* <Text>Text Match: {item}</Text> */}
        <Text style={{color:"black", fontSize:18, paddingHorizontal:8, paddingVertical:6, margin:6, letterSpacing:1/2, lineHeight:30}}>{index+1+") "} {item.text}</Text>
      </View>
    );
  };

  return (
    <View style={{flex:1, backgroundColor:"#104586",}}>

      {/* <Icon name="arrow-back" size={30} color="#fff" style={{left:10}} onPress={()=>navigation.goBack()}/> */}
      <TextInput
      style={{backgroundColor:"white", margin:8, borderRadius:8, paddingHorizontal:8,fontSize:18, letterSpacing:1/2, color:"#104586"}}
      placeholder="Search Hadith"
      onChangeText={handleSearch}
      value={searchKeyword}
      // onFocus={setSearchKeyword('')}
      />
    
      
      <FlatList
      style={{flex:1, backgroundColor:"white"}}
        data={searchResults}
        renderItem={renderResultItem}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

export default SearchHadith;

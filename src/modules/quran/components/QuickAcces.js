import { StyleSheet, Text, View,FlatList,TouchableOpacity } from 'react-native'
import React,{useState} from 'react'
import Quran from 'quran-json'
import { useNavigation } from '@react-navigation/native';

const QuickSurah_s = ['Yaseen', 'Ar-Rahman', 'Al-Waqiah', 'Al-Muzzammil','Al-Fath', 'Al-Mulk'];
const surahNumber = [36, 55, 56, 73, 48, 67];
const SurahwithDetail=[{key:1,name:"Yaseen",id:Quran[35]},{key:2,name:"Ar-Rahman",id:Quran[54]},{key:3,name:"Al-Waqiah",id:Quran[55]},{key:4,name:"Al-Muzzammil",id:Quran[72]},{key:5,name:"Al-Fath",id:Quran[47]},{key:6,name:"Al-Mulk",id:Quran[66]}]
// console.log('====================================');
// console.log("SurahwithDetail",SurahwithDetail);
// console.log('====================================');
const QuickAcces = () => {
    const [activeJobType, setActiveJobType] = useState('Yaseen');
    const navigation=useNavigation();
  return (
    
       
          <FlatList
            data={SurahwithDetail}
            renderItem={({item}) => (
              <TouchableOpacity
                style={styles.tab(activeJobType, item.name)}
                onPress={() => {
                  navigation.navigate('Surah',{quran:item.id});
                  console.log("item",item.id);
                  setActiveJobType(item.name);
                }}>
                <Text style={styles.tabText}>{item.name}</Text>
              </TouchableOpacity>
            )}
            keyExtractor={item => item.key}
            contentContainerStyle={{columnGap: 12}}
            showsHorizontalScrollIndicator={false}
            horizontal
          />
       
    
  )
}

export default QuickAcces

const styles = StyleSheet.create({
    
      tab: (activeJobType, item) => ({
        paddingVertical: 12 / 2,
        paddingHorizontal: 12,
        borderRadius: 16,
        borderWidth: 2,
        borderColor: activeJobType === item ? '#444262' : '#C1C0C8',
      }),
      tabText: {
        color: '#444262',
      }
})
import { StyleSheet, Text, View,FlatList,TouchableOpacity } from 'react-native'
import React,{useState} from 'react'

const QuickSurah_s = ['Al-Fatiha', 'Al-Baqarah', 'Al-Imran', 'An-Nisa','Al-Iman', 'An-Nsa','Al-Imrn', 'An-Nia','Al-Ian', 'An-Nis'];
const QuickAcces = () => {
    const [activeJobType, setActiveJobType] = useState('Al-Fatiha');
  return (
    
       
          <FlatList
            data={QuickSurah_s}
            renderItem={({item}) => (
              <TouchableOpacity
                style={styles.tab(activeJobType, item)}
                onPress={() => {
                  setActiveJobType(item);
                }}>
                <Text style={styles.tabText}>{item}</Text>
              </TouchableOpacity>
            )}
            keyExtractor={item => item}
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
import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

const NamesOfAllah = ({ data }) => {
    // console.log('data', data);
  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.title}>{item.number}. {item.arabic}</Text>
      <Text style={styles.translation}>{item.translation}</Text>
      <Text style={styles.transliteration}>{item.transliteration}</Text>
      <Text style={styles.explanation}>{item.explanation}</Text>
    </View>
  );

  return (
    <FlatList
      data={data.names}
      keyExtractor={(item) => item.number.toString()}
      renderItem={renderItem}
      contentContainerStyle={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  card: {
    backgroundColor: '#104586',
    borderRadius: 10,
    marginBottom: 10,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#fff',
  },
  translation: {
    fontSize: 16,
    fontStyle: 'italic',
    marginBottom: 5,
    color: '#fff',
  },
  transliteration: {
    fontSize: 16,
    marginBottom: 5,
    color: '#fff',
  },
  explanation: {
    fontSize: 16,
    lineHeight: 22,
    color: '#fff',
  },
});

export default NamesOfAllah;

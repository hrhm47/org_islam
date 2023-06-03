import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Linking,
  Image,
} from 'react-native';
import {
  heightPercentageToDP as HP,
  widthPercentageToDP as WP,
  scale as SC,
} from '../../../utills/pixelratio';
const StoriesScreen = ({route}) => {
  // console.log('data', route.params);
  const data = route.params.item;

  return (
    <View style={styles.container}>
      <View
        style={{
          width: '100%',
          backgroundColor: '#104586',
          height: HP('8'),
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text
          style={{
            color: '#fff',
            fontSize: SC(23),
            fontWeight: 'bold',
            letterSpacing: 1,
            textAlign: 'center',
          }}>
          Hazrat {data.name} {data.name == 'Muhammad SAW' ? ' ' : 'AS'}
        </Text>
      </View>
      <ScrollView style={{padding: WP('5')}}>
        <Image
          source={data.uri}
          style={{
            width: WP('90'),
            height: HP('30'),
            alignSelf: 'center',
            marginVertical: HP('2'),
            borderRadius: 10,
          }}
        />
        <View style={styles.container}>
          <Text style={styles.subTitle}>Story:</Text>
          <Text style={styles.content}>{data.story}</Text>
          <TouchableOpacity
            style={{
              alignSelf: 'center',
              marginBottom: HP('2'),
              paddingHorizontal: WP('2'),
              paddingVertical: HP('1'),
              borderRadius: 10,
              backgroundColor: '#104586',
            }}
            onPress={() => {
              Linking.openURL(data.url)
                .then(res => {
                  console.log(res);
                })
                .catch(err => {
                  console.log(err);
                });
            }}>
            <Text style={{color: '#fff', letterSpacing: 1, fontSize: SC(17)}}>
              Read more on myIslam.org
            </Text>
          </TouchableOpacity>
          <Text style={styles.subTitle}>Lesson:</Text>
          <Text style={styles.content}>{data.lesson}</Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: HP('2'),
  },
  subTitle: {
    backgroundColor: 'lightgray',
    paddingHorizontal: WP('6'),
    fontSize: SC(23),
    fontWeight: 'bold',
    color: '#104586',
    borderRadius: 10,
    // marginVertical: HP('2'),
  },
  content: {
    paddingVertical: 7,
    fontSize: SC(20),
    color: '#000',
    fontFamily: 'noorehidayat',
    textAlign: 'justify',
    // marginBottom: HP('4'),
  },
});

export default StoriesScreen;

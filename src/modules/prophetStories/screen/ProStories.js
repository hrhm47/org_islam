import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
  ImageBackground,
} from 'react-native';
import React from 'react';
import {
  heightPercentageToDP as HP,
  widthPercentageToDP as WP,
  scale as SC,
} from '../../../utills/pixelratio';
import {PROPHET_STORIES} from '../json/ProphetsStories';
import { useNavigation } from '@react-navigation/native';

const ProStories = () => {

    const naviagtion = useNavigation();

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
          Prophet Stories
        </Text>
      </View>

      <FlatList
        data={PROPHET_STORIES}
        keyExtractor={item => item.id.toString()}
        renderItem={({item, index}) => {
          return (
            <TouchableOpacity
              style={{flexDirection: 'row', alignSelf: 'center'}}
              onPress={() => {naviagtion.navigate('StoriesScreen', {item:item})}}>
              <View
                style={{
                  backgroundColor: '#104576',
                  margin: HP('2'),
                  borderRadius: 10,
                  width: WP('90'),
                  height: HP('10'),
                  justifyContent:"center",
                  alignItems:"center"
                }}>
                <Text
                  style={{
                    color: '#fff',
                    fontSize: SC(20),
                    fontWeight: 'bold',
                    letterSpacing: 1,
                    textAlign: 'center',
                    alignSelf: 'center',
                  }}>
                  Hazrat {item.name} {item.name == 'Muhammad SAW' ? ' ' : 'AS'}
                </Text>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

export default ProStories;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: 16,
    // backgroundColor:"red",
  },
});

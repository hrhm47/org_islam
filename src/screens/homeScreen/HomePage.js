//import liraries
import React, { Component } from 'react';
import { StyleSheet, Text, View,SafeAreaView,StatusBar  } from 'react-native';
import Header from '../../modules/homeScreen/Header';
import HomeScreenMain from '../../modules/homeScreen/HomeScreenMain';
// create a component
const HomePage = () => {
    return (
      <SafeAreaView style={styles.container}>
        <Header/>
        <HomeScreenMain/>
        
    </SafeAreaView>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white', //'#004C9B'
      alignItems: 'center',
      justifyContent: 'flex-start',
      paddingTop: Platform.OS === "android" ? StatusBar.currentHeight/2 : 0
    },
  });

//make this component available to the app
export default HomePage;

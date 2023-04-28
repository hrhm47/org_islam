import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  Image,
  useColorScheme,
  View,
} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import HomePage from './src/screens/homeScreen/HomePage';
import {ApiProvider} from './src/contextApi/ApiProvider';
// Salah Tracker Screens
import Calender from './src/modules/salahTracker/calender/Calender';
import Chart from './src/modules/salahTracker/charts/Chart';
import Streak from './src/modules/salahTracker/streak/Streak';
// salah times screens
import ApiCall from './src/modules/prayerTimes/ApiCall';
import Monthly_Timings from './src/modules/prayerTimes/MonthlyTimings';
import Settings from './src/modules/prayerTimes/Settings';

// Salah Tracker IconImages
import prayerImage from './src/modules/salahTracker/images/prayer.png';
import streaksImage from './src/modules/salahTracker/images/streaks.png';
import reportImage from './src/modules/salahTracker/images/report.png';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

// qibla screens
import LoadingScreen from './src/modules/qibla/screens/LoadingScreen';
import RequestAccess from './src/modules/qibla/screens/RequestScreen';
import FaceQibla from './src/modules/qibla/screens/FaceQibla';
import FacingQibla from './src/modules/qibla/components/FacingQibla';

//quran screens
import Home from './src/modules/quran/screens/Home';
import Surah from './src/modules/quran/screens/Surah';
// navigation stack
const Stack = createNativeStackNavigator();
const SalahTimeStack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const QiblaStack = createNativeStackNavigator();
const QuranStack = createNativeStackNavigator();

//================================ Salah Tracker Navigation ================================
function TabNavigation() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        // tabBarActiveBackgroundColor: "brown",
        tabBarActiveBackgroundColor: '#1A2A52',
        tabBarInactiveBackgroundColor: '#273B69',
        // tabBarInactiveTintColor: "b",
        tabBarInactiveBackgroundColor: '#273B69',
        headerShown: false,
        tabBarLabelStyle: {
          color: 'white',
          fontWeight: '900',
          letterSpacing: 1,
          borderRadius: 10,
        },
      }}>
      <Tab.Screen
        name="Home"
        component={Calender}
        options={{
          title: 'Salah Tracker',
          tabBarIcon: ({color, size}) => (
            <Image
              source={prayerImage}
              style={{width: 30, height: 25, tintColor: 'white'}}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Streak"
        component={Streak}
        options={{
          title: 'Streak',
          tabBarIcon: ({color, size}) => (
            <Image
              source={streaksImage}
              style={{width: 28, height: 27, tintColor: 'white'}}
            />
          ),
        }}></Tab.Screen>
      <Tab.Screen
        name="Reports"
        component={Chart}
        options={{
          title: 'Report Chart',
          tabBarIcon: ({color, size}) => (
            <Image
              source={reportImage}
              style={{width: 26, height: 23, tintColor: 'white'}}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

// ================================ Salah Times Navigation ================================
function SalahTimesNavigator() {
  return (
    <SalahTimeStack.Navigator>
      <SalahTimeStack.Screen
        name="SalahTimes"
        component={ApiCall}
        options={{headerShown: false}}
      />
      <SalahTimeStack.Screen
        name="Settings"
        component={Settings}
        options={{headerShown: false}}
      />
      <SalahTimeStack.Screen
        name="Monthly"
        component={Monthly_Timings}
        options={{headerShown: false}}
      />
    </SalahTimeStack.Navigator>
  );
}

// ================================ Qibla Navigation ================================
function QiblaNavigation() {
  return (
    <QiblaStack.Navigator screenOptions={{headerShown: false}}>
      <QiblaStack.Screen name="Home" component={LoadingScreen} />
      <QiblaStack.Screen name="RequestAccess" component={RequestAccess} />
      <QiblaStack.Screen name="FaceQibla" component={FaceQibla} />
      <QiblaStack.Screen name="FacingQibla" component={FacingQibla} />
    </QiblaStack.Navigator>
  );
}

// ================================ Quran Navigation ================================

function QuranNavigation() {
  return (
    <QuranStack.Navigator
      initialRouteName="Home"
      screenOptions={{headerShown: false}}>
      <QuranStack.Screen name="Home" component={Home} />
      <QuranStack.Screen name="Surah" component={Surah} />
    </QuranStack.Navigator>
  );
}

// ================================ App Navigation ================================

const App = () => {
  return (
    <ApiProvider>
      {/* <HomePage/>
       */}

      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen
            name="Home"
            component={HomePage}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="SalahTimes"
            component={SalahTimesNavigator}
            options={{headerShown: false}}
          />

          {/*  <Stack.Screen name="SalahTimes" component={ApiCall} options={{headerShown:false
          }}/> 
            <Stack.Screen name="Settings" component={Settings} options={{headerShown:false
          }}/>  
            <Stack.Screen name="Monthly" component={Monthly_Timings} options={{headerShown:false
          }}/>  */}
          <Stack.Screen
            name="TabNavigatorTracker"
            component={TabNavigation}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="QiblaNavigator"
            component={QiblaNavigation}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Quran"
            component={QuranNavigation}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ApiProvider>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;

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



// Salah Tracker Screens
import HomePage from './src/screens/homeScreen/HomePage';
// context api
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
import Para_Juz from './src/modules/quran/screens/Para_Juz';
import SearchScreen from './src/modules/quran/screens/SearchScreen';
import Tajweed from './src/modules/quran/components/Tajweed';

// Tasbish Screens
import Count from './src/modules/tasbihCounter/Components/Count';

// Dua Screens
import DuaScreen from './src/modules/duas/screen/DuaScreen';
import DuaDetails from './src/modules/duas/components/DuaDetails';
import SubahShamAzkar from './src/modules/duas/components/SubahShamAzkar';
import GeneralDuasScreen from './src/modules/duas/components/GeneralDuasScreen';

// hadith screen
import Hadith from './src/modules/hadith/screen/Hadith';
import SearchHadith from './src/modules/hadith/component/SearchHadith';

// Prophet Stories Screens
import ProStories from './src/modules/prophetStories/screen/ProStories';
import StoriesScreen from './src/modules/prophetStories/components/StoriesScreen';


// splash screen
import SplashScreen from './SplashScreen';
import NameHome from './src/modules/namesofAllah/screen/NamesHome';

// navigation stack
const Stack = createNativeStackNavigator();
const SalahTimeStack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const QiblaStack = createNativeStackNavigator();
const QuranStack = createNativeStackNavigator();
const DuaStack = createNativeStackNavigator();
const hadithStack=createNativeStackNavigator();
const ProphetStoriesStack = createNativeStackNavigator();

//================================ Salah Tracker Navigation ================================
function TabNavigation() {
  return (
    <Tab.Navigator
      initialRouteName="SalahTimesHome"
      screenOptions={{
        // tabBarActiveBackgroundColor: "brown",
        tabBarActiveBackgroundColor: '#1A2A52',
        tabBarInactiveBackgroundColor: '#104586',
        // tabBarInactiveTintColor: "b",
        tabBarInactiveBackgroundColor: '#104586',
        headerShown: false,
        tabBarLabelStyle: {
          color: 'white',
          fontWeight: '900',
          letterSpacing: 1,
          borderRadius: 10,
        },
      }}>
      <Tab.Screen
        name="SalahTimesHome"
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
    <SalahTimeStack.Navigator
    initialRouteName="SalahTimes"
      screenOptions={{headerShown: false}}>
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
      <QiblaStack.Screen name="LoadingScreen" component={LoadingScreen} />
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
      initialRouteName="QuranHome"
      screenOptions={{headerShown: false}}>
      <QuranStack.Screen name="QuranHome" component={Home} />
      <QuranStack.Screen name="Surah" component={Surah} />
      <QuranStack.Screen name="Para" component={Para_Juz} />
      <QuranStack.Screen name="SearchScreen" component={SearchScreen} />
      <QuranStack.Screen name="Tajweed" component={Tajweed} />
    </QuranStack.Navigator>
  );
}


// ================================ Dua Navigation ================================
function DuaNavigation() {
  return (
    <DuaStack.Navigator
      initialRouteName="DuaScreen"
      screenOptions={{headerShown: false}}>
      <DuaStack.Screen name="DuaScreen" component={DuaScreen} />
      <DuaStack.Screen name="DuaDetails" component={DuaDetails} />
      <DuaStack.Screen name="SubahShamAzkar" component={SubahShamAzkar} />
      <DuaStack.Screen name="GeneralDuasScreen" component={GeneralDuasScreen} />

    </DuaStack.Navigator>
  );
}


// ================================= Hadith Navigation =================================
function HadithNavigatio(){
  return(
    <hadithStack.Navigator
    initialRouteName="Hadith"
    screenOptions={{headerShown: false}}>
      <hadithStack.Screen name='Hadith' component={Hadith}/>
      <hadithStack.Screen name='SearchHadith' component={SearchHadith}/>
    </hadithStack.Navigator>
  )
}

// ================================ Prophet Stories Navigation ================================
function ProphetStoriesNavigation() {
  return(
  <ProphetStoriesStack.Navigator initialRouteName="ProStories" screenOptions={{headerShown: false}}>
    <ProphetStoriesStack.Screen name="ProStories" component={ProStories} />
    <ProphetStoriesStack.Screen name="StoriesScreen" component={StoriesScreen} />
  </ProphetStoriesStack.Navigator>
  )
}


// ================================ App Navigation ================================

const App = () => {
  const [appReady, setAppReady] = React.useState(false);
  
    React.useEffect(() => {
      // Simulate an asynchronous task, e.g., loading necessary data or assets
      setTimeout(() => {
        setAppReady(true);
      }, 1500); // 3 seconds delay for demonstration purposes, replace with your actual loading logic
    }, []);
  
  
    if (!appReady) {
      
       return <SplashScreen/>;
    }

  return (
      <ApiProvider>
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
            <Stack.Screen
              name="Tasbih"
              component={Count}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Dua"
              component={DuaNavigation}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Hadith"
              component={HadithNavigatio}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Names"
              component={NameHome}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="ProphetStories"
              component={ProphetStoriesNavigation}
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

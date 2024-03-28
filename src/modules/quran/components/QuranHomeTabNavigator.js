import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import SurahScreen from '../screens/SurahScreen';
import ParaScreen from '../screens/ParaScreen';
import BookMark from '../screens/BookMark';
const Tab = createMaterialTopTabNavigator();

export function QuranHomeTabNavigator(){
    return(
    <Tab.Navigator
    screenOptions={{
      tabBarLabelStyle: {
        fontSize: 16,
        fontWeight: '700',
        letterSpacing: 1,
      },
      tabBarActiveTintColor: '#004C9B',
      tabBarInactiveTintColor: '#000',
    }}>
    <Tab.Screen
      screenOptions={{color: '#004C9B'}}
      name="SURAH"
      component={SurahScreen}
    />
    <Tab.Screen name="PARA" component={ParaScreen} />
    <Tab.Screen name="BookMark" component={BookMark} />
  </Tab.Navigator>)
}
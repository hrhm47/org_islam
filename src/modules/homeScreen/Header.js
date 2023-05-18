import {StyleSheet, View, Text, ImageBackground, TouchableOpacity } from 'react-native'
import React from 'react'
import Ionicons from 'react-native-vector-icons/MaterialIcons';
import { widthPercentageToDP as WP, heightPercentageToDP as HP} from '../../utills/pixelratio/index';


const Header = () => {
  
  return (
    <View style={styles.Header}>
        {/* <View style={styles.Headerinner}>
            <TouchableOpacity>
                <Ionicons name='place' size={24} color='white'/>
            </TouchableOpacity>
            <TouchableOpacity>
                <Ionicons name='settings' size={24} color='white'/>
            </TouchableOpacity>
        </View>
         */}
    </View>
  )
}

const styles=StyleSheet.create({
    Header:{
        // width:WP('100'),
        // height:HP('7'),
        // backgroundColor:"#0A1832",
        alignItems:"center",
        justifyContent:'center'     
    },
    Headerinner:{
        width:WP('80'),
        flexDirection:'row',
        justifyContent:"space-between",
    }
})
export default Header
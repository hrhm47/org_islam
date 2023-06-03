import {
    StyleSheet,
    Text,
    View,
    Button,
    StatusBar,
    TouchableOpacity,
    Alert,
    Modal,
    Pressable,
    Image,
    TextInput,
    FlatList,
    KeyboardAvoidingView,
    ScrollView,
    ImageBackground,
  } from 'react-native';
  import {React, useState} from 'react';
  import {
    widthPercentageToDP as WP,
    heightPercentageToDP as HP,
    scale as SC,
  } from '../../../utills/pixelratio';
  import Icon from 'react-native-vector-icons/MaterialIcons';
  import AsyncStorage from '@react-native-async-storage/async-storage';
  import SelectDropdown from "react-native-select-dropdown";

  
const TasbishModel = () => {
  return (
    <View style={styles.centeredView}>
    <KeyboardAvoidingView
  style={styles.centeredView}
  behavior={Platform.OS === 'ios' ? 'padding' : null}
  keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : -10}
>
  <View style={styles.modalView}>
    <View style={styles.heading}>
      <Text style={styles.modalText}>SAVED DHIKR</Text>
      <TouchableOpacity
        style={[styles.button, styles.buttonClose]}
        onPress={() => setModalVisible(!modalVisible)}
      >
        <Image
          source={require('../Images/cross.png')}
          style={{ width: 25, height: 25 }}
        />
      </TouchableOpacity>
    </View>

    <View style={styles.subHeading}>
      <TextInput
        style={styles.sessionInput}
        placeholder="NAME THIS Dhikr"
        value={dhikerValue}
        onChangeText={handleInputText}
      />
      <TouchableOpacity>
        <Text style={styles.submit} onPress={handleAddRow}>
          SUBMIT
        </Text>
      </TouchableOpacity>
    </View>

    <Text style={{ marginTop: 17, fontSize: 19 }}>Saved Sessions:</Text>

    <View style={styles.table}>
      <View style={styles.inputRow}>
        {/* <Text style={[styles.colInput, styles.column]}>ID</Text> */}
        <Text style={[styles.colInput, styles.column]}>Name</Text>
        <Text style={[styles.colInput, styles.column]}>Count</Text>
        <Text style={[styles.colInput, styles.column]}>Load</Text>
        <Text style={[styles.colInput, styles.column]}>Delete</Text>
      </View>
      <FlatList
        style={styles.list}
        data={oldData}
        renderItem={({item})=>{
            return(
              <View style={styles.row}>
              {/* <Text style={[styles.column, styles.entry]}>{item.id}</Text> */}
              <Text style={{width:WP('10'), fontSize:SC(16), color:"black", fontWeight:"600", flexWrap:"wrap",}} numberOfLines={1}>{item.column1}</Text>
              <Text style={{width:WP('10'), fontSize:SC(16), textAlign:"center",color:"black", fontWeight:"600"}}>{item.column2}</Text>
              <TouchableOpacity style={{width:WP('10'),margin:2,alignItems:"center"}} onPress={()=>loadData(item.id)}>
                <Icon name="rotate-left" size={25} color="green" />
                {/* <Text style={[styles.column]}>{item.column3}</Text> */}
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleDeleteRow(item.id)}
                style={{width:WP('10'),alignItems:"center"}}>
                  <Icon name="delete" size={25} color="red" />
                {/* <Text style={[styles.column]}>{item.column4}</Text> */}
              </TouchableOpacity>
            </View>
            )
        }}
        keyExtractor={(item) => item.id}
        // alwaysBounceVertical={true}
      />
    {/* </View> */}
    </View>
  </View>
  </KeyboardAvoidingView>
  </View>
  )
}

export default TasbishModel

const styles = StyleSheet.create({})
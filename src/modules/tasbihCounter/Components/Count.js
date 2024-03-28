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
import {React, useState,useEffect, useMemo} from 'react';
import {
  widthPercentageToDP as WP,
  heightPercentageToDP as HP,
  scale as SC,
} from '../../../utills/pixelratio';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SelectDropdown from "react-native-select-dropdown";
import TasbishModel from './TasbishModel';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { useNavigation } from '@react-navigation/native';



export default function Count() {
  const navigation=useNavigation();
  const [count, setCount] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [dhikerValue, setDhikerValue] = useState(" ");

  const [load, setLoad] = useState('Load');
  const [imageSource, setImageSource] = useState('X');
  const [oldData,setOldData]=useState([]);
  const [loadModelVisible,setLoadModelVisible]=useState(false);

  
  const [userDhikr, setUserDhikr] = useState('')
  const dhikrSelectionData=['سُبْحَانَ اللهِ وَبِحَمْدِهِ', 'لاَ إِلَهَ إِلاَّ اللَّهُ وَ الْحَمْدُ لِلَّ', 'لاَ إِلَهَ إِلاَّ أَنْتَ سُبْحَانَكَ إِنِّي كُنْتُ مِنَ الظَّالِمِينَ','سُبْحَانَ اللَّهِ وَالْحَمْدُ لِلَّهِ وَلاَ إِلَهَ إِلاَّ اللَّهُ وَاللَّهُ أَكْبَرُ','وَلاَ حَوْلَ وَلاَ قُوَّةَ إِلاَّ بِاللَّهِ','سُبْحـانَ اللهِ وَبِحَمْـدِهِ عَدَدَ خَلْـقِه ، وَرِضـا نَفْسِـه ، وَزِنَـةَ عَـرْشِـه ، وَمِـدادَ كَلِمـاتِـه']
  const [selectedRowData, setSelectedRowData] = useState(null);
  
  const handleInputText= (text) => {
    setUserDhikr(text);
  }
  // reamainng load= wala 
  const handleAddRow = async() => {
    const dhikrId=Math.random()*.45;
    let temObj={
      id: 0,
        column1: '',
        column2: 0,
        column3: 'Load',
        column4: 'x'
    };
    if (selectedRowData!==null){
      oldData.map((item)=>{
        if(item.id==selectedRowData){
          // setSelectedRowData(item.id);
          // console.log("item.column1");
          item.column2=count;
          item.column1=userDhikr;

          
        }
      })
      await AsyncStorage.setItem("dhikrData", JSON.stringify(oldData));
      setSelectedRowData(null)
      trash();
    }
    else{
        if (userDhikr !== '' && count !== 0) {
        const addingData = [
          ...oldData,
          {
            id: dhikrId,
            column1: userDhikr,
            column2: count,
            column3: load,
            column4: imageSource,
          },
        ]
        // setData(oldData);
        setOldData(addingData);
        await AsyncStorage.setItem("dhikrData", JSON.stringify(addingData));
        // setText('');
        trash();
        setLoad('Load');
        setImageSource('X');
        
      } else {
        Alert.alert('Please Do Some Dhikr')
      }
    }
    
  };

  const handleDeleteRow = async(index) => {
    const newData = oldData.filter((item, i) => item.id !== index);
    console.log(newData);
    setOldData(newData);
    await AsyncStorage.setItem("dhikrData", JSON.stringify(newData));
    setModalVisible(false)
    trash();
  };

  let incrementCount = () => {
    setCount(count + 1);
    console.log(count);
  };

  const trash = () => {
    setCount(0);
    setUserDhikr('');
    // setData([]);
  }
  let decrementCount = () => {
    if (count <= 0) {
      setCount(0);
    } else {
      setCount(count - 1);
    }
  };
  let resetZero = () => {
    trash()
  };
  const loadData = async(itemId) => {
    
    try{
      oldData.map((item)=>{
        if(item.id===itemId){
          setSelectedRowData(item.id);
          console.log(item.column1);
          setUserDhikr(item.column1);
          setCount(item.column2);
          setLoad('Load');
          setImageSource('X');
          // handleDeleteRow(item.id);
        }
      })
      setLoadModelVisible(false)
    }catch(error){
      console.log(error);
    }
  }


const LoadModal=()=> {
  return(
    <View style={[styles.centeredView,{position:"absolute", justifyContent:"center", alignItems:"center", marginHorizontal:WP('3'), marginTop:HP('10') }]}>
    <KeyboardAvoidingView
  style={styles.centeredView}
  behavior={Platform.OS === 'ios' ? 'padding' : null}
  keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : -10}
>
  <View style={styles.modalView}>
    <View style={styles.heading}>
      <Text style={styles.modalText}>LOAD DHIKR</Text>
      <TouchableOpacity
        style={[styles.button, styles.buttonClose]}
        onPress={() => {
          setLoadModelVisible(!loadModelVisible)
          // setUserDhikr('')
        }}
      >
        <Image
          source={require('../Images/cross.png')}
          style={{ width: 25, height: 25 }}
        />
      </TouchableOpacity>
    </View>

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

if (loadModelVisible){
 { LoadModal();}
}





 
  const [animationColor,setAnimationColor]=useState('#104586')
  return (
    <View style={styles.container}>

      <View
        style={{
          width: '100%',
          backgroundColor: '#104586',
          height: HP('8'),
          justifyContent: 'space-evenly',
          alignItems: 'center',
          flexDirection: 'row',
        }}>
          <Icon name="arrow-back" size={SC(30)} color="#fff" style={{}} onPress={()=>navigation.goBack()}/>
        <Text
          style={{
            color: '#fff',
            fontSize: SC(23),
            fontWeight: 'bold',
            letterSpacing: 1,
            textAlign: 'center',
          }}>
          TASBIH COUNTER
        </Text>
            <Icon name="arrow-back" size={SC(30)} color="transparent" style={{}}/>
      </View>
     
      {/* model view */}
     
      {modalVisible?
      
      // {/* {loadModelVisible?LoadModal: */}
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
          onPress={() => {
            setModalVisible(!modalVisible)
            setUserDhikr('')
          }}
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
          value={userDhikr}
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
          {/* <Text style={[styles.colInput, styles.column]}>Load</Text> */}
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
                {/* <TouchableOpacity style={{width:WP('10'),margin:2,alignItems:"center"}} onPress={()=>loadData(item.id)}>
                  <Icon name="rotate-left" size={25} color="green" />
                  <Text style={[styles.column]}>{item.column3}</Text>
                </TouchableOpacity> */}
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
      
      :
      <>
       <View style={{ flex:1, alignItems:"center",marginTop:HP('2')}}>

      <SelectDropdown 
      
        rowStyle={{backgroundColor:"#104586", borderRadius:10, margin:2}}
        rowTextStyle={{color:"white", fontSize:SC(20),}}
      dropdownIconPosition='right'
      buttonStyle={{backgroundColor:"transparent", width:WP('70'),height:HP('7'),borderRadius:10,borderWidth:3, borderColor:"#104586"}}
      dropdownStyle={{backgroundColor:"#104586", width:WP('70'),height:HP('20'),borderRadius:10,}}
      dropdownOverlayColor='transparent'
      data={dhikrSelectionData} onSelect={(value)=>{
        setUserDhikr(value);
      }}/>
      {/* <Text style={styles.mainheading}>Select Tasbih</Text> */}
      
      <Text style={[styles.dhikrName,{marginTop:HP('2')}]} numberOfLines={3}>{userDhikr}</Text>

      <AnimatedCircularProgress
         size={200}
         width={10}
         lineCap='butt'
         fill={count}
         tintColor={'#fff'}
         backgroundColor="#104586"
         padding={20}
         backgroundWidth={17}
         
         fillLineCap='round'
         rotation={0}
         onAnimationComplete={()=>{

         }}
        //  tintColorSecondary='#00ff00'
         
          // renderCap={({ center }) => <Circle cx={center.x} cy={center.y} r="10" fill="blue" />}
         >
         {
           (fill) => (
            <Text style={styles.number}>{count}</Text>
           )
         }
       </AnimatedCircularProgress>

      {/* <Text style={styles.number}>{count}</Text> */}

      <View style={styles.count}>
        <TouchableOpacity>
          <Text onPress={decrementCount} style={styles.PlusMinus}>
            -
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={{marginTop: WP('2')}}>
          <Text onPress={resetZero} style={styles.reset}>
            RESET
          </Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text onPress={incrementCount} style={styles.PlusMinus}>
            +
          </Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={{
          backgroundColor: '#104586',
          width:WP('50'),
          paddingHorizontal: WP('2'),
          paddingVertical: HP('1'),
          borderRadius: WP('2'),
          justifyContent:"center",
          alignItems:"center"
        }}
        onPress={
          async() => {
              AsyncStorage.getItem("dhikrData").then((value) => {
                if (value) {
                  const data = JSON.parse(value);
                  // console.log(data);
                  setOldData(data);
                }
              })
          setModalVisible(true);
        }}>
        <Text style={styles.save}>SAVE</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          backgroundColor: '#104586',
          width:WP('50'),
          paddingHorizontal: WP('2'),
          paddingVertical: HP('1'),
          borderRadius: WP('2'),
          marginTop:HP('2'),
          justifyContent:"center",
          alignItems:"center"
        }}
        onPress={
          async() => {
              AsyncStorage.getItem("dhikrData").then((value) => {
                if (value) {
                  const data = JSON.parse(value);
                  // console.log(data);
                  // data.map((item)=>{
                  //   console.log(item);
                  // })
                  setOldData(data);
                }
              })
              setLoadModelVisible(true);
        }}>
        <Text style={styles.save}>LOAD</Text>
      </TouchableOpacity>
      </View>
      
      {loadModelVisible? LoadModal():null}
      </>
    }






    {/* model view ending */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    
  },
  mainheading: {
    fontWeight: 'bold',
    fontSize: SC(30),
    color: '#104586',
    letterSpacing: 1,
    flex: 1 / 9,
    borderBottomWidth: 2,
    borderBottomColor: '#104586',
    marginBottom: WP(5),
  },
  dhikrName: {
    // flex: 1/10,
    // marginBottom: WP(7),
    fontSize: SC(20),
    fontWeight: '500',
    letterSpacing: 1,
    color: '#000',
  },
  number: {
    // flex: 1/24,
    fontSize: 80,
    fontWeight: 'bold',
    color: '#104586',
  },
  count: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: WP(90),
    // height: HP(10),
    padding: WP(5),
  },
  PlusMinus: {
    borderRadius: 80,
    padding: WP(3),
    textAlignVertical: 'center',
    textAlign: 'center',
    width: WP(20),
    height: WP(20),
    fontSize: 40,
    backgroundColor: '#104586',
    color: 'white',
    fontWeight: 'bold',
  },
  reset: {
    borderRadius: 70,
    fontSize: 20,
    fontWeight: 'bold',
    backgroundColor: '#105582',
    padding: WP(3),
    width: WP(30),
    height: WP(15),
    textAlignVertical: 'center',
    textAlign: 'center',
    color: 'white',
    // textAlignHorizontal: "center",
    // marginBottom: WP(4),
  },
  save: {
    fontSize: SC(19),
    fontWeight: 'bold',
    color: '#ffffff',
  },
  centeredView: {
    justifyContent: 'center',
    alignItems: 'center',
    // bottom: 10,
  },
  modalView: {
    backgroundColor: 'lightgrey',
    borderRadius: 10,
    padding: 12,
    width: WP(94),
    height: HP(60),
    shadowColor: 'blue',
    shadowOffset: {
      width: 60,
      height: 82,
    },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 10,
  },
  modalText: {
    // marginBottom: 15,
    // textAlign: 'center',
    fontSize: 25,
    fontWeight: 'bold',
    // color: '#004C9B',
  },
  heading: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  subHeading: {
    // padding: 7,
    marginTop: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignContent: 'center',
  },
  sessionInput: {
    width: 210,
    height: 40,
    borderColor: 'grey',
    borderWidth: 1,
    padding: 10,
  },

  table: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: HP('1')
    // paddingHorizontal: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#ccc',
    // paddingVertical: HP(2),
    // paddingHorizontal: WP(3),
    borderRadius: 5,
    backgroundColor: '#ccc',
    margin:WP('2'),
    height:HP('7'),
    width:WP(70),
    justifyContent:'space-evenly'
  },
  column: {
    flex: 1,
    textAlign: 'center',
    fontSize: SC(15),
    // fontWeight: 'bold',
  },
  inputRow: {
    flexDirection: 'row',
    height: HP(6.5),
    width: WP(70),
    marginBottom: WP(2),
  },
  entry: {
    // backgroundColor:'green',
    marginTop: WP(1),
    // padding:WP(1),
    width: WP(20),
    color: 'black',
  },
  colInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 4,
    marginRight: 5,
    fontSize: 10,
    // fontWeight: 'bold',
    // fontSize: WP(3.5),
    backgroundColor: '#004C9B',
    width: WP(45),
    color: 'white',
    // textAlign: 'center',

    // marginBottom: 20,
  },
  submit: {
    backgroundColor: '#008CBA',
    paddingVertical: 6,
    paddingHorizontal: 17,
    borderRadius: 5,
    color: '#fff',
    fontSize: 20,
    fontWeight: 600,
  },
  // addButtonText: {
  //   color: '#fff',
  //   fontWeight: 'bold',
  // },
  loadText: {
    backgroundColor: '#a09393',
    paddingVertical: HP(1),
    // paddingHorizontal: 2,
    // marginRight: 10,
    marginLeft: WP(19),
    borderRadius: 5,
    // padding: 7,
    // width: WP(10),
  },
  delText: {
    backgroundColor: '#ce3b3b',
    paddingVertical: HP(1),
    // marginRight: WP(0.5),
    borderRadius: 5,
    marginLeft: 33,
  },
  // id:{
  //   textAlign: 'center',
  // },
  // name:{
  //   textAlign: 'center',
  // }
});

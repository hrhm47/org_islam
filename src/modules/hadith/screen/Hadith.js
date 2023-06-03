import { StyleSheet, Text, View,TouchableOpacity,FlatList,TextInput,ScrollView,ActivityIndicator, Alert } from 'react-native'
import React from 'react'
import axios from 'axios'
import { heightPercentageToDP, scale, widthPercentageToDP } from '../../../utills/pixelratio'
import { useNavigation } from '@react-navigation/native'
const Hadith = () => {
    const navigation=useNavigation();
    const [hadithData,setHadithData]=React.useState(null)
    const [totalHadith,setTotalHadith]=React.useState(null)
    const[onclick,setOnclick]=React.useState(false)
    const[dataSection,setDataSection]=React.useState(null)
    const[urduSection,setUrduSection]=React.useState(null)
    React.useEffect(()=>{
        getHadithData();
    },[])
    const getHadithData=()=>{
        axios.get('https://cdn.jsdelivr.net/gh/fawazahmed0/hadith-api@1/editions.json').then((res)=>{
            
        
            setHadithData({
                'abudawud': { 'collection': res.data.abudawud.collection, 'name': 'Sunan Abu Dawud', },
                'bukhari': { 'collection': res.data.bukhari.collection, 'name': 'Sahih al Bukhari',},
                'ibnmajah': { 'collection': res.data.ibnmajah.collection, 'name': 'Sunan Ibn Majah', },
                'malik': { 'collection': res.data.malik.collection, 'name': 'Muwatta Malik',},
                'muslim': { 'collection': res.data.muslim.collection, 'name': 'Sahih Muslim', },
                'nasai': { 'collection': res.data.nasai.collection, 'name': 'Sunan an Nasai',},
                'tirmidhi': { 'collection': res.data.tirmidhi.collection, 'name': 'Jami At Tirmidhi',},
              });
            //   axios.get(hadithData['bukhari'].collection[hadithData['bukhari'].collection.length-1].link).then ((res)=>{
            //     setTotalHadith({obj2:res.data.hadiths[res.data.hadiths.length-1].arabicnumber})
            // })
            // axios.get(hadithData['ibnmajah'].collection[hadithData['ibnmajah'].collection.length-1].link).then ((res)=>{
            //     setTotalHadith({obj3:res.data.hadiths[res.data.hadiths.length-1].arabicnumber})
            // })
            // axios.get(hadithData['malik'].collection[hadithData['malik'].collection.length-1].link).then ((res)=>{
            //     setTotalHadith({obj4:res.data.hadiths[res.data.hadiths.length-1].arabicnumber})
            // })
            // axios.get(hadithData['muslim'].collection[hadithData['muslim'].collection.length-1].link).then ((res)=>{
            //     setTotalHadith({obj5:res.data.hadiths[res.data.hadiths.length-1].arabicnumber})
            // })
            // axios.get(hadithData['nasai'].collection[hadithData['nasai'].collection.length-1].link).then ((res)=>{
            //     setTotalHadith({obj6:res.data.hadiths[res.data.hadiths.length-1].arabicnumber})
            // })
            
            //    axios.get(hadithData['tirmidhi'].collection[hadithData['tirmidhi'].collection.length-1].link).then((res)=>{
            //     setTotalHadith({obj7:(res.data.hadiths[res.data.hadiths.length-1].arabicnumber)})
            //     });
            // axios.get(hadithData['abudawud'].collection[hadithData['abudawud'].collection.length-1].link).then ((res)=>{
            //     setTotalHadith({obj1:res.data.hadiths[res.data.hadiths.length-1].arabicnumber});
            //     // res.data.hadiths[res.data.hadiths.length-1].arabicnumber;
            // })
            // console.log(totalHadith);
        })
    }
    // const hadtihWriter=[{'abudawud':hadithData.abudawud},{'bukhari':hadithData.bukhari}]
    // ,'ibnmajah','malik','muslim','nasai','tirmidhi']
    const hadithBooks=['Sunan Abu Dawud','Sahih al Bukhari','Sunan Ibn Majah','Muwatta Malik','Sahih Muslim','Sunan an Nasai','Jami At Tirmidhi']
    // console.log(hadithData);

    const renderCollectionItem = ({ item,index }) => (
        <TouchableOpacity 
            style={{paddingVertical:10, borderBottomWidth:1, borderBottomColor:"#ccc", paddingHorizontal:10,width:widthPercentageToDP('60'),height:heightPercentageToDP('30'), backgroundColor:"#104586",marginRight:10, justifyContent:"center", alignItems:"center", borderRadius:10,}}
        onPress={()=>{
            if (dataSection!==null){
                setOnclick(false);
                setDataSection(null)
            }
            // console.log(hadithData[item].collection[2]);
            hadithData[item].collection.map((item,index)=>{
                if (item.language=='English') {
                    axios.get(item.link).then((res)=>{
               
                        setDataSection(res.data.hadiths);
                        // console.log(res.data.hadiths.length );
                    })
                }
                if (item.language=='Urdu') {
                    axios.get(item.link).then((res)=>{
               
                        setUrduSection(res.data.hadiths);
                        // console.log(res.data.hadiths.length );
                    })
                }
            })
            setTotalHadith(item)
            setOnclick(true)
        }}>
        <Text style={{color:"#fff",fontSize:scale(21),   }}>{item}</Text>
        {/* <Text style={{color:"#fff",fontSize:scale(21),  }}>{}</Text> */}
        </TouchableOpacity>
      );

const [langChange,setLangChange]=React.useState(false);
    const sectionList=()=>{
        // console.log(dataSection.hadiths);
        return(
            <View style={{flex:1, backgroundColor:"lightgrey",}}>
                <TouchableOpacity onPress={()=>setLangChange(!langChange)}> 

                    <Text style={{color:"#000",fontSize:scale(21),alignSelf:"center", paddingVertical:8,marginBottom:6 }}>
                    {/* {dataSection.namedata} */}
                    {totalHadith}
                    {/* {totalHadith?totalHadith.tatal_hadith:null} */}
                    </Text>
                </TouchableOpacity>
                
                    {dataSection?
                    ( <FlatList
                        data={langChange?urduSection:dataSection}
                      renderItem={({item})=>(
                        <View key={item.hadithnumber} style={{margin:10,paddingHorizontal:2,paddingVertical:5,}}>
                        <TouchableOpacity onPress={()=>console.log(item)}>

                        <Text style={{color:"#000",fontSize:scale(17), }}>{"("+item.hadithnumber+")"}  {item.text}</Text>
                        </TouchableOpacity>
                    </View>
                      )}
                     />):
                    //  null
                     <ActivityIndicator size="large" color="#0000ff" />
                     }
                     
            </View>
        )
    }















  return (
    <View style={{flex:1, backgroundColor:"#104586" }}>
        <View style={{height:heightPercentageToDP('8'), justifyContent:"center", alignItems:"center"}}>

        <Text style={{fontSize:scale(23), fontWeight:'600', letterSpacing:1, color:"#fff"}}>Hadith</Text>
        </View>
        <View style={{backgroundColor:"#fff",flex:1/6, paddingHorizontal:10, paddingVertical:10, borderTopLeftRadius:20, borderTopRightRadius:20, paddingTop:heightPercentageToDP('5')}}>
        <TouchableOpacity onPress={()=>{
            if(dataSection==null){
                Alert.alert("please select the hadith book first")
            }
            else{
                navigation.navigate('SearchHadith',{data:dataSection})
            }
        }}>

            <Text
            // placeholder="Search"
            style={{backgroundColor:"#104586",paddingVertical:10,paddingHorizontal:10,color:"#fff", borderRadius:10, fontSize:scale(18) }}
            
            >Search</Text>
            </TouchableOpacity>
        </View>
        <View style={{flex:1, position:"relative"}}>
        {hadithData ? (
        <FlatList
            horizontal
            style={{backgroundColor:"#fff", flex:1, paddingHorizontal:10, paddingVertical:10, }}
            data={Object.keys(hadithData)}
            renderItem={renderCollectionItem}
            keyExtractor={(item) => item}
        />
          ) : (
              <Text style={{flex:1, backgroundColor:"black"}}>Loading...</Text>
              )}
              </View>
        {
            onclick?
            sectionList():
            null
            // <ActivityIndicator size="large" color="#0000ff" />
            
        }
    </View>
  )
}

export default Hadith

const styles = StyleSheet.create({})
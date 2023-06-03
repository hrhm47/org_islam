  import Geocoder from 'react-native-geocoding';
  
  import { API_KEY } from "./../../../utills/data/googleApiKey";
  // this function returns the country name and village name
  export async function getLocationC(lat, lon) {
    // console.log("lat and long is ",lat, lon);
    Geocoder.init(API_KEY);
    const res=Geocoder.from(lat, lon).then(async json => {
      console.log(json.results[0].address_components[1].short_name, json.results[0].address_components);
      await AsyncStorage.setItem("countryname",JSON.stringify([json.results[0].address_components[0].long_name, json.results[0].address_components[1].long_name]))
      return ({"city":json.results[0].address_components[1].long_name, "country":json.results[0].address_components[json.results[0].address_components.length-1].long_name});
    //   setLocation([json.results[0].address_components[1].long_name, json.results[0].address_components[json.results[0].address_components.length-1].long_name]);
          })
    // let res = await axios.get('https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat='+lat+'&lon='+lon+'&accept-language=en');
    // let data = await res.json();
    console.log("res is ",res);
    return res
}
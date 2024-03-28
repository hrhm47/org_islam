export const uploadFile = async(fileUri, ayaText) => {
    console.log("uploadFile", fileUri, ayaText);
    const name = 'myrecording';
    const type = 'audio/flac';
    const ayat=ayaText;
  
    const formData=new FormData();
    formData.append('file',{
      uri:fileUri,
      type:type,
      name:name,
      ayat:ayat
    })
    formData.append('ayat',ayat)
    // console.log("formData", formData);
    let res= await fetch(
    //   'http://192.168.10.8:5000/upload' // for physical device  192.168.10.7
      // 'http://10.0.2.2:5000/upload' // for virtual device
      'http://192.168.43.178:5000/upload' // for device net 
      // 'http://192.168.35.209:5000/upload' // for device net 
      // 'http://192.168.43.178:5000/upload' // for device net 
      // 'http://192.168.10.6:5000/upload' // for device net 
      ,{
        method:"post",
        body:formData,
        headers:{
          'Content-Type': 'multipart/form-data'
        }
      }
    );
    let responseJson=await res.json();
    // console.log(responseJson,"responseJson");
    // return {tajeed:responseJson['data']};
    return {tajeed:responseJson['data'],similarity:responseJson['similarity']};
    // suggestions(responseJson['file_path'])
  
  
  };
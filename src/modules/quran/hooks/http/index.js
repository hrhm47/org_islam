
// import quran_txt from '../http/';

export const uploadFile = async(fileUri) => {
  console.log("uploadFile", fileUri);
  const name = 'myrecording';
  const type = 'audio/m4a';

  const formData=new FormData();
  formData.append('file',{
    uri:fileUri,
    type:type,
    name:name
  })
  let res= await fetch(
    // 'http://192.168.10.7:5000/upload' // for physical device  192.168.10.7
    // 'http://10.0.2.2:5000/upload' // for virtual device
    'http://192.168.201.24:5000/upload' // for device net 
    // 'http://192.168.35.209:5000/upload' // for device net 
    ,{
      method:"post",
      body:formData,
      headers:{
        'Content-Type': 'multipart/form-data'
      }
    }
  );
  let responseJson=await res.json();
  // console.log(responseJson['file_path'],"responseJson");
  return {surah_no:responseJson['surah_no'],aya_text:responseJson['aya_text']};
  // suggestions(responseJson['file_path'])


};



// var fs = require('react-native-fs');
// export const suggestions = async (jsonText) => {
//   console.log("not call yr",jsonText);
//   fetch('quran-simple-clean.txt').then((response) => response.text()).then((text) => {
//     console.log(text,"text");
//   })
// function normalizeArabic(text) {
//   // This function removes diacritics from Arabic text
//   return text.normalize('NFKD').replace(/[\u064B-\u065F]/g, '');
// }
// function searchArabicVerses(searchText,filepath) {
//   const normalizedSearchText = normalizeArabic(searchText);
//   // Read the contents of the text file into a string variable// const fileContent = fs.readFileAssets(filePath, 'utf8');// const fileContent = fs.readFile('org_islam\\src\\modules\\quran\\hooks\\http\\quran-simple-clean.txt', 'utf8');// console.log(fileContent,"fileContent");
//   const filePath = '/quran-simple-clean.txt';
//   fs.readFile(filePath, 'utf8')
//     .then((fileContent) => {console.log(fileContent);}).catch((error) => {console.log(error.message);});
//   // Split the file content into an array of lines
//   const lines = fileContent.split('\n');
//   // Initialize an empty array to store matching lines and their positions
//   const matches = [];
//   // Loop through each line in the file
//   for (let i = 0; i < lines.length; i++) {
//     const normalizedLine = normalizeArabic(lines[i]);
//     // Check if the normalized line contains the normalized search text
//     if (normalizedLine.includes(normalizedSearchText)) {// Store the matching line and its position in the matches array
//       matches.push({ line: lines[i], position: i + 1 });
//     }
//   }
//   // Return the array of matching lines and their positions
//   return matches;
// }
// const filePath = '/quran-simple-clean.txt';
// // const searchText = 'بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ';
// // const searchText = 'إلا ما ملكت أيمانكم';
// // const searchText = 'ان الله';
// console.log(filePath,"jsonText");
// const matches = searchArabicVerses(jsonText,filePath);
// let mcharr={};
// if (matches.length > 0) {
//   console.log(`Found ${matches.length} match(es):`);
//   for (const match of matches) {
//     mcharr[match.position]=match.line;
//     console.log(`- Line ${match.position}: ${match.line}`);
//   }
// } else {
//   console.log('No matches found.');
// }
// console.log(mcharr,"mcharr");
// }
// pediashour-> for more then 2 years
// tariqar uska
// 
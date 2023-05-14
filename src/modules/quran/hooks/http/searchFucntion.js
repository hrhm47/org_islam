import Quran from 'quran-json'

export const searchSurah=(searchTerm)=> {
    
    console.log("calling on Al");
    const result = [];
  
    // Search by full surah name
    result.push(...Quran.filter(surah => surah.transliteration.toLowerCase() === searchTerm.toLowerCase()));
    
    // Search by partial surah name
    result.push(...Quran.filter(surah => surah.transliteration.toLowerCase().includes(searchTerm.toLowerCase())));
  
    // Search by surah number
    if (!isNaN(searchTerm)) {
      const surah = Quran.find(surah => surah.id === Number(searchTerm));
      if (surah) {
        result.push(surah);
      }
    }
    console.log(result,"result");
    return result;
  }

// const searchSurah=(query)=> {
//     let result;
//     // Check if query is a number or string
//     if (!isNaN(query)) {
//       // Query is a number, search by surah number
//       result = Quran.find((surah) => surah.id == query);
//     } else {
//       // Query is a string, search by surah name
//       result = Quran.find((surah) =>
//         surah.name.toLowerCase().includes(query.toLowerCase())
//       );
//     }
//     console.log(result,"result");
//     // Return the search result, or null if not found
//     return result || null;
//   }

//   console.log(searchSurah(1));
//   console.log(searchSurah("Al-Fati"));
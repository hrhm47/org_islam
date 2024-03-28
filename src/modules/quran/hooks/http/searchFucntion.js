import Quran from 'quran-json'

export const searchSurah=(searchTerm)=> {
    
    // console.log("calling on Search");
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
    // console.log(result,"result");
    return result;
  }


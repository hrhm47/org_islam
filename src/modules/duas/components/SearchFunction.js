import duaData from './../json/GuidanceDua.json';


// import Quran from 'quran-json'

export const searchDua=(searchTerm)=> {
    
    // console.log("calling on Search");
    // const result = [];
    //     // console.log(,"item.title");
    // duaData['Dua for Guidance'].duas.map((item)=>{
    //     item.keywords.map((keyword)=>{
    //         // keyword.map((keys)=>{
    //             if(keyword.toLowerCase().includes(searchTerm.toLowerCase())){
    //                 result.push(item);
    //             }
    //         // })
    //         console.log(keyword,"keyword");
    //     })
    // })
  
    // function searchDua(searchQuery) {
        const results = [];
        
        // Convert the search query to lowercase for case-insensitive matching
        const query = searchTerm.toLowerCase();
        
        // Loop through each dua in the data
        for (const category of Object.keys(duaData)) {
            for (const subCategory of Object.keys(duaData[category])) {
                    for (const dua of duaData[category][subCategory]) {
                                    
                                    dua.keywords.map(keyword => {
                                        
                                        if (keyword.toLowerCase().includes(query))
                                        {
                                            results.push(dua);
                                        }}
                                        ) 
                                  
                }
            }
        }
    //     for (const dua of duaData.duas) {
    //       Check if the title, keywords, or reference contains the search query
    //       if (
    //         dua.title.toLowerCase().includes(query) ||
    //         dua.keywords.some(keyword => keyword.toLowerCase().includes(query)) ||
    //         dua.reference.toLowerCase().includes(query)
    //       ) {
    //         // Add the matching dua to the results array
    //         results.push(dua);
        console.log(results,"result");
    //       }
    //     }
        
    //     // return results;
    //   }
  }




export const ArrayofUrl=(startingAyat,endingAyat,qariName)=>{
    qariName=qariName?qariName:"ar.abdulbasitmurattal"
    // startingAyat=verseNumber?startingAyat:;
    const addUrl=[];
    // var url='https://cdn.islamic.network/quran/audio/64/'+qariName+'/'+verseNumber+'.mp3';

    for (let i=startingAyat; i<=endingAyat; i++){
        let url={url:'https://cdn.islamic.network/quran/audio/64/'+qariName+'/'+i+'.mp3', id:i.toString()};
        addUrl.push(url);
    }
    return addUrl
    // console.log("addUrl",addUrl);
}
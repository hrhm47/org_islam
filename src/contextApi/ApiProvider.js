


import React,{useState,createContext,useMemo} from "react";
const ChartsContext = createContext();

const ApiProvider = ({children}) => {
    const [chartData, setChartData] = useState([]);
  const [backupdata, setBackupdata] = useState([]);
  const [countstreak,setCountstreak]=useState(0);
  const[longeststreak,setLongeststreak]=useState("");
  const [calculatestreak,setCalculatestreak]=useState(0);
  const [streakstartdate,setStreakstartdate]=useState([]);
  const [location, setLocation] = useState(null);

  const [remtime, setRemtime] = useState(0); //   remianing time
  const [latlang,setLantlang] = useState("");




  let startdate=new Date();
  let dd=String(startdate.getDate()).padStart(2, "0");
  let mm=String(startdate.getMonth()).padStart(2, "0"); //January is 0!
  let yyyy=startdate.getFullYear();
  startdate=yyyy+"-"+mm+"-"+dd;
  // setToday(startdate);
  const[today,setToday]=useState(startdate);
  const [last4months,setLast4months]=useState([]);
  const [streakdates, setStreakdates] = useState([]);
  const [markdates, setMarkdates] = useState([]);



  const value = useMemo(() => ({
    
    chartData,setChartData,backupdata,setBackupdata,countstreak,setCountstreak, longeststreak,setLongeststreak,today,setToday,calculatestreak,setCalculatestreak,streakstartdate,setStreakstartdate,last4months,setLast4months,streakdates,setStreakdates,markdates,setMarkdates, remtime,setRemtime,latlang,setLantlang,
  }), [chartData,backupdata,countstreak,longeststreak,today,calculatestreak,streakstartdate,last4months,streakdates,markdates,remtime,latlang]);

    return(
        <ChartsContext.Provider value={value}>
            {children}
        </ChartsContext.Provider>
    )
}

export  {ChartsContext,ApiProvider};
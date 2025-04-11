import React, { useEffect, useState } from "react";
import Prayer from "./component/Prayer";
function App() {

   const[prayerTime,setprayerTime]=useState({})
   const[prayerDate,setprayerDate]=useState("")
   const[prayerCity,setprayerCity]=useState("")

  const cities=[    
        {name :  "القاهرة"  , value :"Cairo"  },
        {name : "الإسكندرية",value :"Alexandaria"  },
        {name :  "الجيزة"  ,  value :"Giza"  },
        {name :  "المنصورة" , value : "Mansoura" },
        {name :  "أسوان"    , value : "Aswan" },
        {name :  "الأقصر"    , value : "Luxor" }
  ]
useEffect(()=>{
  const fetchprayer=async()=>{
    try{
          const response=await fetch(`https://api.aladhan.com/v1/timingsByCity/03-09-2024?city=Eg&country=${prayerCity }`)
          const data_Prayer = await response.json()
          setprayerTime(data_Prayer.data.timings)
          setprayerDate(data_Prayer.data.date.gregorian.date)
          console.log(data_Prayer.data.date.gregorian.date)

    }
    catch(error){
      console.error(error)
    }
  }
  fetchprayer()
},[prayerCity])
const convertTo12HourFormat = (time) => {
  if(!time){return "00:00"}

  let [hours, minutes] = time.split(":").map(Number);
  const period = hours >= 12 ? "PM" : "AM";
  const hours12 = hours % 12 || 12;
  return `${hours12}:${minutes} ${period}`;
};

  return (
    <section>
        <div className="container">
          <div className="top-sec">
            <div className="city">

              <h3 className="h3">المدينة</h3>
              <select name="" id="" className="select"  onChange={(e)=>setprayerCity(e.target.value)}>
              {cities.map((city)=>(
                  <option    key ={city.value}  value={city.value}>{city.name}</option>
              ))}
              </select>
            </div>
              <div className="date">
                <h3 className="h3">التاريخ</h3>
                <h4 className="h4">{prayerDate}</h4>
              </div>
          </div>
           <Prayer  name= "الفجر" time={convertTo12HourFormat(prayerTime.Fajr)}/>
           <Prayer  name= "الضهر" time={convertTo12HourFormat(prayerTime.Dhuhr)}/>
           <Prayer  name= "العصر" time={convertTo12HourFormat(prayerTime.Asr)}/>
           <Prayer  name= "المغرب" time={convertTo12HourFormat(prayerTime.Maghrib)}/>
           <Prayer  name= "العشاء" time={convertTo12HourFormat(prayerTime.Isha)}/>
        </div>
 </section>
  );
}

export default App;
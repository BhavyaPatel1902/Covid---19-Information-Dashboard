import React, {useState,useEffect} from "react"
import './App.css';
import InfoBox from "./InfoBox";
import Map from "./Map";
import Table from "./Table"
import {sortData , prettyPrintStat} from "./util"
import Graph from "./Graph"
import "leaflet/dist/leaflet.css"
import {
  FormControl,
  Select,
  MenuItem,
  Card,
  CardContent
} from "./node_modules/@material-ui/core";
function App() {

  const [countries,setCountries] = useState([]);
  const [country,setCountry] = useState('Worldwide');
  const [countryInfo,setCountryInfo] = useState({});
  const [tableData,setTableData] =  useState([]);
  const [mapCenter,setMapCenter] = useState({"lat":34.80746,"lng":-40.4796});
  const [mapZoom,setMapZoom] = useState(3);
  const [mapCountries,setMapCountries]=useState([]);
  const [casesType,setCasesType]=useState("cases");

  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
    .then((response)=>response.json())
    .then((data) =>
       setCountryInfo(data)
    ); 
  },[]);

  useEffect(() => { 
      const getCountriesData = async () => {
        await fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((country)=>(
          {
              name : country.country,
              value : country.countryInfo.iso2
          }));

          const sortedData = sortData(data);
          setCountries(countries);
          setMapCountries(data);
          setTableData(sortedData);
        })
      }
      getCountriesData();
  },[])
 
  const onCountryChange = async (event) => {
     const countryCode = event.target.value
     setCountry(countryCode)

     const url =  
     countryCode==="Worldwide"?
     "https://disease.sh/v3/covid-19/all":
     `https://disease.sh/v3/covid-19/countries/${countryCode}`

     await fetch(url)
     .then((response)=>response.json())
     .then((data) => {
            setCountry(countryCode);
            setCountryInfo(data);
            if(countryCode==="Worldwide")
            { 
                setMapCenter([34.80746,-40.4796])&&setMapZoom(5);
            }
            else
            {
                setMapCenter([data.countryInfo.lat,data.countryInfo.long])&&setMapZoom(5);
            }
     });
  };

  return (
   <div className="app">
     <div className="app__left">
      <div className="app__header">
       <h1>COVID 19 TRACKER</h1>
       <FormControl className="app__dropdown">
         <Select variant="outlined" value={country} onChange={onCountryChange}>
              <MenuItem value="Worldwide"><h3>Worldwide</h3></MenuItem>
              {
                countries.map((country)=>(
                  <MenuItem value={country.value}><h3>{country.name}</h3></MenuItem>
                ))
              }
         </Select>
       </FormControl>
      </div>

      <div className="app__stats">
           <InfoBox 
           isRed
           active={casesType==="cases"}
           title="CoronaVirus Cases" 
           total={prettyPrintStat(countryInfo.cases)} 
           cases={prettyPrintStat(countryInfo.todayCases)}
           onClick={e => setCasesType('cases')}/>
           <InfoBox 
           active={casesType==="recovered"}
           title="Recovered" 
           total={prettyPrintStat(countryInfo.recovered)} 
           cases={prettyPrintStat(countryInfo.todayRecovered)}
           onClick={e => setCasesType('recovered')}/>
           <InfoBox 
           isRed
           active={casesType==="deaths"}
           title="Deaths" 
           total={prettyPrintStat(countryInfo.deaths)} 
           cases={prettyPrintStat(countryInfo.todayDeaths)}
           onClick={e => setCasesType('deaths')}/>
      </div>

     <Map 
        casesType={casesType}
        countries={mapCountries}
        center={mapCenter} 
        zoom={mapZoom} 
      />
     </div>
     <Card className="app__right">
       <CardContent>
          <h3>Live Cases By Country</h3>
          <Table countries = {tableData}/>
          <h3 className="app__graphTitle">Worldwide New {casesType}</h3>
          <Graph casesType={casesType} className="app__graph"/>
          <h2>Bhavya Patel</h2>
       </CardContent>
     </Card>
   </div>
  );
}
export default App;

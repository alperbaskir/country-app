import {ReactSearchAutocomplete} from "components/Search/index"
import React, { useCallback, useEffect, useState } from "react";
function App() {
  const [countryNameList, setCountryNameList] = useState<String[]>([])
  const  fetchCountriesNames  = useCallback(async() => {
    try {
      const response = await fetch('https://restcountries.com/v2/all?fields=name')
      if(!response.ok) {
        throw new Error('Something went wrong!')
      }
      const data = await response.json();
      const searchBoxList = data.map((item: { name: string; }, index: number) => {return {name: item.name, id: index}})
      setCountryNameList(searchBoxList);
    } catch (err) {
      throw new Error('Something went wrong!')
    }
  }, []);
  useEffect(()=>{
    fetchCountriesNames();
  }, [fetchCountriesNames]); 
  return (
   <React.Fragment>
     <ReactSearchAutocomplete 
     items={countryNameList}
     autoFocus
     />
     <div>I'm going to add selected country component here!</div>
   </React.Fragment> 
  
  );
}

export default App;

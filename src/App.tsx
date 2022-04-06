import {ReactSearchAutocomplete} from "components/search/index"
import { useCallback, useEffect, useState } from "react";
import Layout from 'components/layout/Layout';
import Card, {CardProps} from "components/country/Card";
import {getRequest} from "./AxiosClient"
function App() {
  type Item = {
    id: number;
    name: string;
  }
  const [countryNameList, setCountryNameList] = useState<Item[]>([])
  const [showSelectedCountryCard, setShowSelectedCountryCard] = useState<boolean>(false);
  const [selectedCountryData, setSelectedCountryData] = useState<CardProps>();
  const [clearStatus, setClearStatus] = useState<boolean>(false)
  const  fetchCountriesNames  = useCallback(async() => {
    try {
      const response = await getRequest(`/all?fields=name,nativeName`)
      if(response.data) {
        const searchBoxList = response.data.map((item: { name: string; nativeName: string}, index: number) => {return {name: item.name, id: index, nativeName: item.nativeName}})
        setCountryNameList(searchBoxList);
      }
    } catch (err) {
      throw new Error('Houston, we have a problem.. with fetch')
    }
  }, []);
  useEffect(()=>{
    fetchCountriesNames();
  }, [fetchCountriesNames]); 

  const handleOnSelect = async (item: Item) => {
    await getCountryDetailByName(item.name);
  }

  const handleOnClear = () => {
    setShowSelectedCountryCard(false);
  }

  const getCountryDetailByName = async (name: string)=> {
    try {
      const response = await getRequest(`/name/${name}`);
      if(response.data && response.data.length > 0) {
        setSelectedCountryData({
          name: response.data[0].name,
          capital: response.data[0].capital,
          flag: response.data[0].flag
        })
        setShowSelectedCountryCard(true);
      }
    } catch (err){
      throw new Error('Houston, we have a problem.. with fetch')
    }
  }
  return (
   <Layout>
     <ReactSearchAutocomplete
     items={countryNameList}
     onSelect={handleOnSelect}
     onClear={handleOnClear}
     placeholder={'Search Country'}
     fuseOptions={{ keys: ["name", "nativeName"] }}
     shouldClear={clearStatus}
     />
    {showSelectedCountryCard && (
    <Card 
    name={selectedCountryData!.name}
    capital={selectedCountryData!.capital}
    flag={selectedCountryData!.flag}
     />
    )} 
   </Layout> 
  
  );
}

export default App;

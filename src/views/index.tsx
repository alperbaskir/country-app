import {ReactSearchAutocomplete} from "components/search/index"
import { useCallback, useEffect, useState } from "react";
import Layout from 'components/layout/Layout';
import Card, {CardProps} from "components/country/Card";
import {getRequest} from "../AxiosClient"
import SelectBox from "components/select";
import { LoadingHOC } from "components/loading/LoadingHOC";
const View = (props:any) => {
  const {setLoading} = props;
  type Item = {
    id: number;
    name: string;
    nativeName: string;
  }
  const [countryNameList, setCountryNameList] = useState<Item[]>([])
  const [showSelectedCountryCard, setShowSelectedCountryCard] = useState<boolean>(false);
  const [selectedCountryData, setSelectedCountryData] = useState<CardProps>();
  const [clearStatusForSearchBox, setClearStatusForSearchBox] = useState<boolean>(false)
  const [clearStatusForSelectBox, setClearStatusForSelectBox] = useState<boolean>(false)
  const  fetchCountriesNames  = useCallback(async() => {
    try {
      const response = await getRequest(`/all?fields=name,nativeName`)
      if(response.data) {
        const searchBoxList = response.data.map((item: { name: string; nativeName: string}, index: number) => {return {name: item.name, id: index, nativeName: item.nativeName}})
        setCountryNameList(searchBoxList);
        setLoading(false);
      }
    } catch (err) {
      setLoading(false);
      throw new Error('Houston, we have a problem.. with fetch')
    }
  }, []);
  useEffect(()=>{
    fetchCountriesNames();
  }, [fetchCountriesNames]); 

  const handleOnSelect = async (item: Item) => {
    setClearStatusForSelectBox(true);
    await getCountryDetailByName(item.name);
    setClearStatusForSelectBox(false);
  }
  const handleSelectBoxOnSelect = async (countryName: string) => {
    setClearStatusForSearchBox(true);
    await getCountryDetailByName(countryName);
    setClearStatusForSearchBox(false);

  }
  const handleOnClear = () => {
    setShowSelectedCountryCard(false);
  }

  const getCountryDetailByName = async (name: string)=> {
    try {
      setLoading(true);
      const response = await getRequest(`/name/${name}`);
      if(response.data && response.data.length > 0) {
        setSelectedCountryData({
          name: response.data[0].name,
          capital: response.data[0].capital,
          flag: response.data[0].flag
        })
        setShowSelectedCountryCard(true);
        setLoading(false);
      }
    } catch (err){
      setLoading(false);
      throw new Error('Houston, we have a problem.. with fetch')
    }
  }
  return (
   <Layout>
     <SelectBox optionList={countryNameList} 
      onSelect={handleSelectBoxOnSelect}
      setInitial={clearStatusForSelectBox}
      onClear={handleOnClear}
      />
    <p>OR</p> 
    <ReactSearchAutocomplete
     items={countryNameList}
     onSelect={handleOnSelect}
     onClear={handleOnClear}
     placeholder={'Search Country'}
     fuseOptions={{ keys: ["name", "nativeName"] }}
     shouldClear={clearStatusForSearchBox}
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

const WrappedView = LoadingHOC(View)
export default WrappedView;

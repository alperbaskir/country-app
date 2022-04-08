import styled from 'styled-components'
import { useEffect, useState,  } from "react";
import { useTranslation } from 'react-i18next'

const SelectBox = (props: any) => {
    const { t } = useTranslation();
    const [selectedItem, setSelectedItem] = useState<string>('select')
    useEffect(()=>{
        if(props.setInitial) {
        setSelectedItem("select")
        }
    }, [props.setInitial])
    const changeHandler = (event:any) => {
        setSelectedItem(event.target.value);
        (event.target.value !== 'select') && props.onSelect(event.target.value);
        (event.target.value === 'select') && props.onClear();
    }
    return(
        <StyledSelectBox>
            <select id="country" onChange={changeHandler} value={selectedItem}>
                  <option value="select">{t('selectBoxTitle')}</option>
                  {props.optionList.map((country: { name: string }, index: number)=>{
                      return(<option key={index} value={country.name!.toString()}>{country.name}</option>)
                  })}
               </select>
        </StyledSelectBox>
    )
}
const StyledSelectBox = styled.div`
> select {
    border-color: #dfe1e5;
    border-radius: 24px;
    height: 46px;
    padding-left: 50px;
    color: #808080;
    font-size: inherit;
    font-family: inherit;
    width: 100%;
    -moz-appearance:none; /* Firefox */
    -webkit-appearance:none; /* Safari and Chrome */
    appearance:none;
    background: transparent url("data:image/svg+xml;utf8,<svg viewBox='0 0 140 140' width='20' height='20' xmlns='http://www.w3.org/2000/svg'><g><path d='m121.3,34.6c-1.6-1.6-4.2-1.6-5.8,0l-51,51.1-51.1-51.1c-1.6-1.6-4.2-1.6-5.8,0-1.6,1.6-1.6,4.2 0,5.8l53.9,53.9c0.8,0.8 1.8,1.2 2.9,1.2 1,0 2.1-0.4 2.9-1.2l53.9-53.9c1.7-1.6 1.7-4.2 0.1-5.8z' fill='%23808080'/></g></svg>") no-repeat;
    background-position-x: 18px;
    background-position-y: 14px;
    background-color: white;
    &:focus-visible {
        outline: -webkit-focus-ring-color auto 0px !important;
      }
    &:hover {
        box-shadow: rgb(32 33 36 / 28%) 0px 1px 6px 0px !important;
    } 
}
`;

export default SelectBox;
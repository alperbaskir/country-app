import React from "react";
import styled from 'styled-components'

export interface CardProps {
    name: string,
    capital: string,
    flag: string
  }
const Card = (props: CardProps) => {
    return(
        <StyledCard>
            <img src={props.flag} alt="Country App"></img>
            <hr></hr>
            <p><label>Name: </label><span>{props.name}</span></p>
            <p><label>Capital: </label><span>{props.capital}</span></p> 
        </StyledCard>

    )
}

const StyledCard = styled.div`
margin: 1rem 0;
padding: 1rem;
justify-content: space-between;
align-items: flex-end;
box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
border-radius: 6px;
>img {
    width: 250px;
}
>p label {
    font-weight:700;
}
`;

export default Card;
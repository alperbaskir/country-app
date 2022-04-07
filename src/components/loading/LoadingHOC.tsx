import React, {useState} from "react";
import LoadingSpinner from "./LoadingSpinner";
import styled from 'styled-components'

export const LoadingHOC = (WrappedComponent: any) => {
    function HOC(props:any) {
        const [isLoading, setLoading] = useState<boolean>(true);

        const setLoadingState = (isComponentLoading : boolean) => {
            setLoading(isComponentLoading);
        };
        return(
            <>
            {isLoading && <div><LoadingSpinner/></div>}
            <StyledWrapper>
            <div className={isLoading ? "loading": ""}>
                <WrappedComponent {...props} setLoading={setLoadingState}/>
            </div>
            </StyledWrapper>
            </>
        )
    }
    return HOC;
}

const StyledWrapper = styled.div`
 >.loading {
    opacity:0.1
}
`

export default LoadingHOC;
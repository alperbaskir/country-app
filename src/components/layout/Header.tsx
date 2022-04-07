import styled from "styled-components"

const Header = () => {
  return(
    <StyledHeader>
      <img src="./logo.png" alt="Country App"></img>
    </StyledHeader>
  )
}
const StyledHeader = styled.div`
> img {
    min-width: 15rem;
    max-width: 18rem;
    padding-bottom: 0.5rem;
}
`;

export default Header;
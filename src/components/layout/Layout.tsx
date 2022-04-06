import styled from 'styled-components'
import Header from './Header';
import ErrorBoundry from './ErrorBoundry';
const Layout = (props:any) => {
  return (
      <StyledLayout>
        <ErrorBoundry>
        <Header/>
        <main>{props.children}</main>
        </ErrorBoundry>
      </StyledLayout>
  );
};
const StyledLayout = styled.div`
min-width: 18rem;
max-width: 30rem;
`;
export default Layout;
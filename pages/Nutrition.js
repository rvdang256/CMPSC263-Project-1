import styled from "styled-components";
import Navbar2 from "@/components/Navbar2";
import SearchBar from "@/components/SearchBar";






const ParentContainer = styled.main`
  width: 100vw;
  padding: 0;
  height: 100vh;
`


export default function Nutrition() {
        return (
            <ParentContainer>
                <Navbar2/>
                <SearchBar/>
            </ParentContainer>
            
        );
    }
      

import React from 'react';
import styled from 'styled-components';
import { useState } from 'react';
import axios from 'axios';


const ExcerciseSelecter = () => {
    const[data, setData] = useState(null);
    const [selectedExercise, setSelectedExercise] = useState(null);


    async function fetchData() {

        const options = {
        method: 'GET',
        url: 'https://exercises-by-api-ninjas.p.rapidapi.com/v1/exercises',
        params: {muscle: document.getElementById("dropdown").value},
        headers: {
          'X-RapidAPI-Key': 'f444a7a15fmshf34e2ddf0108b86p114cabjsn88bcab9ad8e4',
          'X-RapidAPI-Host': 'exercises-by-api-ninjas.p.rapidapi.com'
        }
        };

        try {
            let response = await axios.request(options);
            console.log(response.data);          
            setData(response.data);
        } catch (error) {
            console.error(error);
        }
    }
    

    
  
    return (
        <Container>
          <Heading>Excercise Recommender</Heading>
          <Wrapper>
            <DropdownMenu id="dropdown">
              <Option value="chest">Chest</Option>
              <Option value="triceps">Triceps</Option>
              <Option value="quadriceps">Quads</Option>
              <Option value="lower_back">Lower Back</Option>
              <Option value="middle_back">Middle Back</Option>
              <Option value="biceps">Biceps</Option>
              <Option value="abdominals">Abs</Option>
              <Option value="calves">Calves</Option>
            </DropdownMenu>
            <SearchButton onClick={fetchData}>Search</SearchButton>
          </Wrapper>
          <Display>
            {data && (
              <List>
                {data.slice(0, 5).map((exercise, index) => (
                  <ListItem key={index} onClick={() => setSelectedExercise(exercise)}>
                    {exercise.name}
                  </ListItem>
                ))}
              </List>
            )}
          </Display>

     
          {selectedExercise && (

              <>
              <Heading>
                {selectedExercise.name}
              </Heading>
              <ExerciseInstructions>
                {selectedExercise.instructions}
              </ExerciseInstructions>
              <div></div>
              </>

          )}
        </Container>
      );
    };
    
    
      const Container = styled.div`
        display: flex;
        flex-direction: column;
        text-align: center;
        height: auto;
        margin-top: 100px;
        justify-content: center;
        align-items: center;
        
        
        
        
      `;

    const Heading = styled.h1`
      display: flex;
      flex-direction: column;
      font-size: 24px;
      margin-bottom: 20px;

    `;

    
    //Spaces out all the componesnts near the search bar
    const Wrapper = styled.div`
    display: flex;
    justify-content: center;

    align-items: center;
    margin-bottom: 20px;
`;


  

    
    const SearchButton = styled.button`
    
      padding: 10px 20px;
      border: none;
      border-radius: 4px;
      background-color: #12a9e0;
      color: white;
      cursor: pointer;
      margin-left: 10px;
    
      &:hover {
        background-color: #0056b3;
      }
    `;
    
  
  
const Display = styled.div`
    
  
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(5, 5, 5, 1);
    padding: 40px;
    width: 350px;
    height: 240px;
    

    
    
    margin-bottom: 35px; 
    /* Add padding bottom to create space between SearchWrapper and LoginForm */

`;

const DropdownMenu = styled.select`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Option = styled.option`
  padding: 10px;
`;

const List = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
`;



const ListItem = styled.li`
  margin-bottom: 10px;
  font-size: 16px;
  color: #333;
  background-color: #f5f5f5;
  padding: 10px;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  cursor: pointer;

  &:hover {
    background-color: #d4e9ff;
  }
`;


const ExerciseInstructions = styled.div`
    text-align: left;
    font-size: 16px;
    line-height: 1.6;
    margin-top: 10px;
    color: #333;
    background-color: #f9f9f9;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;


export default ExcerciseSelecter;
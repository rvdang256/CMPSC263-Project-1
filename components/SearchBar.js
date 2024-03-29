import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useState } from 'react';
import axios from 'axios';
import { database } from '@/library/firebaseConfig';
import {collection, doc, getDoc, setDoc} from 'firebase/firestore';
import { useStateContext } from '@/context/StateContext';


const SearchBar = () => {
    const currentDate = new Date().toLocaleDateString();
    const [date, setDate] = useState(currentDate);
    const [buttonText, setButtonText] = useState("Show Food Entries");
    const {user} = useStateContext();
    
    const [showDateOption, setShowDateOption] = useState(true);
    const [data, setData] = useState('');
    const [inputText, setInputText] = useState('');
    const [foodArray, setFoodArray] = useState([]);
    const [calorie, setCalorie] = useState(0);
    const [protein, setProtein] = useState(0);
    const [fat, setFat] = useState(0);
    const [sugar, setSugar] = useState(0);
    const [fiber, setFiber] = useState(0);
    const [sodium, setSodium] = useState(0);
    const [showHistory, setShowHistory] = useState(false);

    const foodCollectionRef = collection(database, "foodCollection");

    //Get the data from the database first time the page is rendered
    useEffect(() => {
      const docRef = doc(foodCollectionRef, user.email);

      getDoc(docRef).then((docSnap) => {
        if (docSnap.exists()) {
          const data = docSnap.data();
          setData(data);
          if (data[currentDate] == null) {
            //If the current date is not in the database, add it
            let newDocData = {[currentDate]: {foodArray: [], macroNutrients: [0, 0, 0, 0, 0, 0]}}
            const concatenatedObject = { ...data, ...newDocData };
            setDoc(docRef, concatenatedObject);
            console.log("Document data:", concatenatedObject);
            setData(concatenatedObject);
          }

        } else {
          // doc.data() will be undefined in this case and we create a new document
          let newDocData = {[currentDate]: {foodArray: [], macroNutrients: [0, 0, 0, 0, 0, 0]}}
          setDoc(docRef, newDocData);
          setData(newDocData);
          console.log("No such document!");
        }
        }).catch((error) => {
          console.log("Error getting document:", error);
        });
    }, [])

      //When the date is changed, update the foodArray and the macroNutrients
      function onChange(){
        setShowDateOption(false);
        const foodEntry = data[document.getElementById("dropdown").value]
        setDate(document.getElementById("dropdown").value)
        setFoodArray(foodEntry['foodArray']);
        setCalorie(foodEntry["macroNutrients"][0]);
        setFat(foodEntry["macroNutrients"][1]);
        setProtein(foodEntry["macroNutrients"][2]);
        setSodium(foodEntry["macroNutrients"][3]);
        setFiber(foodEntry["macroNutrients"][4]);
        setSugar(foodEntry["macroNutrients"][5]);
      }

      //Fetch the data from the API
    async function fetchData() {
        const docRef = doc(foodCollectionRef, user.email);
        const options = {
        method: 'GET',
        url: 'https://nutrition-by-api-ninjas.p.rapidapi.com/v1/nutrition',
        params: {
            query: inputText
        },
        headers: {
            'X-RapidAPI-Key': 'f444a7a15fmshf34e2ddf0108b86p114cabjsn88bcab9ad8e4',
            'X-RapidAPI-Host': 'nutrition-by-api-ninjas.p.rapidapi.com'
        }
        };

        try {
            const response = await axios.request(options);
            //If the data is not empty, add the food item to the foodArray and update the macroNutrients
            if (response.data.length != 0) {
              setFoodArray([...foodArray, inputText]);
              
              setCalorie(calorie + response.data[0].calories);
              setSodium(sodium + response.data[0].sodium_mg);
              setProtein(protein + response.data[0].protein_g);
              setFat(fat + response.data[0].fat_total_g);
              setFiber(fiber + response.data[0].fiber_g);
              setSugar(sugar + response.data[0].sugar_g);

              const updatedCalorie = calorie + response.data[0].calories;
              const updatedSodium = sodium + response.data[0].sodium_mg;
              const updatedProtein = protein + response.data[0].protein_g;
              const updatedFat = fat + response.data[0].fat_total_g;
              const updatedFiber = fiber + response.data[0].fiber_g;
              const updatedSugar = sugar + response.data[0].sugar_g;

              let updatedEntry = {
                [currentDate]: {
                  foodArray: [...foodArray, inputText],
                  macroNutrients: [updatedCalorie, updatedFat, updatedProtein, updatedSodium, updatedFiber, updatedSugar]
                }
              };

              console.log(updatedEntry);
              let updatedDocument = { ...data, ...updatedEntry };
              setData(updatedDocument)
              setDoc(docRef, updatedDocument)
              
              
            }else{
              alert("No data found for this food item")
            }

        } catch (error) {
            console.error(error);
        }
    }
  
    return (
        <Container>
          <Heading>Nutrition Calculator</Heading>
          <Subtitle>Keep track of your daily calories and macros</Subtitle>
          <SearchWrapper>
            {
            //If the date is the current date, display the input field and the enter button
            date == currentDate && (
              <>
                <SearchInput
                  placeholder="Type..."
                  onChange={(e) => setInputText(e.target.value)}
                />
                <SearchButton onClick={fetchData}>Enter</SearchButton>
              </>
            )}
            
            <SearchButton onClick={() => {
              setShowHistory(!showHistory);
              setButtonText(!showHistory ? "Show Macro Information" : "Show Food Entries");
            }}>
              {buttonText}
            </SearchButton>
          </SearchWrapper>
          <DropdownMenu id = "dropdown"onChange={onChange}>
          
              {//If the date is not the current date, display the date option
              
              showDateOption && <Option value="Select a date">Select a date</Option>}

            {Object.keys(data).map((key, index) => (
              <Option key={index} value={key}>{key}</Option>
            ))}
            

          </DropdownMenu>
          <ListDisplay>
            {showHistory ? 
            <>
              {foodArray.map((food, index) => (
                 <ListItem key={index}>{food}</ListItem>
              ))}
              
            </>
            : // If showHistory is false, display the foodArray
            <List>
              <ListItem>Total Calories: {calorie.toFixed(1)}</ListItem>
              <ListItem>Total Fat (g): {fat.toFixed(1)}</ListItem>
              <ListItem>Total Protein (g): {protein.toFixed(1)}</ListItem>
              <ListItem>Total Sodium (mg): {sodium.toFixed(1)}</ListItem>
              <ListItem>Total Fiber (g): {fiber.toFixed(1)}</ListItem>
              <ListItem>Total Sugar (g): {sugar.toFixed(1)}</ListItem>
            </List>
            }

          </ListDisplay>
        </Container>
      );
    };
    
    const Container = styled.div`
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      height: auto;
      margin-top: 100px;
    `;
    
    const Heading = styled.h1`
      font-size: 24px;
      margin-bottom: 20px;
      font-family: "Gill Sans", sans-serif;
    `;
    
    //Spaces out all the componesnts near the search bar
    const SearchWrapper = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 20px; 
`;

    
    const SearchInput = styled.input`
      padding: 10px;
      border: 1px solid #ccc;
      border-radius: 4px;
    `;
    
    
    
   
const ListDisplay = styled.form`
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(5, 5, 5, 1);
    padding: 40px;
    width: 350px;
    height: 280px;
    align-items: center; 
    overflow: auto; /* Add overflow property for scrollability */
`;

const Subtitle = styled.h2`
  font-size: 18px;
  font-family: "Gill Sans", sans-serif;
  margin-bottom: 10px;
  color: #333;
  letter-spacing: 1px;
  font-weight: bold;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
  margin-bottom: 20px;
`;

const DropdownMenu = styled.select`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-bottom: 20px;
`;

const Option = styled.option`
  padding: 10px;
`;


const List = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
`;




const ListItem = styled.div`
  margin-bottom: 10px;
  font-size: 16px;
  color: #333;
  background-color: #f5f5f5;
  padding: 10px;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;


const SearchButton = styled.button`
  --b: 3px;   /* border thickness */
  --s: .15em; /* size of the corner */
  --c: #12a9e0;
  
  padding: 10px 20px;
  color: var(--c);
  --_p: var(--s);
  background:
    conic-gradient(from 90deg at var(--b) var(--b), #0000 90deg, var(--c) 0)
    var(--_p) var(--_p)/calc(100% - var(--b) - 2*var(--_p)) calc(100% - var(--b) - 2*var(--_p));
  transition: .3s linear, color 0s, background-color 0s;
  outline: var(--b) solid #0000;
  outline-offset: .2em;
  font-family: system-ui, sans-serif;
  font-weight: bold;

  cursor: pointer;
  border: none;
  margin: .1em;
  margin-left: 10px;

  &:hover,
  &:focus-visible {
    --_p: 0px;
    outline-color: var(--c);
    outline-offset: .05em;
  }

  &:active {
    background: var(--c);
    color: #fff;
  }
`;

  export default SearchBar;
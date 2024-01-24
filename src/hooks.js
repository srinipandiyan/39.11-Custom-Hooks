import { useState, useEffect } from "react";
import axios from "axios";

function useFlip(){
    const [isFacingUp, setIsFacingUp] = useState(true);

    const flipCard = () => {
        setIsFacingUp(isUp => !isUp);
    };

    return [isFacingUp, flipCard];
}

// function useAxios(keyLS, baseURL){
//     const [resp, setResp] = useLocalStorage(keyLS);

//     const respData = async(formatter = data => data, restOfURL = "") => {
//         try {
//         const response = await axios.get(`${baseURL}${restOfURL}`);
//         setResp(data => [...data, formatter ? formatter(response.data) : response.data]);
//         } catch (error) {
//         console.error("Error fetching URL:", error);
//         }
//     }
//     const clearResp = () => setResp([]);
//     return [resp, respData, clearResp]
// }


function useAxios(keyLS, baseURL) {
  const [resp, setResp] = useLocalStorage(keyLS);

  const respData = async (restOfURL = "") => {
    try {
      const response = await axios.get(`${baseURL}${restOfURL}`);
      setResp(data => [...data, response.data]);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const clearResp = () => setResp([]);

  return [resp, respData, clearResp];
}


function useLocalStorage(key, initialValue = []) {
  if (localStorage.getItem(key)) {
    initialValue = JSON.parse(localStorage.getItem(key));
  }
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value, key]);

  return [value, setValue];
}

export { useFlip, useAxios, useLocalStorage };
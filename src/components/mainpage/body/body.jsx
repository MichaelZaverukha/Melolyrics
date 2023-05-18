import React, {useState,useEffect} from "react";
import Header from "../header/header";
import Main from "../main/main";
import BG1 from "../../../images/31.jpg";
import BG2 from "../../../images/522.jpg";
import { Route, Routes } from "react-router-dom";
import Singlesong from "../../list/singlesong/singlesong";
import MainList from "../../list/mainList/list";


function Body (){
   const [isWhite, setIsWhite] = useState(true);
   const handleColorChange = (newIsWhite) => {
      setIsWhite(newIsWhite);
    };
    const styles = {
      background: `url(${isWhite ? BG1 : BG2}) no-repeat center/cover`,
      minheight: '100vh',
      transition: 'background 0.5s ease-in-out',
    };
    useEffect (()=>{
      const savedIsWhite = localStorage.getItem("isWhite");
      if (savedIsWhite !== null) {
         setIsWhite(JSON.parse(savedIsWhite));
       }
    },[])
    useEffect(()=>{
      localStorage.setItem("isWhite",JSON.stringify(isWhite));
    },[isWhite])
   return(
      <div className="wrapper" style={styles}>
        <Header onColorChange={handleColorChange} isWhite={isWhite} />
        <Routes>
          <Route path="/" element={<Main Mainchangecolor={isWhite} isWhite={isWhite} />} />
          <Route path="/list/singlesong/:commontrackId/:trackId" element={<Singlesong Mainchangecolor={isWhite} isWhite={isWhite}/>}></Route>
          <Route path="/list/mainlist/:searchMusic" element={<MainList Mainchangecolor={isWhite} isWhite={isWhite}></MainList>}></Route>
        </Routes>
      </div>
   )
}
export default Body;
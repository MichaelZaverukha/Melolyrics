import './header.scss';
import {useEffect, useRef, useState} from 'react';
import React from 'react';
import {ReactComponent as Search} from '../../../images/icons8-поиск.svg';
import Main from '../main/main';
import {ReactComponent as Sun} from '../../../images/sun.svg'
import {ReactComponent as Moon} from '../../../images/moon.svg';

function Header (props){
   const [whitetext, setWhiteText]= useState(false);
   const {onColorChange,isWhite}= props;
   const [isSun ,setSun] = useState(true);
   const changeSvg = () =>{
      setSun(!isWhite)
   }
   
   const  styleText = {
      color : whitetext ?  'black' : '#07ffd2',
      fill : whitetext ?  'black' : '#07ffd2',
      background: 'none',

   }
   const handleClick = ()=>{
      onColorChange (!isWhite);
   }
   useEffect(()=>{
      const saveSun = localStorage.getItem('isSun');
      const saveTitle = localStorage.getItem('whiteText');
      if (saveSun !== null) {
         setSun(JSON.parse(saveSun));
       }
       if (saveTitle !== null) {
         setWhiteText(JSON.parse(saveTitle));
       }
   },[])
   useEffect(()=>{
      localStorage.setItem('isSun', JSON.stringify(isSun));
   },[isSun]);
   useEffect(()=>{
      localStorage.setItem('whiteText', JSON.stringify(whitetext));
   },[whitetext]);
   const colorChange= ()=>{
      setWhiteText(!whitetext)
   }
   const changeTheme=()=>{
      handleClick();
      colorChange();
      changeSvg();
   }
   return(
      <>
         <header className='header'>
            <ul className="header__menu">
               <li className="header__item">
                  <a href="http://localhost:3000/#search-input" className='header__search'>
                     <Search className='header__search-logo' style={styleText} width="50" height="50"></Search>
                  </a>
               </li>
               <li className="header__item">
                  <a href="/" className='header__title'>
                     <h1  style={styleText}>MeloLyrics</h1>
                  </a>
               </li>
               <li className="header__item">
                  <button onClick={changeTheme} className='header__changetheme'> {isSun ? <Sun width='50' height='50' style={styleText}/> : <Moon width='50' height='50' style={styleText}/>}</button>
               </li>
            </ul>
         </header>
      </>
   )
}




export default Header
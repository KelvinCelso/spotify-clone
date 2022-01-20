
import { ChevronDownIcon, ChevronLeftIcon } from "@heroicons/react/outline";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import styled from "styled-components"
import useSpotify from "../hooks/useSpotify";
import Daily from "./Daily";
import Listen from "./Listen";
import FavArtist from "./FavArtist";

import MostListened from "./MostListened";
import { useRouter } from "next/router";
import { mainPageState, PreviousPageState } from "../atoms/pagesAtom";
import { useRecoilState } from "recoil";
import signOut
function CenterHome() {
    const router=useRouter();
    const spotifyApi=useSpotify()
    const {data: session }=useSession();
    const [previousPage, setPreviousPage]=useRecoilState(PreviousPageState)
    const [pages, setPages]=useRecoilState(mainPageState)
    
    
    return (
        <Container>
                <HeaderContainer>
                    <ChevronLeftIcon className="icons" onClick={
                        ()=>setPages(previousPage)}/>
                    <ProfileContainer>
                        <img src={session?.user.image}></img>
                        <h2>{session?.user.name}</h2>
                        <ChevronDownIcon className='icon'/>
                    </ProfileContainer>
                </HeaderContainer>
                <Daily/>
                <Listen/>
                <FavArtist/>
                <MostListened/>
        </Container>
    )
}
const Container=styled.div`
color: white;
flex-grow: initial;
width: 100%;
height: 90vh;
position: relative;
overflow-x: hidden;
display: flex;
flex-direction: column;
background-image: linear-gradient( to bottom,rgb(17,45,82), rgb(18,18,18) 40%);
overflow-y:scroll;
::-webkit-scrollbar{
    display: none;
}
h1{
    font-size: 1.8em;
}
.icons{
    width: 20px;
}
@media (max-width:768px) {
     height: 84vh ;
  }

`


const ProfileContainer=styled.div`
display: flex;
align-items: center;
background-color: black;
border-radius: 30px;
padding: 5px;
margin-right: 20px;

cursor: pointer;

&:hover{
    background-color: rgba(0,0,0,0.6);
}
img{
    width: 30px;
    height: 30px;
    border-radius: 50%;

    
}
.icon{
    width: 15px;
    height: 15px;
}
h2{
    padding: 0px  10px;
}
@media (max-width: 768px) {
       img{
        width:30px ;
        height: 30px;
       }
       h2{
           display: none;
       }
       .icon{
           display: none;
       }
    }

`
const HeaderContainer=styled.header`
position: absolute;
display: flex;
justify-content: space-between;
width: 100%;
top: 1%;
align-items: center;
position: sticky;
z-index: 1;
.icons{
        height: 30px;
        background-color: black;
        border-radius: 50%;
        margin-right: 5px;
        border: 1px solid gray;
        width: 30px;
        margin-left: 20px;

        &:hover{
            border: 1px solid white;

        }
        
    }
`
export default CenterHome

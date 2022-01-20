import styled from "styled-components";
import React, { useEffect } from 'react'
import {PlayIcon , HeartIcon} from "@heroicons/react/solid"
    
import {ArrowCircleDownIcon, DotsHorizontalIcon, SearchIcon,ChevronDownIcon, ClockIcon } from "@heroicons/react/outline"
import { playlistIdState, playlistState } from "../atoms/playlistAtom";
import { useRecoilState, useRecoilValue } from "recoil";
import useSpotify from "../hooks/useSpotify";
import Song from "./Song";
import Songs from "./Songs";

function CenterHub(playSong) {
    const playlist=useRecoilValue(playlistState)

    return (
        <Container>
            <Controls>
                <ControlsIcon>
                    <PlayIcon className="icon"/>
                    <HeartIcon className="icon2"/>
                    <ArrowCircleDownIcon className="icon3"/>
                    <DotsHorizontalIcon className="icon3"/>
                </ControlsIcon>
                <ControlsIcon>
                    <SearchIcon className="icon4"/>
                    <span>Custom Order</span>
                    <ChevronDownIcon className="icon4"/>
                </ControlsIcon>
            </Controls>
            <Tags>

                <p ># Title</p>
                <p>Album</p>
                <ClockIcon className="icon5"/>   
            </Tags>
            <hr></hr>
            <Tracklist>
                <Songs/>
            </Tracklist>
        </Container>
    )
}
const Container=styled.div`
display: flex;
flex-direction: column;
background-color: rgba(0, 0, 0, 0.6 );
box-shadow: -6px -3px 96px 4px rgba(0,0,0,0.42);
-webkit-box-shadow: -6px -3px 96px 4px rgba(0,0,0,0.42);
-moz-box-shadow: -6px -3px 96px 4px rgba(0,0,0,0.42);;
margin: auto;
margin-top: 25px;
max-width: 98%;



`
const Controls=styled.div`
display: flex;
align-items: center;
justify-content: space-between;
padding-right: 20px;
`
const ControlsIcon=styled.div`
display: flex;
margin-left: 20px;
    .icon{
        width: 70px;
        color: rgb(29,185,84);
        &:hover{
            width: 75px;
        }
    }
    .icon2{
        width: 35px;
        color: rgb(29,185,84);
        &:hover{
            width: 40px;
        }
    }
    .icon3{
        width: 35px;
        &:hover{
            width: 40px;
        }
    }
    .icon4{
        width: 20px;
        &:hover{
            width: 23px;
        }
    }
    span{
        padding-left: 10px;
        padding-right: 10px;
    }
`
const Tags= styled.div`
display: flex;
max-width: 100%;
align-items: center;
justify-content: space-between;
word-spacing: 10px;
padding: 10px 20px;
    .icon5{
        width: 18px;
    }
    p{

    }
    @media (max-width: 768px) {
        display: none;
    }
    @media (min-width: 1080px) {
    padding: 10px 5vw;
    }

`
const Tracklist=styled.div`
display: flex;
flex-direction: column;
overflow-y: scroll;
max-height: 600px;
::-webkit-scrollbar{
    display: none;
}

`



export default CenterHub

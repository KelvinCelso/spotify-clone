import styled from "styled-components"
import {PlayIcon , HeartIcon} from "@heroicons/react/solid"
import { playlistIdState, playlistState } from "../atoms/playlistAtom"
import { useRecoilState, useRecoilValue } from "recoil"
import { useEffect, useState } from "react";
import useSpotify from "../hooks/useSpotify";
import {shuffle} from "lodash"
import axios from "axios"
import { useSession } from "next-auth/react";

const list =[0,1,2,3,4,5,6,7,8,9,10];
function FavArtist({order,track}) {
    const[nr,setNr]=useState(null);
    const {data:session, status }=useSession();
    const spotifyApi=useSpotify()
    const [playlistId, setPlaylistId]=useRecoilState(playlistIdState)
    const [playlist, setPlaylist]=useRecoilState(playlistState); 
    const [searchKey, setSearchKey] = useState("")
    const [artists, setArtists] = useState([])
    useEffect(() => {
        setNr(shuffle(list).pop())

    }, [])

    useEffect(()=>{
        spotifyApi.getPlaylist(playlistId).then((data)=>{
            setPlaylist(data.body);
        }).catch((err)=> console.log("something went wrong!", err));
    
    }, [spotifyApi])

    useEffect(() => {
        spotifyApi.getMyTopArtists().then((art)=>{
            setArtists(art.body.items)
        })
    }, [session, spotifyApi])
    console.log("my top", artists)

    return (  
        <Container>
            <h1>Your Favorite Artists </h1>
            <Content>
            {artists.slice(nr,nr+5).map((artist)=>(
                <Wrap key={artist.id}>
                <img src={artist.images[0].url}></img>
                <PlayIcon className="icon"/>
                <h2>{artist.name}</h2>
                </Wrap>
            ))}

            </Content>
        </Container>
    )
}
const Container=styled.div`
display: flex;
flex-direction:column;
margin:0px 10px 20px;

justify-content: center;

h1{
    font-size: 26px;
    font-weight: bold;
    margin-bottom: 10px;
}
`
const Content=styled.div`
display: grid;
padding: 10px;


grid-template-columns: repeat(5, minmax(0, 1fr));
align-items: center;
width: 100%;
justify-content: start;
grid-gap: 250px;
overflow-x: scroll;
::-webkit-scrollbar{
    display: none;
}
@media (max-width:768px ) {
    grid-template-columns: repeat(5, minmax(0, 1fr));
    overflow-x: scroll;
    grid-gap: 220px;
    ::-webkit-scrollbar{
    display: none;
}
}
@media (min-width: 1080px) {
      grid-gap: 0px;
  }
`
const Wrap=styled.div`
padding: 15px;
background-color: rgb(259,259,259,0.06);
position: relative;
height: 300px;
width: 220px;
img{
    height: 220px;
    width: 210px;
    border-radius:50%;
    margin-bottom: 10px;
    box-shadow: 3px 4px 41px 9px rgba(0,0,0,0.5);
-webkit-box-shadow: 3px 4px 41px 9px rgba(0,0,0,0.5);
-moz-box-shadow: 3px 4px 41px 9px rgba(0,0,0,0.5);
    
}
p{
    padding-bottom: 20px;
    font-size: small;

}
&:hover{
    background-color: rgb(259,259,259,0.1);
    .icon{
        opacity: 1;
        transition: 500ms ease-out;
    }
}
h2{
    font-weight: bold;
    font-size: 1.2em;
}
.icon{
    width: 50px;
    position: absolute;
    color: rgb(30,215,96) ;
    right:20px;
    bottom: 120px;
    opacity: 0;
}
@media (max-width:768px ) {
    width: 210px;
    img{
        width: 50vw;
        
    }
    .icon{
        display: none;
    }
}

`

export default FavArtist

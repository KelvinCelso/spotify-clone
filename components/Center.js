import { ChevronDownIcon } from "@heroicons/react/outline";
import { useSession } from "next-auth/react";
import React from "react";
import { shuffle } from "lodash";
import { useState, useEffect } from "react";
import styled from "styled-components";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  PlusCircleIcon,
} from "@heroicons/react/outline";
import {
  playlistState,
  playlistIdState,
  albumIdState,
  albumState,
  albumSelectedState,
} from "../atoms/playlistAtom";
import { useRecoilState, useRecoilValue } from "recoil";
import useSpotify from "../hooks/useSpotify";
import CenterHub from "./CenterHub";
import Link from "next/link";
import { useRouter } from "next/router";
import albumSelected from "./Daily";
import useAlbumInfo from "../hooks/useAlbumInfo";
import { mainPageState, PreviousPageState } from "../atoms/pagesAtom";

const colors = ["cyan", "red", "pink", "purple"];

const random= Math.floor(Math.random()* colors.length)

function Center() {
  const router = useRouter();
  const { data: session } = useSession();
  const [color, setColor] = useState(null);
  const spotifyApi = useSpotify();
  const [playlistId, setPlaylistId] = useRecoilState(playlistIdState);
  const [playlist, setPlaylist] = useRecoilState(playlistState);
  const albumInfo = useAlbumInfo();
  const [previousPage, setPreviousPage]=useRecoilState(PreviousPageState)
  const [pages, setPages]=useRecoilState(mainPageState)

  const albumSelected=useRecoilValue(albumSelectedState)
  useEffect(() => {
    setColor(shuffle(colors).pop());
  }, []);

  useEffect(() => {
    spotifyApi
      .getPlaylist(playlistId)
      .then((data) => {
        setPlaylist(data.body);
      })
      .catch((err) => console.log("something went wrong!", err));
  }, [spotifyApi, playlistId]);
  
  return (
    <Container>
      <CenterHeader>
        <IconContainer>
          <ChevronLeftIcon className="icons" onClick={() => setPages(previousPage)} />
        </IconContainer>
        <ProfileContainer>
          <img src={session?.user.image}></img>
          <h2>{session?.user.name}</h2>
          <ChevronDownIcon className="icon" />
        </ProfileContainer>
      </CenterHeader>
      <CenterSection>
        {albumSelected ? (
          <PlaylistDetails>
            <PimgContainer>
              <img src={albumInfo?.images?.[0]?.url}></img>
            </PimgContainer>
            <PlaylistData>
              <p>album</p>
              <span>{albumInfo?.name}</span>
        
              <p>{albumInfo?.artists?.[0].name}  . {albumInfo?.release_date} . {albumInfo?.total_tracks} Songs</p>
            </PlaylistData>
          </PlaylistDetails>
        ) : (
          <PlaylistDetails>
            <PimgContainer>
              <img src={playlist?.images?.[0]?.url}></img>
            </PimgContainer>
            <PlaylistData>
              <p>Playlist</p>
              <span>{playlist?.name}</span>
              <br></br>
              <i>{playlist?.description}</i>
              <p>{playlist?.owner.display_name}:{playlist?.tracks.items.length} Songs</p>
            </PlaylistData>
          </PlaylistDetails>
        )}
      </CenterSection>
      <CenterHub />
    </Container>
  );
}

const Container = styled.div`
  color: white;
  flex-grow: initial;
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  background-image: linear-gradient(to bottom, ${colors[random]}, rgb(24, 23, 23) 40%);
  @media (min-width: 1080px) {
    width: 84%;
  }
`;
const CenterHeader = styled.header`
  position: absolute;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  top: 1%;
  padding-left: 10px;

  @media (max-width: 768px) {
    top: 0.3%;
  }
`;
const CenterSection = styled.section`
  height: 33vh;

  @media (min-width: 1080px) {
    margin-bottom: 80px;
  }
`;
const ProfileContainer = styled.div`
  display: flex;
  align-items: center;
  background-color: black;
  border-radius: 30px;
  padding: 5px;
  margin-right: 20px;
  cursor: pointer;

  &:hover {
    background-color: rgba(0, 0, 0, 0.6);
  }
  img {
    width: 30px;
    height: 30px;
    border-radius: 50%;
  }
  .icon {
    width: 15px;
    height: 15px;
  }
  h2 {
    padding: 0px 10px;
  }
  @media (max-width: 768px) {
    img {
      width: 30px;
      height: 30px;
    }
    h2 {
      display: none;
    }
    .icon {
      display: none;
    }
  }
`;
const IconContainer = styled.div`
  display: flex;
  .icons {
    height: 30px;
    background-color: black;
    border-radius: 50%;
    margin-right: 5px;
    border: 1px solid gray;

    &:hover {
      border: 1px solid white;
    }
  }
`;
const PlaylistDetails = styled.div`
  color: white;
  font-weight: bold;
  letter-spacing: 3px;
  display: flex;
  height: 10vh;
  position: absolute;
  margin-left: 30px;
  top: 15vh;
`;
const PimgContainer = styled.div`
  width: 25vw;
  height: 160px;
  position: relative;
  object-fit: cover;
  @media (max-width: 768px) {
    height: 100px;
  }
  @media (min-width: 1080px) {
    height: 230px;
  }
  img {
    position: absolute;
    display: block;

    width: 100%;
    height: 100%;
  }
  transition: opacity 500ms ease-in-out 0s;
  &:hover {
    box-shadow: -6px -3px 96px 4px rgba(0, 0, 0, 0.42);
    -webkit-box-shadow: -6px -3px 96px 4px rgba(0, 0, 0, 0.42);
    -moz-box-shadow: -6px -3px 96px 4px rgba(0, 0, 0, 0.42);
    border: 1px solid black;
  }
`;
const PlaylistData = styled.div`
  margin-left: 30px;
  cursor: pointer;
  width: 100%;
  justify-content: center;
  span {
    font-size: 3vw;
    margin-bottom: 20px;
    font-weight: bold;
  }
  p {
    font-size: 0.8em;
  }
  i{
    font-weight: normal;
    font-size: 0.8em;
  }
`;

export default Center;

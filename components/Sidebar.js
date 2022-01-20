import styled from "styled-components";
import React, { useEffect, useState } from "react";
import {
  HomeIcon,
  SearchIcon,
  LibraryIcon,
  PlusCircleIcon,
  HeartIcon,
  RssIcon,
  DotsHorizontalIcon,
} from "@heroicons/react/outline";
import { signOut, useSession } from "next-auth/react";
import useSpotify from "../hooks/useSpotify";
import spotifyApi from "../lib/spotify";
import { useRecoilState } from "recoil";
import { albumIdState, albumSelectedState, playlistIdState } from "../atoms/playlistAtom";
import Link from "next/link";
import { mainPageState, PreviousPageState } from "../atoms/pagesAtom";

function Sidebar() {
  const spotifyApi = useSpotify();
  const { data: session, status } = useSession();
  const [playlists, setPlaylists] = useState([]);
  const [playlistId, setPlaylistId] = useRecoilState(playlistIdState);
  const [albumSelected, setAlbumSelected] = useRecoilState(albumSelectedState);
  const [albumId,setAlbumId]=useRecoilState(albumIdState)
  const [pages, setPages]=useRecoilState(mainPageState)
  const [previousPage, setPreviousPage]=useRecoilState(PreviousPageState)
  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      spotifyApi.getUserPlaylists().then((data) => {
        setPlaylists(data.body.items);
      });
    }
  }, [session, spotifyApi]);
  return (
    <Container>
      <Content>
        <ImgContainer>
          <img src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_RGB_White.png"></img>
        </ImgContainer>

          <button onClick={()=>{
            setPreviousPage(pages)
            setPages("home")}}>
            <HomeIcon className="icon" />
            <span>Home</span>
          </button>

        <button>
          <SearchIcon className="icon" />
          <span>Search</span>
        </button>
          <button onClick={()=>{
            setPreviousPage(pages)
            setPages("library")}}>
            <LibraryIcon className="icon" />
            <span>Your Library</span>
          </button>

      </Content>
      <Content>
        <button>
          <PlusCircleIcon className="icon" />
          <span>Create Playlist</span>
        </button>
        <button>
          <HeartIcon className="icon" />
          <span>Liked Songs</span>
        </button>
      </Content>
      <Hr />
      <Link href="/">
        <PlayListContent>
          {playlists.map((playlist) => (
            <p
              key={playlist.id}
              onClick={() => {
                setPlaylistId(playlist.id);
                setPages("music")
                setAlbumSelected(false);
                setAlbumId(null)
              }}
              className="cursor-pointer hover:text-white"
            >
              {playlist.name}{" "}
            </p>
          ))}
        </PlayListContent>
      </Link>
    </Container>
  );
}
const Container = styled.div`
  color: gray;

  max-width: 22vw;
  font-size: small;

  @media (max-width: 768px) {
    display: none;
  }
`;
const Content = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 25px;
  button {
    display: flex;
    align-items: center;
    padding-left: 30px;
    margin-bottom: 20px;

    &:hover {
      color: white;
    }
  }
  span {
    padding-left: 10px;
  }

  .icon {
    width: 25px;
    height: 25px;
  }
`;
const Hr = styled.hr``;
const PlayListContent = styled.div`
  padding: 20px;
  height: 100%;
  overflow-y: scroll;
  max-height: 580px;
  ::-webkit-scrollbar {
    display: none;
  }

  p {
    padding-bottom: 10px;
  }
`;
const ImgContainer = styled.div`
  object-fit: contain;
  justify-content: center;
  padding: 10px 20px 20px;

  @media (min-width: 1080px) {
    width: 300px;
    margin: auto;
  }
  img{
    width: 200px;
  }
`;

export default Sidebar;

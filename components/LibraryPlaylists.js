import { PlayIcon } from "@heroicons/react/solid";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { LibraryState, mainPageState, PreviousPageState } from "../atoms/pagesAtom";
import { albumSelectedState, playlistIdState, playlistState } from "../atoms/playlistAtom";
import useSpotify from "../hooks/useSpotify";

function LibraryPlaylists() {
  const spotifyApi = useSpotify();
  const [playlists, setPlaylists] = useState([]);
  const [playlistId, setPlaylistId] = useRecoilState(playlistIdState);
  const { data: session, status } = useSession();
  const [albumSelected, setAlbumSelected] = useRecoilState(albumSelectedState);
  const [previousPage, setPreviousPage]=useRecoilState(PreviousPageState)
  const [pages, setPages]=useRecoilState(mainPageState)
  const [libraryPages, setLibraryPages]=useRecoilState(LibraryState)
  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      spotifyApi.getUserPlaylists().then((data) => {
        setPlaylists(data.body.items);
      });
    }
  }, [session, spotifyApi]);
  console.log("user Playlist in library", playlists);
  return (
    <Container>
      <h2 className="title">Playlists</h2>
      <Content>
        <Liked>
          <h1>Liked Songs</h1>
        </Liked>
        {playlists.map((playlist) => (
          <Wrap key={playlist.id} onClick={() => {
            setPlaylistId(playlist.id);
            setAlbumSelected(false);
            setPreviousPage("library");
            setLibraryPages("playlists")
            setPages("music")}}>
            <img src={playlist.images?.[0].url}></img>
            <PlayIcon className="icon" />
            <h2>{playlist.name}</h2>
            <p> From {playlist.owner.display_name}</p>
          </Wrap>
        ))}
      </Content>
    </Container>
  );
}
const Container = styled.div`
  .title {
    font-weight: bold;
    margin: 20px 20px;
    font-size: 1.6em;
  }
`;
const Liked = styled.div`
  display: block;
  margin-left: 20px;

  background-image: linear-gradient(
    to bottom,
    rgb(89, 45, 241) 30%,
    rgb(112, 74, 243)
  );
  width: 440px;
  height: 320px;
  padding: 20px;
  margin-bottom: 20px;

  position: relative;
  border-radius: 4px;

  h1 {
    font-weight: bold;
    position: absolute;
    bottom: 40px;
  }
  @media (max-width: 768px) {
      width: 89vw;
      height: 35vh;
  }
`;
const Content = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
`;
const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  padding: 15px;
  background-color: rgb(259, 259, 259, 0.06);
  margin-left: 20px;
  height: 320px;
  margin-bottom: 20px;
  position: relative;
  border-radius: 4px;
  cursor: pointer;
  img {
    width: 180px;
    height: 200px;
    box-shadow: -1px 7px 42px 1px rgba(0, 0, 0, 0.69);
    -webkit-box-shadow: -1px 7px 42px 1px rgba(0, 0, 0, 0.69);
    -moz-box-shadow: -1px 7px 42px 1px rgba(0, 0, 0, 0.69);
    margin-bottom: 20px;
  }
  h2{
      display: block;
      max-width: 180px;
      font-weight: bold;
      object-fit: contain;
  }
  p{
    font-size: 0.8em;
  }
  @media (max-width: 768px) {
      width: 42vw;
      h2{
          font-size: 0.8em;
      }
      p{
          font-size: 0.7em;
      }
  }
  &:hover{
    background-color: rgb(259,259,259,0.1);
    .icon {
      opacity: 1;
      transition: 500ms ease-out;
    }
  }
  .icon {
    width: 50px;
    position: absolute;
    color: rgb(30, 215, 96);
    right: 20px;
    bottom: 120px;
    opacity: 0;
  }
`;

export default LibraryPlaylists;

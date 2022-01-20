import React, { useEffect } from "react";
import { useRecoilState, useResetRecoilState } from "recoil";
import {
  albumIdState,
  albumSelectedState,
  albumState,
} from "../atoms/playlistAtom";
import useSpotify from "./useSpotify";

function useAlbumInfo() {
  const spotifyApi=useSpotify();
  const [albumId, setAlbumId] = useRecoilState(albumIdState);
  const [album, setAlbum] = useRecoilState(albumState);
  const [albumSelected, setAlbumSelected] = useRecoilState(albumSelectedState);
  useEffect(() => {
    const fetchAlbumInfo = async () => {
      if (albumId) {
        const albumInfo = await fetch(
          `https://api.spotify.com/v1/albums/${albumId}`,
          {
            headers: {
              Authorization: `Bearer ${spotifyApi.getAccessToken()}`,
            }
          }
        ).then(res => res.json());
        setAlbum(albumInfo);
        setAlbumSelected(true);
        console.log("this is the useInfo", albumInfo);
      }
    };
    fetchAlbumInfo();
  }, [albumId, spotifyApi]);

  return album;
}

export default useAlbumInfo;

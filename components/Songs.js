import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { albumSelectedState, playlistState } from "../atoms/playlistAtom";
import Song from "./Song";
import styled from "styled-components";
import useAlbumInfo from "../hooks/useAlbumInfo";

function Songs() {
  const playlist = useRecoilValue(playlistState);
  const albumInfo = useAlbumInfo();
  const [albumSelected, setAlbumSelected] = useRecoilState(albumSelectedState);
  return (
    <Container>
      {albumSelected ? (
        <>
          {albumInfo?.tracks.items.map((track, i) => (
            <Song key={track?.id} track={track} order={i} />
          ))}
        </>
      ) : (
        <>
          {playlist?.tracks.items.map((track, i) => (
            <Song key={track?.track?.id} track={track} order={i} />
          ))}
        </>
      )}
    </Container>
  );
}
const Container = styled.div`
  display: flex;
  flex-direction: column;
  color: white;
`;

export default Songs;

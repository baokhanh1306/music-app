import React from 'react'
import ReactJkMusicPlayer from 'react-jinke-music-player';
import 'react-jinke-music-player/assets/index.css';


const Audio = ({ playlist }) => {
  return (
    <ReactJkMusicPlayer 
      audioLists={playlist}
      theme={"light"}
      clearPriorAudioLists={true}
      showThemeSwitch={false}
      showReload={false}
      showLyric={false}
      showDownload={false}
      />
  )
}

export default Audio

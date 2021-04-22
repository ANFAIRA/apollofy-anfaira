import React from "react";
import Controls from "./Controls";
import "./Player.scss";

const Player = () => {
  return (
    <div className="player">
      <div className="player--info">
        <img
          src="https://cms-assets.tutsplus.com/uploads/users/1990/posts/33313/image/electro-beats-album-cover-design-template-469c.jpg"
          alt="song-img"
          className="player--info--img"
        />
        <div className="player--info--details">
          <h5>Song title</h5>
          <p>Song artist</p>
        </div>
      </div>
      <Controls />
      <div className="player-actions">
        <p>volume</p>
        <p>icons</p>
      </div>
    </div>
  );
};

export default Player;

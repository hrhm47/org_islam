module.exports = async function () {
    TrackPlayer.addEventListener('remote-play', () => TrackPlayer.play());
    TrackPlayer.addEventListener('remote-pause', () => TrackPlayer.pause());
    TrackPlayer.addEventListener('remote-stop', () => TrackPlayer.stop());
    TrackPlayer.addEventListener('remote-seek', (e) => TrackPlayer.seekTo(e.position));
  };
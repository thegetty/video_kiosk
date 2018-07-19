/**
 * This simple file sets the global bool for video playing that kiosk pro will interact with
 *
 * This avoids the need to call any window globals in the vue code directly
 */

export function setWindowVideoPlayingDefault () {
  window.videoPlaying = false
}

export default function setVideoKioskPlaying (val) {
  window.videoPlaying = val
}

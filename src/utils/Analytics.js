
/**
 * Analytics is the psuedo wrapper around the Google Tag Manager for the Video Kiosk
 * We create an abstraction around the ga manager for what we need
 *
 * Avoids calling window globals in the vue code
 */

export default class Analytics {
  constructor (id, kiosk) {
    this.GA_ID = id
    this.kioskName = kiosk
    this.gtag = window.gtag
    this.gtag('config', this.GA_ID)
  }

  videoPlayEvent (name) {
    this.gtag('event', 'Video Play', {
      'event_category': this.kioskName,
      'event_label': name
    })
  }
}

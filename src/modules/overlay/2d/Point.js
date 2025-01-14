/**
 * @Author: Caven Chen
 */

import Overlay from '../Overlay'
import Parse from '../../parse/Parse'
import State from '../../state/State'

const DEF_STYLE = {
  size: 5,
  color: '#ffffff',
  blur: '0',
  opacity: 1,
  strokeWidth: 2,
  strokeColor: '#0000ff',
  strokeOpacity: 1,
}

class Point extends Overlay {
  constructor(lngLat) {
    if (!lngLat) {
      throw 'lngLat is required'
    }
    super()
    this._lngLat = Parse.parseLngLatAlt(lngLat)
    this._style = DEF_STYLE
    this._state = State.INITIALIZED
  }

  get type() {
    return Overlay.getType('point')
  }

  set show(show) {
    if (this._show == show) {
      return
    }
    this._show = show
    this._layer?.fire('overlayChanged', this)
  }

  get show() {
    return this._show
  }

  set lngLat(lngLat) {
    this._lngLat = Parse.parseLngLatAlt(lngLat)
    this._layer?.fire('overlayChanged', this)
  }

  get lngLat() {
    return this._lngLat
  }

  /**
   *
   * @param style
   * @returns {Point}
   */
  setStyle(style) {
    this._style = {
      ...this._style,
      ...style,
    }
    this._layer?.fire('overlayChanged', this)
    return this
  }

  /**
   *
   * @returns {{}}
   */
  toFeature() {
    return {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [this._lngLat.lng, this._lngLat.lat],
      },
      properties: {
        overlayId: this._overlayId,
        id: this._bid,
        show: this._show,
        ...this._style,
      },
    }
  }
}

Overlay.registerType('point')

export default Point

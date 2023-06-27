import React from 'react'

import { YMaps, Map } from 'react-yandex-maps'


export default function Maps() {
  return (
    <div>
      <YMaps>
        <Map defaultState={{ center: [55.75, 37.57], zoom: 9, controls: []}}>
        </Map>
      </YMaps>
    </div>
  )
}
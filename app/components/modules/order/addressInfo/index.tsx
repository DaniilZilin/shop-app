import React from 'react'
import {webpackInvalidSpans} from "next/dist/build/webpack/plugins/profiling-plugin";
import Script from "next/script";

const YANDEX_MAP_KEY = '1dca8b5e-1131-414f-b759-3205e3731b70'

export default function Maps() {

  const getAddress = React.useCallback(async(coords: [number, number]) => {
    const geoCode = await window.ymaps.geocode(coords)
    // console.log(geoCode.geoObjects.get(0))
    const firstGeoObject = geoCode.geoObjects.get(0)
    console.log(firstGeoObject.getAddressLine())
  }, [])

  const loadMap = React.useCallback(() => {
    window.ymaps.ready(() => {
      const map = new window.ymaps.Map(
        'yandex-maps',
        {
          center: [55.751999, 37.617734],
          zoom: 12,
          behaviors: ['drag', 'dblClickZoom', 'multiTouch'],
          controls: [],
        },
        {
          fullscreenZIndex: 86,
        }
      );
      map.events.add('click', function (e) {
        getAddress(e.get('coords'))
      });
    })
  }, [])

  return (
    <>
      <Script src={`https://api-maps.yandex.ru/2.1/?lang=ru_RU&apikey=${YANDEX_MAP_KEY}`} onLoad={loadMap} />
      <div style={{ height: '1000px', width: '1000px'}} id='yandex-maps'></div>
    </>
  )
}
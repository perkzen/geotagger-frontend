'use client';
import { FC } from 'react';
import Image from 'next/image';
import {
  AdvancedMarker,
  APIProvider as GoogleMapsAPIProvider,
  Map as GoogleMap,
  MapProps as GoogleMapProps,
} from '@vis.gl/react-google-maps';
import classNames from 'classnames';
import Marker from 'public/images/marker.svg';
import { env } from '@/env';
import { Coordinates } from '@/lib/types/coordinates';
import styles from './map.module.scss';

type MapProps = GoogleMapProps & {
  markers?: Coordinates[];
};

const Map: FC<MapProps> = ({ className, ...props }) => {
  return (
    <GoogleMapsAPIProvider apiKey={env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}>
      <GoogleMap
        {...props}
        className={classNames(styles.container, className)}
        defaultCenter={{ lat: 46.1512, lng: 14.9955 }}
        defaultZoom={3}
        gestureHandling={'greedy'}
        disableDefaultUI={true}
        keyboardShortcuts={false}
        mapId="map"
      >
        {props.markers?.map((marker, index) => (
          <AdvancedMarker
            key={index}
            position={{
              lat: marker.lat,
              lng: marker.lng,
            }}
          >
            <Image src={Marker} alt={'marker'} />
          </AdvancedMarker>
        ))}
      </GoogleMap>
    </GoogleMapsAPIProvider>
  );
};

export default Map;

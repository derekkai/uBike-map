import {LatLngExpression} from "leaflet";

export type MapConfig = {
    coordinates: LatLngExpression;
    zoomLevel: number;
    tileLayoutUrl: string;
    containerID: string;
}

export default {
    coordinates: [25.0330, 121.5654],
    zoomLevel: 13,
    tileLayoutUrl: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    containerID: 'map',
} as MapConfig;
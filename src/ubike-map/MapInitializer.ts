import L from 'leaflet';
import { CustomMap } from "./map";
import { MapConfig } from '../map.config';

class MapInitializer implements CustomMap.Initializer {
    constructor(
       public readonly map: L.Map,
       public readonly config: MapConfig
    ) {}

    public initialize() {
        const { map, config } = this;
        const { coordinates, zoomLevel, tileLayoutUrl } = config;

        map.setView(coordinates, zoomLevel);
        L.tileLayer(tileLayoutUrl).addTo(map);
    }
}

export default MapInitializer;
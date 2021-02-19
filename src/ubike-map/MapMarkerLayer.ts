import { CustomMap } from "./map";
import L, {marker} from 'leaflet';

class MapMarkerLayer implements CustomMap.MarkerLayer {
    public readonly layer = L.layerGroup();

    constructor(public readonly map: L.Map) {
        this.layer.addTo(map);
    }

    addMarker(marker: CustomMap.Marker) {
        marker.marker.addTo(this.layer);
    }

    addMarkers(markers: CustomMap.Marker[]) {
        markers.forEach(marker => {
            this.addMarker(marker);
        });
    }

    clear() {
        this.layer.clearLayers();
    }
}

export default MapMarkerLayer;

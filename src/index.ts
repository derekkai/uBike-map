import L, {LayerGroup} from 'leaflet';
import mapConfig from './map.config';
import fetchData from './fetchData';
import {districts} from "./districtData";
import {Districts} from "./data";
import UBikeMapFacade from "./MapFacade";

const $selectDistrict = <HTMLSelectElement | null>document.getElementById('select-district');

if ($selectDistrict === null) {
    throw new Error('No select-district field provided.');
}

districts.forEach(d => {
    const $optionTag = document.createElement('option');

    $optionTag.setAttribute('value', d);
    $optionTag.innerText = d;

    $selectDistrict.appendChild($optionTag);
})

// const {
//     coordinates,
//     zoomLevel,
//     tileLayoutUrl,
//     containerID,
// } = mapConfig;
// const map = L.map(containerID);
// let markerLayer: LayerGroup;
// map.setView(coordinates, zoomLevel);
// L.tileLayer(tileLayoutUrl).addTo(map);
const mapFacade = new UBikeMapFacade(
    mapConfig,
    function (info) {
        return `
            <p>${info.regionName} - ${info.stopName}</p>
            <p>總自行車數:${info.totalBikes}</p>
            <p></p>
        `;
    }
)

let currentDistrict = $selectDistrict.value as Districts;
function updateUBikeMap(district: Districts): void {
    fetchData().then(data => {
        const selectedData = data.filter(
            info => info.regionName === district
        );
        // const markers = selectedData.map(data => {
        //     const marker = new L.Marker(data.latLng);
        //     marker.bindTooltip(`
        //     <p>${data.regionName} - ${data.stopName}</p>
        //     <p>總自行車數:${data.totalBikes}</p>
        //     <p>可用自行車數:${data.availableBikes}</p>
        // `);
        //
        //     marker.on('mouseover', () => {
        //         marker.openTooltip();
        //     });
        //
        //     marker.on('mouseleave', () => {
        //         marker.closeTooltip();
        //     });
        //
        //     return marker;
        // })
        //
        // markerLayer = L.layerGroup(markers);
        // markerLayer.addTo(map);可用自行車數:${info.availableBikes}
        mapFacade.pinStops(selectedData);
    })
}

updateUBikeMap(currentDistrict);

$selectDistrict.addEventListener('change', (event) => {
    let {value} = event.target as HTMLSelectElement;
    currentDistrict = value as Districts;
    // markerLayer.remove();
    mapFacade.clearStops();
    updateUBikeMap(currentDistrict);
})
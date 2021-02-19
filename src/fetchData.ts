import {SourceUBikeInfo, UBikeInfo} from "data";

let URL = 'https://tcgbusfs.blob.core.windows.net/blobyoubike/YouBikeTP.json';

export default function fetchUBikeData(url = URL) {
    return fetch(url)
        .then(result => result.json())
        .then(({ retVal }) => Object.values(retVal) as SourceUBikeInfo[])
        .then(sourceInfoes => sourceInfoes.map(sourceInfo => ({
            availableBikes: parseInt(sourceInfo.sbi, 10),
            totalBikes: parseInt(sourceInfo.tot, 10),
            latLng: [parseFloat(sourceInfo.lat), parseFloat(sourceInfo.lng)],
            regionName: sourceInfo.sarea,
            stopName: sourceInfo.sna,
        } as UBikeInfo)))
}

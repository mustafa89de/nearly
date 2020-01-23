class MapService {
  createMissingBounds(ne, sw) {
    let se = {
      lat: sw.lat,
      lng: ne.lng
    };

    let nw = {
      lat: ne.lat,
      lng: sw.lng
    };

    return [se, nw];
  }
}

module.exports = new MapService();
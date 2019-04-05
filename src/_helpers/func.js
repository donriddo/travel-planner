export function haversineFunction(params) {
    const RADIUS_OF_EARTH = 6371; // km
    let lat1 = convertDegreeToRadian(params.lat1);
    let lat2 = convertDegreeToRadian(params.lat2);
    let lon1 = convertDegreeToRadian(params.lon1);
    let lon2 = convertDegreeToRadian(params.lon2);
    let changeInLat = lat2 - lat1;
    let changeInLong = lon2 - lon1;
  
    let a = Math.sin(changeInLat / 2) * Math.sin(changeInLat / 2) +
      Math.cos(lat1) * Math.cos(lat2) *
      Math.sin(changeInLong / 2) * Math.sin(changeInLong / 2);
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  
    return RADIUS_OF_EARTH * c;
  }
  
  function convertDegreeToRadian(degree) {
    return degree * (Math.PI / 180);
  }

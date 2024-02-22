import React, { useEffect } from "react";

function ConvertAddress({
  items,
  setCoordinates,
  coordinates,
  memAddresses,
  setCoordinatesTwo,
  coordinatesTwo,
}) {
  const geocoder = new window.google.maps.Geocoder();

  useEffect(() => {
    const processItemsSequentially = async () => {
      const newCoordinatesArray = [];
      for (const address of memAddresses) {
        try {
          const results = await geocodeAddress(address);
          const { lat, lng } = extractCoordinates(results);

          // console.log(results)
          if (!isNaN(lat) && !isNaN(lng)) {
            newCoordinatesArray.push({ lat, lng });
          }
        } catch (error) {
          console.error("Error converting address to coordinates:", error);
        }
      }
      setCoordinatesTwo([...newCoordinatesArray]);
    };

    const geocodeAddress = (address) => {
      return new Promise((resolve, reject) => {
        geocoder.geocode({ address }, (results, status) => {
          if (status === "OK") {
            resolve(results);
          } else {
            reject(`Geocode failed with status: ${status}`);
          }
        });
      });
    };

    const extractCoordinates = (results) => {
      const latitude = results[0].geometry.location.lat();
      const longitude = results[0].geometry.location.lng();
      return { lat: latitude, lng: longitude };
    };

    processItemsSequentially();
  }, [memAddresses, setCoordinatesTwo]);

  return null;
}

export default ConvertAddress;

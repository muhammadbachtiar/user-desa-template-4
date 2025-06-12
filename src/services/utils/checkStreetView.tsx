'use client'

import { useEffect, useState } from 'react';
declare global {
  interface Window {
    google: typeof google;
  }
}


const StreetViewChecker = ({ lat, lng }: { lat: number; lng: number }) => {
  const [isAvailable, setIsAvailable] = useState<boolean | null>(null);

  useEffect(() => {
    const loadGoogleMapsScript = () => {
      const existingScript = document.getElementById('googleMapsScript');

      if (!existingScript) {
        if (!document.getElementById('googleMapsScript')) {
          const script = document.createElement('script');
          script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GMAPS_API_KEY}&libraries=places`;
          script.id = 'googleMapsScript';
          script.async = true;
          script.defer = true;
          document.body.appendChild(script);
        }
      } else {
        checkStreetViewAvailability(lat, lng);
      }
    };

    const checkStreetViewAvailability = (lat: number, lng: number) => {
      if (window.google && window.google.maps) {
        const sv = new window.google.maps.StreetViewService();
        const location = { lat, lng };
        sv.getPanorama({ location, radius: 50 }, (_ , status: google.maps.StreetViewStatus) => {
          if (status === window.google.maps.StreetViewStatus.OK) {
            setIsAvailable(true);
          } else {
            setIsAvailable(false);
          }
        });
      }
      
    };

    loadGoogleMapsScript();
  }, [lat, lng]);

  return isAvailable;
};

export default StreetViewChecker;

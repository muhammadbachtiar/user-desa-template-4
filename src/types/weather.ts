// Types for BMKG Weather API
export interface Kecamatan {
    kecamatan: string;
    kelurahan_desa: string;
    adm4: string;
    lat: number;
    lon: number;
}

export interface WeatherLocation {
    adm1: string;
    adm2: string;
    adm3: string;
    adm4: string;
    provinsi: string;
    kotkab: string;
    kecamatan: string;
    desa: string;
    lon: number;
    lat: number;
    timezone: string;
    type?: string;
}

export interface WeatherData {
    datetime: string;
    t: number; // temperature
    tcc: number; // total cloud cover
    tp: number; // precipitation
    weather: number;
    weather_desc: string;
    weather_desc_en: string;
    wd_deg: number; // wind direction degree
    wd: string; // wind direction
    wd_to: string;
    ws: number; // wind speed
    hu: number; // humidity
    vs: number; // visibility
    vs_text: string;
    time_index: string;
    analysis_date: string;
    image: string;
    utc_datetime: string;
    local_datetime: string;
}

export interface BMKGWeatherResponse {
    lokasi: WeatherLocation;
    data: Array<{
        lokasi: WeatherLocation;
        cuaca: WeatherData[][];
    }>;
}

// Types for Open-Meteo Air Quality API
export interface AirQualityCurrentUnits {
    time: string;
    interval: string;
    us_aqi: string;
    pm2_5: string;
    pm10: string;
}

export interface AirQualityCurrent {
    time: string;
    interval: number;
    us_aqi: number;
    pm2_5: number;
    pm10: number;
}

export interface AirQualityResponse {
    latitude: number;
    longitude: number;
    generationtime_ms: number;
    utc_offset_seconds: number;
    timezone: string;
    timezone_abbreviation: string;
    elevation: number;
    current_units: AirQualityCurrentUnits;
    current: AirQualityCurrent;
}

// AQI Level helper type
export interface AQILevel {
    label: string;
    color: string;
    bgColor: string;
    textColor: string;
}

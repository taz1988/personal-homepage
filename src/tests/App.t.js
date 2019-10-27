import React from 'react';
import { shallow } from 'enzyme';
var OPEN_WEATHER_MAP_API_KEY = "";
import App from '../js/App';


it('renders without crashing', () => {
  const mockSuccessResponse = {
                                  "coord": {
                                      "lon": 19.87,
                                      "lat": 46.54
                                  },
                                  "weather": [
                                      {
                                          "id": 800,
                                          "main": "Clear",
                                          "description": "clear sky",
                                          "icon": "01n"
                                      }
                                  ],
                                  "base": "stations",
                                  "main": {
                                      "temp": 13.74,
                                      "pressure": 1015,
                                      "humidity": 76,
                                      "temp_min": 12.22,
                                      "temp_max": 14.44
                                  },
                                  "visibility": 10000,
                                  "wind": {
                                      "speed": 1,
                                      "deg": 280
                                  },
                                  "clouds": {
                                      "all": 0
                                  },
                                  "dt": 1569527703,
                                  "sys": {
                                      "type": 1,
                                      "id": 6666,
                                      "message": 0.0061,
                                      "country": "HU",
                                      "sunrise": 1569472311,
                                      "sunset": 1569515529
                                  },
                                  "timezone": 7200,
                                  "id": 3054287,
                                  "name": "Csengele",
                                  "cod": 200
                              };
      const mockJsonPromise = Promise.resolve(mockSuccessResponse); // 2
      const mockFetchPromise = Promise.resolve({ // 3
        json: () => mockJsonPromise,
      });
      jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise); // 4

      const app = mount(<App />);
      expect(app.contains("Szeged")).toBe(true);
});

import { API_URL, LOCATION_URL } from '../constants.js';
import { getData } from './getData.js';

export const selectCityControl = () => {
  const citySelect = document.querySelector('#city');
  const cityChoices = new Choices(citySelect, {
    searchEnabled: false,
    itemSelectText: '',
    position: 'bottom',
  });

  getData(
    `${API_URL}${LOCATION_URL}`,
    locationData => {
      const locations = locationData.map(location => ({
        value: location,
      }));
      cityChoices.setChoices(locations, 'value', 'label', true);
    },
    err => {
      console.log(err);
    },
  );
};

const API_URL = 'https://workspace-methed.vercel.app/';
const LOCATION_URL = 'api/locations';

/* API requests */
const getData = async (url, cbSuccess, cbError) => {
  try {
    const res = await fetch(url);
    const data = await res.json();
    cbSuccess(data);
  } catch (err) {
    cbError(err);
  }
};

const init = () => {
  /* launch library for select*/
  const citySelect = document.querySelector('#city');
  const cityChoices = new Choices(citySelect, {
    searchEnabled: true,
    itemSelectText: '',
  });

  getData(
    `${API_URL}${LOCATION_URL}`,
    (locationData) => {
      const locations = locationData.map(location => ({
        value: location,
      }));
      cityChoices.setChoices(locations, 'value', 'label', true);
    },
    (err) => {
      console.log(err);
    }
  );
};

init();

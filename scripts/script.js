/* launch library for select*/
const citySelect = document.querySelector('#city');
const cityChoices = new Choices(citySelect, {
  searchEnabled: false,
  itemSelectText: '',
});

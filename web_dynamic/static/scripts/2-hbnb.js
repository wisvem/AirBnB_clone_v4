const $ = window.$;
const fetch = window.fetch;
let amenityNamesList = [];
let amenityIdList = [];
async function statusResponse (url) {
  const response = await fetch(url);
  const dict = await response.json();
  if (dict.status === 'OK') {
    $('#api_status').removeClass('unavailable');
    $('#api_status').addClass('available');
  } else {
    $('#api_status').removeClass('available');
    $('#api_status').addClass('unavailable');
  }
}
// Wrapper for waiting page to complete loading.
document.onreadystatechange = function () {
  if (document.readyState === 'complete') {
    // Amenities Checkbox list display - - - - - - - - - - - - - - - - - - - - - - - |
    // If any checkbox is clicked
    $('input[type="checkbox"]').click(function () {
      // Get the current checkbox being clicked.
      const box = $(this);
      if (box.is(':checked')) {
        // Populate amenity name list
        amenityNamesList.push(box.data('name'));
        // Populate amenity id list
        amenityIdList.push(box.data('id'));
        // box.parent().css("color", "#00ff00");
      } else {
        // box.parent().css("color", "#484848");
        amenityNamesList = amenityNamesList.filter(function (value, index, arr) {
          return value !== box.data('name');
          // return value !== box.next('span').text();
        });
        amenityIdList = amenityIdList.filter(function (value, index, arr) {
          return value !== box.data('id');
          // return value !== box.next('span').text();
        });
      }
      // console.log(amenityIdList);
      $('.amenities h4').text(amenityNamesList.join(', '));
    });

    const url = 'http://0.0.0.0:5001/api/v1/status';
    // Status light display - - - - - - - - - - - - - - - - - - - - - - - - - - |
    statusResponse(url);
    // setInterval(statusResponse, 10000, url);
  }
};

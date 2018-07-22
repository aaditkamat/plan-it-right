$( function() {
    var availableTags = ["Macau", "Singapore", "London", "Mexico City"];
    $( "input[name=city]" ).autocomplete({
      source: availableTags
    });
  });
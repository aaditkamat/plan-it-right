$( function() {
    var availableTags = ["Singapore", "Naypyidaw", "Ho Chi Minh", "Kuala Lampur", "Phnom Penh", "Bangkok", "Vientiane", "Manila", "Jakarta", "Bandar Seri Bagwan"];
    $( "input[name=city]" ).autocomplete({
      source: availableTags
    });
  });
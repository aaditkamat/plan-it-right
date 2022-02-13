#!/bin/bash
categories=("Hotels" "Night Clubs" "Amusement Parks" "Movie Theatres" "Shopping Malls" "Parks" "Museums" "Restaurants" "Zoo" "Aquarium")
cities=("Bandar Seri Begawan" "Singapore" "Kuala Lumpur" "Jakarta" "Manila" "Bangkok" "Ho chi Minh" "Vientiane" "Phnom Penh" "Naypyidaw")
for city in "${cities[@]}"
do
    googlemaps places --query "${city} point of interest" > "${city}.json"
    for category in "${categories[@]}"
    do
      googlemaps places --query "${category} in ${city}" >"${city}_${category}.json"
      echo "Category ${category} in city ${city} done"
    done
done

#!/bin/bash
categories=("Night Clubs" "Amusement Parks" "Movie Theatres" "Shopping Malls" "Parks" "Museums" "Restaurants" "Zoo" "Aquarium")
cities=("Singapore" "Kuala Lumpur" "Jakarta" "Manila" "Bangkok" "Ho chi Minh" "Vientiane" "Phnom Penh" "Naypyidaw" "Bander Seri Begawan")
for city in "${cities[@]}" 
do
    googlemaps places --query "${city} point of interest" > "${city}.json"
    for category in "${categories[@]}"
    do
      googlemaps places --query "${category} in ${city}" >"${city}_${category}.json"
      echo "Category ${category} in city ${city} done"
    done
done

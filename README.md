# Welcome to PlanItRight
[![Netlify Status](https://api.netlify.com/api/v1/badges/5d134aa7-4ff6-421c-a2ec-5e6500166265/deploy-status)](https://app.netlify.com/sites/kind-hawking-2ee64b/deploys)

## Project Summary 

The application  'PlanItRight' specializes in providing 5-day itineraries to over 10 cities from the countries in the ASEAN region. Apart from providing the daily schedule, it provides user more information about the attraction/place, such as description, location attributes, opening hours and ratings. 

Some factors which make this application unique include- 
1. Trip Itineraries generated takes into account the  number of people going for the trip
2. Features such as ‘culture’, ‘outdoors’, ‘family’, and several more, add more customization to the trip.
3. Trip itineraries are ‘balanced’ in the sense that they include popular destinations as well as hidden gems, which are equally worth visiting.
4. Save trip itinerary for offline viewing.


## Motivation 

NUS students are presented with ample opportunities to travel overseas through programs such as NOC, SEP and STEER. Many of the students may also have had the experience of travelling abroad along with their family, as part of school trips or to fulfill National Service commitments. However, undertaking a journey as an independent adult can seem like a daunting experience. This is why making an application that provides a customised trip itinerary to users seemed like an idea worth investing time and effort in.


## User Guide

Refer to [UserGuide.md](./docs/UserGuide.md)


## Tools & Technologies used
Framework: NodeJS with ExpressJS <br/>
Frontend: HTML,CSS, Bootstrap <br/>
Web scraping: NightmareJS


## Issues 

1.  The website earlier generated trip itineraries through real-time web scraping. However, later, the website from which we were obtaining data, was completely restructured and modified, and prevented crawlers. Hence, we were not able to scrape from that website anymore. Therefore, we had to search for a new option which could accomodate the capabilities of our application. This is why we have only 10 cities (at the point of submission).

2.  The information about the attractions in the itineraries displayed on the website is enabled through the Google Places API. However, the API key provided under a non-premium plan restricts usage in terms of the number of requests sent per day/second. This results in info being displayed for only some of the attractions.


## Made by [Aadit Kamat](https://github.com/aaditkamat) and [Rahul Baid](https://github.com/rahulb99) 

We created this project as a part of the team 'SnapFinish' for [Orbital 2018](https://orbital.comp.nus.edu.sg).

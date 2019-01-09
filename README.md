# Welcome to PlanItRight


## Project Summary 


The application  'PlanItRight' specializes in providing 5-day itineraries to over 10 cities from the countries of South-east Asia. Apart from providing the daily schedule, it provides user more information about the attraction/ place, such as description, location attributes, opening hours and ratings. 

Some factors which make this application unique include- 
1. Trip Itineraries generated takes into account the  number of people going for the trip
2. Features such as ‘culture’, ‘outdoors’, ‘family’, and several more, add more customization to the trip.
3. Trip itineraries are ‘balanced’ in the sense that they include popular destinations as well as hidden gems, which are equally worth visiting.
4. Save trip itinerary for offline viewing.


## Motivation 


As NUS students, we are presented with ample opportunities to travel overseas through programs such as NOC, SEP and STEER. Many of us may have had the experience of  travelling abroad along with their family members as Singaporeans are known for being avid travellers,as part of their school trips or due to NS commitments but undertaking a journey on their own as independent adults can seem like a daunting experience. This is why making an application that provides a customised trip itinerary to users seemed like an idea worth investing time and effort in.


## User Guide

Refer to [UserGuide.md](./docs/UserGuide.md)

## User Stories 

1.  As a user, I want an authentication feature upon login in order to ensure my personal data remains confidential
2.  As a tourist, I should be able to interact with the app by supplying trip information (trip destination, travel period, co-travellers etc) and displaying the resulting trip itinerary.
3.  As a tourist, I would like the trip itinerary to be displayed in a calendar view, with timings shown for visiting each of the places of interest so that I can plan my journey accordingly
4.  As a tourist, I want the places of interest to be organised in my itinerary according to proximity from current location so as to reduce travel time and costs.
5.  As a tourist, I need all my planned trip itineraries to be organised in one section of the app so that I do not have to spend time searching in different places and can instead view them in just one place
6.  As a tourist, I need an offline copy for each of my trip itineraries so that I can have access to them even when I go to places with poor internet connectivity
7.  As a tourist, I want access to prices of different tour packages offered for each of the places of interest that I visit as per the generated itinerary so that I can mix and match according to my budget for the trip
8.  As an administrator, I want the app to allow users to update their credentials so that the necessary information is up-to-date.
9.  As an administrator, I want to moderate the reviews provided on the app in order to ensure a user-friendly environment
10. As an administrator, I need the app to store data in a secure database to ensure that the data user provides is protected.


## Tools & Technologies used
Framework: NodeJS with ExpressJS <br/>
Frontend: HTML,CSS, Bootstrap <br/>
Web scraping: NightmareJS


## Issues 

1.  For our milestone 2 submission, the website generated trip itineraries through real-time web scraping. However, on 27th July (nearing our milestone 3 submission), the website from which we were obtaining data, was
    completely restructured and modified, and prevented crawlers. Hence, we were not able to scrape from that website anymore. Therefore, we had to search for a new option which could accomodate the capabilities of our
    application. This is why we have only 10 cities (at the point of submission).

2.  The information about the attractions in the itineraries displayed on the website is enabled through the Google Places API. However, the API key provided under a non-premium plan restricts usage in terms of the number of requests sent per day/second. This results in info being displayed for only some of the attractions.


## Upcoming Features
        
      Will be updated soon.
   


## Made by [Aadit Kamat](https://github.com/aaditkamat) and [Rahul Baid](https://github.com/rahulb99) 

We created this project as a part of the team 'SnapFinish' for [Orbital 2018](https://orbital.comp.nus.edu.sg).

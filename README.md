# :crown: HeirBnB 

HeirBnB is a website clone inspired by AirBnb, an online marketplace for homestays and vacation rentals. The platform connects people who want to rent out lodging to those who are looking for acommodation in specific locales. This clone name is inspired by a throw-away line from the American television show, "The Good Place": 
> "I used HeirBnB. "H-E-I-R." It's an app for heirs and heiresses where we swap mansions, private islands... blimp hangars, that sort of thing."

[See here for HeirBnB Live Site.](https://apiproject-airbnbclone.herokuapp.com/)


## Wiki Links
[API Documentation](https://github.com/jaeyoungh1/API_Project/wiki/API-Documentation)
[Database Schema](https://github.com/jaeyoungh1/API_Project/wiki/Database-Schema)
[Feature List](https://github.com/jaeyoungh1/API_Project/wiki/Feature-List)
[Redux Store State Shape](https://github.com/jaeyoungh1/API_Project/wiki/Redux-Store-Shape)

## Languages and Technologies
This project was developed with:
- JavaScript
- CSS
- SQLite3
- Express
- Sequelize
- React
- Redux
Hosted on Heroku

## Descriptions of features
### Login and Sign Up Functionality
![Screen Shot 2022-09-23 at 8 19 14 AM](https://user-images.githubusercontent.com/103082046/191995421-5c7e4649-63ea-44b1-965e-367bede5543f.png)
You can access the login and signup features on the home page by clicking the profile button. In the login feature, you can also have a demo user button to conveniently test all features without signing up.

### Home Page
All users are able to browse available Heirbnb listings on the home page. These display the location, price, and average rating for each spot. Clicking into the spot will take the user to the specific spot's details page.

### Spots
![Screen Shot 2022-09-23 at 8 22 21 AM](https://user-images.githubusercontent.com/103082046/191996051-0387191c-609b-4e40-aa5f-8e2e333bdc46.png) 
Each spot has its own details that the spot owner has added upon creation, such as preview image, name, description. The spot details also includes reviews that other users have made for that spot. 
Only owners can edit their own spots by navigating to "My Spots" in their profile dropdown.
![Screen Shot 2022-09-23 at 8 24 32 AM](https://user-images.githubusercontent.com/103082046/191996494-a1ffd4db-d3f6-41ea-b777-693ae4df6787.png)
Only a spot's owner is able to delete a spot.

### Reviews
![Screen Shot 2022-09-23 at 8 25 59 AM](https://user-images.githubusercontent.com/103082046/191996786-178961a7-9df5-4c6a-afb1-14fba50a7a29.png)
Each spot has a list of reviews that other users have created for that spot. A spot's owner is not able to review their own spot. A user may not create another review for a spot they have already reviewed but may edit their existing review. Reviews can include review images, which can be added upon review creation. 
![Screen Shot 2022-09-23 at 8 27 13 AM](https://user-images.githubusercontent.com/103082046/191997086-8713cbf8-1a9b-4267-9f2c-b145264a7aa6.png)
Users may access all reviews they've written
 by navigating to "My Reviews" in their profile drop down. On this page, they may edit existing reviews as well as delete their reviews.
 ![Screen Shot 2022-09-23 at 8 28 36 AM](https://user-images.githubusercontent.com/103082046/191997331-0611e9fe-abe8-496a-ba03-048070bf04b5.png)

## Roadmap for future features
Next steps include the functionality for spot owners to be able to add new images for spots they are hosting. 
In addition, adding bookings feature so that users are able to book spots they do not own.

## Get Started
After cloning or forking the repo, you will have to npm install, as well as create your own .env file with the port, server, and JWT info. Running "npm run db:setup" will populate the database with the seed data already present in the backend folder. Then, this site can be started on the local server by running "npm start" in the backend and the frontend folders respectively. 

## Contact Info
Contact me at jaeyoung1997@gmail.com or through my [LinkedIn](https://www.linkedin.com/in/jaeyoung-hwang-71654490/)

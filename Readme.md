# CS 484 - "Pokemon Tracker" Project

## Project Info

### Site Info/Goal

This website provides an easy interface for users to track their favorite Pokemon/the Pokemon they possess across all their games in one convenient place. 

It also provides users with an opportunity to see their most common types (Fire, Water, Grass etc...) of Pokemon in their library.


### Team Members

Dhyan Patel - Primarily focused on backend, worked on database setup and queries, made refinements to passport.js
implementation, took the lead on configuring github actions and Heroku deployment

Nikhil Prasad - Primarily focused on frontend, worked on passport.js setup, worked with REST API querying for populating the frontend, assisted in database
design

### RESTful API

Our team used PokeAPI, a RESTful API that consists of data on every current Pokemon. The API was directly queried and a
node package (Pokedex-Promise) was used to query the API

Code snippets below:

```
var pokemon = await axios.get(`https://pokeapi.co/api/v2/pokemon/${req.body.pokemon_id}/`)
var data = pokemon.data.types.map(i => i.type.name)
data.unshift(req.body.pokemon_id)
data.unshift(user.id)
```

```
var pokeData = await P.getPokemonsList();
pokeData = pokeData.results;
res.render('userpage', {userData, pokeData})
```

## Deployment

The application is configured to automatically deploy to a Heroku App whenever a commit or merged branch is added to the
`main` branch of the Github repository. This is done via an app connection to GitHub inside of Heroku. Deployment is
configured to only begin after CI passes, which allows the repository to test the application before deployment.

## Testing

Testing is done via GitHub Actions. We're using a workflow called Node.js CI, and it is configured to test the application
using Node.js version 12, which is the version we're deploying with, and the version which we developed the application using.
The application uses Jest for running test cases and testing the application.

### Tests Created

"Test Register Failure" - Registration failure due to bad (missing) input - Makes sure that accounts are not created when given
improper input

"Test Register Success" - Registration success when given proper input - Makes sure that accounts are successfully created

### Information

The above tests cover all the registration feature's logic.

Future tests should follow a similar structure and tests.

So far, we've made use of tables to show the user's favorite Pokemon. This table is sortable and users can view their
most recently or oldest favorited pokemon in their collection. Users can also order results alphabetically.

More data visualization is planned to be added but not concrete.

# Web Coding Challenge

## Introduction 

First of all this is just the first version of the coding challenge, there is still some taskes that are missing such as (access controle and nearby shops sorting ).All you need to do is clone or download the project and run the following cmd :

  - npm install => install all the packges from package.json file
	- nodemon => run the express server and API server on the port 3001
	- webpack => bundling the Javascript for the borwser

that's it now you good to go open borwser on (localhost:3000).

ps : you don't have to setup mongodb locally!

## Technologies used

- Javascript
  - Frontend : ReactJS (Redux,ReactRouter 3.2)
  - Backend : NodeJS (ExpressJS)
  - Database : MongoDB (mLab,mongoose,passport-local-mongoose)


## Project structure 

The project is composed of two parts :
- Server Side contain three main files :
  - server : Midleware for public folder,listner on port 3000 and sending the index file for all links .
  - app : Setting up the proxy .
  - apiServer : handling all the requests .
- Client Side (the src folder) and it contains  :
  - actions folder : CRUD sent through axios to apiSever .
  - reducer folder : Get the dispatch action and return the result .
  - component folder : With all the componenets .


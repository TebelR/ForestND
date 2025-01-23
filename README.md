# Unit Organization Module - Tree ND

# Running the project

First, to start the server, one needs to launch the ForestND_Server.exe

Next, ensure you have a static server installed or follow this script:
npm install -g serve

Next, navigate to the same directory as the ForestND_Server.exe and run:
serve -s

From this point you can go to localhost:3000 in your browser.

A copy of build files exists in /hackBuilds upon opening the project

# Project Overview

This project was developed in 34 hours as part of a hackathon. For safety purposes, some components and information has been removed from this project.


# Technical Overview

This project has two components - front and back.
The front end is developed in React.
The most technically complex part of the client is the graph that can be seen on the home page. Almost all of its code is in the CommdBranch.js component.
We used the Cytoscape library to make it work and have added a lot of additional functionality between the graph and neighboring components.

The back end is developed using flask-cors in Python. The back end at the moment is a simple Python server that provides clients with API. The server is multithreaded, and communicates with a stub database that stores its data in JSON files.

The built python backend is running the server on localhost:5000
The front end is running on localhost:3000

Python version: 3.11.9

# Road Map

The app has a lot of potential for processing data and delivering statistics to those in need. Because the client relies on an API, it can be easily modified to work with the existing army app.

# Build

pyinstaller --onefile --add-data "db/nodeTable.json:db" --add-data "db/edgeTable.json:db" --add-data "db/treeFamilyTable.json:db" --add-data "db/persTable.json:db" --add-data "db/snapshotTable.json:db" --name "ForestND_Server" serverCore.py

^^^This sends the python executable into /dist


npm run build

^^^This sends the react client to /builds

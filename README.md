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

Tree ND takes away some of Monitor Mass' functionality to lighten the mental load on users. The primary purpose of Tree ND is to provide a better visualisation of the user organization's structure, along with its resources and capabilities.

Those with authority, may swiftly generate new formations that include relevant members. These formations are highly fluid and are easily saved and editted.

The personal information module was also derived from MM, but with a big addition of members being able to modify some of their own data in regards to qualifications, certificate expiry dates and other data. This data still needs to be verified by the CoC, but its presence alone can help commanders gain bette rsituational awareness in a much shorter period of time.


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

# How to get started (to code)

Download VSCode.
Download Python from here: https://www.python.org
Open a new terminal in VSCode and run: pip install flask flask-cors

To run python files, type: python nameofFile.py
At the moment, the server can be initialized on localHost by running: python serverCore.py


Download NodeJS and install it wherever you want
type cd client/frontend
and run npm start to launch the client


# Build

pyinstaller --onefile --add-data "db/nodeTable.json:db" --add-data "db/edgeTable.json:db" --add-data "db/treeFamilyTable.json:db" --add-data "db/persTable.json:db" --add-data "db/snapshotTable.json:db" --name "ForestND_Server" serverCore.py

^^^This sends the python executable into /dist


npm run build

^^^This sends the react client to /builds

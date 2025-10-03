 APP TITLE = Movie Explorer
Movie Explorer is a React-based web application that lets users search movies, actors, and directors. Clickable actor and director names show details in a reusable modal. 
---

 **Features**

- Search movies by **actor, director, genre, or release year**.  
- **Paginated movie list** with responsive cards.  
- Clickable actor and director names to show **details modal**.  
- Reusable modal component for displaying info.  
- Backend APIs for movies, actors, and directors.  
---

 **Tech Stack**

- **Frontend:** React, Bootstrap 5  
- **Backend:** Node.js, Express.js  
- **Database:** MongoDB  
- **HTTP Requests:** Axios  

---

 **Getting Started**

 **Prerequisites**

- Node.js v16+  
- npm or yarn  
- MongoDB  

 **Clone the Repository**

bash
git clone https://github.com/yourusername/movie-explorer.git
cd movie-explorer

**Run the app**
1. MongoDB setup
   1.1. create a database named movie_explorer_L7 in your local.
   1.2. create collection and import relevant jsons
        collection name : actors (databaseFiles/movie_explorer_L7.actors.json)
        collection name : genres (databaseFiles/movie_explorer_L7.genres.json)
        collection name : directors (databaseFiles/movie_explorer_L7.directors.json)
        collection name : movies (databaseFiles/movie_explorer_L7.movies.json)
2.Run the Node Server (movie_explorer_BE)
  2.1. open in integrated terminal
  2.2. run "npm install" to initialise the node modules
  2.3. run using the command "npm start"

3.Run the React app (movie-explorer-frontend)
  3.1. open in integrated terminal
  3.2. run "npm install" to initialise the node modules
  3.3. run using the command "npm run dev"
  3.4. Click the URL shown on terminal to see the launched app

**Points To Note**
Update the connectDb URL and Cors URL in server.js file in node app if needed
<img width="632" height="211" alt="image" src="https://github.com/user-attachments/assets/7c6c193e-56b6-440c-92fe-e3710c87d77c" />
Update the Base URL on API.jsx in react app to the URL which your node app is running
<img width="478" height="60" alt="image" src="https://github.com/user-attachments/assets/cbce691f-40d4-4ccd-adde-86582605381a" />


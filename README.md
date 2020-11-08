# myBlog-MERN

This is an example blog website made using MERN stack for development showcase.

# To test it locally:
1. Before doing anything, make sure that you have npm installed
1. Create .env files in both /frontend and /backend folders
1. Place the following in those .env files:
   1. /backend/.env
      * MONGO_URI={MONGODB URI ( For localhost use : localhost/{database name})}
      * API_KEY={YOUR API KEY ( Can be any value )}
      * SECRET_KEY={YOUR SECRET KEY ( Can be any value)}
   1. /frontend/.env
      * REACT_APP_API_KEY={YOUR BACKEND API KEY}
      * REACT_APP_API_URL={YOUR BACKEND URL}
      * REACT_APP_URL={YOUR FRONTEND URL}
1. After that, open up the terminal and:
    1. in /backend folder run the following command: <b>npm run dev</b>
    1. in /frontend folder run the following command: <b>npm start</b>

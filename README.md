## Practice Project: Instagram pseudoclone
This practice project implements an instagram style photo sharing application. It features user authentication and database integration using Firebase
and the Firestore, and simple social media functionality such as the ability for users to follow/unfollow each other and view a timeline of photos that
have been recently uploaded by the people they are following as in Instagram. The timeline posts have realtime comment/like/unlike functions implemented and
a sidebar of suggested users to follow based on a simple algorithm which recommends unfollowed users in the network was also included.

## Tech Stack
- Javascript, React (Create React App)
- Tailwind 
- Firebase, Firestore
- Vercel

## Objectives
The main objective of this practice project was to figure out and integrate the fundamentals of coding in React. This was the first proper nontrivial project I have done
in React which integrated prior React basics learnt in separate sandbox projects such as routing, authentication, database API calls, async/await programming, working
in JSX, using React Hooks and the Context API and heavy styling using Tailwind. 

### Commentary
Not all the functionality of Instagram has been implemented in this project hence it being a pseudoclone. There are many buttons (especially in the profile pages)
which are not functional and serve only at this point to show a visual template of the user interface. The biggest point of difference between this project
and the real Instagram application is that this application is really only a photo displayer that displays a fixed collection of photos which are stored in the public/images folder. 
Which means that in order to add new photos to a users collection the new photos will need to be manually added to the public/images/[username] folder, true photo
upload functionality has not been included yet.

### View the projectv

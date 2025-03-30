# Part 3-b: Exercises 3.9.-3.11. - Fullstackopen Course

This section is based on the [Fullstackopen](https://fullstackopen.com/en/part3/deploying_app_to_internet#exercises-3-9-3-11) course.

## 3.10 Phonebook backend step 10

### Deploying the Backend to Render

In this step, I deployed the backend of the Phonebook application to **Render**. The frontend remains local or on another service, but only the backend is deployed.

### Deployment Process

To deploy, I created a separate repository for the backend and followed these steps:

1. **Pushed the backend code** to a new GitHub repository.  
   `https://github.com/OzkrMebasser/phone-book-backend-p-3-fulltstackopen`

2. **Created a new Render service** for a Node.js application.
3. **Connected the repository** to Render and set the build command:
   ```sh
   npm install && npm run build && npm start
   ```
4. **Deployed the backend** successfully.

### Testing the Deployed Backend

Once deployed, I tested the backend using:

- **Browser**: Checked `https://phone-book-backend-p-3-fulltstackopen.onrender.com/api/persons` to ensure it returns the correct JSON response.
- **Postman**: Sent `GET`, `POST`, `DELETE`, and `PUT` requests to verify API functionality.
- **VS Code REST Client**: Ran API requests to confirm everything works as expected.

### Logs and Monitoring

As a **best practice**, I monitored the logs in Render to ensure the backend was running correctly and there were no unexpected errors.

#### Example Log Output in Render

```
Server running on port 3001
GET /api/persons 200
POST /api/persons 201
```

### Updated `README.md`

I also added the **backend deployment link** to my repository’s `README.md` for easy access.

#### ✅ Final Result

The backend is now live on **Render**, successfully serving requests from the internet. Here are some screenshots of the logs and my API tests in **Postman**:

`GET` method, show all persons
URL`https://phone-book-backend-p-3-fulltstackopen.onrender.com/api/persons`
![Exercise Preview](assets/part-3-exercise-3.10-get-all.gif)

`POST` method, to add a new person
URL`https://phone-book-backend-p-3-fulltstackopen.onrender.com/api/persons`
![Exercise Preview](assets/part-3-exercise-3.10-post.gif)

`GET` method, to get pesons by ID
URL`https://phone-book-backend-p-3-fulltstackopen.onrender.com/api/persons/1`
![Exercise Preview](assets/part-3-exercise-3.10-get-by-id.gif)

`DELETE` method, to delete a person by ID
URL`https://phone-book-backend-p-3-fulltstackopen.onrender.com/api/persons/1`
![Exercise Preview](assets/part-3-exercise-3.10-delete.gif)

`GET` method, to attempt get a persons that has been deleted, returning 404 when not found
URL`https://phone-book-backend-p-3-fulltstackopen.onrender.com/api/persons/1`
![Exercise Preview](assets/part-3-exercise-3.10-after-delete-404.gif)

`GET` method, to show `info` of how many people we have uploaded
URL`https://phone-book-backend-p-3-fulltstackopen.onrender.com/api/info`
![Exercise Preview](assets/part-3-exercise-3.10-info.gif)

`render` dashboard logs
![Exercise Preview](assets/part-3-exercise-3.10-render-dashboard.gif)

---

## 3.11: Full Stack Phonebook

In this exercise, I generated a **production build** of the frontend and added it to the backend using **Express**. I also deployed the full-stack application on **Render**.

### Steps Followed:

1. **Build the Frontend**  
   In the frontend project directory, I ran:

   ```sh
   npm run build
   ```

   This created a `dist` directory containing the production build.

2. **Serve the Frontend with Express**  
   In the backend, I modified `index.js` to serve the frontend:

   ```javascript
   // Serve the frontend from the 'dist' folder
   app.use(express.static("dist"));
   ```

3. **Ensure `dist` is Committed**  
   I made sure that `dist/` was **not** in `.gitignore`, so it was included in the deployment:

4. **Deploy the Full-Stack App on Render**  
   I redeployed my backend on **Render**, ensuring that both the frontend and backend worked together.

5. **Verify Local Development**  
   I checked that the frontend still worked in **development mode** by running:

   ```sh
   npm run dev
   ```

---

### Expected Behavior

- When accessing the deployed **backend URL**, the full-stack **React frontend** should load properly.
- API routes (`/api/persons`, `/info`, etc.) should still work as expected.
- The application should work both locally and in production.

**Here is an image running locally

![Exercise Preview](assets/part-3-exercise-3.11-locally-server-and-front-end.gif)

✅ **The full-stack Phonebook app is now deployed and working!** 🚀
[!click here to see live preview](https://phone-book-backend-p-3-fulltstackopen.onrender.com/)

---
# 3.12: Command-line Database

> [!NOTE]
> In this exercise, I connected the phonebook application to a **cloud-based MongoDB database** using **MongoDB Atlas**.


**Code of this project is in my folling GitHub repository**  
`https://github.com/OzkrMebasser/phone-book-backend-p-3-fulltstackopen` 
[click here!](https://github.com/OzkrMebasser/phone-book-backend-p-3-fulltstackopen)


## Setting Up MongoDB Atlas

1. **Created a MongoDB Atlas account** and set up a new cluster.
2. **Created a new database** named `phonebook` with a collection named `persons`.
3. **Generated a connection string** and stored it securely.

## Implementing the `mongo.js` Script

I created a `mongo.js` file to handle **command-line interactions** with the database. This script allows adding new contacts and listing existing ones.

### Installation of Dependencies

To connect to MongoDB, I installed **Mongoose** in the project:

```sh
npm install mongoose
```

### Structure of `mongo.js`

The script works in two ways:

1. **Listing all contacts** if only the password is provided.
2. **Adding a new contact** if both a name and a phone number are provided.

Here is the `mongo.js` file:

```javascript
const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log("give password as argument");
  process.exit(1);
}

const password = process.argv[2];
// const name = process.argv[3];
// const number = process.argv[4];

const url = `mongodb+srv://oscarfs:${password}@cluster0.kaukhto.mongodb.net/phoneBook?retryWrites=true&w=majority&appName=Cluster0`;

mongoose.set("strictQuery", false);

mongoose.connect(url);

// Defining the schema
const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

// Creating the moddel based on my schema
const Person = mongoose.model("Person", personSchema);

// Adding a new person to the phonebook database
if (process.argv.length > 4) {
  const person = new Person({
    name: process.argv[3],
    number: process.argv[4],
  });
  person.save().then((result) => {
    console.log(`added ${result.name} number ${result.number} to phonebook`);
    mongoose.connection.close();
  });
} else if (process.argv.length === 3) {
  Person.find({}).then((result) => {
    console.log("phonebook:");
    result.forEach((person) => {
      console.log(`${person.name} ${person.number}`);
    });
    mongoose.connection.close();
  });
}
```

## Usage Instructions

### Listing All Contacts

To list all saved contacts, run:

```sh
node mongo.js mypassword
```

Example output:

```sh
phonebook:
Oscar Moreno 555-558-8999
Ana Mendoza 558-669-9999
```

### Adding a New Contact

To add a contact, use:

```sh
node mongo.js mypassword "Ana Mendoza" 558-669-9999
```

Expected output:

```
added Ana Mendoza number 558-669-9999 to phonebook
```

## Key Learnings

- **Mongoose models** automatically pluralize the collection name (`Person` → `people`).
- **Command-line arguments (`process.argv`)** are used to accept user input.
- **Database connection** must be closed properly after each operation.
- **Environment variables** should be used to store sensitive data (e.g., passwords).

✅ **Now the phonebook app is connected to a MongoDB cloud database!** 🚀

![Exercise Preview](https://github.com/user-attachments/assets/e49e6e91-f90a-463a-8252-2e2e8f6771a2)


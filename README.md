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

\*\*Here is an image running locally

![Exercise Preview](assets/part-3-exercise-3.11-locally-server-and-front-end.gif)

✅ **The full-stack Phonebook app is now deployed and working!** 🚀
[!click here to see live preview](https://phone-book-backend-p-3-fulltstackopen.onrender.com/)
or copy this link `https://phone-book-backend-p-3-fulltstackopen.onrender.com/`

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

### Exercise Preview

https://github.com/user-attachments/assets/e49e6e91-f90a-463a-8252-2e2e8f6771a2

---

# 3.13: Phonebook Database - Step 1

> [!NOTE]
> In this exercise, I modified the phonebook application to fetch contacts from a **MongoDB database** using **Mongoose**.

## Implemented Changes

### 1. Creation of the `persons.js` Module

To keep the code modular, I moved the Mongoose schema and model to a separate file.

**`models/persons.js`**

```javascript
const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

// Defining the schema
const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  number: {
    type: String,
    required: true,
  },
});
personSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Person", personSchema);
```

### Removal of Hardcoded Data and Unnecessary Commented Code

I removed the previously hardcoded persons array, as well as all unnecessary commented-out code from previous exercises. This helps eliminate redundant code, making the exercise cleaner and more readable.

### 3. Connection to MongoDB

The application now connects to MongoDB using Mongoose, directly in the `index.js` file (server):

```javascript
// Connect to MongoDB
const url = process.env.MONGODB_URI;
// console.log("This is my url string to connecto to mongo: ", url);
mongoose
  .connect(url)
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connecting to MongoDB:", error.message);
  });
```

### 4. Implementing GET Routes Using MongoDB Methods

#### Get All Contacts

```javascript
//Route to get all persons (GET method)
app.get("/api/persons", (request, response) => {
  Person.find({}).then((people) => {
    response.json(people);
  });
});
```

#### Get a Contact by ID

```javascript
//Route to get a single person by id, and if not found, return 404 (GET method)
app.get("/api/persons/:id", (request, response) => {
  Person.findById(request.params.id).then((person) => {
    // console.log(`This is the person checked with id: ${person.id}`, person)
    if (person) {
      response.json(person);
    } else {
      response
        .status(404)
        .send({ error: `Person with id ${person.id} not found` });
    }
  });
});
```

#### Phonebook Info

```javascript
//Route to get how many entries are there in the phonebook (GET method)
app.get("/info", (request, response) => {
  Person.countDocuments({}).then((count) => {
    // console.log(count);
    const date = new Date();
    response.send(`Phonebook has info for ${count} people <br> ${date}`);
  });
});
```

## Testing

I verified that the routes work correctly:

- **GET `/api/persons`** returns all contacts from MongoDB.
- **GET `/api/persons/:id`** retrieves a specific contact by ID or returns `404` if not found.
- **GET `/info`** displays the total number of stored contacts along with the current date and time.

The application is now fully connected to MongoDB and ready to handle GET requests.

### Exercise Previews (MongoDB and Postman testing)

https://github.com/user-attachments/assets/9c9cb40e-e0ba-42fa-a7ee-93a2e939dbbc

### Exercise Previews (Frontend and server)

https://github.com/user-attachments/assets/e41f05fb-7b4f-4ba5-a91d-ade8cf3bde62

### Exercise Previews (VSC console, and logs to debug)

https://github.com/user-attachments/assets/6bdeb554-6faa-4d7a-9d08-24c823019f6c

---

# 3.14: Phonebook Database - Step 2

> [!NOTE]
> In this exercise, I modified the backend to save new contacts to the **MongoDB database**.

## Implemented Changes

### 1. POST Route to Add New Contacts

The route to add new contacts to the phonebook was modified to save data to the database. Now, when a POST request is made to the `/api/persons` endpoint, the information is saved in MongoDB. The application also ensures that both the name and number are provided in the request body, and returns an error if either is missing.

#### POST `/api/persons`

```javascript
// Route to add a new person (entry) to the phonebook (POST method), with validation
app.post("/api/persons", (request, response) => {
  const body = request.body;

  // We check if the request body has the name and number
  if (!body.name || !body.number) {
    return response
      .status(400)
      .json({ error: "Both, name and number are required" });
  }

  const newPerson = new Person({
    name: body.name,
    number: body.number,
  });

  // We save the new person to the database
  newPerson
    .save()
    .then((savedPerson) => {
      response.status(201).json(savedPerson);
      console.log(
        `added ${savedPerson.name} number ${savedPerson.number} to phonebook`
      );
    })
    .catch((error) => {
      response.status(500).json({ error: error.message });
    });
});
```

In this implementation, the data is saved directly into MongoDB, and the application no longer checks for the uniqueness of the name at this stage, as instructed. Any incoming request will add a new contact regardless of whether the name already exists.

### 2. Verifying the Frontend

After making the changes to the backend, the frontend was verified to ensure that it still works correctly.

## Testing

I tested the following:

- **POST `/api/persons`** works correctly by adding a new contact to the database. The response returns the saved contact.
- The frontend still functions as expected after making the changes to the backend.

### Exercise Previews (Frontend and MongoDB )

https://github.com/user-attachments/assets/a8041779-9b69-444f-ae9c-b8df8856fe22

### Exercise Previews (Postman testing, MongoDB, and VSC console)

https://github.com/user-attachments/assets/e0a94fc6-bdc5-4e73-9096-ee81b773f955

---

# 3.15: Phonebook Database - Step 3

> [!NOTE]
> In this exercise, I modified the backend so that deleting phonebook entries is reflected in the **MongoDB database**.

## Implemented Changes

### DELETE Route to Remove Contacts

I added a new route that allows deleting a contact from the database. When a DELETE request is made to `/api/persons/:id`, the contact corresponding to the provided ID is removed.

#### DELETE `/api/persons/:id`

```javascript
// Route to delete a person from the database
app.delete("/api/persons/:id", (request, response) => {
  Person.findByIdAndDelete(String(request.params.id))
    .then((result) => {
      // console.log(
      //   `Deleted person with id: ${request.params.id} successfully, result: ${result}`
      // );
      response
        .json({ success: true, message: "Person deleted successfully" })
        .status(204)
        .end();
    })
    .catch((error) => {
      response.status(500).json({ error: error.message });
    });
});
```

This implementation ensures that the deletion is properly reflected in the MongoDB database.

### Verifying the Frontend

After implementing this change, I tested the frontend to ensure that it continues to function correctly. The UI correctly updates when a contact is deleted.

## Testing

I tested the following:

- **DELETE `/api/persons/:id`** removes the specified contact from MongoDB.
- The frontend correctly updates after a deletion.
- Attempting to delete a non-existing ID does not crash the application.

### Exercise Previews (Postman testing, MongoDB, VSC console, and frontend updates)

https://github.com/user-attachments/assets/0e94d471-957b-4241-be30-5f3bd2dad8ea

https://github.com/user-attachments/assets/2153e4f7-edc3-4dc6-a4a7-5dd91fe2cf32

https://github.com/user-attachments/assets/b25b904e-db2f-41f6-b2c7-277365d0ed64

---

# 3.16: Phonebook Database - Step 4

> [!NOTE]
> In this exercise, I improved error handling by moving it to a dedicated middleware.

## Implemented Changes

### Error Handling Middleware

I separated the middleware function to handle errors and placed it at the end of the middleware stack. This ensures that errors generated anywhere in the application are caught and handled properly.

#### **Error Handler Middleware (`errorHandler`)**

```javascript
const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).json({ error: "malformatted id" });
  }

  next(error);
};
```

- **Handles `CastError`**: If an invalid MongoDB ID is provided, it returns a `400 Bad Request` error.
- **Logs Errors**: Errors are logged to the console.
- **Passes Other Errors**: Any unhandled errors are passed to the next middleware.

### Unknown Endpoint Middleware

I also added a middleware to handle requests to unknown endpoints.

#### **Unknown Endpoint Middleware (`unknownEndpoint`)**

```javascript
const unknownEndpoint = (request, response) => {
  response.status(404).json({ error: "unknown endpoint" });
};
```

This ensures that users receive a structured response instead of a generic error when accessing a non-existent route.

### Integrating Middleware

Both middleware functions were imported and applied in the main server file.

```javascript
const { errorHandler, unknownEndpoint } = require("./middlewares/middleware");

// Middleware for unknown endpoints
app.use(unknownEndpoint);

// Middleware for error handling
app.use(errorHandler);
```

## Testing

I tested the following cases:

1. **Accessing an invalid route**

   - Returns a `404 Not Found` error with the message `"unknown endpoint"`.

2. **Fetching a contact with an invalid ID**

   - Returns a `400 Bad Request` error with the message `"malformatted id"`.

3. **Creating, updating, and deleting contacts**
   - Ensures no unexpected errors occur.

### Exercise Previews (Responses in browser)

- **Testing invalid ID errors**
- **Handling unknown routes correctly**
- **Ensuring smooth error logging**

https://github.com/user-attachments/assets/c6fe2720-76c4-4496-b488-5e7961d98045

---

# 3.17: Phonebook Database - Step 5

> [!NOTE]  
> In this exercise, I modified the backend to support updating an existing contact's phone number if their name is already in the database.

## Implemented Changes

### Preventing Duplicate Names

I updated the `POST /api/persons` route to check if the name already exists in the database. If it does, instead of creating a duplicate entry, the server responds with a `409 Conflict` status. This response includes the existing person's ID so the frontend can update the phone number instead.

#### **Why a 409 Conflict Response?**

The `409 Conflict` status is used when a request conflicts with the current state of the resource. In this case, adding a duplicate name goes against the requirement that names must be unique. By returning `409`, I signal to the frontend that instead of adding a new entry, it should update the existing one.

More info about status 409? (see doc here): [https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/409]

### Updating an Existing Contact

To allow phone number updates, I added a `PUT /api/persons/:id` route. This route finds a person by their ID and updates their number while keeping their name unchanged.

---

## **Updated Code**

### **POST `/api/persons`** (Prevents duplicate names)

```javascript
// Route to add a new person (entry) to the phonebook (POST method), with validation
app.post("/api/persons", (request, response, next) => {
  // const body = request.body;
  const { name, number } = request.body;

  // We check if the request body has the name and number
  if (!name || !number) {
    return response
      .status(400)
      .json({ error: "Both, name and number are required" });
  }

  // We check if the name already exists in the phonebook
  Person.findOne({ name })
    .then((existingPerson) => {
      if (existingPerson) {
        // If the name is found, we return a conflict response
        return response.status(409).json({
          error: "Name must be unique",
          personExistsId: existingPerson.id,
        });

        // return response.status(400).json({ error: "Name must be unique" });
      }

      // If the name is not found, we save the new person to the database
      const newPerson = new Person({
        // id: Math.floor(Math.random() * 1000).toString(),
        //We use the auto-generated id from mongodb
        name,
        number,
      });
      // We save the new person to the database
      return newPerson
        .save()
        .then((savedPerson) => response.json(savedPerson))
        .catch((error) => next(error));
    })

    .catch((error) => next(error));
});
```

### **PUT `/api/persons/:id`** (Updates phone number if contact exists)

```javascript
//Rounte to update phone #, if the person is already in the database
app.put("/api/persons/:id", (request, response, next) => {
  const { name, number } = request.body;
  const id = request.params.id;
  // We check if the request body has the name and number
  if (!name || !number) {
    return response
      .status(400)
      .json({ error: "Both, name and number are required" });
  }
  // We find the person by id
  Person.findByIdAndUpdate(id, { name, number }, { new: true })
    .then((updatedPerson) => {
      if (updatedPerson) {
        response.json(updatedPerson);
      } else {
        response.status(404).json({ error: `Person with id ${id} not found` });
      }
    })
    .catch((error) => next(error));
});
```

## **Testing**

I tested the following cases:

1. **Adding a new contact**

   - Works as expected when the name is unique.

2. **Trying to add a contact with an existing name**

   - Returns a `409 Conflict` response, allowing the frontend to update the phone number instead.

3. **Updating a contact’s phone number via `PUT /api/persons/:id`**

   - Successfully updates the number when the ID is valid.

4. **Attempting to update a non-existing contact**
   - Returns a `404 Not Found` error.


### **Exercise Previews**

- **Testing the `409 Conflict` response when adding a duplicate name**
- **Verifying phone number updates through the `PUT` request**
- **Ensuring frontend correctly handles updates**

https://github.com/user-attachments/assets/2be1c913-8bd0-456b-af74-c2dfae895802

https://github.com/user-attachments/assets/d2e6a9d1-96ca-4183-a0f7-a9f65711f2c0


With these changes, my backend now fully supports updating existing contacts while maintaining unique names in the phonebook.

---

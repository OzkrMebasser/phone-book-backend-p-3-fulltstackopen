# Part 3-b: Exercises 3.9.-3.11. - Fullstackopen Course

This section is based on the [Fullstackopen](https://fullstackopen.com/en/part3/deploying_app_to_internet#exercises-3-9-3-11) course.


## 3.10 Phonebook backend step 10

### Integrating the Backend with the Phonebook Frontend

In this exercise, the focus was on integrating the backend with the frontend of the phonebook application. The goal is for the frontend to interact with the backend using HTTP requests to fetch, add, and delete entries. However, updating phone numbers will be handled in **Exercise 3.17**.

### Modifications

- **CORS Middleware**: I added **CORS (Cross-Origin Resource Sharing)** middleware to enable communication between the frontend and backend, especially for development environments where they may run on different ports.
- **API Integration**: I updated the frontend to correctly call the backend API endpoints to fetch, add, and delete phonebook entries.

### Backend Modifications

I updated the backend to support the required routes and to handle HTTP requests from the frontend:

```javascript
//Added cors middleware to allow frontend connection
const cors = require("cors");
app.use(cors());
```

### Frontend Modifications

I updated the frontend to use the correct API URL (`http://localhost:3001/api/persons`). This ensures that the frontend makes requests to the correct backend endpoints.

Here's the updated frontend code:

```javascript
import axios from "axios";
const baseUrl = "http://localhost:3001/api/persons";

const getAllPersons = () => {
  const req = axios.get(baseUrl);
  return req.then((res) => res.data);
};

const addPerson = (newPerson) => {
  const req = axios.post(baseUrl, newPerson);
  return req.then((res) => res.data);
};

const deletePerson = (id) => {
  return axios.delete(`${baseUrl}/${id}`);
};

const updatePerson = (id, newPerson) => {
  return axios.put(`${baseUrl}/${id}`, newPerson).then((res) => res.data);
};

export default { getAllPersons, addPerson, deletePerson, updatePerson };
```

### Testing the Integration

To test the integration, I ran both the frontend and the backend servers and verified that the following actions work correctly:

1. **Fetching data**: The frontend successfully makes a GET request to `/api/persons`, and the backend responds with the list of all persons.
2. **Adding a new person**: When the user submits a form to add a new person, the frontend makes a POST request to `/api/persons`, and the backend adds the new entry to the phonebook.
3. **Deleting a person**: When the user clicks a delete button, the frontend makes a DELETE request to `/api/persons/:id`, and the backend removes the specified person from the phonebook.

The integration was successful, and the frontend now communicates seamlessly with the backend.

Here’s a demo of the integration output, where the backend and frontend are running on separate servers:

![Exercise Preview](assets/part-3-exercise-3.9.gif)


---

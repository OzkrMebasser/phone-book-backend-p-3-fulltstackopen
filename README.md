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
Connected to MongoDB  
GET /api/persons 200  
POST /api/persons 201  
```

### Updated `README.md`  

I also added the **backend deployment link** to my repository’s `README.md` for easy access.  

#### ✅ Final Result  

The backend is now live on **Render**, successfully serving requests from the internet. Here are some screenshots of the logs and my API tests in **Postman**:  


`GET` method,  show all persons 
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

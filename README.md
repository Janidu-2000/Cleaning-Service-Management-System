# Cleaning-Service-Management-System
Cleaning Service Management System with Admin  Panel (CRUD)

Here are the basic steps:

1. Clone the Repository 
   - Run: git clone <repository_url>  
   - Navigate into the project folder: cd <project_directory>  

2. Open Projects
   - Open the *frontend* in VS Code: cd frontend → code .  
   - Open the *backend* in IntelliJ IDEA: cd backend → idea .  

3. Set Up XAMPP  
   - Start Apache and MySQL in the *XAMPP Control Panel*.  
   - Import the database in *phpMyAdmin* using the provided .sql file.  

4. Install Dependencies
   - For frontend: cd frontend → npm install  
   - For backend: Open IntelliJ and refresh Maven/Gradle dependencies.  

5. Run the Applications
   - Start the frontend: npm start (in frontend directory).  
   - Run the backend from IntelliJ by running the main class.  

6. Test
   - Access the frontend: [http://localhost:3000](http://localhost:3000).  
   - Ensure backend APIs work: [http://localhost:8080](http://localhost:8080).

  
     1. Create an Account
        
1. Open the *frontend* in your browser (e.g., [http://localhost:3000](http://localhost:3000)).
2. Create an account 
3. Fill in the required fields:
   - Username: Enter your desired username.
   - Password: Enter a secure password.
   - Role: Select either **User* or *Admin* 
4. Click the Create Account button.

---

  2. Log In
   
1. Navigate to the Login page.
2. Enter your *Username* and *Password*.
3. Click the Log In button.

---

  3. Navigate to Dashboards
- For User Role:  
  After successful login, you will be redirected to the *User Dashboard* (e.g., /user-dashboard).
  
- For Admin Role:  
  After successful login, you will be redirected to the *Admin Dashboard* (e.g., /admin-dashboard).

---

   4. Verify Functionality
- Confirm that the correct dashboard is displayed based on the selected role.
- Test actions within the dashboards to ensure proper role-based access.

This ensures the account creation and login flow works seamlessly.

/*import registerUser from './apiService'; // Adjust the import based on your file structure

// Define handleSubmit function
const handleSubmit = async (e, userData, setMessage) => {
  e.preventDefault();
  console.log("Form submitted", user);

  try {
    const data = await registerUser(userData);
    setMessage(data.message);  // Success message from backend
  } catch (error) {
    setMessage('An error occurred. Please try again.');
  }
};

// Export handleSubmit as default
export default handleSubmit;
*/

/*
import registerUser from './apiService'; 
const handleSubmit = async (e) => {
  e.preventDefault();
  console.log("Form submitted", user);  // Confirm data is passed to the function

  try {
    const res = await axios.post('http://localhost:3000/api/SignUpForm', user, {
      withCredentials: true, // Allow cookies
    });
    console.log("Response from server: ", res.data);  // Check the response
    alert(res.data.message);
  } catch (error) {
    console.error("Error during submission:", error);  // Check for errors in submission
  }
};
export default handleSubmit;
*/


import registerUser from './apiService'; // Importing the function correctly

const handleSubmit = async (e) => {
  e.preventDefault();
  console.log("Form submitted", user);  // Confirm data is passed to the function

  try {
    const res = await registerUser(user);  // Use the registerUser function from apiService
    console.log("Response from server: ", res);  // Check the response
    alert(res.message);
  } catch (error) {
    console.error("Error during submission:", error);  // Check for errors in submission
    alert(error.message || "An error occurred.");
  }
};

export default handleSubmit;

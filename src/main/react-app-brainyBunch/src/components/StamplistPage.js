import React, { useState, useEffect } from 'react';
import Navigation from "./Navigation";
import "../css/stamppage.css";

function StamplistPage() {
  const [stamps, setStamps] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [retUser, setRetUser] = useState(''); // Add state variable for retUser
  const filteredStamps = stamps.filter(stamp => stamp.retUser === retUser);

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    setRetUser(storedUsername);
  }, []);

  useEffect(() => {
    fetchStamps();
  }, [retUser]);
  
  const fetchStamps = async () => {
    try {
      const response = await fetch("http://localhost:8080/all");
      if (!response.ok) {
        throw new Error('Failed to fetch stamps');
      }

      const responseData = await response.json();
      const filteredStamps = responseData.filter(stamp => stamp.retUser === retUser);
      setStamps(filteredStamps);

    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const createTimestampWithDescription = async (description, retUser) => {
    try {
      const response = await fetch("http://localhost:8080/stamps/save", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          actionDescription: description, // Include the description
          retUser: retUser, // Include retUser in the request body
          // Add other properties as needed
        })
      });

      if (!response.ok) {
        throw new Error('Failed to create timestamp');
      }

      const successMessage = await response.text();
      console.log(successMessage);

      fetchStamps(); // Refresh the list after successful creation
    } catch (error) {
      console.error('Error creating timestamp:', error);
      // Handle the error appropriately, e.g., display an error message to the user
    }
  };

  useEffect(() => {
    fetchStamps();
  }, []);

  return (
    <div>
      <Navigation />
      <br></br>
      <br></br>
      <br></br>
      <h1>Stamp List</h1>
      {/* <button onClick={() => createTimestampWithDescription("Action 1",retUser)}>Action 1</button>
      <button onClick={() => createTimestampWithDescription("Action 2",retUser)}>Action 2</button> */}
      {/* Add more buttons for other actions as needed */}
      {error && <div className="error">{error}</div>}
      {isLoading ? (
        <div>Loading stamps...</div>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Stamp Time</th>
              <th>Action Description</th>
            </tr>
          </thead>
          <tbody>
          {filteredStamps.length > 0 ? (
              filteredStamps.map(stamp => (
                <tr key={stamp.id}>
                  <td>{stamp.id}</td>
                  <td>{stamp.stampTime}</td>
                  <td>{stamp.actionDescription}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3}>No stamps found</td>
              </tr>
            )}
          </tbody>
        </table>
      )}

    </div>
  );
}

export default StamplistPage;
import React, { useState, useEffect } from 'react';
import Navigation from "./Navigation";

function StamplistPage() {
  const [stamps, setStamps] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchStamps = async () => {
    try {
      const response = await fetch("http://localhost:8080/all");
      if (!response.ok) {
        throw new Error('Failed to fetch stamps');
      }

      const data = await response.json();
      setStamps(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const createTimestampWithDescription = async (description) => {
    try {
      const response = await fetch("http://localhost:8080/stamps/save", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          actionDescription: description, // Include the description
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
      <h1>Stamp List</h1>
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
            {stamps.length > 0 ? (
              stamps.map(stamp => (
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
      <button onClick={() => createTimestampWithDescription("Action 1")}>Action 1</button>
      <button onClick={() => createTimestampWithDescription("Action 2")}>Action 2</button>
      {/* Add more buttons for other actions as needed */}
    </div>
  );
}

export default StamplistPage;
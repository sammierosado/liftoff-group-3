import React, { useState, useEffect } from 'react';
import Navigation from "./Navigation";

function StamplistPage() {
  const [stamps, setStamps] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
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
    </div>
  );
}

export default StamplistPage;
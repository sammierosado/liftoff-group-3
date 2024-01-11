import React, { useState, useEffect } from 'react';
import "../css/imagePage.css"; // Import the CSS file

function ImagePage() {
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    // Retrieve the stored image URL from localStorage on component mount:
    const storedImageURL = localStorage.getItem("selectedImage");
    setSelectedImage(storedImageURL);
  }, []);

  const handleImageChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target.result);
        localStorage.setItem("selectedImage", e.target.result); // Store image URL
      };
      reader.readAsDataURL(file);
    } else {
      setSelectedImage(null);
    }
  };

  return (
    <div>
      <label htmlFor="image-input">Click this text to choose an Image</label>
      <input type="file" id="image-input" accept="image/*" onChange={handleImageChange} className="image-input" />
      <br />
      {selectedImage && <img src={selectedImage} alt="Selected" />}
    </div>
  );
}

export default ImagePage;
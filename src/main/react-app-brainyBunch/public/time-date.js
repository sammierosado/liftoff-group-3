function timeDateToggle() {
    const timeElement = document.getElementById("timeDisplay");
    const currentTime = new Date();
    const hours = currentTime.getHours();
    const minutes = currentTime.getMinutes();
    const seconds = currentTime.getSeconds();

    const date = currentTime.getDate(); // Day of the month (1-31)
    const month = currentTime.getMonth() + 1; // Month (0-11, adjust for display)
    const year = currentTime.getFullYear(); // Year
  
    // Format the time and date based on your desired format
    const formattedTime = `${hours}:${minutes}:${seconds} - ${date}/${month}/${year}`;
  
    timeElement.textContent = formattedTime;
  
    // Keep the time updated every second (optional)
    setInterval(() => {
      const currentTime = new Date();
      const formattedTime = `Real Time:${currentTime.getHours()}:${currentTime.getMinutes()}:${currentTime.getSeconds()}/ Today's Date:${currentTime.getMonth()}-${currentTime.getDate()}-${currentTime.getFullYear()}`;
      timeElement.textContent = formattedTime;
    }, 1000);
  
    if (timeElement.style.display === "none") {
      timeElement.style.display = "block";
    } else {
      timeElement.style.display = "none";
    }
  }
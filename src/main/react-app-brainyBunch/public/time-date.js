 function timeDateToggle() {
    const timeElement = document.getElementById("timeDisplay");
    const currentTime = new Date();
    const hours = currentTime.getHours();
    const minutes = currentTime.getMinutes();
    const seconds = currentTime.getSeconds();

    const month = currentTime.getMonth();// Month (0-11, adjust for display)
    const date = currentTime.getDate(); // Day of the month (1-31)
    const year = currentTime.getFullYear(); // Year

    // Format the time and date based on your desired format
    const formattedTime = `${hours}:${minutes}:${seconds} - ${date}/${month}/${year}`;
  
    timeElement.innerText = formattedTime;
    console.log(timeElement)
  
    // Keep the time updated every second (optional)
    setInterval(() => {
      const currentTime = new Date();
      let month = currentTime.getMonth() + 1; // Get the month with an offset of 1

      if (month === 13) { // Check if current month is December
        month = 1; // Set month to 1 to represent January
      }

      const formattedTime = `Real Time:${currentTime.getHours()}:${currentTime.getMinutes()}:${currentTime.getSeconds()}/ Today's Date:${month}-${currentTime.getDate()}-${currentTime.getFullYear()}`;
      timeElement.innerText = formattedTime;
    }, 1000);
  
    if (timeElement.style.display === "none") {
      timeElement.style.display = "block";
    } else {
      timeElement.style.display = "none";
    }
  }
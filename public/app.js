document.addEventListener('DOMContentLoaded', () => {
  const generateBtn = document.getElementById('generateBtn');
  const resultsContainer = document.getElementById('results');
  
  // Funny loading messages
  const loadingMessages = [
    "Crafting excuses...",
    "Consulting the rejection oracle...",
    "Brewing the perfect 'no'...",
    "Calculating optimal disappointment levels...",
    "Searching for the gentlest letdown...",
    "Polishing the art of saying no...",
    "Summoning the spirit of rejection...",
    "Preparing your social escape plan..."
  ];

  // Funny error messages for rate limiting
  const rateLimitErrors = [
    "WHOA THERE! The rejection machine is overheating!",
    "SLOW DOWN! Even rejection needs a coffee break!",
    "TOO MUCH REJECTION! Are you trying to break a record?",
    "REJECTION OVERLOAD! The machine is crying!",
    "EASY TIGER! Save some rejection for others!"
  ];

  generateBtn.addEventListener('click', async () => {
    try {
      // Show loading state with random funny message
      const randomLoadingMsg = loadingMessages[Math.floor(Math.random() * loadingMessages.length)];
      resultsContainer.innerHTML = `<div class="loading">${randomLoadingMsg}</div>`;
      
      // Add button press effect
      generateBtn.classList.add('pressed');
      setTimeout(() => {
        generateBtn.classList.remove('pressed');
      }, 300);
      
      // Make machine lights blink faster
      document.querySelectorAll('.light').forEach(light => {
        light.style.animation = 'blink 0.5s infinite alternate';
      });
      
      // Fetch responses from server
      const response = await fetch('/no');
      
      // Reset machine lights
      setTimeout(() => {
        document.querySelectorAll('.light').forEach(light => {
          light.style.animation = '';
          void light.offsetWidth; // Trigger reflow
          light.style.animation = 'blink 3s infinite alternate';
        });
      }, 2000);
      
      // Check if rate limited
      if (response.status === 429) {
        const errorData = await response.json();
        showRateLimitError(errorData.error);
        resultsContainer.innerHTML = '';
        return;
      }
      
      const data = await response.json();
      
      // Clear previous results
      resultsContainer.innerHTML = '';
      
      // Display each response with a slight delay
      data.reasons.forEach((reason, index) => {
        setTimeout(() => {
          const responseElement = document.createElement('div');
          responseElement.className = 'response-item';
          responseElement.textContent = reason;
          resultsContainer.appendChild(responseElement);
          
          // Add sound effect
          const audio = new Audio(`data:audio/mp3;base64,SUQzBAAAAAAAI1RTU0UAAAAPAAADTGF2ZjU4Ljc2LjEwMAAAAAAAAAAAAAAA/+M4wAAAAAAAAAAAAEluZm8AAAAPAAAAAwAAAbAAkJCQkJCQkJCQkJCQkJCQwMDAwMDAwMDAwMDAwMDA4ODg4ODg4ODg4ODg4ODg4P//////////////////////////AAAAAExhdmM1OC4xMwAAAAAAAAAAAAAAACQCkAAAAAAAAAGwxQgX8EAAAAAAAAAAAAAAAAAAAAAA`);
          audio.volume = 0.2;
          audio.play().catch(e => console.log("Audio play prevented:", e));
        }, index * 400);
      });
      
    } catch (error) {
      console.error('Error fetching responses:', error);
      resultsContainer.innerHTML = '<div class="error">Even my rejection machine got rejected. Please try again.</div>';
    }
  });
  
  // Function to show rate limit error in a funny way
  function showRateLimitError(message) {
    // Remove any existing error
    const existingError = document.querySelector('.error-container');
    if (existingError) {
      existingError.remove();
    }
    
    // Create error container
    const errorContainer = document.createElement('div');
    errorContainer.className = 'error-container';
    
    // Random funny error title
    const randomErrorTitle = rateLimitErrors[Math.floor(Math.random() * rateLimitErrors.length)];
    
    // Create error message
    errorContainer.innerHTML = `
      <div class="error-message">
        <button class="error-close">&times;</button>
        <div class="error-icon">⚠️</div>
        <h3>${randomErrorTitle}</h3>
        <p>${message}</p>
        <p style="margin-top: 10px; font-size: 0.8rem;">Try again in a minute when the machine cools down.</p>
      </div>
    `;
    
    // Add to body
    document.body.appendChild(errorContainer);
    
    // Add error sound
    const errorSound = new Audio(`data:audio/mp3;base64,SUQzBAAAAAAAI1RTU0UAAAAPAAADTGF2ZjU4Ljc2LjEwMAAAAAAAAAAAAAAA/+M4wAAAAAAAAAAAAEluZm8AAAAPAAAAAwAAAbAAkJCQkJCQkJCQkJCQkJCQwMDAwMDAwMDAwMDAwMDA4ODg4ODg4ODg4ODg4ODg4P//////////////////////////AAAAAExhdmM1OC4xMwAAAAAAAAAAAAAAACQCkAAAAAAAAAGwxQgX8EAAAAAAAAAAAAAAAAAAAAAA`);
    errorSound.volume = 0.3;
    errorSound.play().catch(e => console.log("Audio play prevented:", e));
    
    // Add close button functionality
    const closeBtn = errorContainer.querySelector('.error-close');
    closeBtn.addEventListener('click', () => {
      errorContainer.remove();
    });
    
    // Auto-remove after 6 seconds
    setTimeout(() => {
      if (document.body.contains(errorContainer)) {
        errorContainer.style.opacity = '0';
        errorContainer.style.transition = 'opacity 0.5s ease';
        setTimeout(() => {
          if (document.body.contains(errorContainer)) {
            errorContainer.remove();
          }
        }, 500);
      }
    }, 6000);
  }
  
  // Easter egg: Konami code gives special rejection
  let konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
  let konamiPosition = 0;
  
  document.addEventListener('keydown', (e) => {
    if (e.key === konamiCode[konamiPosition]) {
      konamiPosition++;
      if (konamiPosition === konamiCode.length) {
        resultsContainer.innerHTML = '<div class="response-item special">Nice try with the Konami code, but I still reject your request. That\'s dedication though!</div>';
        konamiPosition = 0;
      }
    } else {
      konamiPosition = 0;
    }
  });
});

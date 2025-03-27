
// Simulated pre-selected customer name (replace this with your actual field value)
const preSelectedCustomerName = "John "; // This would come from your customer field

// Get DOM elements
const video = document.getElementById('myVideo');
const nameOverlay = document.getElementById('nameOverlay');
const selectedNameDisplay = document.getElementById('selectedName');

// Set the pre-selected name in the overlay and display
function setCustomerName() {
    nameOverlay.textContent = preSelectedCustomerName;
    selectedNameDisplay.textContent = preSelectedCustomerName;
}

// Show the name when the video starts playing
video.addEventListener('play', () => {
    setCustomerName();
});

// Optional: Set the name immediately when the page loads (if video auto-plays)
window.addEventListener('load', () => {
    setCustomerName();
});
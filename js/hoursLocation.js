// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize map functionality
    initMapInteraction();
    
    // Mark past holiday events
    markPastHolidayEvents();
    
    // Update location status indicators
    updateLocationStatus();
    
    // Update global status indicator
    updateGlobalStatus();
    
    // Set interval to update status every minute
    setInterval(function() {
        updateLocationStatus();
        updateGlobalStatus();
    }, 60000);
    
    // Initialize unified tab switching
    initUnifiedTabSwitching();
    
    // Initialize hours tab switching
    initTabSwitching();
    
    // Add staggered animation to holiday cards
    animateHolidayCards();
    
    // Add animation to hours cards
    const hoursCards = document.querySelectorAll('.hours-card');
    
    // Create an intersection observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                // Stop observing after animation is triggered
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1 // Trigger when at least 10% of the element is visible
    });
    
    // Observe each card
    hoursCards.forEach(card => {
        // Add a class for the initial state
        card.classList.add('hours-card-hidden');
        // Start observing
        observer.observe(card);
    });
    
    // Add click event to contact buttons
    document.querySelectorAll('.contact-btn').forEach(button => {
        button.addEventListener('click', function() {
            const location = this.getAttribute('data-location');
            window.location.href = `contacts.html?location=${location}`;
        });
    });
});

/**
 * Initialize unified tab switching functionality
 * Handles switching between Hours and Locations tabs
 */
function initUnifiedTabSwitching() {
    const tabButtons = document.querySelectorAll('.unified-tab-button');
    const tabPanels = document.querySelectorAll('.tab-panel');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Get the tab to show
            const tabToShow = button.getAttribute('data-tab');
            
            // Remove active class from all buttons and panels
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabPanels.forEach(panel => panel.classList.remove('active'));
            
            // Add active class to clicked button and corresponding panel
            button.classList.add('active');
            
            if (tabToShow === 'hours') {
                document.getElementById('hours-panel').classList.add('active');
            } else if (tabToShow === 'locations') {
                document.getElementById('locations-panel').classList.add('active');
            }
        });
    });
}

/**
 * Initialize tab switching functionality
 * Handles switching between Operating Hours and Holiday Hours tabs
 */
function initTabSwitching() {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Get the tab to show
            const tabToShow = button.getAttribute('data-tab');
            
            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked button and corresponding content
            button.classList.add('active');
            document.getElementById(tabToShow).classList.add('active');
        });
    });
}

/**
 * Initialize map interaction
 */
function initMapInteraction() {
    const locationMarkers = document.querySelectorAll('.location-marker');
    const locationItems = document.querySelectorAll('.location-item');
    
    // Add hover effect for markers
    locationMarkers.forEach(marker => {
        const location = marker.getAttribute('data-location');
        
        marker.addEventListener('mouseenter', () => {
            highlightLocation(location);
        });
        
        marker.addEventListener('mouseleave', () => {
            resetLocationHighlights();
        });
        
        marker.addEventListener('click', () => {
            // Scroll to the corresponding location item
            const locationItem = document.querySelector(`.location-item[data-location="${location}"]`);
            if (locationItem) {
                locationItem.scrollIntoView({ behavior: 'smooth', block: 'center' });
                
                // Add a temporary highlight effect
                locationItem.classList.add('highlight-pulse');
                setTimeout(() => {
                    locationItem.classList.remove('highlight-pulse');
                }, 1500);
            }
        });
    });
    
    // Add hover effect for location items
    locationItems.forEach(item => {
        const location = item.getAttribute('data-location');
        
        item.addEventListener('mouseenter', () => {
            highlightLocation(location);
        });
        
        item.addEventListener('mouseleave', () => {
            resetLocationHighlights();
        });
    });
    
    // Add CSS for highlight pulse effect
    const style = document.createElement('style');
    style.textContent = `
        @keyframes highlight-pulse {
            0% { box-shadow: 0 0 0 0 rgba(224, 188, 107, 0.7); }
            70% { box-shadow: 0 0 0 10px rgba(224, 188, 107, 0); }
            100% { box-shadow: 0 0 0 0 rgba(224, 188, 107, 0); }
        }
        
        .highlight-pulse {
            animation: highlight-pulse 1.5s ease-out;
        }
    `;
    document.head.appendChild(style);
}

/**
 * Highlight a specific location on the map and in the list
 * @param {string} location - The location to highlight
 */
function highlightLocation(location) {
    // Highlight the marker
    const marker = document.querySelector(`.location-marker[data-location="${location}"]`);
    if (marker) {
        marker.style.transform = 'translate(-50%, -50%) scale(1.3)';
        marker.style.backgroundColor = '#F7EFC1';
        marker.style.boxShadow = '0 0 15px rgba(224, 188, 107, 0.7)';
    }
    
    // Highlight the location item
    const locationItem = document.querySelector(`.location-item[data-location="${location}"]`);
    if (locationItem) {
        locationItem.style.borderColor = '#E0BC6B';
        locationItem.style.backgroundColor = 'rgba(224, 188, 107, 0.1)';
    }
}

/**
 * Reset all location highlights
 */
function resetLocationHighlights() {
    // Reset all markers
    document.querySelectorAll('.location-marker').forEach(marker => {
        marker.style.transform = 'translate(-50%, -50%)';
        marker.style.backgroundColor = '#E0BC6B';
        marker.style.boxShadow = 'none';
    });
    
    // Reset all location items
    document.querySelectorAll('.location-item').forEach(item => {
        item.style.borderColor = 'rgba(224, 188, 107, 0.2)';
        item.style.backgroundColor = 'rgba(0, 0, 0, 0.2)';
    });
}

/**
 * Update the open/closed status for each location
 */
function updateLocationStatus() {
    const locationItems = document.querySelectorAll('.location-item');
    const currentTime = new Date();
    const currentHour = currentTime.getHours();
    const currentDay = currentTime.getDay(); // 0 = Sunday, 6 = Saturday
    
    locationItems.forEach(item => {
        const location = item.getAttribute('data-location');
        const statusElement = item.querySelector('.location-status');
        const statusText = statusElement.querySelector('.status-text');
        let isOpen = false;
        
        // Check if the location is open based on the current time and day
        if (location === 'Downtown') {
            // Downtown: 11:00 AM - 10:00 PM (11 - 22)
            isOpen = currentHour >= 11 && currentHour < 22;
        } else if (location === 'Westside') {
            // Westside: 11:00 AM - 11:00 PM (11 - 23)
            isOpen = currentHour >= 11 && currentHour < 23;
        } else if (location === 'Eastside') {
            // Eastside: 12:00 PM - 10:00 PM (12 - 22)
            isOpen = currentHour >= 12 && currentHour < 22;
        }
        
        // Update the status indicator
        if (isOpen) {
            statusElement.setAttribute('data-status', 'open');
            statusText.textContent = 'Open Now';
        } else {
            statusElement.setAttribute('data-status', 'closed');
            statusText.textContent = 'Closed Now';
        }
    });
}

/**
 * Update the global status indicator
 */
function updateGlobalStatus() {
    const statusBadge = document.getElementById('global-status-badge');
    const statusText = document.getElementById('global-status-text');
    const currentTimeDisplay = document.getElementById('current-time-display');
    const currentDayDisplay = document.getElementById('current-day-display');
    
    // Get current time
    const currentTime = new Date();
    const currentHour = currentTime.getHours();
    const currentMinute = currentTime.getMinutes();
    const currentDay = currentTime.getDay(); // 0 = Sunday, 6 = Saturday
    
    // Format the time
    const formattedHour = currentHour % 12 || 12; // Convert 24h to 12h format
    const amPm = currentHour >= 12 ? 'PM' : 'AM';
    const formattedTime = `${formattedHour}:${currentMinute.toString().padStart(2, '0')} ${amPm}`;
    
    // Get day name
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const dayName = days[currentDay];
    
    // Update the current time display
    currentTimeDisplay.textContent = formattedTime;
    currentDayDisplay.textContent = dayName;
    
    // Determine if the restaurant is open
    let isOpen = false;
    
    // Check if it's a weekend
    const isWeekend = currentDay === 0 || currentDay === 6;
    
    if (isWeekend) {
        // Weekend hours: 9:00 AM - 2:00 PM (brunch) and 5:00 PM - 11:00 PM (dinner)
        isOpen = (currentHour >= 9 && currentHour < 14) || (currentHour >= 17 && currentHour < 23);
    } else {
        // Weekday hours: 11:00 AM - 3:00 PM (lunch) and 5:00 PM - 10:00 PM (dinner)
        isOpen = (currentHour >= 11 && currentHour < 15) || (currentHour >= 17 && currentHour < 22);
    }
    
    // Update the status indicator
    if (isOpen) {
        statusBadge.setAttribute('data-status', 'open');
        statusText.textContent = 'Open Now';
    } else {
        statusBadge.setAttribute('data-status', 'closed');
        statusText.textContent = 'Closed Now';
    }
}

/**
 * Mark past holiday events
 * Adds a 'past-event' class to holiday cards that have already occurred
 */
function markPastHolidayEvents() {
    const today = new Date();
    const currentYear = today.getFullYear();
    
    // Get all holiday cards
    const holidayCards = document.querySelectorAll('.holiday-card');
    
    holidayCards.forEach(card => {
        const dateAttr = card.getAttribute('data-date');
        let holidayDate;
        
        // Handle special holiday dates
        if (dateAttr === 'easter') {
            holidayDate = getEasterDate(currentYear);
        } else if (dateAttr === 'memorial') {
            holidayDate = getMemorialDay(currentYear);
        } else if (dateAttr === 'labor') {
            holidayDate = getLaborDay(currentYear);
        } else if (dateAttr === 'thanksgiving') {
            holidayDate = getThanksgivingDay(currentYear);
        } else {
            // Handle regular MM-DD format
            const [month, day] = dateAttr.split('-').map(num => parseInt(num, 10));
            holidayDate = new Date(currentYear, month - 1, day);
            
            // If the holiday has already passed this year, check if it's within the last 30 days
            // If not, mark it as a past event
            if (holidayDate < today) {
                const daysSinceHoliday = Math.floor((today - holidayDate) / (1000 * 60 * 60 * 24));
                if (daysSinceHoliday > 30) {
                    card.classList.add('past-event');
                }
            }
        }
        
        // Mark as past event if the holiday date is before today
        if (holidayDate < today) {
            card.classList.add('past-event');
        }
    });
}

/**
 * Get Easter date for a given year
 * Uses Butcher's algorithm
 */
function getEasterDate(year) {
    const a = year % 19;
    const b = Math.floor(year / 100);
    const c = year % 100;
    const d = Math.floor(b / 4);
    const e = b % 4;
    const f = Math.floor((b + 8) / 25);
    const g = Math.floor((b - f + 1) / 3);
    const h = (19 * a + b - d - g + 15) % 30;
    const i = Math.floor(c / 4);
    const k = c % 4;
    const l = (32 + 2 * e + 2 * i - h - k) % 7;
    const m = Math.floor((a + 11 * h + 22 * l) / 451);
    const month = Math.floor((h + l - 7 * m + 114) / 31) - 1; // 0-indexed month
    const day = ((h + l - 7 * m + 114) % 31) + 1;
    
    return { month, day };
}

/**
 * Get Memorial Day (last Monday in May)
 */
function getMemorialDay(year) {
    // Start with May 31
    const date = new Date(year, 4, 31);
    
    // Find the last Monday
    const day = date.getDay(); // 0 = Sunday, 1 = Monday, etc.
    const daysToSubtract = (day === 0) ? 6 : (day - 1);
    date.setDate(date.getDate() - daysToSubtract);
    
    return { month: 4, day: date.getDate() }; // Month is 0-indexed
}

/**
 * Get Labor Day (first Monday in September)
 */
function getLaborDay(year) {
    // Start with September 1
    const date = new Date(year, 8, 1);
    
    // Find the first Monday
    const day = date.getDay(); // 0 = Sunday, 1 = Monday, etc.
    const daysToAdd = (day === 0) ? 1 : (day === 1) ? 0 : (8 - day);
    date.setDate(date.getDate() + daysToAdd);
    
    return { month: 8, day: date.getDate() }; // Month is 0-indexed
}

/**
 * Get Thanksgiving Day (fourth Thursday in November)
 */
function getThanksgivingDay(year) {
    // Start with November 1
    const date = new Date(year, 10, 1);
    
    // Find the first Thursday
    const day = date.getDay(); // 0 = Sunday, 1 = Monday, etc.
    const daysToAdd = (day <= 4) ? (4 - day) : (11 - day);
    date.setDate(date.getDate() + daysToAdd);
    
    // Add 3 weeks to get to the fourth Thursday
    date.setDate(date.getDate() + 21);
    
    return { month: 10, day: date.getDate() }; // Month is 0-indexed
}

/**
 * Add staggered animation to holiday cards
 */
function animateHolidayCards() {
    const holidayCards = document.querySelectorAll('.holiday-card');
    
    // Create an intersection observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Add staggered animation with delay based on index
                setTimeout(() => {
                    entry.target.classList.add('animate-in');
                }, index * 100); // 100ms delay between each card
                
                // Stop observing after animation is triggered
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1, // Trigger when at least 10% of the element is visible
        rootMargin: '0px 0px -50px 0px' // Trigger slightly before the element is in view
    });
    
    // Observe each card
    holidayCards.forEach(card => {
        // Add a class for the initial state
        card.classList.add('holiday-card-hidden');
        // Start observing
        observer.observe(card);
    });
}

// Add CSS animation class
document.head.insertAdjacentHTML('beforeend', `
<style>
    .hours-card-hidden {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.5s ease, transform 0.5s ease;
    }
    
    .animate {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
    
    .holiday-card-hidden {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }
    
    .animate-in {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
</style>
`); 
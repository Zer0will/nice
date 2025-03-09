/**
 * locations.js
 * JavaScript functionality for the multiple locations section
 * Controls interactive map markers and location info display
 */

document.addEventListener('DOMContentLoaded', function() {
    initLocationMarkers();
});

/**
 * Initialize location markers functionality
 * - Shows location info when markers are hovered/clicked
 * - Adds smooth transitions between different locations
 */
function initLocationMarkers() {
    const locationMarkers = document.querySelectorAll('.location-marker');
    const infoContainer = document.getElementById('location-info-container');
    const locationInfos = document.querySelectorAll('.location-info');
    let currentLocation = null;
    
    // Exit if elements don't exist
    if (!locationMarkers.length || !infoContainer) return;
    
    /**
     * Show location info with enhanced animations
     * @param {string} locationName - The name of the location to show
     */
    function showLocationInfo(locationName) {
        // If we're already showing this location, do nothing
        if (currentLocation === locationName) return;
        
        // If we're showing a different location, animate the transition
        if (currentLocation) {
            // First hide the current location info with a quick fade
            locationInfos.forEach(info => {
                if (info.getAttribute('data-location') === currentLocation) {
                    info.style.opacity = '0';
                    info.style.transform = 'translateX(10px)';
                    
                    // After a short delay, remove active class and show new location
                    setTimeout(() => {
                        info.classList.remove('active');
                        showNewLocation();
                    }, 150);
                }
            });
        } else {
            // If no location is currently shown, just show the new one
            infoContainer.classList.add('active');
            showNewLocation();
        }
        
        /**
         * Helper function to show the new location
         */
        function showNewLocation() {
            // Show the selected location info
            const selectedInfo = document.getElementById('info-' + locationName.toLowerCase());
            if (selectedInfo) {
                selectedInfo.classList.add('active');
                // Ensure the container is visible
                infoContainer.classList.add('active');
                // Highlight the active marker
                highlightMarker(locationName);
            }
            // Update current location
            currentLocation = locationName;
        }
    }
    
    /**
     * Highlight the active marker
     * @param {string} locationName - The name of the location to highlight
     */
    function highlightMarker(locationName) {
        // Reset all markers
        locationMarkers.forEach(marker => {
            marker.style.backgroundColor = 'var(--color-gold)';
            marker.style.transform = 'translate(-50%, -50%)';
            marker.style.boxShadow = 'none';
        });
        
        // Highlight the active marker
        locationMarkers.forEach(marker => {
            if (marker.getAttribute('data-location') === locationName) {
                marker.style.backgroundColor = 'var(--color-gold-light)';
                marker.style.transform = 'translate(-50%, -50%) scale(1.2)';
                marker.style.boxShadow = '0 0 15px var(--color-gold)';
            }
        });
    }
    
    /**
     * Hide location info
     */
    function hideLocationInfo() {
        infoContainer.classList.remove('active');
        setTimeout(() => {
            locationInfos.forEach(info => {
                info.classList.remove('active');
            });
            // Reset all markers
            locationMarkers.forEach(marker => {
                marker.style.backgroundColor = 'var(--color-gold)';
                marker.style.transform = 'translate(-50%, -50%)';
                marker.style.boxShadow = 'none';
            });
            currentLocation = null;
        }, 300);
    }
    
    // Add event listeners to markers
    locationMarkers.forEach(marker => {
        const location = marker.getAttribute('data-location');
        
        // Show on hover
        marker.addEventListener('mouseenter', () => {
            showLocationInfo(location);
        });
        
        // Hide when mouse leaves the map container (not just the marker)
        const mapContainer = document.querySelector('.map-container');
        if (mapContainer) {
            mapContainer.addEventListener('mouseleave', hideLocationInfo);
        }
        
        // For mobile: toggle on click
        marker.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent bubbling
            showLocationInfo(location);
        });
    });
    
    // Hide when clicking elsewhere on the document (for mobile)
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.location-marker') && !e.target.closest('.location-info-container')) {
            hideLocationInfo();
        }
    });
} 
// Preloader initialization - use both event types for maximum compatibility
document.addEventListener('DOMContentLoaded', initPreloader);
window.addEventListener('load', ensurePreloaderRuns);

let preloaderInitialized = false;
let animationsStarted = false;

// Function to reset preloader state (for testing)
// Can be called from browser console: resetPreloader()
function resetPreloader() {
    console.log("Resetting preloader state");
    sessionStorage.removeItem('hasVisitedBefore');
    alert("Preloader reset! Reload the page to see the preloader again.");
}

// Expose the reset function globally for testing
window.resetPreloader = resetPreloader;

function initPreloader() {
    if (preloaderInitialized) return;
    preloaderInitialized = true;
    
    // Check if this is the first visit in this session
    const hasVisitedBefore = sessionStorage.getItem('hasVisitedBefore');
    
    // Get preloader element
    const preloader = document.getElementById('preloader');
    
    // If user has visited before, skip preloader
    if (hasVisitedBefore) {
        console.log("User has visited before, skipping preloader");
        preloader.style.display = 'none';
        document.body.style.overflow = 'visible';
        return;
    }
    
    console.log("First visit detected, showing preloader");
    // Set flag for future visits
    sessionStorage.setItem('hasVisitedBefore', 'true');
    
    // Continue with preloader for first visit
    console.log("Preloader initialization started");
    
    // Get all elements
    const basePlate = document.getElementById('base-plate');
    const goldRing = document.getElementById('gold-ring');
    const textPlate = document.getElementById('text-plate');
    const textOf = document.getElementById('text-of');
    const textAfrica = document.getElementById('text-africa-word');
    const leavesLeft = document.getElementById('leaves-left');
    const leavesRight = document.getElementById('leaves-right');
    const leavesBottom = document.getElementById('leaves-bottom');
    const continentAfrica = document.getElementById('continent-africa');
    const flame = document.getElementById('flame');
    
    // Force preloader to be visible and prevent scroll
    preloader.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    
    // Only start animations if they haven't been started yet
    if (!animationsStarted) {
        startAnimations(preloader, basePlate, goldRing, textPlate, textOf, textAfrica, 
                       leavesLeft, leavesRight, leavesBottom, continentAfrica, flame);
    }
}

function ensurePreloaderRuns() {
    // This is a backup to make sure preloader runs even if DOMContentLoaded already fired
    if (!preloaderInitialized) {
        initPreloader();
    }
}

function startAnimations(preloader, basePlate, goldRing, textPlate, textOf, textAfrica, 
                        leavesLeft, leavesRight, leavesBottom, continentAfrica, flame) {
    
    animationsStarted = true;
    console.log("Starting preloader animations");
    
    // Animation sequence timing (in milliseconds)
    const timings = {
        basePlateIntro: 0,
        goldRingAppear: 1000,
        textPlateAppear: 1700,
        textOfAppear: 2050,
        textAfricaAppear: 2250,
        leavesAppear: 2400,
        continentAppear: 2800,
        flameIgnite: 3300,
        preloaderFade: 5000  // Increased to ensure all animations complete
    };
    
    // Animation sequence
    
    // Scene 1: Base Plate Introduction
    setTimeout(() => {
        basePlate.style.opacity = '1';
        basePlate.classList.add('base-plate-intro');
        console.log("Base plate animation started");
    }, timings.basePlateIntro);
    
    // Scene 2: Gold Ring Appearance
    setTimeout(() => {
        goldRing.style.opacity = '1';
        goldRing.classList.add('gold-ring-appear');
        console.log("Gold ring animation started");
        
        // Start the SVG animation after it appears
        // For <object> tags, we need to wait for the load event
        const triggerSVGAnimation = () => {
            try {
                const svgDoc = goldRing.contentDocument;
                if (svgDoc) {
                    const animation1 = svgDoc.getElementById('fillAnimation');
                    const animation2 = svgDoc.getElementById('fillAnimation2');
                    if (animation1) animation1.beginElement();
                    if (animation2) animation2.beginElement();
                    console.log("SVG animations triggered");
                } else {
                    console.log("SVG document not accessible");
                }
            } catch(e) {
                console.log("Error accessing SVG animation:", e);
            }
        };
        
        // If SVG is already loaded, trigger the animation
        if (goldRing.contentDocument && goldRing.contentDocument.readyState === 'complete') {
            triggerSVGAnimation();
        } else {
            // Otherwise wait for it to load
            goldRing.addEventListener('load', triggerSVGAnimation);
        }
    }, timings.goldRingAppear);
    
    // Scene 3: Text "PLATE" and Top Leaves
    setTimeout(() => {
        textPlate.style.opacity = '1'; // Ensure element is visible first
        textPlate.classList.add('text-appear');
        console.log("Text PLATE animation started");
    }, timings.textPlateAppear);
    
    // Then the OF text appears
    setTimeout(() => {
        textOf.style.opacity = '1'; // Ensure element is visible first
        textOf.classList.add('text-appear');
        console.log("Text OF animation started");
    }, timings.textOfAppear);
    
    // Scene 5: Text "AFRICA" appears
    setTimeout(() => {
        textAfrica.style.opacity = '1'; // Ensure element is visible first
        textAfrica.classList.add('text-appear');
        console.log("Text AFRICA animation started");
    }, timings.textAfricaAppear);
    
    // Scene 6: Left Leaf appears
    setTimeout(() => {
        leavesLeft.style.opacity = '1'; // Ensure element is visible first
        leavesLeft.classList.add('leaves-grow');
        console.log("Left leaves animation started");
    }, timings.leavesAppear);
    
    setTimeout(() => {
        leavesRight.style.opacity = '1'; // Ensure element is visible first
        leavesRight.classList.add('leaves-grow');
        console.log("Right leaves animation started");
    }, timings.leavesAppear); 
    
    setTimeout(() => {
        leavesBottom.style.opacity = '1'; // Ensure element is visible first
        leavesBottom.classList.add('leaves-grow');
        console.log("Bottom leaves animation started");
    }, timings.leavesAppear);
    
    // Scene 7: Africa Continent Silhouette
    setTimeout(() => {
        continentAfrica.style.opacity = '1'; // Ensure element is visible first
        continentAfrica.classList.add('continent-appear');
        console.log("Continent animation started");
    }, timings.continentAppear);
    
    // Scene 8: Flame Ignition
    setTimeout(() => {
        flame.style.opacity = '1'; // Ensure element is visible first
        flame.classList.add('flame-ignite');
        console.log("Flame animation started");
    }, timings.flameIgnite);
    
    // Scene 8: Preloader Completion & Fade Out
    setTimeout(() => {
        preloader.classList.add('preloader-fade');
        console.log("Preloader fade started");
        
        // After fade out, hide preloader completely
        setTimeout(() => {
            preloader.style.display = 'none';
            document.body.style.overflow = 'visible'; // Enable scrolling
            console.log("Preloader complete, scrolling enabled");
        }, 800); // Increased to ensure the fade completes
    }, timings.preloaderFade);
}
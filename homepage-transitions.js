/** 
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        console.log(entry)
        if(entry.isIntersecting) {
            entry.target.classList.add("show");
        }
        else{
            entry.target.classList.remove("show");
        }
    });
}, { rootMargin: "0px 0px -20% 0px" }); 

const hiddenElements = document.querySelectorAll("#aboutUs-textContainer");
hiddenElements.forEach((el) => observer.observe(el));
**/

let hiddenElements = document.querySelectorAll("#aboutUs-textContainer");

window.onscroll = () => {
    hiddenElements.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;

        if(top >= offset && top < offset + height){
            sec.classList.add("#show-animate");
        }
        /*
        else{
            sec.classList.remove("show-animate");
        }
            */
    })
}

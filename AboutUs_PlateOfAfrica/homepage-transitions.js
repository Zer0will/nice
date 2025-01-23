
let hiddenElements = document.querySelectorAll("#aboutUs-textContainer");

window.onscroll = () => {
    hiddenElements.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;

        if(top >= offset && top < offset + height){
            sec.classList.add("#show-animate");
        }
       
    })
}

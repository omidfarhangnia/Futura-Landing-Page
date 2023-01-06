// 
// adding plugin to page
//

gsap.registerPlugin(ScrollTrigger);

//
// animation for page 
//

let sections = gsap.utils.toArray(".section"), 
scrollHandles = gsap.utils.toArray(".scroll__handles"),
currentSection = 1,
sectionAnimation,
timeOut = null, 
touchStartPosition = null,
touchEndPosition = null;

// 
// page load animation
// 

window.addEventListener("load", () => {
    setTimeout(() => {
        let tl = gsap.timeline();
        tl
        .fromTo(".page__loader", {
            background: "radial-gradient(#00144f 100%, transparent)",
        },
        {
          background: "radial-gradient(#00144f 0%, transparent)",
          duration: 1,
          delay: 1
        })
        .to(".page__loader", {
          opacity: 0,
          duration: 1,
          ease: "power4.out"
        })
        .set(".page__loader", {
            zIndex: 0
        })
    }, 500);
})

// 
// page scrolling
// 

const GO__DOWN = document.querySelector(".go__down"),
      GO__UP = document.querySelector(".go__up");

    gsap.set(GO__UP, {
        opacity: 0
    })
      
    gsap.set(".container", {
      position: "fixed",
      top: 0,
      left: 0,
    })

    function goNextSection() {
        sectionAnimation = gsap.to(".container", {
            left: "-=100vw",
            duration: 1.5,
            delay: 1,
            ease: "power3.in",
        })
        textAnime();
        activeLink();
    }
    
    function goPrevSection() {
        sectionAnimation = gsap.to(".container", {
            left: "+=100vw",
            duration: 1.5,
            delay: 1,
            ease: "power3.in",
        })
        textAnime();
        activeLink();
    }

    function goingNext() {
        if(currentSection === 3) return;
        if(sectionAnimation && sectionAnimation.isActive()) return;
        console.log("is playing")
        currentSection++;
        goNextSection();
        activeLink();
        if(currentSection === 3){
            showHelps("up")
        }else{
            showHelps()
        }
    }
    
    function goingPrev() {
        if(currentSection === 1) return;
        if(sectionAnimation && sectionAnimation.isActive()) return;
        console.log("is playing")
        currentSection--;
        goPrevSection();
        activeLink();
        if(currentSection === 1){
            showHelps("down")
        }else{
            showHelps()
        }
    }

    function textAnime() {
            let sectionsH4 = gsap.utils.toArray(".section--h4");
            let sectionsH1 = gsap.utils.toArray(".section--h1");
            let sectionsP = gsap.utils.toArray(".section--p");
            let sectionsTakeALook = gsap.utils.toArray(".section--takeALook");
        
            let textAnimation = gsap.timeline()
            
            textAnimation
            .to([sectionsH4, sectionsH1, sectionsP, sectionsTakeALook],{
                    opacity: 0,
                    y: 20,
                    stagger: .1,
                    duration: .3,
            })
            .to([sectionsH4, sectionsH1, sectionsP, sectionsTakeALook],{
                    opacity: 1,
                    y: 0,
                    stagger: .1,
                    duration: .3,
            }, "+=1")
    };
    
    function activeLink() {
        gsap.to(scrollHandles, {
            background: "#19034B",
            scaleY: 1,
            duration: 1,
        })

        gsap.to(scrollHandles[currentSection - 1], {
            background: "#007cda",
            scaleY: 1.2,
            duration: 1,
            delay: 1
        })
    };
    activeLink();

    function showHelps(dir) {
            if(dir === "up"){
                gsap.to(GO__UP, {opacity: 1, duration: .5, delay: 3})
            }else if(dir == "down"){
                gsap.to(GO__DOWN, {opacity: 1, duration: .5, delay: 3})
            }else{
                gsap.to(GO__UP, {opacity: 0, duration: .5, delay: .5})
                gsap.to(GO__DOWN, {opacity: 0, duration: .5, delay: .5})
            }
    }

    function findMouseDir(event) {
        clearTimeout(timeOut)
        timeOut = setTimeout(() => {
            if(event.deltaY > 0){
                goingNext();
            }else{
                goingPrev();
            }
        }, 50);
    }

    window.addEventListener("wheel", findMouseDir);
    
    window.addEventListener("touchstart", (event) => {
        clearTimeout(timeOut);
        touchStartPosition = event.touches[0].clientY;
    });
    window.addEventListener("touchend", (event) => {
        touchEndPosition = event.changedTouches[0].clientY;
    
        if(touchEndPosition < 110) return;
        // we need this for the time that use press berger menu

        timeOut = setTimeout(() => {
            if(touchStartPosition > touchEndPosition){
                goingNext();
            }else{
                goingPrev();
            }
        }, 50);
    });

//
// burger menu events animation
//

const BURGER__MENU = document.querySelector('.burger__menu');
const EXIT__BTN = document.querySelector('.exit__btn');

let offcanvasRise = gsap.to(".divide__container", {
    top: 0,
    duration: 2,
    ease: "power4.out",
}).pause();

var offcanvasAnime = gsap.to(".custom-shape-divider-bottom", {
    keyframes: {
        left: [0 , "-50%", "-30%", "-60%", "-100%","-80%", "-30%", "-50%", 0],
    },
    duration: 40,
    repeat: -1,
}).pause();

BURGER__MENU.addEventListener('click', () => {
    if(offcanvasRise.paused() || offcanvasRise.reversed()){
        offcanvasRise.restart();
        offcanvasAnime.restart();
    }
});

EXIT__BTN.addEventListener('click', () => {
    offcanvasAnime.pause();
    offcanvasRise.reverse();
});

// 
// links hover animation 
// 

let links = document.querySelectorAll(".header .links"), hoverAnime;

links.forEach((element) => {
    element.addEventListener("mousemove", () => {
        if(hoverAnime && hoverAnime.isActive()) return;
        let children = element.querySelectorAll("span");
        hoverAnime = gsap.to(children, {
            keyframes: {
                y: [0, -9, 0]
            },
            stagger: .1,
            // duration: 1,
            ease: "power4.out"
        })
    })
})

// 
// user help animation
// 

gsap.set([".go__down svg", ".go__up svg"], {y: 0})
let goDownAnime = gsap.to(".go__down svg", {
    keyframes: {
        y: [0, 10, 0]
    },
    stagger: .3,
    duration: 1,
    ease: "power4.out",
    repeat: -1,
})
let goUpAnime = gsap.to(".go__up svg", {
    keyframes: {
        y: [0, -10, 0]
    },
    stagger: .3,
    duration: 1,
    ease: "power4.out",
    repeat: -1,
})
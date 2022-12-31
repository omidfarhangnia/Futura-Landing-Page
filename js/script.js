// 
// adding plugin to page
//

gsap.registerPlugin(ScrollTrigger);

//
// animation for page 
//

let sections = gsap.utils.toArray(".section"), currentPercentProgress = 0, 
lastScrollTop = 0, 
tl,
currentSection = 1,
jumpUp = "+=100",
jumpDown = "-=100";

const GO__DOWN = document.querySelector(".go__down"),
      GO__UP = document.querySelector(".go__up");

    gsap.set(".container__parent", {
      height: "300vh"
    })

    gsap.set(".container", {
      position: "fixed",
      top: 0,
      left: 0,
    })

    const sectionAnimation = {
        next: () => {
            if(currentSection == 3) return;

            sectionAnimation.textAnime()

            tl = gsap.to(sections, {
                xPercent: jumpDown,
                ease: "power3.in", 
                duration: 1.5,
                delay: 1,
                onComplete: () => {
                    currentSection++;
                    console.log(currentSection);
                }
            });
            // if(currentSection == 3){
            //     GO__UP.classList.add("user__help--active");
            // }else if(currentSection == 2){
            //     GO__UP.classList.remove("user__help--active");
            //     GO__DOWN.classList.remove("user__help--active");
            // }
        },
        prevues: () => {
            if(currentSection == 1) return;

            sectionAnimation.textAnime()

            tl = gsap.to(sections, {
                xPercent: jumpUp,
                ease: "power3.in", 
                duration: 1.5,
                delay: 1,
                onComplete: () => {
                    currentSection--;
                    console.log(currentSection);
                }
            })

            currentSection--;

            // if(currentSection == 1){
            //     GO__DOWN.classList.add("user__help--active");
            // }else if(currentSection == 2){
            //     GO__UP.classList.remove("user__help--active");
            //     GO__DOWN.classList.remove("user__help--active");
            // }
        },
        checkPos: () => {
            let currentScrollPos = document.documentElement.scrollTop;
            if(currentScrollPos > lastScrollTop){
                if(tl !== undefined){
                    if(!tl.isActive()){
                        console.log("go next")
                        sectionAnimation.next()
                    }
                }else{
                    sectionAnimation.next()
                }
            }else if(currentScrollPos < lastScrollTop){
                if(tl !== undefined){
                    if(!tl.isActive()){
                        console.log("go prev");
                        sectionAnimation.prevues();
                    }
                }else{
                    sectionAnimation.prevues();
                }
            }
            lastScrollTop = currentScrollPos;
        },
        textAnime: () => {
            let sectionsH4 = gsap.utils.toArray(".section--h4");
            let sectionsH1 = gsap.utils.toArray(".section--h1");
            let sectionsP = gsap.utils.toArray(".section--p");
            let sectionsTakeALook = gsap.utils.toArray(".section--takeALook");
      
            let textAnimation = gsap.timeline()
            
            textAnimation
            .to([sectionsH4, sectionsH1, sectionsP, sectionsTakeALook],
                {
                    opacity: 0,
                    y: 20,
                    stagger: .1,
                    duration: .3,
                })
            .to([sectionsH4, sectionsH1, sectionsP, sectionsTakeALook],
                {
                    opacity: 1,
                    y: 0,
                    stagger: .1,
                    duration: .3,
                }, "+=2")
        }
    }

    window.addEventListener('scroll', () => {
        sectionAnimation.checkPos()
    })

//             onUpdate: (self) => {
//                 currentPercentProgress = self.progress.toFixed(2) * 100
                
//                 if(currentPercentProgress < 15){
//                     GO__DOWN.classList.add("user__help--active");
//                     GO__UP.classList.remove("user__help--active");
//                 }else if(currentPercentProgress > 85){
//                     GO__UP.classList.add("user__help--active");
//                     GO__DOWN.classList.remove("user__help--active");
//                 }else{
//                     GO__UP.classList.remove("user__help--active");
//                     GO__DOWN.classList.remove("user__help--active");
    
//                 }
                
//             },




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
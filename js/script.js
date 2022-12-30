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
      GO__UP = document.querySelector(".go__up")
      mm = gsap.matchMedia();

mm.add("(max-width: 900px)", () => {
    window.addEventListener('scroll', () => sectionAnimation.checkPos())
    gsap.set(".container__parent", {
        height: "300vh"
    })
    gsap.set(".container", {
        position: "fixed",
        top: 0,
        left: 0
    })
    const sectionAnimation = {
        next: () => {
            if(tl && tl.isActive()) return;

            tl = gsap.to(sections, {
                xPercent: jumpDown,
                ease: "linear", 
                duration: .5,
                onComplete: () => {
                    currentSection++;
                    if(currentSection == 4){
                        currentSection = 3
                    }
                    if(currentSection == 3){
                        jumpDown = "-=0";
                    }else{
                        jumpDown = "-=100";
                    }
                }
            }).pause();

            tl.restart();
        },
        prevues: () => {
            if(tl && tl.isActive()) return;

            tl = gsap.to(sections, {
                xPercent: jumpUp,
                ease: "linear", 
                duration: .5,
                onComplete: () => {
                    currentSection--;
                    if(currentSection == 0){
                        currentSection = 1;
                    }
                    if(currentSection == 1){
                        jumpUp = "+=0";
                    }else{
                        jumpUp = "+=100";
                    }
                }
            }).pause();

            tl.restart();
        },
        checkPos: () => {
            let currentScrollPos = document.documentElement.scrollTop;
            if(currentScrollPos > lastScrollTop){
                sectionAnimation.next()
            }else{
                sectionAnimation.prevues()
            }
            lastScrollTop = currentScrollPos;
        },
    }
})

mm.add("(min-width: 900px)", () => {
    gsap.to(sections, {
        xPercent: -100 * (sections.length - 1),
        ease: "none", 
        scrollTrigger: {
            trigger: ".container",
            pin: true,
            scrub: 2,
            snap: 1 / (sections.length - 1),
            end: "+=3500",
            onUpdate: (self) => {
                currentPercentProgress = self.progress.toFixed(2) * 100
                
                if(currentPercentProgress < 15){
                    GO__DOWN.classList.add("user__help--active");
                    GO__UP.classList.remove("user__help--active");
                }else if(currentPercentProgress > 85){
                    GO__UP.classList.add("user__help--active");
                    GO__DOWN.classList.remove("user__help--active");
                }else{
                    GO__UP.classList.remove("user__help--active");
                    GO__DOWN.classList.remove("user__help--active");
    
                }
                
            },
        }
    });
})

//
// burger menu events animation
//

const BURGER__MENU = document.querySelector('.burger__menu');
const EXIT__BTN = document.querySelector('.exit__btn');

let offcanvasRise = gsap.to(".divide__container", {
    top: 0,
    duration: 3,
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
        offcanvasRise.restart().delay(1);
        offcanvasAnime.restart().delay(2);
    }
});

EXIT__BTN.addEventListener('click', () => {
    offcanvasAnime.pause();
    offcanvasRise.reverse().delay(1);
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
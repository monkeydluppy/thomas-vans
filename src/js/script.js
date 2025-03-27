
import Lenis from "lenis";

let lenis = new Lenis({
    // infinite: true,
    orientation: "both", //default
    gestureOrientation: "both",
    syncTouch: true,

})




function raf(time) {
    lenis.raf(time)
    requestAnimationFrame(raf)
}


lenis.scrollTo(0, 0, 0);


window.addEventListener('load', () => {
    requestAnimationFrame(raf)
});



gsap.registerPlugin(ScrollTrigger)


gsap.registerPlugin(CSSPlugin);

let currentScroll = 0;


lenis.on('scroll', ({ scroll }) => {
    currentScroll = scroll;
})


let scrolledAmountOnClick;

// gsap animation
document.querySelectorAll(".section-1 .image-box").forEach((element) => {
    let image = element.querySelector("img")


    let tl = gsap.timeline();

    let xTransform = gsap.utils.random(-100, 100);

    tl.set(image, {
        transformOrigin: `${xTransform < 0 ? 0 : "100%"}`
    }, "start").to(image, {
        scale: 0,
        borderRadius: 0,
        ease: "none",
        scrollTrigger: {
            trigger: image,
            start: "top top",
            end: "bottom top",
            scrub: true
        }
    }, "start").to(image, {
        xPercent: xTransform,
        borderRadius: "20px",
        ease: "Power4.easeInOut",
        scrollTrigger: {
            trigger: image,
            start: "top bottom",
            end: "bottom top",
            scrub: true
        }
    }, "start")


    image.addEventListener("click", function () {
        lenis.stop()
        setTimeout(() => {
            lenis.start()
        }, 1000);

        const imagePosition = image.getBoundingClientRect()
        console.log(imagePosition.x, imagePosition.y)
        scrolledAmountOnClick = currentScroll;


        if (document.querySelector("img.opened")) {

            const currentOpen = document.querySelector("img.opened")


            if (currentOpen !== image) {
                gsap.fromTo(currentOpen, {
                    height: "50rem",
                    width: "50rem",
                    position: "fixed",
                    zIndex: "11111",
                    top: "50%",
                    scale: 1,
                    left: "50%",
                    xPercent: -50,
                    yPercent: -50,

                }, {
                    height: "20rem",
                    width: "20rem",
                    position: "static",
                    top: `0`,
                    left: `0`,
                    zIndex: "1",
                    scale: 1,
                    xPercent: xTransform,
                    yPercent: 0,
                    duration: 1,
                })
                currentOpen.classList.remove("opened")
            }
        }



        image.classList.toggle("opened");



        if (image.classList.contains("opened")) {
            console.log("opening image")
            gsap.fromTo(image, {
                height: "20rem",
                width: "20rem",
                position: "fixed",
                top: `${imagePosition.y}px`,
                left: `${imagePosition.x}px`,
                zIndex: "1",
                scale: 1,
                xPercent: xTransform,
                yPercent: 0,
            }, {
                height: "50rem",
                width: "50rem",
                position: "fixed",
                zIndex: "11111",
                top: "50%",
                scale: 1,
                left: "50%",
                xPercent: -50,
                yPercent: -50,
                duration: 1,
            })
        }

        else {
            // image.classList.remove("opened");
            console.log("closing image that is clicked again")


            gsap.fromTo(image, {
                height: "50rem",
                width: "50rem",
                position: "fixed",
                zIndex: "11111",
                top: "50%",
                scale: 1,
                left: "50%",
                xPercent: -50,
                yPercent: -50,

            }, {
                height: "20rem",
                width: "20rem",
                position: "static",
                top: `0`,
                left: `0`,
                zIndex: "1",
                scale: 1,
                xPercent: xTransform,
                yPercent: 0,
                duration: 1,
            })

        }
    })



})




lenis.on("scroll", function ({ scroll, limit, progress }) {
    return

})



document.querySelector("body").addEventListener("wheel", function (event) {
    if (document.querySelector("img.opened")) {
        const openedImage = document.querySelector("img.opened")

        if (openedImage.classList.contains("opened")) {
            console.log("closing after checking")
            openedImage.classList.remove("opened");
            let xTransform = gsap.utils.random(-100, 100);
            gsap.fromTo(openedImage, {
                height: "50rem",
                width: "50rem",
                position: "fixed",
                zIndex: "11111",
                top: "50%",
                scale: 1,
                left: "50%",
                xPercent: -50,
                yPercent: -50,

            }, {
                height: "20rem",
                width: "20rem",
                position: "static",
                top: `0`,
                left: `0`,
                zIndex: "1",
                scale: 1,
                xPercent: xTransform,
                yPercent: 0,
                duration: 1,
            })
        }
    }

})
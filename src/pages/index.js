// React imports
import React, { useState, useEffect, useRef } from "react"

// Styled-components imports
import styled, { keyframes } from "styled-components"
import tw from "twin.macro"

// Font Awesome imports
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBars } from "@fortawesome/free-solid-svg-icons"

// Image imports
import mainImageOne from "../assets/lucas-gouvea-aoEwuEH7YAs-unsplash.jpg"
import mainImageTwo from "../assets/serge_profile.png"
import arrow from "../assets/arrow_down.png"

import imageOne from "../assets/nico-marks-25gAg2MOXxQ-unsplash.jpg"
import imageTwo from "../assets/mahesh-krishnamurthy-fB5u5dfvNt8-unsplash.jpg"
import imageThree from "../assets/kreated-media-0fN7Fxv1eWA-unsplash.jpg"
import imageFour from "../assets/oladimeji-odunsi-aU_eOcelLhQ-unsplash (1).jpg"

export default function Home() {
  // State variables for controlling menu visibility and lightbox image
  const [showMenu, setMenu] = useState(false)
  const [showLightBox, setLightBox] = useState("")

  // Use useRef hook to create a reference to the lightbox element
  const lightBoxRef = useRef(null)
  const galleryImagesRef = useRef([])

  useEffect(() => {
    //Ref copies
    const galleryImagesRefCopy = galleryImagesRef
    const lightBoxRefCopy = lightBoxRef

    // Function for handling image visibility on scroll
    const handleImageVisibility = () => {
      const pageTop = window.scrollY
      const pageBottom = pageTop + window.innerHeight

      const images = document.querySelectorAll(".img")

      images.forEach(img => {
        if (img.offsetTop < pageBottom) {
          img.classList.add("visible")
        }
      })
    }

    const heroSection = document.querySelector(".hero-section")
    const heroChild = document.querySelector(".four-row-layout")
    const heroImage = document.querySelector(".hero-image")

    //Adjust hero section heigfht based on child elements
    function setHeroSectionHeight() {
      heroSection.style.height = heroChild.offsetHeight + "px"
      heroImage.style.height = heroChild.offsetHeight + "px"
    }

    window.addEventListener("resize", setHeroSectionHeight)
    setHeroSectionHeight()

    // Add event listener for window scroll to handle image visibility
    window.addEventListener("scroll", handleImageVisibility)

    // Add event listener for orientation change to hide menu
    window.addEventListener("orientationchange", () => {
      setMenu(false)
    })

    // Add click event listeners for gallery images to toggle lightbox
    galleryImagesRef.current.forEach(img => {
      img.addEventListener("click", () => {
        toggleLightBox(img.src)
      })
    })

    // Add click event listener for lightbox to hide it on click
    lightBoxRef.current.addEventListener("click", hideLightBox)

    // Clean up event listeners on unmount
    return () => {
      window.removeEventListener("scroll", handleImageVisibility)
      galleryImagesRefCopy.current.forEach(img => {
        img.removeEventListener("click", toggleLightBox)
      })
      lightBoxRefCopy.current.removeEventListener("click", hideLightBox)
    }
  }, [])

  // Function for toggling lightbox visibility and setting the image source
  const toggleLightBox = imageSrc => {
    lightBoxRef.current.style.display = "block"
    document.documentElement.style.overflowY = "hidden"
    setLightBox(imageSrc)
  }

  // Function for hiding lightbox and enabling scroll
  const hideLightBox = () => {
    lightBoxRef.current.style.display = "none"
    document.documentElement.style.overflowY = "scroll"
  }

  // Function for toggling menu visibility
  const toggleMenu = () => {
    setMenu(!showMenu)
  }

  // Function for scrolling to a specified element
  const scrollToDiv = elementID => {
    const element = document.getElementById(elementID)
    element.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest",
    })
    if (showMenu) {
      setMenu(false)
    }
  }

  return (
    <PageWrapper id="main-wrapper">
      {/* Navigation Bar Section */}
      <NavBar presentMenu={showMenu}>
        <section className="flex flex-row h-16 w-full items-center justify-between">
          <section className="space-y-1">
            <NavItem onClick={() => scrollToDiv("main-wrapper")}>
              <h1>SERGE.</h1>
              <RedSpacer />
            </NavItem>
          </section>
          <MenuButton onClick={() => toggleMenu()} presentMenu={showMenu}>
            <FontAwesomeIcon
              icon={faBars}
              color={showMenu ? "white" : "white"}
              size="lg"
            />
          </MenuButton>
        </section>

        {/* Navigation Items */}
        <NavItemsWrapper presentMenu={showMenu}>
          <NavItem presentMenu={showMenu} onClick={() => scrollToDiv("about")}>
            ABOUT
          </NavItem>
          <NavItem
            presentMenu={showMenu}
            onClick={() => scrollToDiv("gallery")}
          >
            MY WORK
          </NavItem>
          <NavLink
            presentMenu={showMenu}
            href="mailto:digitalxcollective@gmail.com"
            target="_blank"
          >
            CONTACT
          </NavLink>
        </NavItemsWrapper>
      </NavBar>

      {/* About section */}
      <HeroSection className="hero-section" id="about">
        <div
          className=" flex min-h-screen h-full w-full bg-cover bg-center lg:hidden hero-image "
          style={{ backgroundImage: `url(${mainImageOne})` }}
        ></div>

        <FourRowLayout className="four-row-layout">
          <AboutWrapper className="space-y-8">
            <section>
              <Title>I'M SERGEY</Title>
              <Subtitle>PHOTOGRAPHER</Subtitle>
            </section>
            <Spacer />
            <Paragraph>
              Welcome to my photography portfolio! I specialize in portrait
              photography that showcases the natural beauty of each subject.
              With a focus on minimalist design and a candid approach, I create
              timeless and authentic images that tell your unique story. Whether
              you're looking to capture a special moment with your loved ones or
              to create a stunning professional headshot, I'm here to help you
              bring your vision to life. Let's create something magical
              together!{" "}
            </Paragraph>
          </AboutWrapper>

          {/* Arrow Button */}
          <ArrowButton>
            <img
              className="w-4 "
              src={arrow}
              alt="arrow_back"
              onClick={() => scrollToDiv("gallery")}
            />
          </ArrowButton>
        </FourRowLayout>

        {/* Full Image */}
        <FullImageWrapper>
          <FullImage src={mainImageTwo} alt="profile_img" />
        </FullImageWrapper>
      </HeroSection>

      {/* Gallery Section */}
      <Gallery id="gallery">
        <div className="space-y-4">
          <img
            ref={el => (galleryImagesRef.current[0] = el)}
            className="img one"
            src={imageOne}
            alt="image_1"
          />
          <img
            ref={el => (galleryImagesRef.current[1] = el)}
            className="img two"
            src={
              "https://images.unsplash.com/photo-1517166985222-323a01efa25f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"
            }
            alt="image_2"
          />

          <img
            ref={el => (galleryImagesRef.current[2] = el)}
            className="img three"
            src={
              "https://images.unsplash.com/photo-1566005119730-72fb74903765?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80"
            }
            alt="image_3"
          ></img>
          <img
            ref={el => (galleryImagesRef.current[3] = el)}
            className="img four"
            src={
              "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&auto=format&fit=crop&w=562&q=80"
            }
            alt="image_4"
          ></img>
        </div>
        <div className="space-y-4">
          <img
            ref={el => (galleryImagesRef.current[4] = el)}
            className="img five"
            src={imageTwo}
            alt="image_5"
          ></img>
          <img
            ref={el => (galleryImagesRef.current[5] = el)}
            className="img six"
            src={imageFour}
            alt="image_6"
          ></img>
          <img
            ref={el => (galleryImagesRef.current[6] = el)}
            className="img seven"
            src={
              "https://images.unsplash.com/photo-1590210309267-388c9bf9805c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=675&q=80"
            }
            alt="image_7"
          ></img>
          <img
            ref={el => (galleryImagesRef.current[7] = el)}
            className="img eight"
            src={imageThree}
            alt="image_8"
          ></img>
        </div>
      </Gallery>

      {/* Footer Section */}
      <Footer>
        <section className="space-x-8 md:space-x-16 lg:space-x-24">
          <FooterLink href="https://instagram.com">INSTAGRAM</FooterLink>
          <FooterLink href="https://facebook.com">FACEBOOK</FooterLink>
          <FooterLink href="https://pinterest.com">PINTEREST</FooterLink>
        </section>
        <CopyRightInfo>
          <label className="text-left flex flex-row gap-2">
            &copy;
            <a
              className="hover:text-opacity-25 company-name"
              href="https://instagram.com/digitalxcollective?igshid=YmMyMTA2M2Y="
            >
              DIGITALXCOLLECTIVE
            </a>
          </label>
        </CopyRightInfo>
      </Footer>

      {/* Lightbox Section */}
      {/* Use the useRef hook to attach the lightboxRef to the lightbox element */}
      <LightBox ref={lightBoxRef} id="lightBox" showLightBox={showLightBox}>
        <img src={showLightBox} href="img" alt="lightBoxImage" />
      </LightBox>
    </PageWrapper>
  )
}

/* === Define styled components === */
const PageWrapper = styled.div`
  background-color: #050505;
  ${tw`h-screen flex flex-col items-center`}
`

/* === Animation === */
const fadeInOut = keyframes`
  from {
    opacity: 0; 
  }

  to {
    opacity: 1;
  }
`

const translateIn = keyframes`
  from {
    opacity: 0; 
    transform: translate(0, 10vh);
  }

  to{
    opacity: 1;
    transform: translate(0, 0);
  }
`
/* === Navigation Bar Section === */
const NavBar = styled.header.attrs(props => ({
  className: `flex flex-row  z-10  fixed w-screen ${
    props.presentMenu
      ? "transition-all duration-200 h-full justify-center bg-opacity-0"
      : "transition-all duration-300 h-20 sm:h-20 md:h-24  lg:h-24 space-x-16 xl:space-x-32"
  } lg:items-center pr-8 pl-8 md:pl-16 md:pr-16 pt-4 lg:pt-0 lg:pl-24 lg:pr-24 xxl:pl-56 xl:pr-56 w-screen`,
}))`
  background-color: #050505;

  /* Navigation bar title */
  & {
    h1 {
      ${tw`text-white text-2xl`}
    }
  }
`

const MenuButton = styled.button.attrs(props => ({
  className:
    "flex flex-row items-center h-8 focus:outline-none lg:hidden opacity-100 ",
}))``

/* === Navigation Items === */
const NavItemsWrapper = styled.main.attrs(props => ({
  className: ` ${
    props.presentMenu
      ? "visible absolute text-2xl h-full items-center justify-center portrait:space-y-24 portrait:md:space-y-32 landscape:space-y-12 landscape:sm:space-y-12 landscape:md:space-y-12 flex flex-col text-white "
      : "hidden flex-row justify-end w-3/4 space-x-16 font-normal"
  } lg:flex xl:flex`,
}))`
  & {
  }

  animation: ${fadeInOut} 2s linear;
`
const NavItem = styled.button.attrs(props => ({
  className: `${
    props.presentMenu ? `text-2xl` : `text-sm`
  } text-white focus:outline-none text-left`,
}))``
const NavLink = styled.a.attrs(props => ({
  className: `${
    props.presentMenu ? `text-2xl` : `text-sm`
  } text-white focus:outline-none text-left`,
}))``

/* === About Section === */

const HeroSection = styled.div`
  ${tw`relative h-full w-full bg-transparent items-start grid lg:grid-cols-2 gap-4 text-white lg:mt-0 pt-0 lg:pl-24 lg:pr-24 lg:pt-24 xl:p-56 xl:pt-24 xl:pb-0`}
  z-index: 2;
`
const AboutWrapper = styled.section`
  animation: ${translateIn} 0.5s linear;
  ${tw`space-y-8`}
`
const FullImageWrapper = styled.div`
  animation: ${translateIn} 0.5s linear;
  ${tw`h-full hidden lg:block xl:pl-8  `}
`

const FullImage = styled.img`
  animation: ${translateIn} 0.5s linear;
  ${tw`flex flex-col w-full justify-end`}
`
const FourRowLayout = styled.div`
  ${tw`min-h-screen h-auto w-full absolute left-0 top-0 pt-40 pb-20 lg:h-auto lg:mt-0 pl-8 pr-8 md:pb-20 md:pl-16 md:pt-40 md:pl-16 lg:pl-0 lg:pr-0 xl:pl-0 xl:pr-0 lg:relative justify-center bg-black lg:bg-transparent bg-opacity-75 flex flex-col space-y-12 landscape:space-y-8 md:space-y-20 landscape:lg:space-y-20 text-white`}
`
const Title = styled.h1`
  ${tw`text-4xl `}
`
const Subtitle = styled.h1`
  ${tw`text-2xl`}
`
const Spacer = styled.div`
  height: 5px;
  width: 60px;
  background-color: grey;
  margin: 1.2em 0;
`
const RedSpacer = styled.div`
  height: 5px;
  width: 80px;
  background-color: red;
`
const Paragraph = styled.h1`
  color: #bababa;
  ${tw`text-xl font-light`}
`
const ArrowButton = styled.button`
  animation: ${translateIn} 0.5s linear;
  background-color: #222222;
  ${tw`rounded-full h-12 w-12 portrait:md:h-16 portrait:md:w-16 lg:w-16 lg:h-16 flex items-center hover:bg-white focus:outline-none justify-center`}
`

/* === Lighbox Section === */

const LightBox = styled.div.attrs(props => ({
  className: `hidden w-full h-screen fixed top-0 right-0 z-10 bg-black bg-opacity-75  flex  items-center justify-center `,
}))`
  img {
    animation: ${fadeInOut} 0.5s linear;
    ${tw`fixed left-0 right-0 my-auto mx-auto inset-0   lg:max-w-xl`}
  }
`

/* === Gallery Section  === */

const Gallery = styled.div`
  ${tw` w-full grid md:grid-cols-2 gap-4 mt-4 lg:mt-16 lg:pl-24 lg:pr-24  xl:pl-56 xl:pr-56`}

  .img {
    opacity: 0;
    transform: translate(0, 5vh);
    transition: all 1s;
  }
  .img.visible {
    opacity: 1;
    transform: translate(0, 0);
    width: 100%;
  }

  z-index: 1;
`

/* === Footer Section === */

const Footer = styled.div`
  ${tw`relative grid grid-rows-2 w-full space-y-8 items-center justify-center p-10`}
`

const FooterLink = styled.a`
  ${tw`text-white text-opacity-75 text-sm`}
`
const CopyRightInfo = styled.main.attrs({
  className: `w-full items-center justify-center flex flex-row text-center`,
})`
  & {
    label {
      ${tw`text-white text-sm`}
    }
  }
  & {
    .company-name {
      color: red;
    }
  }
`

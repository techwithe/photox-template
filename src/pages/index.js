import React,{useState, useEffect} from "react"
import styled,{keyframes} from "styled-components"
import tw from 'twin.macro';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faBars} from '@fortawesome/free-solid-svg-icons'
import mainImageOne from '../assets/lucas-gouvea-aoEwuEH7YAs-unsplash.jpg';
import mainImageTwo from '../assets/serge_profile.png'
import arrow from '../assets/arrow_down.png'

import imageOne from '../assets/nico-marks-25gAg2MOXxQ-unsplash.jpg'
import imageTwo from '../assets/mahesh-krishnamurthy-fB5u5dfvNt8-unsplash.jpg'
import imageThree from '../assets/kreated-media-0fN7Fxv1eWA-unsplash.jpg'
import imageFour from '../assets/oladimeji-odunsi-aU_eOcelLhQ-unsplash (1).jpg'
import imageFive from '../assets/prince-akachi-J1OScm_uHUQ-unsplash.jpg'



export default function Home() {

  const [showMenu, setMenu] = useState(false);
  const [showLightBox, setLightBox] = useState("");

  useEffect(() => {
    
    window.addEventListener('scroll', function(){
      var pageTop = document.documentElement.scrollTop;
      var pageBottom = pageTop + window.innerHeight;
      
      var images = document.getElementsByClassName("img");
    
      for(var i = 0; i < images.length; i++){
        var img = images[i];
        if(img.offsetTop < pageBottom){
         
          img.classList.add("visible")
        } else {
       
        }
        
      }

    });

    window.addEventListener("orientationchange", function(event) {
      setMenu(false);
    })

    let galleryImages = document.getElementsByClassName("img");
    for(var i = 0; i < galleryImages.length; i++){
      galleryImages[i].addEventListener("click", function(e){
        toggleLightBox(e.target.src);
      })
    }

    document.getElementById("lightBox").addEventListener('click', function(e){
      console.log("hide box");
      document.getElementById("lightBox").style.display = "none";
      document.documentElement.style.overflowY = "scroll";
 
    })


  })

  const toggleLightBox = (image) => {
    document.getElementById("lightBox").style.display = "block";
    document.documentElement.style.overflowY = "hidden";
    setLightBox(image);
    
  }

  const toggleMenu = () => {
      setMenu(!showMenu);

  }


  const scrollToDiv = (elementID) => {
    var element = document.getElementById(elementID);

    element.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
    if(showMenu){
      setMenu(false);
    }
  }

  return <Wrapper id="main-wrapper">
          <NavBar presentMenu={showMenu}>
            <section className="flex flex-row h-16 w-full items-center justify-between">
              <section className="space-y-1">
                <h1>SERGE.</h1>
                <RedSpacer />
              </section>
              <MenuButton onClick={() => toggleMenu()} presentMenu={showMenu}>
                <FontAwesomeIcon icon={faBars} color={showMenu ? 'white' : 'white'} size="lg" />
              </MenuButton>
            </section>
            

            <NavItemsWrapper presentMenu={showMenu}>
              <NavItem presentMenu={showMenu} onClick={() => scrollToDiv("about")} >ABOUT</NavItem>
              <NavItem presentMenu={showMenu} onClick={() => scrollToDiv("gallery")} >MY WORK</NavItem>
              <NavLink presentMenu={showMenu}  href="mailto:techwithe@gmail.com" target="_blank" >CONTACT</NavLink>
            </NavItemsWrapper>
           
            
          </NavBar>
          <TwoColumnLayout id="about">   
            <div className=" flex h-screen w-full  max-h-screen lg:hidden ">
              <img className=" object-cover" src={mainImageOne}/>
            </div>
            <FourRowLayout>

              <AboutWrapper className="space-y-8"  >
                <section>
                  <Title>I'M SERGEY</Title>
                  <Subtitle>PHOTOGRAPHER</Subtitle>
                </section>
                <Spacer />
                <Paragraph>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. </Paragraph>
              </AboutWrapper>
             
              <ArrowButton><img className="w-4 " src={arrow} alt="arrow_back" onClick={()=>scrollToDiv("gallery")}/></ArrowButton>
            </FourRowLayout>
            <FullImageWrapper>
              <FullImage src={mainImageTwo} alt="profile_img"/> 
            </FullImageWrapper>
          </TwoColumnLayout>
          <Gallery id="gallery">
            <div className="space-y-4">
              <img className="img one" src={imageOne} alt="image_1"></img>
              <img className="img two" src={"https://images.unsplash.com/photo-1517166985222-323a01efa25f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"} alt="image_2"></img>
              
              <img className="img three" src={"https://images.unsplash.com/photo-1566005119730-72fb74903765?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80"} alt="image_3"></img>
              <img className="img four" src={"https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&auto=format&fit=crop&w=562&q=80"} alt="image_4"></img>
            </div>
            <div className="space-y-4">
              <img className="img five" src={imageTwo} alt="image_5"></img>
              <img className="img siz" src={imageFour} alt="image_6"></img>
              <img className="img seven" src={"https://images.unsplash.com/photo-1590210309267-388c9bf9805c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=675&q=80"} alt="image_7"></img>
              <img className="img eight" src={imageThree} alt="image_8"></img>
            </div>
          </Gallery>
          <Footer>
            <section className="space-x-8 md:space-x-16 lg:space-x-24">
              <FooterLink href="https://instagram.com" >INSTAGRAM</FooterLink>
              <FooterLink href="https://facebook.com">FACEBOOK</FooterLink>
              <FooterLink href="https://pinterest.com">PINTREST</FooterLink>
            
            </section>
            <CopyRightInfo>
              <label className="text-left hover:text-opacity-25"><a href="https://techwithe-reloaded.vercel.app">Created by TechWithE</a></label>                      
            </CopyRightInfo>
          </Footer>
          <LightBox id="lightBox" showLightBox={showLightBox}><img src={showLightBox} href="img"/></LightBox>
          
          
        </Wrapper>
}

const Wrapper = styled.div`
  background-color: #050505;
  ${tw`h-screen flex flex-col items-center`}
`

const MenuButton = styled.button.attrs((props) => ({
  className: 'flex flex-row items-center visible h-8 focus:outline-none  lg:hidden '
}))`

`
const fade = keyframes`
  from {
    opacity: 0; 
  }

  to {
    opacity: 1;
  }
`;

const translateIn = keyframes `
  from {
    opacity: 0; 
    transform: translate(0, 10vh);
    transition: all .5s;
  }

  to{
    opacity: 1;
    transform: translate(0, 0);
  }
`

const NavBar = styled.main.attrs( props => ({
  className : `flex flex-row  z-10  fixed  ${props.presentMenu ? 'transition-all duration-200 h-full justify-center bg-opacity-0 ' : ' transition-all duration-300  h-20 sm:h-20 md:h-24  lg:h-24 space-x-16 xl:space-x-32  '} lg:items-center  pr-8 pl-8  md:pl-16 md:pr-16 pt-4 lg:pt-0 lg:pl-24 lg:pr-24 xxl:pl-56  xl:pr-56  w-screen `
}))`
  background-color : #050505;
  & {
      h1 {
        ${tw`text-white  text-2xl`}
      }

  }
`
const NavItemsWrapper = styled.main.attrs(props => ({
  className: ` ${props.presentMenu ? 'visible absolute text-2xl h-full items-center  justify-center  portrait:space-y-24  portrait:md:space-y-32 landscape:space-y-12  landscape:sm:space-y-12 landscape:md:space-y-12   flex flex-col text-white ' : 'hidden flex-row justify-end w-3/4 space-x-16 font-normal'} lg:flex xl:flex`
}))`
  animation:  ${fade} 2s linear;

  & {
    /* a {
      ${tw`text-base  text-left `}
    } */
  }
`
const NavItem = styled.button.attrs((props) => ({
  className: `${props.presentMenu ? `text-2xl` : `text-sm`} text-white focus:outline-none text-left`
}))`
  
`
const NavLink = styled.a.attrs((props) => ({
  className: `${props.presentMenu ? `text-2xl` : `text-sm`} text-white focus:outline-none text-left`
}))`
  
`


const TwoColumnLayout = styled.div`
  ${tw`h-full w-full bg-transparent items-start  grid  lg:grid-cols-2 gap-4 text-white mt-20 lg:mt-0 pt-0 lg:pl-24 lg:pr-24 lg:pt-24 xl:p-56 xl:pt-24 xl:pb-0 `}
`
const AboutWrapper = styled.section `
 animation:  ${translateIn} .5s linear;
 ${tw`space-y-8`}
`
const FullImageWrapper = styled.div`
  animation:  ${translateIn} .5s linear;
  ${tw`h-full hidden lg:block xl:pl-8  `}
`

const FullImage = styled.img`
  animation:  ${translateIn} .5s linear;
  ${tw`flex flex-col w-full justify-end`}
`
const FourRowLayout = styled.div`
  ${tw`h-screen w-screen lg:h-full lg:w-full absolute left-0 top-0 mt-20 lg:mt-0  pl-8 pr-8 md:pl-16 md:pl-16 lg:pl-0 lg:pr-0 xl:pl-0 xl:pr-0 lg:relative justify-center bg-black lg:bg-transparent bg-opacity-75 flex flex-col space-y-12  landscape:space-y-8 md:space-y-20 landscape:lg:space-y-20  text-white`}
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
  color: #BABABA;
  ${tw`text-xl font-light`}
`
const ArrowButton = styled.button`
  animation:  ${translateIn} .5s linear;
  background-color: #222222;
  ${tw`rounded-full h-12 w-12 portrait:md:h-16 portrait:md:w-16 lg:w-16 lg:h-16 flex items-center hover:bg-white focus:outline-none justify-center`}
`

/* === Gallery === */

const LightBox = styled.div.attrs((props) => ({
className : `hidden w-full h-screen fixed top-0 right-0 z-10 bg-black bg-opacity-75   flex  items-center justify-center `
}))`
  img {
    animation:  ${fade} .5s linear;
    ${tw`fixed left-0 right-0 my-auto mx-auto inset-0   lg:max-w-xl`}
  
  }

`

const Gallery = styled.div`
  .img {
    opacity: 0;
    transform: translate(0, 5vh);
    transition: all 1s;
  }
  .img.visible {
    opacity: 1;
    transform: translate(0, 0);
  }
  ${tw` w-full grid md:grid-cols-2 gap-4 mt-4 lg:mt-16 lg:pl-24 lg:pr-24  xl:pl-56 xl:pr-56`}
`

/* === Footer === */

const Footer = styled.div`
  ${tw`grid grid-rows-2 w-full  space-y-8 items-center justify-center p-10`}
`

const FooterLink = styled.a`
  ${tw`text-white text-opacity-75 text-sm md:text-base lg:text-lg xl:text-lg`}
  
`
const CopyRightInfo = styled.main.attrs({
  className : `w-full items-center justify-center  flex flex-row text-center`
})`

  & {
      label {
          ${tw`text-white text-sm text-opacity-50`}
      }
  }
`

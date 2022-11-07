import React, { useState } from 'react'
// import Video from '../../../../assets/videos/featured_video.mp4'
import {
  HeroContainer,
  HeroBg,
  VideoBg,
  HeroContent,
  HeroH1,
  HeroP,
  HeroBtnWrapper,
  ArrowForward,
  ArrowRight
} from './HeroElements'
import { Button } from '../ButtonElements'

export const Hero = () => {
  const [hover, setHover] = useState(false)

  const onHover = () => {
    setHover(!hover)
  }

  return (
    <HeroContainer id="home">
      <HeroBg>
        {/* <VideoBg autoPlay loop muted src={Video} type="video/mp4" /> */}
        <VideoBg autoPlay loop muted src='videos/featured_video.mp4' type="video/mp4" />
      </HeroBg>
      <HeroContent>
        <HeroH1>Sistema Virtual de Gestión y Administración </HeroH1>
        <HeroP>
          Por una educación adventista rica en valores y gestión social para los
          estudiantes de la Corporación Universitaria Adventista de Colombia
          UNAC
        </HeroP>
        <HeroBtnWrapper>
          <Button
            to="about"
            onMouseEnter={onHover}
            onMouseLeave={onHover}
            primary="true"
            dark="true"
            smooth={true}
            duration={500}
            spy={true}
            exact="true"
            offset={-80}
          >
            ¡Empecemos! {hover ? <ArrowForward /> : <ArrowRight />}
          </Button>
        </HeroBtnWrapper>
      </HeroContent>
    </HeroContainer>
  )
}

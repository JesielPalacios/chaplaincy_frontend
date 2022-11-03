import React from 'react'
import Icon1 from '../../../../assets/img/Servicesimages/svg-1.svg'
import Icon2 from '../../../../assets/img/Servicesimages/svg-2.svg'
import Icon3 from '../../../../assets/img/Servicesimages/svg-3.svg'
import {
  ServicesContainer,
  ServicesH1,
  ServicesWrapper,
  ServicesCard,
  ServicesIcon,
  ServicesH2,
  ServicesP
} from './ServiceElements'

export const Services = () => {
  return (
    <ServicesContainer id="objectives">
      <ServicesH1>Nuestros principales objetivos</ServicesH1>
      <ServicesWrapper>
        <ServicesCard>
          <ServicesIcon src={Icon1} />
          <ServicesH2>Promover a Jesús</ServicesH2>
          <ServicesP>
            Promover a Jesús y moldear el carácter de los estudiantes es y
            siempre será nuestro principal y primer objetivo.
            {/*  */}
            {/* Moldear el carácter de los estudiantes y promover a Jesús es y */}
            {/* siempre será nuestro principal y primer objetivo. */}
          </ServicesP>
        </ServicesCard>
        <ServicesCard>
          <ServicesIcon src={Icon2} />
          <ServicesH2>Educación Adventista</ServicesH2>
          <ServicesP>
            La educación adventista y de calidad son lo que nuestra universidad
            ofrece al mundo, Dios y estudios.
          </ServicesP>
        </ServicesCard>
        <ServicesCard>
          <ServicesIcon src={Icon3} />
          <ServicesH2>Gestión Social</ServicesH2>
          <ServicesP>
            El apoyo al estudiante y el personal universitario es una tarea que
            nos tomamos muy en serio - Dirección Social.
          </ServicesP>
        </ServicesCard>
      </ServicesWrapper>
    </ServicesContainer>
  )
}

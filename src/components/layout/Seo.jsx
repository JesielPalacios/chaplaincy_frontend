import { Helmet } from 'react-helmet-async'

export const Seo = ({ title, subtitle }) => {
  return (
    <Helmet data-rh="true">
      {title && <title>{title} | SVGA</title>}
      {subtitle && <meta name="description" content={subtitle} />}
    </Helmet>
  )
};

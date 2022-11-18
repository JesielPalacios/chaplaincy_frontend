import { useCallback, useState } from 'react'
// import TranslateJsonObject from 'translate-json-object'
// import TJO from 'translate-json-object'
import axios from 'axios'

export const useTranslator = () => {
  const [state, setState] = useState({ loading: false, error: false })
  const [translatedJSON, setTranslatedJSON] = useState({
    loading: false,
    error: false,
  })

  //   //   translate - json - object
  //   //   TranslateJsonObject
  //   //   Translate a JSON Object
  //   translate - json - object
  //   // Choose the service to use google/yandex,
  //   // if you provide both yandex will be used as the default
  //   TJO.init({
  //     //   TranslateJsonObject.init({
  //     // googleApiKey: 'api_key',
  //     // googleApiKey: 'api_key',
  //     googleApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
  //     yandexApiKey: process.env.REACT_APP_YANDEX_API_KEY,
  //   })

  //   const translator = useCallback((object) => {
  //     setState({ loading: true, error: false })

  //     // Translate method takes (source object, and language code)
  //     // TranslateJsonObject.translate(example, 'es')
  //     TJO.translate(object, 'es')
  //       .then(function (data) {
  //         console.log(data)
  //         setTranslatedJSON(data)

  //         setState({ loading: false, error: false })
  //       })
  //       .catch(function (err) {
  //         console.error('error in translator function:', err)

  //         setState({ loading: false, error: true })
  //       })
  //   }, [])

  //   let encodedParams = new URLSearchParams()
  //   encodedParams.append('q', 'hola mundo')

  //   const options = {
  //     method: 'POST',
  //     url: 'https://google-translate1.p.rapidapi.com/language/translate/v2/detect',
  //     headers: {
  //       'content-type': 'application/x-www-form-urlencoded',
  //       'Accept-Encoding': 'application/gzip',
  //       'X-RapidAPI-Key': '1010483bcdmsh6de4c4a352b3a90p1454e0jsnf3e3c725faa1',
  //       'X-RapidAPI-Host': 'google-translate1.p.rapidapi.com',
  //     },
  //     // data: {text: 'hola mundo'},
  //     data: encodedParams,
  //   }

  //   const translator = useCallback(() => {
  //     setState({ loading: true, error: false })

  //     axios
  //       .request(options)
  //       .then(function (response) {
  //         console.log(response.data)

  //         setState({ loading: false, error: false })
  //       })
  //       .catch(function (err) {
  //         console.error('error in translator function:', err)

  //         setState({ loading: false, error: true })
  //       })
  //   }, [])
  //
  const encodedParams = new URLSearchParams()
  encodedParams.append('q', 'helloWolrd!')
  encodedParams.append('target', 'es')
  encodedParams.append('source', 'en')

  const options = {
    method: 'POST',
    url: 'https://google-translate1.p.rapidapi.com/language/translate/v2',
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      'Accept-Encoding': 'application/gzip',
      // 'X-RapidAPI-Key': '1010483bcdmsh6de4c4a352b3a90p1454e0jsnf3e3c725faa1',
      'X-RapidAPI-Key': 'f700d3f992msh5a4cb664e990d30p1c7a1ajsn9b3e40771bb0',
      'X-RapidAPI-Host': 'google-translate1.p.rapidapi.com',
    },
    data: encodedParams,
  }

  const translator = useCallback(() => {
    setState({ loading: true, error: false })

    axios
      .request(options)
      .then(function (response) {
        console.log(response.data)

        setState({ loading: false, error: false })
      })
      .catch(function (err) {
        console.error('error in translator function:', err)

        setState({ loading: false, error: true })
      })
  }, [])

  return {
    loading: state.loading,
    error: state.error,
    // translatedJSON,
    translator,
  }
}

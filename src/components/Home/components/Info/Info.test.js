import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import { fireEvent, prettyDOM } from '@testing-library/dom'

import { Info } from '.'
import { homeObjOne, homeObjTwo, homeObjThree } from './Data'

// test('renders content', () => {
//   const info = {
//     id: 'id_wich_its_referenced_for_scrolling',
//     lightBg: false,
//     lightText: true,
//     lighttextDesc: true,
//     topLine: 'topLine tittle',
//     headline: 'headline tittle',
//     description: 'description text',
//     buttonLabel: 'button_label_text',
//     imgStart: false, // if has image at left, else the image is located at right.
//     img: 'img/homepageimg/svg-1.svg',
//     alt: 'car',
//     dark: true,
//     primary: true,
//     darkText: false
//   }

//   // To sum up: return value from `render` shouldn't be kept in a var called other than "view" or "utils"
//   // Dont 'call wrapper', 'component' or 'somethingElse'
//   // https://github.com/testing-library/eslint-plugin-testing-library/blob/main/docs/rules/render-result-naming-convention.md
//   const utils = render(<Info {...homeObjOne} />)
//   // const img = utils.container.querySelector('img')
//   const img = utils.getByRole('img')
//   // utils.screen.getByText('Somos')
//   utils.getByText('Somos')
//   utils.getByText('Pastores psicologos')

//   expect(utils.container).toHaveTextContent(homeObjOne.description)

//   // console.clear()
//   // console.log(utils)
//   // utils.debug()
//   // console.log(img)
//   console.log(prettyDOM(img))
// })

test('clicking the button calls event handler once', () => {
  const mockHandler = jest.fn()

  const view = render(<Info {...homeObjTwo} {...mockHandler} />)

  // const button = view.getByText(homeObjTwo.buttonLabel)
  // const button = view.getByRole('a')
  const button = view.getByText(homeObjTwo.buttonLabel)
  fireEvent.click(button)
  fireEvent.click(button)

  // console.log(prettyDOM(button))
  expect(mockHandler.mock.calls).toHaveLength(2)
  // expect(mockHandler).toHaveBeenCalledTimes(2)
})

// I have to fix it. Perhaps changing the method fron the testing library
// https://www.youtube.com/watch?v=KYjjtRgg_H0
// Minute 18:17


// https://testing-library.com/docs/react-testing-library/example-intro
// https://testing-library.com/docs/react-testing-library/cheatsheet


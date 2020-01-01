# React Testing with Jest and Enzyme

1. Introduction to Jest, Enzyme and TDD

2. Simple React App Click Counter

- Set up a simple React app with Jest and Enzyme
- Used Enzyme's `shallow()` function to render a component
- `shallow()` replaces child components with placeholders, but we never actually used this feature in this project
- Tested that required DOM elements were rendered using `find()`
- Made the selector to look for `data-test` attribute
- Tested state using Enzyme's `setState()` and `state()` on `ShallowWrapper` objects
- Used `simulate()` to interact with rendered elements (clicked button)
- Tested components for updates after interaction
- Created re-usable `setup()` and `findByTestAttr()` functions

# Intro to Recoil

This application serves and an example of how to use Recoil as a state management library in React. We cover some very basic examples, which may all you need to use, depending on how complex your state management needs to be. Recoil is a relatively new tool that serves as a state management library for React specifically (unlike tools like Redux, which can be used outside of React). Like React, it was originally developed by Facebook (now Meta), and is intended to be a more 'React-like' state management library.

Recoil is a great introduction to the concept of a 'state management' library due to its simplicity. It offers more functionality than the useContext hook (although it uses this hook under the hood) while requiring less setup than both the useContext hook and tools like Redux. I'd recommend playing around with useContext as well as Redux in addition to trying out Recoil, so you can understand the differences between these three tools and make your own educated decisions. 

But, first and foremost, what is a 'state management library'?

## State Management

If you've built any React apps of moderate size, you've probably experienced the frustration of `props-drilling`. Let's say you need to declare state in a certain parent component, but a component five or even ten steps down the component hierarchy needs to access and possibly even update this state. Hence, you have to pass your stateful variable and your callback function to update state as props all the way from the top component to the lower component. This can cause frustrating errors - (oops, I misspelled the prop name when I destructred it in this component) - which become more common and harder to track down as your app grows.

This is where a state management library comes in. Using a state management library allows us to store the state of our application in a separate file and selectively import that state wherever it's needed. While this initially requires more work and setup and also requires us to keep track of more files, it ultimately becomes an invaluable organizational tool that keeps your components clean and legible and reduces the chance for typos. There are more benefits that can be gained from use a state management libary, but the benefits listed above are often merit enough, and will start to have more and more of an impact as your application grows.

## Installing Recoil

Getting started with Recoil is quite simple. You simply create your new react app by running `npx create-react-app my-app-name`, then run either `npm install recoil` or `yarn add recoil` depending on whether you use `npm` or `yarn`.

Once you run these commands, you should see `recoil` listed as a dependecy in your `package.json` file.


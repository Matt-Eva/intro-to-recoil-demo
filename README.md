# Intro to Recoil

This application serves as an example of how to use Recoil as a state management library in React. We cover some very basic examples, which may all you need to use, depending on how complex your state management needs to be. Recoil is a relatively new tool that serves as a state management library for React specifically (unlike tools like Redux, which can be used outside of React). Like React, it was originally developed by Facebook (now Meta), and is intended to be a more 'React-like' state management library.

Recoil is a great introduction to the concept of a 'state management' library due to its simplicity. It offers more functionality than the useContext hook (although it uses this hook under the hood) while requiring less setup than both the useContext hook and tools like Redux. I'd recommend playing around with useContext as well as Redux in addition to trying out Recoil, so you can understand the differences between these three tools and make your own educated decisions. 

But, first and foremost, what is a 'state management library'?

## State Management

If you've built any React apps of moderate size, you've probably experienced the frustration of `props-drilling`. Let's say you need to declare state in a certain parent component, but a component five or even ten steps down the component hierarchy needs to access and possibly even update this state. Hence, you have to pass your stateful variable and your callback function to update state as props all the way from the top component to the lower component. This is known as `props-drilling`, and can cause frustrating errors - (oops, I misspelled the prop name when I destructred it in this component) - which become more common and harder to track down as your app grows.

Which is where a state management library comes in. Using a state management library allows us to store the state of our application in a separate file and selectively import that state wherever it's needed. While this initially requires more work and setup and also requires us to keep track of more files, it ultimately becomes an invaluable organizational tool that keeps your components clean and legible and reduces the chance for typos and unpassed props. There are more benefits that can be gained from use a state management libary, but the benefits listed above are often merit enough, and will start to have more and more of an impact as your application grows.

## Installing Recoil

Getting started with Recoil is quite simple. You simply create your new react app by running `npx create-react-app my-app-name`, then run either `npm install recoil` or `yarn add recoil` depending on whether you use `npm` or `yarn`.

Once you run these commands, you should see `recoil` listed as a dependecy in your `package.json` file.

## Using Recoil

If you haven't already, fork, clone, and `npm install` this repository to view the source code and follow along in the code as we walk through the following examples. To mock the backend, you'll need to have `json-server` installed. If you have it installed, you can start it up by running `npm run server`. Then, run `npm start` in a new terminal to open up the application.

Note: the frontend is set up to connect to the backend via `localhost:3000`. Be sure to run your backend "server" on this port.

The two key Recoil concepts we'll be discussing are `atoms` and `selectors`. We'll discuss atoms first.

### Atoms

Atoms are the most basic aspect of Recoil - if you wanted to, you could get by with only using atoms.

We set up a new `atom` for a new piece of state. The first step to creating an atom and its corresponding state involves creating a file to store the atom in. I like to keep these types of files that store state in a separate folder called `state`, which is at the same level in our folder hiearchy as our `components` folder. In this example app, we have three files in our `state` folder - `allLemursState.js`, `categoryState.js`, and `searchState.js`. You can group related state files in their own folder within the `state` folder as well, which might be helpful if your application is using a lot of state (and therefore a lot of state files). However, I wouldn't recommend implementing folder nesting any deeper than this.

To create a new atom within your new file (let's say our new file is named newState.js), you first need to import your atom from recoil:

```
import {atom} from 'recoil'
```

Next, we'll need to create the atom (in other words, create our new piece of state). We can do so by writing the following:

```
export const newState = atom({
  key: 'newState', //serves as a unique identifier with respect to other atoms/selectors
  default: 'some value', // this is where you declare the initial value of your state variable
})
```

Notice that we're exporting `newState` on the same line in which we're declaring it. We can also export it at the bottom of our file using the following syntax:

```
export {newState}
```

This syntax may be preferable if you're planning on creating multiple pieces of state in the same file that you want to export.

And that's it! We've create a new piece of state - a new `atom`. Now let's look at how we can access and change this new state in our components.

## Accessing and Changing State

Recoil is a great state management library for developers who are already familiar with using React because it's designed to be "React like" in its syntax. This becomes clear when we start importing and manipulating state within components.

First, we'll need to import the state itself into the component:

```
import { newState } from '../../state/newState'
```

We'll also need to import a hook from Recoil itself. In this case, we're going to be importing the `useRecoilState` hook:

```
import { useRecoilState } from 'recoil'
```

We can then use this hook in our component in a manner very similar to the `useState` hook itself:

```
function MyComponent(){
  const [newState, setNewState] = useRecoilState(newState)
  
  return (
    <div>MyComponent</div>
  )
}
```

The syntax for using this hook is basically the same as the syntax for the `useState` hook itself, except we use `useRecoilState` instead of `useState`, and we pass in the value of the state we imported rather than an initial state value (remember, we set the initial state in the atom via the `default` key).

To update state, we just call our setState function we received from our useRecoilState hook - in this example, that would be `setNewState` - and pass in the value of whatever we want our state to be:

```
setNewState('some new value') // sets the value of `newState` to the string `'some new value'`.
```

This causes a component re-render just like the useState hook.

## Just Accessing State

What if we only want to access a state variable, and don't want to generate a setter function? Well, Recoil let's us do that using the `useRecoilValue` hook, which we use in place of the `useRecoilState` hook. This allows us to access just the value of a state variable that we can then use in our components.

We'll still need to import the state we want, along with the `useRecoilValue` hook from Recoil:

```
import { newState } from '../../state/newState'
import { useRecoilValue } from 'recoil'
```

Then, to use it in our component, we invoke the `useRecoilValue` hook and pass it our imported state (just as we did with the `useRecoilState` hook).

```
function MyOtherComponent(){
  const newState = useRecoilValue(newState)
  
  return (
    <div>My Other Component</div>
  )
}
```

Notice that we no longer have to use array destructuring when declaring our variable. Since useRecoilValue just extracts the value of the state, leaving out the state setter function, it directly returns that value instead of returning an array that contains that value, which means we can save it in a variable without using destructuring.

The purpose of this hook will become clear when we talk about the next fundamental aspect of Recoil - selectors.

## Selectors

Selectors are like atoms in that they are also used to create state, but they have a significant difference. Selectors are used only to represent DERIVED state - that is, state whose value is dependent on other state. Derived state is never changed using a setState function - rather, whenever a piece of state that it depends upon changes, derived state's value will also change. Because we never call a setState function for a piece of derived state, we'll want to access derived state using the `useRecoilValue` hook, since that only returns the state value without a corresponding setter function.

Let's look at an example of derived state, and talk about selector syntax. Go ahead and open up the file `allLemursState.js` and view it in your text editor. Open up the files `categoryState.js` and `searchState.js` as well, since we'll be using state defined in those files here in `allLemursState.js`.

Let's check out those import statements first:

```
import {atom, selector} from 'recoil'
import { categoryState } from './categoryState'
import { searchState } from './searchState'
```

Just as when we create an atom, we have to import `selector` from Recoil in order to create a new selector.

Now let's examine the atom we're creating here in `allLemursState.js`, along with the atoms created in `categoryState` and `searchState`:

allLemursState.js:
```
const allLemursState = atom({
    key: 'allLemursState',
    default: []
})
```

categoryState.js
```
const categoryState = atom({
    key: 'categoryState',
    default: 'All'
})
```

searchState.js
```
export const searchState = atom({
    key:"searchState",
    default: ''
})
```

Let's also track down where each piece of state declared in these atoms is being used in our application:

allLemursState: is being used in the `Home` component to capture the value of all the lemur data we're requesting from our "backend" (really just our db.json file).

categoryState: is being used in the `CategorySelect` component to keep track of which category a user is selecting via the `select` html element.

searchState: is being used in the `Search` component to keep track of what a user is typing into the `input` element, which is serving as our "searchbar".


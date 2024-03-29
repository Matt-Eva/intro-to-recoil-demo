# Intro to Recoil

This application serves as an example of how to use Recoil as a state management library in React. We only cover some very basic examples, which may be all you need to use depending on how complex your state management needs to be. Recoil is a relatively new tool that serves as a state management library for React specifically (unlike tools like Redux, which can be used outside of React). Like React, it was originally developed by Facebook (now Meta), and is intended to be a more 'React-like' state management library.

Recoil is a great introduction to the concept of a 'state management' library due to its simplicity. It offers more functionality than the useContext hook (although it does use this hook under the hood) while requiring less setup than both the useContext hook and tools like Redux. I'd recommend playing around with useContext as well as Redux in addition to trying out Recoil. That way you can understand the differences between these three tools and make your own educated decisions. 

But, first and foremost, what is a 'state management library'?

## State Management

If you've built any React apps of moderate size, you've probably experienced the frustration of `props-drilling`. Let's say you need to declare state in a certain parent component, but a component five or even ten steps down the component hierarchy needs to access and possibly even update this state. Hence, you have to pass your stateful variable and your callback function to update state as props all the way from the top component to the lower component. This is known as `props-drilling`, and can cause frustrating errors - (oops, I misspelled the prop name when I destructured it in this component) - which become more common and harder to track down as your app grows.

Which is where a state management library comes in. Using a state management library allows us to store the state of our application in a separate file and selectively import that state wherever it's needed. While this initially requires more work and setup (and also requires us to keep track of more files) it ultimately becomes an invaluable organizational tool that keeps your components clean and legible and reduces the chance for typos and unpassed props. There are more benefits that can be gained from using a state management libary, but the benefits listed above are often merit enough, and will start to have more and more of an impact as your application grows.

## Installing Recoil

Getting started with Recoil is pretty straightforward. You simply create your new react app by running `npx create-react-app my-app-name`, then run either `npm install recoil` or `yarn add recoil` depending on whether you use `npm` or `yarn`.

Once you run these commands, you should see `recoil` listed as a dependency in your `package.json` file.

## Setting up Recoil

If you haven't already done so, fork, clone, and `npm install` this repository to view the source code and follow along in the code as we walk through the following examples. To mock the backend, you'll need to have `json-server` installed. If you have it installed, you can start it up by running `npm run server`. Then, run `npm start` in a new terminal to open up the application.

Note: the frontend is set up to connect to the backend via `localhost:3000`. Be sure to run your backend "server" on this port.

Now, let's take a look at our `index.js` file in this application. In addition to installing Recoil as a dependency, we're goint to need to do some basic setup within `index.js` so that we can use Recoil throughout our application.

If you look at the import statements in `index.js`, you'll notice that we're importing something called `RecoilRoot` from Recoil: 

```
import { RecoilRoot } from 'recoil'
```

We wrap our `<App />` component with this `RecoilRoot` here in `index.js`, which allows us to use Recoil functionality throughout our application. (This application also uses `BrowserRouter` from React-Router-Dom, which you may be familiar with already. The syntax for `RecoilRoot` and `BrowserRouter` are essentially the same.)

Here's what that syntax would look like (if we were just using Recoil and not using BrowserRouter as well - also note that this is React 18 syntax, which may look slightly different than older versions of React).

```
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <RecoilRoot>
    <App />
  </RecoilRoot>
)
```

Your app may also start out with React.StrictMode included, which you can keep throughout the development process. It's not necessary to run Recoil, but it won't impact Recoil functionality if you do keep it in. However, it may cause duplicate updates to state, so if you're noticing duplicate updates while developing, this is likely the source of that phenomenon.

## Recoil Basics 

The two key Recoil concepts we'll be discussing in this reading are `atoms` and `selectors`. We'll discuss atoms first.

## Atoms

Atoms are the most basic aspect of Recoil - depending on how complex your state needs are, you could get by with only using atoms.

We set up a new `atom` for a new piece of state. The first step to creating an atom and its corresponding state involves creating a file to store the atom in. One way to organize your file structure involves keeping files that store state in a separate folder called `state`, which is at the same level in our folder hiearchy as our `components` folder. In this example app, we have three files in our `state` folder - `allLemursState.js`, `categoryState.js`, and `searchState.js`. You can group related state files in their own folder within the `state` folder as well, which might be helpful if your application is using a lot of state (and therefore a lot of state files). However, it's probably best not to implement folder nesting any deeper than this.

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
setNewState('some new value') // sets the value of `newState` to the string 'some new value'.
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

Selectors - like atoms - are also used to create state, but they have a significant difference. Selectors are used only to represent DERIVED state - that is, state whose value is dependent on other pieces state. Derived state is never changed using a setState function - rather, whenever a piece of state that it depends upon changes, derived state's value will also change. Because we never call a setState function for a piece of derived state, we'll want to access derived state using the `useRecoilValue` hook, since that only returns the state value without a corresponding setter function.

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


Okay, we've identified these different pieces of state, what's controlling them, and what they're keeping track of - now how do I want to use them in conjunction with each other?

Well, ideally, I'd like my display to change based on user interaction - i.e., whatever a user has typed into the `input` element connected to `searchState` and whatever a user has selected using the `select` element connected to `categoryState`. So, I want to filter through my `allLemursState` to choose which lemurs to display based upon the criteria I've been given by a user. Here's how we might accomplish this without using selectors (and derived state):

```
import React, {useEffect} from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { allLemursState } from "../../state/allLemursState"
import { searchState } from '../../state/searchState'
import { categoryState } from '../../state/categoryState'
import LemurContainer from '../../components/LemurContainer/LemurContainer'
import Search from '../../components/Search/Search'
import CategorySelect from '../../components/CategorySelect/CategorySelect'
import "./Home.css"

function Home() {
  const [allLemurs, setAllLemurs] = useRecoilState(allLemursState)
  const search = useRecoilValue(searchState)
  const category = useRecoilValue(categoryState)

  const nameFilteredLemurs = allLemurs.filter(lemur => lemur.name.toLowerCase().includes(search.toLowerCase()))
  
  const nameAndSexFilteredLemurs = nameFilteredLemurs.filter(lemur => category === "All" ? true : lemur.sex === category)

  useEffect(() =>{
    fetch('http://localhost:3000/lemurs')
    .then(r => r.json())
    .then(data => {
      setAllLemurs(data)
    })
  }, [])

  return (
    <div>
      <div className='home__header'>
        <Search />
        <CategorySelect />
      </div>
        <LemurContainer lemurs={nameAndSexFilteredLemurs}/>
    </div>
  )
}

export default Home
```
Basically, I want whatever lemurs displayed by LemurContainer to have been filtered twice before being displayed - once by the search a user has typed in, again by the category a user has selected. I'm importing all my pieces of state into my `Home` component, using all three to generate my desired value, then passing down that filtered value down to LemurContainer as props so that LemurContainer can use it to display the desired subset of lemurs.

This works fine, but it adds extra code to our component. As applications grow, it's likely that you'll be generating more and more code that's responsible for more and more aspects of your application. Keeping all of that code in your components can make them long and difficult to read. So, instead of including this logic here, we can extrapolate it out into one of our state files and turn it into derived state.

Why is this a good case for derived state? Well let's look at our two variables - `nameFilteredLemurs` and `nameAndSexFilteredLemurs`. There variables values are dictated by the values of other pieces of state - `nameFilteredLemurs` relies on `allLemursState` and `searchState`, while `nameAndSexFilteredLemurs` technically relies on `allLemursState`, `searchState`, and `categoryState` (since its value is derived by filtering through `nameFilteredLemurs`). 

These variables values will change whenever any of these pieces of state change, but their values are never directly manipulated. Hence these variables can be considered stateful; they change whenever state changes, but only in a derivative manner - we never call a set state function on these variables directly, rather on other pieces of state whose updated values will influence the values of these variables. This means we can treat them as `derived state`.

Which is where selectors come in! First let's look at selector syntax:

```
const newDerivedState = selector ({
  key: 'newDerivedState', // as with atoms, this serves as a unique identifier that recoil uses 
  get: ({get}) =>{
    return 'whatever value I want this piece of derived state to have'
  } 
  // ^^ this 'get' key references a function that receives the get function as its argument via destructuring - ({get}) - and returns the value we want our dervied state to have. We'll discuss get more below
})
```

While there is some new, unfamiliar syntax here, by and large this is very similar to how we create atoms. The only difference is that instead of setting initial state using the `default` key, we use the `get` key to reference a function that dicates what value this piece of derived state will have. We'll use the `get` method from Recoil inside this function to access other pieces of state that we want our derived state to depend up.

Let's take a look at how this is actually being implemented in our `allLemursState.js` file. We'll look at our `lemursByNameState` first:

```
const lemursByNameState = selector({
  key: 'lemursByNameState',
  get: ({get}) => {
        
    const allLemurs = get(allLemursState)
    const name = get(searchState)

    const nameFilteredLemurs = allLemurs.filter(lemur => name === "" ? true : lemur.name.toLowerCase().includes(name.toLowerCase()))

    return nameFilteredLemurs
  }
})
```

First, let's look at how we're using that `get` function. In order to connect our derived state to other pieces of state, we'll need to use the `get` function provided by recoil. Basically, we invoke the `get` function, pass in the piece of state we want our derived state to connect to, and assign it to a variable, which we can then use throughout the rest of our function. 

In order to pass a piece of state to the `get` function, it must be declared within the same file or imported into that file. For that reason, we're importing our `searchState` at the top of this file:

```
import { searchState } from './searchState'
```

Then, once we've used the `get` function to capture these pieces of state and save them in variables, we can use them to generate the value of our derived state, which is specified by the return statement of our function. (In this example, that would be `nameFilteredLemurs`.)

### Deriving State from Derived State

Derived state doesn't have to depend only on state declared using an atom - it can derive its value from other pieces of derived state. Let's take a look at the next piece of derived state we're declaring in our `allLemursState.js` file, `lemursByNameAndCatState`:

```
const lemursByNameAndCatState = selector({
  key: 'lemursByNameAndCatState',
  get: ({get}) => {

      const lemursByName = get(lemursByNameState)
      const category = get(categoryState)

      return lemursByName.filter(lemur => category === 'All' ? true : lemur.sex === category)
  }

})
```

In this example, you'll notice that one of the pieces of state we're `getting` is `lemursByNameState`, which is itself a piece of derived state. Once we've `gotten` it (and `categoryState`, which we're importing at the top of our file), we can now filter through this piece of state to get the lemurs whose `sex` key match the category contained in categoryState. We want to filter through `lemursByNameState` instead of `allLemursState` because we want both filters to apply. 

We could have consolidated both filters into one piece of derived state, but this example splits it up into two pieces of derived state to illustrate that one piece of derived state can derive its value from another piece of derived state.

## Accessing Derived State

Great, now that we have this piece of derived state, let's access it in the appropriate component - `LemurContainer`. Because we're dealing with derived state, we don't need a setter function, which means we should use the `useRecoilValue` hook instead of the `useRecoilState` hook:

```
import React from 'react'
import LemurCard from "../LemurCard/LemurCard"
import { lemursByNameAndCatState } from '../../state/allLemursState'
import { useRecoilValue } from 'recoil'
import './LemurContainer.css'

function LemurContainer() {

  const filteredLemurs = useRecoilValue(lemursByNameAndCatState)

  const lemurList = filteredLemurs.map(lemur => <LemurCard lemur={lemur} key={lemur.id}/>)
  
  return (
    <div className='lemur-container'>{lemurList}</div>
  )
}

export default LemurContainer
```

Once we've included this piece of state in our LemurContainer, we can map over it to generate the appropriate number of lemur cards to display.

## Conclusion

That's it for this walkthrough! There's a lot more that Recoil can handle, so if you're interested in learning more, check out the Recoil <a href="https://recoiljs.org/">website</a> and <a href="https://recoiljs.org/docs/introduction/motivation">documention</a>.

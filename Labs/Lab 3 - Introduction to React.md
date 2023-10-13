# 🚀 Lab 3: Introduction to React

Time to complete: **~35 minutes**

In this lab, you will create a simple app that demonstrates the key principles of React.

## 👉What you will learn

In this lab, you will go though the following tasks:

- How to create simple React components.
- What are React component events, props & state.
- Using class components compared to functional components.
- What is the virtual DOM and why the component key props are important.
- How to debug and optimize rendering of React components.

## 👉Why use React instead of other libraries?

There are numerous user interface libraries for HTML and JavaScript, but it is recommended to use React for code components:

- Power Apps itself uses React - in the future we will be able to use the libraries that already ship with the run-time.
- The Microsoft Fluent UI controls use React and so it's [recommended to use this library to give consistency with the rest of Power Apps](https://docs.microsoft.com/en-us/powerapps/developer/component-framework/code-components-best-practices#use-microsoft-fluent-ui-react).

# ✅Task 01 - Creating a react project

In this task we create a new react project to enable us to try out some of the foundational react concepts.

1. Inside your codespace at the terminal use:
   ```bash
   cd /workspaces
   npx create-react-app "lab03/my-app" --template typescript
   ```

2. Open the new react project using **File** -> **Open Folder** and select `/workspaces/lab03/my-app`.  
   ![image-20230919123317969](Lab%203%20-%20Introduction%20to%20React.assets/image-20230919123317969.png)

3. Open the `packages.json` file and modify the `start` entry under the `scripts` section to be:
   ```
   "start": "BROWSER=none WDS_SOCKET_PORT=0 react-scripts start",
   ```

   > [!IMPORTANT]
   >This step is required to allow the browser to auto refresh when edits are made because we are running inside a codespace.
   
4. Inside the terminal (`Ctrl+'` to toggle visibility) use:

   ```bash
   npm start
   ```

5. When prompted, select **Open in Browser**.  

   ![image-20230919123525997](Lab%203%20-%20Introduction%20to%20React.assets/image-20230919123525997.png)
   You should now see a spinning React logo in a new browser window.  
   The nice thing about `create-react-app` is that it creates a project that is setup ready for you to experiment with typescript and React. Make a change to  `src\App.tsx` such as changing the message text, **save**, and see your browser reload to reflect the changes. This is similar to using the code component test-harness that we saw in previous labs.

# ✅Task 02 - React Project Overview

The `create-create-app` template creates a good starting point to allow you to proto-type your React code components. 

## 👉Take a look at the project structure

The folder contains the following key files:

1. `index.tsx` - Just like the `index.ts` in the code component project, this is the entry point to the React app. The `tsx` extension tells the typescript compiler that it contains React mark up which looks similar to HTML. The important part is:

   ```react
   root.render(
     <React.StrictMode>
       <App />
     </React.StrictMode>
   );
   ```

   This instructs React to render the `App` component.   
   ![image-20230919123907950](Lab%203%20-%20Introduction%20to%20React.assets/image-20230919123907950.png)

   React allows creation of complex user interfaces using components that can then contain child components (using this HTML like structure) to create a virtual DOM (Document Object Model) that then syncs to the browser's physical DOM. Attributes are provided to the components in a similar way to HTML components. These attributes are called **props**. 

   Later we will understand how React decides which node to update in the **physical browser DOM** when a component is updated in the **virtual DOM**.

   You can see that the `App` component is imported using the statement:

   ```typescript
   import App from './App';
   ```

2. `App.tsx` - This is the component that is referenced by `index.tsx`. The component is what is called a function component (see below), where the exported function is the same name as the component, and returns some more React markup that will be rendered as part of the parent.

3. `package.json` - This serves the same purpose as the `package.json` in the code component template project - but contains a different set of libraries used by the `create-react-app` framework. 

4. The other files can be ignored at this time.

## 👉Function vs Class Components

When you start to look at example code for code components written using React, you will notice two styles of `tsx` component:

- **Function components** - The React components are returned from a function. This often is combined with React hooks. (e.g. [PowerApps-Samples/ChoicesPickerComponent.tsx](https://github.com/microsoft/PowerApps-Samples/blob/master/component-framework/ChoicesPickerControl/ChoicesPicker/ChoicesPickerComponent.tsx))
- **Class components** - The React component is defined by a class that inherits from `React.Component` or related base class (e.g. [PowerApps-Samples/Facepile.tsx](https://github.com/microsoft/PowerApps-Samples/blob/master/component-framework/ReactStandardControl/ReactStandardControl/Facepile.tsx))

Both approaches are equally applicable and have little or no difference at runtime at this time, however **functional components are recommended** when creating new projects. This lab will use function components with React hooks. 

Read more: [Introducing Hooks – React (reactjs.org)](https://reactjs.org/docs/hooks-intro.html#gradual-adoption-strategy)

# ✅Task 03 - Create the Todo Component

In this task we create a simple component that renders a 'to do' list item. The component has various **props** (similar to HTML attributes) that are used when rendering. Later we will include this in a list and vary the props based on state held in the parent component.

1. Inside the `my-app` project, create a folder `src\components`
   ![image-20230912104127606](Lab%203%20-%20Introduction%20to%20React.assets/image-20230912104127606.png)

2. Add a new file `src\components\TodoItem.tsx`
   ![image-20230912104203465](Lab%203%20-%20Introduction%20to%20React.assets/image-20230912104203465.png)

   > [!IMPORTANT]
   >When creating react components, they must be given the `.tsx` file extension.
   
3. Add the following code:

   ```typescript
   import React from 'react';
   export interface TodoItemProps {
       id: string,
       name: string,
       completed: boolean,
       onTaskCompleted?: (id:string) => void
   }
   ```

   > [!NOTE]
   >
   > 1. When defining the attributes of our component (that is the **props** that control how it is rendered) it is convention to define an interface with the suffix `Props`.
   > 2. The **props** consist of both primitive fields that are used to render the component (e.g. `id`, `name`, `completed`) and callback functions that are called when specific **events** occur to notify the parent component (e.g. `onTaskCompleted`).
   > 3. You can ignore the ESLint message *'React' is defined but never used.*

4. Underneath the `TodoItemProps` interface, add the function component:

   ```react
   export const TodoItem: React.FC<TodoItemProps> = ({ id, name, completed, onTaskCompleted }) => {
       return (
           <div className={`todo-item ${completed ? ' completed' : ''}`}>
               <input
                   id={id}
                   type="checkbox"
                   checked={completed}
                   onChange={() => onTaskCompleted && onTaskCompleted(id)}
               />
               <label className="todo-label" htmlFor={id}>
                   {name}
               </label>
           </div>
       );
   };
   ```

   > [!NOTE]
   >
   > 1. This is a **function component** since it is not defined as a class, and returns React components.
   > 2. The `tsx` syntax looks very similar to HTML - and in fact we are outputting elements such as `input` & `div` that are mapped directly through to the HTML DOM equivalent. There is one notable difference - instead of the attribute `class`, we use `className`.
   > 3. Notice how we use  `{id, name, completed, onTaskCompleted} `. This is called 'destructuring', where you extract the attributes required to render from the props, rather than prefixing them with `props` each time they're used. You could equaly define the function component as `export const TodoItem =  (props: TodoItemProps)` and reference the prop values e.g. `props.name`. This is simply a style preference and there is no right or wrong way.

5. Create a new file named `src\components\Todos.tsx` and add the following code:

   ```react
   import { TodoItem } from './TodoItem';
   export const Todos = () => {
       return (
           <div className="todo-list">
               <TodoItem id={'id1'} name={'Foo'} completed={false} />
               <TodoItem id={'id2'} name={'Bar'} completed={true} />
           </div>
       );
   };
   ```

6. Inside `index.tsx`, replace `<App/ >` with `<Todos />`. You will also need to import this component at the top of the component using:

   ```typescript
   import { Todos } from './components/Todos';
   ```

   > [!INOTE]
   >
   > Codespaces has a feature to automatically add these imports for you as you code.

7. Open `index.css` and replace the entire contents with the following:
   ```css
   html {
   	height: 100%;
   	display: flex;
   	background: #ddd;
     }
     
     body {
   	background-image: linear-gradient(
   	  102.7deg,
   	  rgba(253, 218, 255, 1) 8.2%,
   	  rgba(223, 173, 252, 1) 19.6%,
   	  rgba(173, 205, 252, 1) 36.8%,
   	  rgba(173, 252, 244, 1) 73.2%,
   	  rgba(202, 248, 208, 1) 90.9%
   	);
   	display: flex;
   	justify-content: center;
   	align-items: center;
   	height: 100vh;
   	width: 100%;
   	margin: auto;
   	font-family: sans-serif;
     }
     
     .todo-list {
   	display: flex;
   	flex-direction: column;
   	background: #fff;
   	font-size: 20px;
   	max-width:90vw;
   	min-width:360px;
   	max-height: 90vw;
       overflow-y: auto;
   	border-radius: 16px;
   	box-shadow: 0 5px 30px rgba(0, 0, 0, 0.2);
     }
     
     .todo-item {
   	display: flex;
   	align-items: center;
   	padding: 1em;
   	border-bottom: solid 1px #ddd;
     
   	&:last-child {
   	  border-bottom: none;
   	}
     
   	&.completed {
   	  background-color: rgba(74, 206, 163, 0.1);
   	}
     
   	& label {
   	  font-size: 24px;
   	  position: relative;
   	  padding-left: 8px;
   	}
     }
     
     input[type="checkbox"] {
   	appearance: none;
   	border: 4px solid #cfcfcf;
   	border-radius: 4px;
   	width: 32px;
   	height: 32px;
   	cursor: pointer;
   	flex-shrink: 0;
     
   	&:hover {
   	  box-shadow: 0 8px 22px 0 rgb(37 44 97 / 15%),
   		0 4px 6px 0 rgb(93 100 148 / 20%);
   	}
   	&:focus {
   	  outline: #bdcdd6 1px solid;
   	}
     
   	&:checked {
   	  border-color: #38bb90;
   	  transition: border-color 0.2s ease-in-out;
   	}
     
   	&:checked ~ label {
   	  text-decoration: line-through;
   	}
     
   	&:checked ~ label::before {
   	  content: "\2713";
   	  font-weight: 900;
   	  position: absolute;
   	  top: 50%;
   	  transform: translateY(-50%);
   	  left: -28px;
   	  width: 16px;
   	  color: #4acea3;
   	}
     }
     
     .new-task {
   	display: flex;
   	flex-shrink: 0;
   	height: 38px;
   	gap: 16px;
   	margin: 16px 16px 0px 16px;
   	& input[type="text"] {
   	  flex: 1;
   	  outline: 0;
   	  width: auto;
   	  font-size: 18px;
   	  border: 0;
   	  color: #455963;
   	  box-shadow: 0 -1px 0 #e2e4ea inset;
   	  &::placeholder {
   		color: #a8b5bb;
   	  }
     
   	  &:focus {
   		box-shadow: 0 -2px 0 #bdcdd6 inset;
   	  }
   	}
     
   	& button {
   	  outline: 0;
   	  border: 0;
   	  cursor: pointer;
   	  font-weight: 600;
   	  font-size: 16px;
   	  color: rgb(72, 76, 122);
   	  border-radius: 8px;
   	  background-image: linear-gradient(180deg, #fff, #f5f5fa);
   	  box-shadow: 0 4px 11px 0 rgb(37 44 97 / 15%),
   		0 1px 3px 0 rgb(93 100 148 / 20%);
     
   	  &:focus {
   		outline: #bdcdd6 1px solid;
   	  }
     
   	  &:hover {
   		box-shadow: 0 8px 22px 0 rgb(37 44 97 / 15%),
   		  0 4px 6px 0 rgb(93 100 148 / 20%);
   	  }
   	}
     }
   ```
   
8. **Save** all your files.

9. Go back to your web browser and you should see the two `TodoItem` component instances rendered in the browser.  
   ![image-20230912173306399](Lab%203%20-%20Introduction%20to%20React.assets/image-20230912173306399.png)

10. Try changing the rendering of the `TodoItem.tsx` component and see the output updated (e.g. append a message when the item is completed by adding `{completed && ' done'}` after `{name}`

11. Inside the `Todos.tsx` file, try changing the text passed as the `name` prop to see the `TodoItem` component render the props provided.

# ✅Task 04 - Managing state

Since our React app will show a list of Todo items and also allow adding new ones, it will need to maintain the application state. React allows each component to have its own **state** in addition to the **props** passed down by the parent. **State** can then be passed down to child components in the form of **props**. By default, this state cannot be shared between components, but instead it is passed down to child components in the form of props. 

## 👉Component State

A component will render whenever the state is updated, and consequently, the child components will then also re-render with the updated props data.

1. Our state will be held in the `Todos.tsx` component, and will be a collection of `Todo` items. Underneath the import of `TodoItem` in the `Todos.tsx`, add the following:

   ```typescript
   import React from 'react';
   export interface Todo {
       id: string,
       name: string,
       completed: boolean
   }
   ```

   This defines the shape of the `Todo` item that we will store in the component state.

2. To create state for a component we use the `useState` hook. Inside the `Todos` function component, add the following:

   ```typescript
   const [todos, setTodos] = React.useState<Todo[]>([{ id: "todo-1", name: "Walk the dog", completed: false }]);
   ```

   This initializes the state with a single todo item. Hooks are a React concept that allows encapsulating of logic that participates in lifecycle events of a component, and can be used inside function components. The `useState` hook returns two fields, the first is the value of the state, the second is a function that can be used to update the state.

3. Replace the return statement with the following to render the todo items:

   ```react
   return (
       <div className="todo-list">
           {todos.map((item: Todo, index: number) => {
               return (
                       <TodoItem
                           key={item.id}
                           id={item.id}
                           name={item.name}
                           completed={item.completed}
                       />
                   );
           })}
       </div>
   );
   ```

   ![image-20230919124953954](Lab%203%20-%20Introduction%20to%20React.assets/image-20230919124953954.png)

   > [!NOTE]
   >You can ignore the `ESLint` warning about `setTodos` being assigned but never used, we will use it later on.
   
4. **Save** all your files.

5. If you swap back to your browser, you should now see a single `TodoItem` rendered. 
   ![image-20230913104106947](Lab%203%20-%20Introduction%20to%20React.assets/image-20230913104106947.png)

6. Try adding more todo items to the state array that is used to initialize the todos state and see what happens. 
   E.g.

   ```typescript
   const [todos, setTodos] = React.useState<Todo[]>([
           { id: "todo-1", name: "Walk the dog", completed: false },
           { id: "todo-1", name: "Walk the cat", completed: true }
       ]);
   ```

   

## 👉Adding new items, and the importance of keys

You will notice that the `TodoItem` has a `key` prop passed down to it.
![image-20230913110034652](Lab%203%20-%20Introduction%20to%20React.assets/image-20230913110034652.png)

This is not defined in the component props interface - it is a prop that is automatically added to all React components. When rendering arrays of items, it is very important to provide a unique key so that React can identify which item is being updated in its virtual DOM and then compute the difference to the physical DOM. The virtual DOM is not the same as the physical HTML DOM and allows React to make rendering optimizations - only rendering the items and updates that are necessary. If a unique key is not provided, you will receive a warning in the browser console and React will not always update the correct component when props are changed.

If you add two `TodoItems` with the same key, you will see a message similar to the following inside the browser's developer tools debug console. You can access the debug console inside the Browser **Developer Tools** under the **Console** tab.
![image-20230913110308674](Lab%203%20-%20Introduction%20to%20React.assets/image-20230913110308674.png)

To create a unique key, we can install a library that will generate one for us.

1. At the new terminal (use `Ctrl + '` to toggle visibility), use `Ctrl + C` to stop the test harness, then use:

   ```shell
   npm install nanoid
   ```

2. At the top of  `Todos.tsx` import the library:

   ```typescript
   import { nanoid } from 'nanoid';
   ```

3. Just below `const [todos, setTodos] = ` add the following callback function that will add a new item:

   ```typescript
    const addTodo = (name: string) => {
           const newTodo = { id: 'todo-' + nanoid(), name: name, completed: false };
           setTodos((todos) => [...todos, newTodo]);
       };
   ```

   > [!NOTE]
   >
   > 1. The `id` is being set to a unique key using the call to`nanoid().`
   > 2. The `todos` state array is being updated using the `setTodos` function that was returned by the `setState` hook. When state is mutated, the component will be forced to re-render.
   > 3. We use the spread operator to return a new array with the new item so that the change is detected. See [Updating Arrays in State – React](https://react.dev/learn/updating-arrays-in-state)

4. Add a new file `src\components\AddNewTodo.tsx` and add the following code to create a component that allows adding new todo items with an HTML `button` and corresponding `input` element.

   ```react
   import React, { useState } from 'react';
   
   export interface AddNewTodoProps {
       addNew: (name: string) => void;
   }
   
   export const AddNewTodo = (props: AddNewTodoProps) => {
       const { addNew } = props;
       const [name, setName] = useState('');
   
       const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
           setName(e.target.value);
       };
   
       const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
           if (e.key === 'Enter') {
               onAddNew();
           }
       };
   
       const onAddNew = () => {
           addNew(name);
           setName('');
       };
   
       return (
           <div className="new-task">
               <input
                   id="new-todo"
                   type="text"
                   name="text"
                   placeholder="New task"
                   autoComplete="off"
                   autoFocus={true}
                   value={name}
                   onChange={handleNameChange}
                   onKeyDown={handleKeyDown}
               />
               <button type="button" title="Add Task" onClick={onAddNew}>
                   Add
               </button>
           </div>
       );
   };
   ```

   > [!INOTE]
   >
   > 1. The props are defined in the same way that we did for the `TodoItem` component and are passed in from the parent component when it is used.
   > 2. `useState` is again used to create the state that holds the name of the new item. The input element has the value attribute set to the name state value, so that when it changes, the text input is re-rendered, and the value will change in the output DOM. There is an `onChange` call-back that updates the name state (using `setName` returned from `useState`) every time the user types a value into the input element. This is called a 'controlled component' rather than an 'uncontrolled' component. Read more: [Uncontrolled Components](https://reactjs.org/docs/uncontrolled-components.html). 

5. Notice the button `onClick` event calls the `addNew` prop - this must be passed down by the parent component. Update the `Todos.tsx` component to include the following after the `<div>` and before the `todos.map()`:

   ```react
   <AddNewTodo addNew={addTodo} />
   ```

   ![image-20230919125916908](Lab%203%20-%20Introduction%20to%20React.assets/image-20230919125916908.png)

6. You will also need to import the `AddNewTodo` component using:

   ```typescript
   import { AddNewTodo } from './AddNewTodo';
   ```

7. **Save** all the files and use `npm start watch` at the terminal.

8. Switch to the browser. You should now be able to type a name in the text box and select **Add**. The item will appear in the list of `todos`. 

   > [!NOTE]
   >If you do not see the updated components, ensure you have saved all files and/or use hard refresh (`Ctrl`+`Shift`+`R`)
   
9. Inside the `F12` Developer Tools, open the `Todo.tsx` using `Ctrl+P` and place a breakpoint inside the `addTodo` function before selecting **Add** - you will see the item being added to the `todos` state. 

10. Try removing the `onChange` handler prop on the `input` HTML element in the `AddNewTodo` component - you will see that you cannot change the value since it is a *controlled component* since the value is linked to the state. Now remove the `value` prop to turn the component to be uncontrolled - you will be able to update the value, but the state is not updated and so not passed to the `onAddNew` method. Undo your changes to restore the functionality. 

## 👉Adding 'mark complete' functionality

Lastly, we can add an event handler so that the use can mark an item as complete by checking the box inside the `TodoItem` component. We already have a `onChange` call-back on the `TodoItemProps` which is called when the checkbox changes, so this simply needs to be passed down by the parent component.

1. Inside the `Todos.tsx` component, add the following event handler underneath the existing `addTodo` event handler:

   ```typescript
   const onTaskCompleted =
       (id: string) => {
           setTodos(todos.map((todo) => {
               if (todo.id === id) {
                   return { ...todo, completed: !todo.completed };
               } else {
                   return { ...todo };
               }
           }));
       };
   ```

   > [!NOTE]
   >
   > 1. This is very similar to the `addTodo` handler, except it locates an existing item using its `id`, and toggles the completed field value.
   > 2. We use the map function to transform the array so that the change is detected correctly. See [Updating Arrays in State – React](https://react.dev/learn/updating-arrays-in-state)
   > 3. When the `setTodos` is called, the `todos` state is mutated and so the component is re-rendered - and the list updated. Remember a component will re-render when its state is updated.

2. Locate the `TodoItem` **props** inside the `Todos` return statement, and add the additional `onTaskCompleted` call-back prop so that it looks like:

   ```react
   return <TodoItem
           key={item.id}
           id={item.id}
           name={item.name}
           completed={item.completed}
           onTaskCompleted={onTaskCompleted}
   />
   ```

3. **Save** your files and switch back to the browser. Now you should be able to mark items as completed! You can again put a break point in the `onTaskCompleted` method to see when it is being called.

# ✅Task 05 - Preventing unnecessary rendering

One consideration of React development is to keep an eye on performance. Whilst premature optimization can often cause more problems than it is solves, it is important to understand where you may have bottlenecks and be able to identify them. One tool for this monitoring is the React developer tools which are an add-in for your browser Developer Tools.

1. Inside Microsoft Edge, open the extensions page at [edge://extensions/](edge://extensions/)
2. Select **Get extensions for Microsoft Edge**
3. Search for `React Developer Tools.`
4. Install this add-in using **Get** -> **Add extension**
   ![image-20230913160611970](Lab%203%20-%20Introduction%20to%20React.assets/image-20230913160611970.png)
5. Switch back to your React app page, and right click on the tab and select Duplicate Tab (or use`Ctrl + Shift + K`)
6. Press `Ctrl + Shift + I` to open the **Edge Developer Tools**.
7. Inside the Developer Tools, select the **Profiler** tab:  
   ![image-20230913160921589](Lab%203%20-%20Introduction%20to%20React.assets/image-20230913160921589.png)
8. Select the **Settings** gear and under the **Profiler** tab, check **Record why each component renders while profiling**  
   ![image-20230913161037606](Lab%203%20-%20Introduction%20to%20React.assets/image-20230913161037606.png)
9. Close the Settings popup using the cross icon.
10. Select the blue circle **Start Profiling** command.
11. Select the **Add** button in your **Todos** app.
12. Select the red circle **Stop Profiling** command.
13. Select the Ranked toggle button. 
14. Select the `TodoItem` with key `todo-1` (this is the default item created in your state when initializing the array).  
    ![image-20230913161557666](Lab%203%20-%20Introduction%20to%20React.assets/image-20230913161557666.png)
15. Notice on the right under **Why did this render** - it indicates that the props (`onTaskCompleted`) have changed.
    This is perhaps surprising since it's a call-back function and why would it change? 
    Well, since the function component runs with each render by the parent, the call-back is being re-created with each render, and so the child components detects that the props have changed. This may not be an issue for simple components and small lists, but as your components grow in complexity and the number of items being rendered increases, it can start to be a necessary performance improvement. 
16. If you select the second `TodoItem`, you will notice that the reason it rendered was '*This is the first time the component rendered'.* This is fine because that is exactly what happened.
    ![image-20230913163035519](Lab%203%20-%20Introduction%20to%20React.assets/image-20230913163035519.png)

## 👉Solving 'Props changed'

In this section we will solve common rendering optimization issues.

In many cases, **props** changing (e.g. the completed state) should always cause a re-render so that the DOM can be updated to reflect the new state -  but in the case of this `onTaskCompleted` call-back, we need to ensure that the call-back method does not change between renders. This can be done with the `useCallback` hook. This hook will return a constant value no matter how many times it is called, provided none of the dependencies are updated.

1. Inside `Todos.tsx`, Locate the `addTodo` and `onTaskCompleted` call-backs and replace them with:

   ```typescript
   const addTodo = React.useCallback((name: string) => {
       const newTodo = { id: 'todo-' + nanoid(), name: name, completed: false };
       setTodos((todos) => [...todos, newTodo]);
   }, []);
   
   const onTaskCompleted = React.useCallback(
       (id: string) => {
           setTodos((todos) => {
               return todos.map((todo) => {
                   if (todo.id === id) {
                       return { ...todo, completed: !todo.completed };
                   } else {
                       return todo;
                   }
               });
           }
           );
       }, []
   );
   ```
   
   > [!NOTE]
   >
   > 1. We wrap the call-backs inside `useCallback`. This is a special hook that will always return the same value unless the dependencies change. We have no dependencies and so the second array is empty. This means that the call-backs can be passed to child components without causing them to re-render.
   > 2. An array of new items is returned so that React will correctly detect that the items have changed.
   
2. **Save** your files and switch back to the browser.

3. Select the **Clear profiling data** to start a new profile session.
   ![image-20230913162656463](Lab%203%20-%20Introduction%20to%20React.assets/image-20230913162656463.png)

4. Again, select the blue circle **Start Profiling** command.

5. Select the **Add** button in your **Todos** app.

6. Select the red circle **Stop Profiling** command.

7. Select the **Ranked** toggle button. 

8. Select the first `TodoItem` in the graph again:  
   ![image-20230913163151735](Lab%203%20-%20Introduction%20to%20React.assets/image-20230913163151735.png)

9. Notice that the **'Props changed'** message is no longer there, however there is a new message indicating that the child is still being rendered even though nothing has changed - **'The parent component rendered'**. This means, that although the props have not mutated, the child component render is still being called. 

   For very large lists of items, this may not be desirable if the rendering function includes time consuming logic. 
   React provides a simple optimisation for this using a technique called memorization when React learns how to render a component for a specific combination of input props, so the component render function does not need to be run - the memorized version is simply preserved.

## 👉Solving 'The parent component rendered' using React.memo

The `React.memo` is a higher order component that is used to wrap our component so that the output is memorized. 

1. Open the `TodoItem.tsx` component and wrap the render function in the `React.memo` function. This function will ensure that if any of the props being provided have not changed, then the component will not render and the existing DOM elements will remain (As similar technique is used in class components using `PureComponent`).

   The code will look like:

   ```react
   export const TodoItem = React.memo(({ id, name, completed, onTaskCompleted }: TodoItemProps) => {
       return (
           <div className={`todo-item ${completed ? ' completed' : ''}`}>
               <input
                   id={id}
                   type="checkbox"
                   checked={completed}
                   onChange={() => onTaskCompleted && onTaskCompleted(id)}
               />
               <label className="todo-label" htmlFor={id}>
                   {name}
               </label>
           </div>
       );
   });
   TodoItem.displayName = 'TodoItem';
   ```

   > [!NOTE]
   >
   > 1. The function component is identical except than it is now wrapped in `React.memo`
   > 2. The `displayName` added at the bottom is so that the React Developer Tools can display the components name since it is hidden by the memo function.

2. **Save** your files and switch back to the browser.

3. Again, **clear** and **profile** the app when selecting the **Add** button.

4. This time you will see that you do not see any of the existing `todo` items in the render - only the new one which will have the '*Why did this render?*' reason as '*This is the first time the component rendered*' - because it was only just added into the DOM. The page navigation on the top right allows you to show different event render trees if you add multiple tasks.
   ![image-20230913165210265](Lab%203%20-%20Introduction%20to%20React.assets/image-20230913165210265.png)

## 🎉Congratulations!

This lab will have given you both a understanding of how React components are built, as well as some understanding of what is happening under the hood so that you can ensure your components are working as expected.

Now that you have completed this lab you have learned the basics of using the React JavaScript library with TypeScript. You understand key concepts of components, props and state and how the key prop is important when rendering repeating items inside Reacts virtual DOM.

## 🌿Take it further...

Try adding validation to only allow tasks to be added when a name is provided, a delete button, and even a re-name feature!

Learn more about styling and accessibility topics: https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Client-side_JavaScript_frameworks#react_tutorials 


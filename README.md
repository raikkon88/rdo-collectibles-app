# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

**This project has been created to test storybook library and to test bit.dev tool as well.**

The purpose of this project is to check the best way to reuse components between different teams.

You can see the use of react context and react reducer.

# Definition

For rdo players which have the Collectionist role, here is a tool to track all it's collectibles. All the collections and collectibles are in spanish.

# Initialization

Clone the project, then run :

```
npm install
```

## Dependencies

- Material design react
- Storybook
- bit dependencies

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

### `npm run storybook`

Starts the storybook project on localhost:6006. Maybe you can figure some default test components added from storybook, are used as examples as well.

# Bit

**[A good tutorial to follow](https://docs.bit.dev/docs/tutorials/bit-react-tutorial#prior-knowledge)**

## Installation

Follow the steps described in [documentation](https://docs.bit.dev/docs/installation).

A Bit project has been initializad using the command `bit init` inside the root project folder.

## Configuration

First of all you have to create and configure a bit account. Use this documentation to generate this configuration. You can create an account from the page [Login page](https://bit.dev/login?redirectUri=%2F).

Then configure your bit client. Be sure bit is installed globally using `bit -v` and checking it's version.

### 1. Create a ssh key

You must create an ssh key or get an authentication token from the platform. To create an ssh key  use the next sequence :

```
cd ~/.ssh
ssh-keygen -t rsa -b 4096
```

Once key is created you can login the platform and set up the public key in [Settings -> Authentication](https://bit.dev/settings/authentication).

### 2. Configure your bit client

Configure your bit client as is described in the [configuration page](https://docs.bit.dev/docs/conf-config).

Configure the private ssh key.

```
bit config set ssh_key_file "absolute path to private key"
```

Configure the email used to create the bit account.

```
bit config set user.email "eugenio@eldelos.chistes"
```

Configure a full name.

```
bit config set user.name "Eugenio el de los chistes"
```

### 3. Test configuration

Login from the bit client using the command `bit login`. If above configurations has been properly done the client

## Track components

Bit creates a dependency map for all components tracked. To add a component to be tracked only add all it's files under an id.

```
bit add src/components/Collectible/*
```

You can check status of all tracked components with `bit status`.

## Configure build step

Configure build step for React-TypeScript. This will install some dependencies from bit.dev.

```
bit import bit.envs/compilers/react-typescript --compiler
```

Choose the react compiler that satisfies your needs (the guide suggests to install react compiler and not react-typescript compiler).

All configurations can be done in a file bit.json in the project's root folder or inside bit section on package.json. It's important to note that React and React-dom must be used as peerDependencies when a component is shared with other projects. Component assumes that React and React-dom are installed on the other projects where can be used. Inside package.json in the bit section add this peer dependencies. Relax the versions in peerdependencies as possible.

{
  "bit": {
    "env": {
      "compiler": "bit.envs/compilers/react-typescript@3.1.64"
    },
    "componentsDefaultDirectory": "components/{name}",
    "packageManager": "npm",
    "src/components/*": {
      "peerDependencies": {
        "react": "^17.0.1",
        "react-dom": "^17.0.1"
      }
    }
  }
}

## Tag and export

Set a version to all tracked components, and export to this collection.

```
bit tag --all 1.0.0
bit export raikkon88.rdo-components
```

Change the version number as you want, you can use bit to tell how does bit increase the version number for you using :

```
-p, --patch                           increment the patch version number
--minor                               increment the minor version number
--major                               increment the major version number
```

# Consume bit components

Bit dev generates a package located under de @bit scope. To use the component only needs to install the dependency from bit.

```
npm i @bit/raikkon88.rdo-components.rdo-collectibles.collectible
```

Below is an example about how to use the previowsly installed component.

```
import React from 'react';
import './App.css';

import Collectible from '@bit/raikkon88.rdo-components.rdo-collectibles.collectible'

function App() {
  return (
    <Collectible
      name="collectible 1"
      count={12}
      collection="collection 1"
      onDownArrowClick={() => console.log("click on arrow down")}
      onUpArrowClick={() => console.log("click on arrow up")}/>
  );
}
export default App;
```

# Importing

Importing a component must not be confused with the installation of a component throwgth npm. When install a component with npm it will be available to be used on the code. When importing a component with bit this component will be added to the bit workspace.

## Configure and Define a workspace folder

First create the bit repo inside the consumer project.

```
bit init
```

Define how the workspace for the consumer application must be, even you must install the compiler if you want to build the components.

```
bit import bit.envs/compilers/react-typescript --compiler
```

How does your package.json should be:

``` package.json
{
  "bit": {
    "env": {
      "compiler": "bit.envs/compilers/react-typescript@3.1.64"
    },
    "componentsDefaultDirectory": "components/{name}",
  }
}
```

If a workspace folder is not defined the path can be overritten with the option `bit import --path`

## Import the component.

You can find the url to import the component inside the bit component web page. In this case I used [This one](https://bit.dev/raikkon88/rdo-components/rdo-collectibles/collectible).

```
bit import raikkon88.rdo-components/rdo-collectibles/collectible
```

The component name is composed by `<username>.<path>/<to>/<component>`

**Important!**: Notifications on missing core dependencies are ok. You should already have those packages in your project. Extracted from [here](https://docs.bit.dev/docs/tutorials/bit-react-tutorial#prior-knowledge)

## Make needed changes.

At this point you can do all changes that you need over your new component. Bit is not a VCS and the code for the components must be stored inside your prefered VCS such as git. **Important!**: In a real project, it is recommended to commit those changes to your GitHub repository. Extracted from [here](https://docs.bit.dev/docs/tutorials/bit-react-tutorial#prior-knowledge).

## Tag and export

You can tag and export your component as it was made by the owner.

## Import updates for a component

Running bit import will notice you if there are changes on the components tracked. To join an exact version for the component or just to download the new ones run the checkout command.

```
bit checkout X.X.X <componentId>
```

This will merge the old component for the new one, at the same point you can downgrade a component using the same behavior.


## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

To learn bit, check out the [Bit documentation](https://docs.bit.dev/docs/quick-start)

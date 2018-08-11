# Node assistant

A command-line interface to assist you with your application. The package provides an interface for you to run your own custom commands. This lets you easily automate tasks like creating a file based on a template.

## Usage

### Creating an assistant file

Start by creating an `assistant` file in your project's root folder. If you wish, you can copy the file included (`./node_modules/node-assistant/assistant`). Basically it looks like this:

```js
// ./assistant
/**
 * Import package the node-assitant package
 */
const CLI = require('./index').default;

/**
 * Initialize commands
 * This is the place where you can initialize your commands.
 * First import the command file, and then add it
 * to the Commands array.
 */
// const TestCommand = require('./path/to/your/command');

const Commands = [
  // TestCommand,
];

/**
 * Initialize CLI
 * This line effectively register the list of custom
 * commands and then executes the process.
 */
CLI.registerCommands(Commands).exec();
```

With this in place, you can now call `node assistant`. If you do so, you will get a help block like:

```bash
node-assistant - v0.1.4 - by Olavo Amorim Santos

Commands:
  create:command                Create a new command
```

Now we can start creating commands!

### Creating a command

To start, lets create a new command using the node-assitant `create:command` command. This command will create a React component from a template.

First, to understand, lets check out the command's help block.:

```bash
> node assistant create:command --help
```

You should get something like:

```bash
node-assistant - v0.1.4 - by Olavo Amorim Santos

node-assistant create:command {path}

Create a new command

Options:
  path    Path to create file

Flags:
  --name, --n       Component name
  --command, --c    Command
  --description     Command's description (default: '')
  --silent, --s     Run command silently (default: false)
  --help, --h       Quick help on command
```

So this command accepts a path (which is the path where we'll create the file) and three main flags (`name`, `command` and `description`).

Our command will be store in a `./commands` folder. It will be called `CreateReactComponentCommand` and will be called by using `create:component`. So, to create our command, lets run:

```bash
node assistant create:command ./commands --name=CreateReactComponentCommand --command=create:component --description="It creates a new React component"
```

If all went well, you now have a new `./commands/CreateReactComponentCommand.js` file containing:

```js
// ./commands/CreateReactComponentCommand.js
const { BaseCommand } = require('node-assistant');

class CreateReactComponentCommand extends BaseCommand {
  run() {
    // Write your command here =)
  }
}

CreateReactComponentCommand.COMMAND = 'create:component';
CreateReactComponentCommand.DESCRIPTION = 'It creates a new React component';

CreateReactComponentCommand.OPTIONS = [
  // { name: 'OPTION NAME', description: 'OPTION DESCRIPTION' },
];

CreateReactComponentCommand.FLAGS = [
  // { name: 'FLAG NAME', alias: 'FLAG ALIAS', description: 'FLAG DESCRIPTION', default: 'FLAG DEFAULT VALUE' },
];

module.exports = CreateReactComponentCommand;
```

Lets understand this file:

- node-assistant's command are a class which extends the node-assistant's `BaseCommand` class
- Each command should contain the `run` method, which will be executed when we run the command
- The commands should have three static parameters: COMMAND, DESCRIPTION, OPTIONS and FLAGS

  - COMMAND: Defines how the command will be called by node-assistant
  - DESCRIPTION: Describes the command
  - OPTIONS: Are a list of options accepted by the command. Each option is defined by an object containing a `name` and a `description`, as shown as a comment.
  - FLAGS: Are a list of flags accepted by the command. Each flag is defined by an object containing a required key (`name`) and three optional keys (`description`, `alias` and `default`), as shown as a comment.

To use our command, we have to register it on our `assistant` file:

```js
// ./assistant

// ...rest of the file
/**
 * Initialize commands
 * This is the place where you can initialize your commands.
 * First import the command file, and then add it
 * to the Commands array.
 */
const CreateReactComponentCommand = require('./commands/CreateReactComponentCommand');

const Commands = [
  CreateReactComponentCommand,
];
// ...rest of the file
```
Now, if we run `node assistant` we should get:

```bash
node-assistant - v0.1.4 - by Olavo Amorim Santos

Commands:
  create:command                Create a new command
  create:component              It creates a new React component
```

Now that our component is registered, let's get our hands dirty! First, lets create a simple React component template file `./commands/ReactComponent.stub`:

```js
// ./commands/ReactComponent.stub
import React from 'react';

class {{ name }} extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

    };
  }

  render() {
    return (
      <div></div>
    );
  }
}

export default {{ name }};
```

This is a pretty simple component. Node-assistant uses [mustache.js](https://github.com/janl/mustache.js/) under the hood. So we can use the double curly braces to determine where variables will be included. In our case, we will include a `name` variable in a couple of places.

Now that we have our template, lets start defining our command. We want our command to accept two options: `{path}` and `{name}`. So, going back to our `./commands/CreateReactComponentCommand.js` file, lets add them to the `OPTIONS` array:

```js
CreateReactComponentCommand.OPTIONS = [
  { name: 'path', description: 'Path to create the component' },
  { name: 'name', description: 'Name of the component' },
];
```

Keep in mind that the order of the `OPTIONS` array is important. So, if we call the help block for our command:

```bash
node assistant create:component --h
node-assistant - v0.1.4 - by Olavo Amorim Santos

node-assistant create:component {path} {name}

It creates a new React component

Options:
  path    Path to create the component
  name    Name of the component

Flags:
  --silent, --s    Run command silently (default: false)
  --help, --h      Quick help on command
```

Great! With that in place, lets implement the logic in the `run` method:

```js
class CreateReactComponentCommand extends BaseCommand {
  run() {
    const { path, name } = this;
    this.createFile(`${path}/${name}.js`, './commands/ReactComponent.stub', { name });
  }
}
```

That's all we need! Lets understand the magic a bit. First, we destructure the variables `path` and `name` from the class' instance. This is possible because node-assistant automatically adds the OPTIONS and FLAGS to the instance. On the second line, we call the `createFile` method. This method accepts three arguments:

- The path of the file (with its name and extension) - `<String>`
- The path of the template file relative to the root directory - `<String>`
- The variables passed to the template - `<Object>`

With that in place, our command is ready to work! So lets create a new component called `MyComponent` in a `./components` folder:

```bash
node assistant create:component ./components MyComponent
```

If all went well, we should have a new `./components/MyComponent.js` file:

```js
import React from 'react';

class MyComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

    };
  }

  render() {
    return (
      <div></div>
    );
  }
}

export default MyComponent;
```

And that's it! Congratulations! You created your first command!

## Author

- [Olavo Amorim Santos](https://github.com/olavoasantos)

# Fork

**An educational app for musical ear training.**

This project is just a little for-fun demonstration I've produced as part of my self-training. It's primarily React and Sass, and I benefited greatly from bootstrapping with [Create React App](https://github.com/facebook/create-react-app). I also made use of [midi-sounds-react](https://github.com/surikov/midi-sounds-react) for the actual sound generation.

## Features

Right now, it's a little bare-bones. The app will select and display an interval at random, and the user can either type or play two notes that would make that interval. Feedback and help are available via nice little modal displays.

I intend to add further features, including:

- completed help messages for the existing exercise
- a splash/loading page
- another exercise that focuses on listening
- informational pages
- improved UI design
- packaging as an universal Electron app

## Use Me

Clone the repository to your local machine, then run `npm install` from the project directory. Next, run `npm start`. If this doesn't automatically open your browser, you may need to navigate to [http://localhost:3000](http://localhost:3000) to view the app.

The above runs the app in Create React App's "developer" mode. Other standard Create React App commands function normally, as well, but have no specific use for the typical end-user.

<div align="center">
  <h3 align="center">Personal Banking App</h3>

  <p align="center">
    A simple personal banking app
  </p>
</div>

## About The Project

This is a simple personal banking app meant to allow users to create accounts, deposit and withdraw money and transfer money to other users.

### Built With

The project's app was built using:

- React Native
- TypeScript
- React-Hook-Form
- React-Query

The project's backend was built using:

- Nest.js
- TypeScript
- Prisma
- PostgreSQL

<!-- GETTING STARTED -->

## Getting Started

Follow the next steps to run the project

### Prerequisites

You must have node, npm, yarn and docker installed on your machine. You also must have configured React Native to run from your device to your target device ( https://reactnative.dev/docs/environment-setup ) 

### Running the project

First you need to put the server up and running. To do that, follow the next steps:
1. Go to the server folder
```sh
cd server
```
2. Install the dependencies
```sh
yarn
```
3. Open Docker
4. Start the database container
```sh
yarn db:dev:restart
```
5. Start the server
```sh
yarn start:dev
```

Now you need to open a new terminal to put the app up and running. To do that, follow the next steps:
1. Go to the app folder
```sh
cd client
```

2. Install the dependencies
```sh
yarn
```

3. Install the pods
```sh
cd ios && pod install && cd ..
```

4. Edit src/consts/IP_address.ts and change the IP address to your machine's IP address

5. Start the app on iOS
```sh
yarn ios
```

6. Open your android emulator and start the app on Android

```sh
yarn android
```

### Important Notes

As soon as you create your account another test account will be created with the email "test@gmail.com" and the password "Password123" so you can test the transfer feature.

## Contact

Github - [rodrigof1307](https://www.github.com/rodrigof1307)

Linkedin - [Rodrigo Fernandes](https://www.linkedin.com/in/rodrigof1307/)

Twitter - [@rodrigof1307](https://twitter.com/rodrigof1307)

Email - [rodrigo.fernandes.1307@gmail.com](mailto:rodrigo.fernandes.1307@gmail.com)

# AdVenture Capitalist Clone

## Build Setup

```bash
# install dependencies
$ npm install -g firebase-tools
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start
```

## Problems/Solutions
### Persist user data
Save the user data (cash, business status) to Firestore whenever changes made.

### Managers (Run businesses automatically)
Utilizing Vue.js reactive system.

Monitor the execution status and re-execute the task 
if the manager is employed when the task is completed.

### Profit while away
You can get money which is made while away when you access to the application.

When you access to the application:
 1. Calculate "profits per milliseconds" and "time period you are away in milliseconds."
 1. Get amount of money by multiplying them.
 1. Add that amount to user data in Firestore.

This process runs before the application is loaded.

## Full-stack
This application put focus on "Creating a full-stack app"

## Technical Choices
This application is built with Nuxt.js and Firebase.
Here are reasons why I choose them:

### Frontend: Nuxt.js

 - Good to develop web applications in a short period of time.
 - Suitable for development using TypeScript (thanks to Composition API) 
 - Extensible with modules (such as PWA)
 - Built-in local server for quick testing

### Backend: Firebase

 - Firestore
   - Database that is accessible from clients directly (without any backend APIs),
so that I can save time to development full stack applications.
   - Highly adaptive to the Vue.js reactive system
 - Authentication
   - Easy to build anonymous authentication system
 - Hosting
   - Simple but good solution for hosting single page applications
 - Emulators
   - Provide local testing environment

## ToDos

### Consider better way to persist user data (especially Cash amount)
This application uses Firestore to persist user data.
Since we need to pay for each read/write operations,
Firestore is not good choice for applications like AdVenture Capitalist which read/write data so frequently.

### Secure data
Need to write Security Rules (for Firestore) before it goes production
to prevent unwanted data access.

### Testing

## Link
This application is hosted at [https://goryokaku.web.app](https://goryokaku.web.app)

> This Firebase hosted version connects real Firestore. 
>  Don't hire manager to avoid me going bankrupt :)

b. Whether the solution focuses on back-end, front-end or if it's full stack.
c. Reasoning behind your technical choices, including architectural.
d. Trade-offs you might have made, anything you left out, or what you might do
differently if you were to spend additional time on the project.
e. Link to the hosted application, if applicable.

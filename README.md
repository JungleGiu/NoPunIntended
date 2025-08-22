# 🌐 REST API and Typescript Client

## 📓 Introduction
This Exercise is about learning how to use Typescript with Node.js and to consume a REST API trough Promises and async/await fetching functions.
This repository contains a Typescript client for multiple APIs at the same time, specifically the DadJokes API [https://icanhazdadjoke.com], a weather API [https://www.weatherapi.com] and a Chuck Norris API [https://api.chucknorris.io]. The client is built using Typescript and Node.js. 

## ✅ Goals

- Learn how to use Typescript with Node.js
- Learn how to consume a REST API trough Promises and async/await fetching functions
- Display a random joke to the user
- Display a new random joke when the user clicks a button
- Make the UI more user friendly and appealing
- Save the jokesStats in local and let the user rate them (optional)
- Make the rating system editable till the user switches to another joke
- Show the wheather for the user's location
- Make the code more readable and maintainable

## 🚀 Getting started

```sh
git clone https://github.com/JungleGiu/NoPunIntended.git
cd typescript-api
npm install   # or: yarn install, or: pnpm install
npx tsc -w    # watch mode
```

Then use a local server or the Live Server extension to run the code:  
[Live Server Extension](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer)

## 📁 Folder structure
```
.
├── build
│   ├── main.js
│   ├── main.d.ts
│   ├── main.d.ts.map
│   ├── main.js.map
│   ├── types.js
│   ├── types.d.ts
│   ├── types.js.map
│   ├── types.d.ts.map
│   ├── view.d.ts
│   ├── view.js.map
│   ├── view.d.ts.map
│   └── view.js
├── index.html
├── tsconfig.json
├── package.json
├── pnpm-lock.yaml
├── .gitignore
├── README.md
├── src
│   ├── assets
│   ├── scripts
│   │   ├── types.ts
│   │   ├── main.ts
│   │   └── view.ts   
│   └── styles
│       └── style.css
└── node_modules
```

## 🧰 Tecnologies used
- Typescript
- Node.js
- pnpm
- HTML
- CSS

## ☑️ To Do
- [X] Display a random joke to the user.
- [X] Display a new random joke when the user clicks a button.
- [X] Make the UI more user friendly and appealing.
- [X] Save the jokesStats in local and let the user rate them (optional).
- [X] Make the rating system editable till the user switches to another joke.
- [X] Show the wheather for the user's location.
- [X] Make the code more readable and maintainable.
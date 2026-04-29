import { GameSavingLoader } from "./GameSavingLoader.js";
GameSavingLoader.load().then((saving) => {
    console.log(saving);
}, (error) => {
    console.error(error);
});

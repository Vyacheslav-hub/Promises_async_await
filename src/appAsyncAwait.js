import { GameSavingLoaderAsyncAwait } from "./GameSavingLoaderAsyncAwait.js";

(async () => {
    try {
        console.log( await GameSavingLoaderAsyncAwait.load())
    }catch (e) {
        console.error(e)
    }
})();

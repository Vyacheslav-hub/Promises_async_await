import json from "./parser.js";
import read from "./reader.js";

export class GameSavingLoaderAsyncAwait {
    static async load () {
        try {
            const response = await read();
            const data = await json(response);
            const obj =  JSON.parse(data);
            return ({
                'id': obj.id,
                "created": obj.created,
                "userInfo": {
                    'id': obj.userInfo.id,
                    "name": obj.userInfo.name,
                    "level": obj.userInfo.level,
                    "points": obj.userInfo.points
                }
            });
        }catch (e) {
            throw new Error(`Ошибка запроса: ${e.message}`, { cause: e })
        }
    }
}





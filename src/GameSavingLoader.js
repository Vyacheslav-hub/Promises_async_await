import json from "./parser.js";
import read from "./reader.js";

export class GameSavingLoader {
    static load () {
        return read()
            .then(response => json(response))
            .then(data => ( JSON.parse(data) ))
            .then(obj => ({
                'id': obj.id,
                "created": obj.created,
                "userInfo": {
                    'id': obj.userInfo.id,
                    "name": obj.userInfo.name,
                    "level": obj.userInfo.level,
                    "points": obj.userInfo.points
                }
            }));
    }
}

import {GameSavingLoader} from "../GameSavingLoader.js";
import read from "../reader.js";
import json from "../parser.js";

jest.mock('../reader.js');
jest.mock('../parser.js');
describe('GameSavingLoader', () => {

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('должен корректно загрузить и распарсить сохранение', async () => {
        const mockBuffer = new ArrayBuffer(10);

        const mockJsonString = JSON.stringify({
            id: 9,
            created: 1546300800,
            userInfo: {
                id: 1,
                name: 'Hitman',
                level: 10,
                points: 2000,
            },
        });

        read.mockResolvedValue(mockBuffer);
        json.mockResolvedValue(mockJsonString);

        const result = await GameSavingLoader.load();

        expect(result).toEqual({
            id: 9,
            created: 1546300800,
            userInfo: {
                id: 1,
                name: 'Hitman',
                level: 10,
                points: 2000,
            },
        });

        expect(read).toHaveBeenCalled();
        expect(json).toHaveBeenCalledWith(mockBuffer);
    });

    test('должен обработать ошибку при чтении файла', async () => {
        read.mockRejectedValue(new Error('ошибка чтения'));

        await expect(GameSavingLoader.load())
            .rejects
            .toThrow('ошибка чтения');
    });

    test('должен обработать ошибку парсинга json', async () => {
        const mockBuffer = new ArrayBuffer(10);

        read.mockResolvedValue(mockBuffer);
        json.mockRejectedValue(new Error('ошибка json'));

        await expect(GameSavingLoader.load())
            .rejects
            .toThrow('ошибка json');
    });

    test('должен упасть при некорректном JSON', async () => {
        const mockBuffer = new ArrayBuffer(10);

        read.mockResolvedValue(mockBuffer);
        json.mockResolvedValue('invalid json');

        await expect(GameSavingLoader.load())
            .rejects
            .toThrow();
    });

});

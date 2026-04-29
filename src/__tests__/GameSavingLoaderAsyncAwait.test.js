import { GameSavingLoaderAsyncAwait } from '../GameSavingLoaderAsyncAwait.js';
import read from '../reader.js';
import json from '../parser.js';

jest.mock('../reader.js');
jest.mock('../parser.js');

describe('GameSavingLoaderAsyncAwait', () => {

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('должен корректно загрузить и распарсить данные', async () => {
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

        const result = await GameSavingLoaderAsyncAwait.load();

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

    test('должен обработать ошибку read', async () => {
        read.mockRejectedValue(new Error('read error'));

        await expect(GameSavingLoaderAsyncAwait.load())
            .rejects
            .toThrow('Ошибка запроса: read error');
    });

    test('должен обработать ошибку json', async () => {
        const mockBuffer = new ArrayBuffer(10);

        read.mockResolvedValue(mockBuffer);
        json.mockRejectedValue(new Error('json error'));

        await expect(GameSavingLoaderAsyncAwait.load())
            .rejects
            .toThrow('Ошибка запроса: json error');
    });

    test('должен обработать ошибку JSON.parse', async () => {
        const mockBuffer = new ArrayBuffer(10);

        read.mockResolvedValue(mockBuffer);
        json.mockResolvedValue('invalid json');

        await expect(GameSavingLoaderAsyncAwait.load())
            .rejects
            .toThrow('Ошибка запроса');
    });

});

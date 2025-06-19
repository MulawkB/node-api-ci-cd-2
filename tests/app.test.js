const request = require('supertest');
const app = require('../server');
let server;

beforeAll((done) => {
  server = app.listen(0, done); // Démarre le serveur avant les tests
});

afterAll((done) => {
  server.close(done); // Ferme le serveur après tous les tests
});

describe ('Test the root path', () => {
    test('It should respond to the GET method', async () => {
        const response = await request(app).get('/');
        expect(response.statusCode).toBe(200);
        expect(response.text).toBe('Hello World!');
    });
});

describe('Test the /status path', () => {
    test('It Should respond with JSON containing API status', async () => {
        const response = await request(app).get('/status');
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual({ status: 'API is running' });
    });
});

describe('Test the /version path', () => {
    test('It should respond with JSON containing API version', async () => {
        const response = await request(app).get('/version');
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual({ version: '1.0.1' });
    });
});
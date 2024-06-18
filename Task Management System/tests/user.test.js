
const request = require('supertest');
const { app, connection } = require('../index');
const { UserModel } = require('../model/user.model');

let server;

beforeAll(async () => {
    await connection;
    server = app.listen(4000); 
});

afterAll(async () => {
    await UserModel.deleteMany({});
    await server.close();
});

describe('User Endpoints', () => {
    it('should register a new user', async () => {
        const res = await request(app)
            .post('/user/register')
            .send({
                username: 'testuser',
                email: 'test@example.com',
                password: 'password123',
            });
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('msg', 'The new user has been registered!');
    });

    it('should login the user', async () => {
        const res = await request(app)
            .post('/user/login')
            .send({
                email: 'test@example.com',
                password: 'password123',
            });
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('token');
    });
});

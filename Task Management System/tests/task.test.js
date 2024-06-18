
const request = require('supertest');
const { app, connection } = require('../index');
const { TaskModel } = require('../model/task.model');
const { UserModel } = require('../model/user.model');

let server;
let token;
let taskId;

beforeAll(async () => {
    await connection;
    server = app.listen(8888); 
    await UserModel.deleteMany({});
    await TaskModel.deleteMany({});

    await request(app)
        .post('/user/register')
        .send({
            username: 'testuser',
            email: 'test@example.com',
            password: 'password123',
        });

    const loginRes = await request(app)
        .post('/user/login')
        .send({
            email: 'test@example.com',
            password: 'password123',
        });

    token = loginRes.body.token;
});

afterAll(async () => {
    await UserModel.deleteMany({});
    await TaskModel.deleteMany({});
    await server.close();
});

describe('Task Endpoints', () => {
    it('should create a new task', async () => {
        const res = await request(app)
            .post('/task')
            .set('Authorization', `Bearer ${token}`)
            .send({
                title: 'Test Task',
                description: 'This is a test task',
                priority: 'High',
                status: 'Pending'
            });
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('msg', 'Task is created Successfully!');
        
        
        const taskRes = await TaskModel.findOne({ title: 'Test Task' });
        taskId = taskRes._id.toString();
    });

    it('should get all tasks', async () => {
        const res = await request(app)
            .get('/task')
            .set('Authorization', `Bearer ${token}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body.length).toBeGreaterThan(0);
    });

    it('should get a task by ID', async () => {
        const res = await request(app)
            .get(`/task/${taskId}`)
            .set('Authorization', `Bearer ${token}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('_id', taskId);
    });

    it('should update a task', async () => {
        const res = await request(app)
            .patch(`/task/${taskId}`)
            .set('Authorization', `Bearer ${token}`)
            .send({
                title: 'Updated Task Title',
            });
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('msg', 'Tasks has been updated');
    });

    it('should delete a task', async () => {
        const res = await request(app)
            .delete(`/task/${taskId}`)
            .set('Authorization', `Bearer ${token}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('msg', 'Tasks has been deleted');
    });
});

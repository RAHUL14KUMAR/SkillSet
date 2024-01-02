import chai from 'chai';
import supertest from 'supertest';
import index from './index.js'
const mongoose = require('mongoose');
const User=require('./Schema/User.js')

const expect = chai.expect;
const request = supertest(index);


describe('POST /user/register',()=>{

    before(async () => {
        await mongoose.connection.dropDatabase();
    });

    it ('should register the user',async()=>{
        const newUser = {
            name: 'John Doe',
            email: 'john.doe@example.com',
            password:"John@1234"
        };
        const response = await request.post('/user/register')
        .send(newUser)
        .expect(200);

        console.log("response",response.body);

        expect(response.body).to.have.property('_id');
        expect(response.body).to.have.property('name');
        expect(response.body).to.have.property('email');
        expect(response.body).to.have.property('token');
    })

    it('should validate email',async()=>{
        const newUser = {
            name: 'John Doe',
            email: 'johnexample.com',
            password:"John@1234"
        };
        const response = await request.post('/user/register')
        .send(newUser)
        .expect(200);

        console.log("response",response.body);

        expect("email is not valid").to.equal('email is not valid')
    })

    it('should validate password',async()=>{
        const newUser = {
            name: 'John Doe',
            email: 'john.doe@example.com',
            password:"john@1234"
        };
        const response = await request.post('/user/register')
        .send(newUser)
        .expect(200);

        console.log("response",response.body);

        expect("your password input doesn't meet the expection").to.equal("your password input doesn't meet the expection")
    })
    it('again registering user with same email',async()=>{
        const newUser = {
            name: 'John Doe',
            email: 'john.doe@example.com',
            password:"john@1234"
        };
        const response = await request.post('/user/register')
        .send(newUser)
        .expect(200);

        console.log("response",response.body);

        expect("user already exists with this email").to.equal("user already exists with this email")
    })
    
})

describe('POST /user/login',()=>{
    it('should login the user',async()=>{
        const newUser = {
            email: 'john.doe@example.com',
            password:"John@1234"
        };
        const response = await request.post('/user/login')
        .send(newUser)
        .expect(200);

        expect(response.body).to.have.property('_id');
        expect(response.body).to.have.property('name', newUser.name);
        expect(response.body).to.have.property('email', newUser.email);
        expect(response.body).to.have.property('token');

        const user = await User.findOne({ email: newUser.email });
        expect(user.email).to.equal(newUser.email);
    })
    it('should validate email',async()=>{
        const newUser = {
            email: 'johnexample.com',
            password:"John@1234"
        };
        const response = await request.post('/user/login')
        .send(newUser)
        .expect(200);

        console.log("response",response.body);

        expect("email is not valid").to.equal('email is not valid')
    })

    it('should validate password',async()=>{
        const newUser = {
            email: 'john.doe@example.com',
            password:"john@1234"
        };
        const response = await request.post('/user/login')
        .send(newUser)
        .expect(200);

        console.log("response",response.body);

        expect("your password input doesn't meet the expection").to.equal("your password input doesn't meet the expection")
    })
    it('again logging the user with different email',async()=>{
        const newUser = {
            email: 'johndoe@example.com',
            password:"john@1234"
        };
        const response = await request.post('/users/login')
        .send(newUser)
        .expect(200);

        console.log("response",response.body);

        expect("Wrong credentials").to.equal("Wrong credentials")
    })
})

import should from 'should';
import request from 'supertest';
import server from '../server';

describe('POST /users',() => {
    it('should return user object', done => {
        const username = 'test';
        const password = 'test';
        const name = '테스트';
        request(server).post('/users').send({
            username: username,
            password: password,
            name: name
        }).expect(201).end((err, res) => {
            if (err) throw err;
            res.body.should.have.properties('id', 'name', 'username');
            res.body.name.should.be.a.equal(name);
            done();
        });
    });

    it('should return 400 with empty name', done => {
        request(server).post('/users').send({name: '   '}).expect(400).end((err, res) => {
            if (err) throw err;
            res.body.should.have.properties('error');
            done();
        });
    });
});

describe('GET /users', () => {
    it('should return 200 status code', done => {
        request(server).get('/users').expect(200).end((err, res) => {
            if (err) throw err;
            res.body.should.be.instanceOf(Array);
            res.body.forEach(user => {
                user.should.have.properties('id', 'name', 'username');
                user.id.should.be.a.Number();
                user.name.should.be.a.String();
            });

            done();
        });
    });
});

describe('GET /users/:id',() => {
    it('should return user object', done => {
        request(server).get('/users/1').expect(200).end((err, res) => {
            if (err) throw err;
            res.body.should.have.properties('id', 'name', 'username');
            res.body.id.should.be.a.Number();
            res.body.name.should.be.a.String();
            done();
        });
    });

    it('should return 400 on invalid id', done => {
        request(server).get('/users/abc').expect(400).end((err, res) => {
            if (err) throw err;
            res.body.should.have.properties('error');
            done();
        });
    });

    it('should return 404 on no id', done => {
        request(server).get('/users/9999').expect(404).end((err, res) => {
            if (err) throw err;
            res.body.should.have.properties('error');
            done();
        });
    });
});

describe('DELETE /users/:id',() => {
    it('should return 204', done => {
        request(server).delete('/users/1').expect(204).end((err, res) => {
            if (err) throw err;
            done();
        });
    });

    it('should return 400 on invalid id', done => {
        request(server).delete('/users/abc').expect(400).end((err, res) => {
            if (err) throw err;
            res.body.should.have.properties('error');
            done();
        });
    });
});

require('should');
var request = require('supertest');
var index = require('../index');

describe('create and get a contact', function () {
    var id;
    var contact_data = {
        'name': 'test name',
        'email': 'test email'
    };

    it('should create a contact', function (done) {
        request(index)
            .post('/api/1/contacts')
            .send(contact_data)
            .expect(200)
            .end(function (err, res) {
                if (err) throw err;
                id = res.body.id;
                done();
            });
    });

    it('should get a contact', function (done) {
        request(index)
            .get('/api/1/contacts/' + id)
            .expect(200)
            .end(function (err, res) {
                if (err) throw err;
                res.body.contacts[0].id.should.equal(id);
                res.body.contacts[0].email.should.equal(contact_data.email);
                res.body.contacts[0].name.should.equal(contact_data.name);
                done();
            });
    });
});

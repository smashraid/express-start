var _ = require('lodash');
var Cat = require('../models/cat.js');

module.exports = function (app) {
    //_cats = [];

    /* Create */
    app.post('/cat', function (req, res) {
        var newCat = new Cat(req.body);
        newCat.save(function (err) {
            if (err) {
                res.json({ info: 'error during cat create', error: err });
            }
            res.json({ info: 'cat created successfully' });
        });
        //_cats.push(req.body);        
    });

    /* Read */

    app.get('/cat', function (req, res) {
        Cat.find(function (err, cats) {
            if (err) {
                res.json({ info: 'error during find cats', error: err });
            }
            res.json({ info: 'cat found successfully', data: cats });
        })
        //res.send(_cats);
    });

    app.get('/cat/:id', function (req, res) {
        Cat.findById(req.params.id, function (err, cat) {
            if (err) {
                res.json({ info: 'error during find cat', error: err });
            }

            if (cat) {
                //res.json({ info: 'cat found successfully', data: cat });
                setTimeout(function () {
                    res.json({ info: 'cat found successfully', data: cat });
                }, 10000);
            } else {
                res.json({ info: 'cat not found' });
            }
        });
        /*
        res.send(
            _.find(_cats, { name: req.params.id })
        );
        */
    });

    /* Update */
    app.put('/cat/:id', function (req, res) {
        Cat.findById(req.params.id, function (err, cat) {
            if (err) {
                res.json({ info: 'error during find cat', error: err });
            }
            if (cat) {
                _.merge(cat, req.body);
                cat.save(function (err) {
                    if (err) {
                        res.json({ info: 'error during update cat', error: err });
                    }
                    res.json({ info: 'cat updated successfully', data: cat });
                });
            } else {
                res.json({ info: 'cat not found' });
            }
        });
        /*
        var index = _.findIndex(_cats, { name: req.params.id });
        _.merge(_cats[index], req.body);
        res.json({ info: 'cat updated successfully' });
        */
    });

    /* Delete */
    app.delete('/cat/:id', function (req, res) {
        Cat.findByIdAndRemove(req.params.id, function (err) {
            if (err) {
                res.json({ info: 'error during remove cats', error: err });
            }
            res.json({ info: 'cat removed successfully' });
        });
        /*
        _.remove(_cats, function (cat) {
            return cat.name === req.params.id;
        });
        res.json({ info: 'cat removed successfully' });
         */
    });
}
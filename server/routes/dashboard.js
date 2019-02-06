var mongoose = require('mongoose');
var passport = require('passport');
var settings = require('../config/settings');
require('../config/passport')(passport);
var express = require('express');
var jwt = require('jsonwebtoken');
var router = express.Router();
var User = require("../models/User");
var Widget = require('../models/Widget');
var services = require('../models/Services');


router.post('/add', function(req, res) {
    if (!req.body.service || !req.body.widget) {
        res.json({success: false, msg: 'Please pass username and password.'});
    }
    var authorization = req.headers.authorization;
    var decoded = jwt.verify(authorization, settings.secret);

    var obj = {
        userEmail: decoded.email,
        service: req.body.service,
        widget: req.body.widget,
        x: req.body.x,
        y: req.body.y,
        w: req.body.w,
        h: req.body.h,
        config: req.body.config,
    }
    if (obj) {
        Widget.create(obj, function(err, widget) {
            if (err)
                return(err)
            obj['_id'] = widget._doc._id.toString();
            res.json({success: true, msg: 'Successful created new widget.', widget: obj});
        })
    }
     else  {
        return res.status(403).send({success: false, msg: 'Test.'});
    }
});

router.get('/services', function (req, res) {
    var authorization = req.headers.authorization;
    var decoded = jwt.verify(authorization, settings.secret);
    if (decoded) {
        services.find({}, function (err, serviceslist) {
            if (err)
                return res.json({success: false, msg: 'Invalid request'});
            res.json({success: true, msg: 'Successful get widgets.', services: serviceslist});

        })

    }
    else  {
        return res.status(403).send({success: false, msg: 'Error delete.'});
    }
})

router.get('/widgets', function(req, res) {
    var authorization = req.headers.authorization;
    var decoded = jwt.verify(authorization, settings.secret);
    if (decoded) {
        Widget.find({userEmail: decoded.email}, function (err, widgets) {
            if (err)
                return res.json({success: false, msg: 'Invalid request'});
            res.json({success: true, msg: 'Successful get widgets.', widget: widgets});
        })
    }
    else  {
        return res.status(403).send({success: false, msg: 'Error delete.'});
    }
})

router.put('/update', function(req, res) {
    if (!req.body._id || !req.body.service || !req.body.widget) {
        res.json({success: false, msg: 'Invalid request'});
    }
    var authorization = req.headers.authorization;
    var decoded = jwt.verify(authorization, settings.secret);
    if (decoded) {
        Widget.findByIdAndUpdate(req.body._id, req.body ,function(err, pos) {
            if (err)
                return res.json({success: false, msg: 'Invalid request'});
            res.json({success: true, msg: 'Successful Updated.', _id: req.body._id});
        })
    }
    else  {
        return res.status(403).send({success: false, msg: 'Error delete.'});
    }
});

router.post('/delete', function(req, res) {
    if (!req.body._id) {
        res.json({success: false, msg: 'Invalid request'});
    }
    var authorization = req.headers.authorization;
    var decoded = jwt.verify(authorization, settings.secret);
    if (decoded) {
        Widget.findByIdAndRemove(req.body._id, function(err, pos) {
            if (err)
                return res.json({success: false, msg: 'Invalid request'});
            return res.json({success: true, msg: 'Successful deleted.', _id: req.body._id});
        })
    }
    else  {
        return res.status(403).send({success: false, msg: 'Error delete.'});
    }
});

router.get('/about', function (req, res) { {

    var authorization = req.headers.authorization;
    var decoded = jwt.verify(authorization, settings.secret);
    var ip = (req.headers['x-forwarded-for'] || '').split(',').pop() ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress
    var req = {
        "client":
            {"host:": ip},
        "server:": {}
    }
    if (decoded) {
        Widget.find({userEmail: decoded.email}, function (err, widgets) {
            if (err)
                return res.json({success: false, msg: 'Invalid request'});
            req["server:"] = widgets;
            res.json({success: true, msg: 'Successful get widgets.', about: req});
        })
    }
    else  {
        return res.status(403).send({success: false, msg: 'Error delete.'});
    }
}

})

/*router.post('/add', passport.authenticate('jwt', {session: false}), function(req, res) {
    var token = getToken(req.header);
    //if (token) {

    //}
    return res.status(403).send({success: false, msg: 'Test.'});
});*/




getToken = function (headers) {
    if (headers && headers.authorization) {
        var parted = headers.authorization.split(' ');
        if (parted.length === 2) {
            return parted[1];
        } else {
            return null;
        }
    } else {
        return null;
    }
};

module.exports = router;

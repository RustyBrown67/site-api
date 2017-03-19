'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _express = require('express');

var _site = require('../model/site');

var _site2 = _interopRequireDefault(_site);

var _note = require('../model/note');

var _note2 = _interopRequireDefault(_note);

var _contact = require('../model/contact');

var _contact2 = _interopRequireDefault(_contact);

var _equipment = require('../model/equipment');

var _equipment2 = _interopRequireDefault(_equipment);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _authMiddleware = require('../middleware/authMiddleware');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (_ref) {
  var config = _ref.config,
      db = _ref.db;

  var api = (0, _express.Router)();

  // CRUD - Create Read Update Delete
  // '/v1/site/add' - Create
  api.post('/add', function (req, res) {
    //add word authenticate to lock down
    var newSite = new _site2.default();
    newSite.sitetype = req.body.sitetype;
    newSite.name = req.body.name;
    newSite.network = req.body.network;
    newSite.country = req.body.country;
    newSite.details = req.body.details;
    newSite.geometry.coordinates.lat = req.body.geometry.coordinates.lat;
    newSite.geometry.coordinates.long = req.body.geometry.coordinates.long;

    newSite.save(function (err) {
      if (err) {
        res.send(err);
      }
      res.json({ message: 'Site saved successfully' });
    });
  });

  // '/v1/site' - Read
  api.get('/', function (req, res) {
    _site2.default.find({}, function (err, sites) {
      if (err) {
        res.send(err);
      }
      res.json(sites);
    });
  });

  // '/v1/site/:id' - Read 1
  api.get('/:id', function (req, res) {
    _site2.default.findById(req.params.id, function (err, site) {
      if (err) {
        res.send(err);
      }
      res.json(site);
    });
  });

  // '/v1/site/:id' - Update
  api.put('/:id', function (req, res) {
    _site2.default.findById(req.params.id, function (err, site) {
      if (err) {
        res.send(err);
      }
      site.sitetype = req.body.sitetype;
      site.name = req.body.name;
      site.network = req.body.network;
      site.country = req.body.country;
      site.details = req.body.details;
      site.geometry.coordinates.lat = req.body.geometry.coordinates.lat;
      site.geometry.coordinates.long = req.body.geometry.coordinates.long;

      site.save(function (err) {
        if (err) {
          res.send(err);
        }
        res.json({ message: "Site info updated" });
      });
    });
  });

  // '/v1/site/:id' - Delete
  api.delete('/:id', function (req, res) {
    _site2.default.findById(req.params.id, function (err, site) {
      if (err) {
        res.status(500).send(err);
        return;
      }
      if (site === null) {
        res.status(404).send("Site not found");
        return;
      }
      _site2.default.remove({
        _id: req.params.id
      }, function (err, site) {
        if (err) {
          res.status(500).send(err);
          return;
        }
        _note2.default.remove({
          site: req.params.id
        }, function (err, note) {
          if (err) {
            res.status(500).send(err);
            return;
          }
        });
        _contact2.default.remove({
          site: req.params.id
        }, function (err, contact) {
          if (err) {
            res.status(500).send(err);
            return;
          }
        });
        _equipment2.default.remove({
          site: req.params.id
        }, function (err, equipment) {
          if (err) {
            res.status(500).send(err);
            return;
          }
        });
        res.json({ message: "Site and Additional Info Successfully Removed!" });
      });
    });
  });

  // add note for a specific site id
  // '/v1/site/notes/add/:id'
  api.post('/notes/add/:id', function (req, res) {
    _site2.default.findById(req.params.id, function (err, site) {
      if (err) {
        res.send(err);
      }
      var newNote = new _note2.default();

      newNote.title = req.body.title;
      newNote.text = req.body.text;
      newNote.date = req.body.date;
      newNote.site = site._id;
      newNote.save(function (err, note) {
        if (err) {
          res.send(err);
        }
        site.notes.push(newNote);
        site.save(function (err) {
          if (err) {
            res.send(err);
          }
          res.json({ message: 'Site note saved!' });
        });
      });
    });
  });

  // get notes for a specific site id
  // '/v1/site/notes/:id'
  api.get('/notes/:id', function (req, res) {
    _note2.default.find({ site: req.params.id }, function (err, notes) {
      if (err) {
        res.send(err);
      }
      res.json(notes);
    });
  });

  // '/v1/site/notes/:id' - Update
  api.put('/notes/:id', function (req, res) {
    _note2.default.findById(req.params.id, function (err, note) {
      if (err) {
        res.send(err);
      }
      note.title = req.body.title;
      note.text = req.body.text;
      note.date = req.body.date;

      note.save(function (err, note) {
        if (err) {
          res.send(err);
        }
        res.json({ message: 'Site note updated!' });
      });
    });
  });

  //Delete individual note by id
  // 'v1/site/notes/:id' - Delete
  api.delete('/notes/:id', function (req, res) {
    _note2.default.findByIdAndRemove(req.params.id, function (err, note) {
      if (err) {
        res.status(500).send(err);
        return;
      }
      if (note === null) {
        res.status(404).send("Note not found");
        return;
      }
      var siteid = note.site;
      _site2.default.findById(siteid, function (err, site) {
        site.notes.remove(req.params.id);
        //delnote.remove;
        //  Site.update({_id: {$in: site.notes}},
        //  {$pull: {note: note.siteid}});
        // site.notes.remove({
        //   _id: req.params.id
        // }, (err, site) => {
        //   if (err) {
        //     res.status(500).send(err);
        //     return;
        //   }
        // })
        //site.save((err, site) => {
        //   if (err) {
        //     res.send(err);
        //   }
        res.json({ message: 'Site note removed!' });
        //sites.reindex;
      });
      //});
    });
  });

  // add contact for a specific site id
  // '/v1/site/contacts/add/:id'
  api.post('/contacts/add/:id', function (req, res) {
    _site2.default.findById(req.params.id, function (err, site) {
      if (err) {
        res.send(err);
      }
      var newContact = new _contact2.default();

      newContact.name = req.body.name;
      newContact.telmobile = req.body.telmobile;
      newContact.email = req.body.email;
      newContact.teloffice = req.body.teloffice;
      newContact.position = req.body.position;
      newContact.site = site._id;
      newContact.save(function (err, note) {
        if (err) {
          res.send(err);
        }
        site.contacts.push(newContact);
        site.save(function (err) {
          if (err) {
            res.send(err);
          }
          res.json({ message: 'Site contact saved!' });
        });
      });
    });
  });

  // get contacts for a specific site id
  // '/v1/site/contacts/:id'
  api.get('/contacts/:id', function (req, res) {
    _contact2.default.find({ site: req.params.id }, function (err, contacts) {
      if (err) {
        res.send(err);
      }
      res.json(contacts);
    });
  });

  // add equipment for a specific site id
  // '/v1/site/equipments/add/:id'
  api.post('/equipments/add/:id', function (req, res) {
    _site2.default.findById(req.params.id, function (err, site) {
      if (err) {
        res.send(err);
      }
      var newEquipment = new _equipment2.default();

      newEquipment.equipment = req.body.equipment;
      newEquipment.company = req.body.company;
      newEquipment.contactname = req.body.contactname;
      newEquipment.contactpos = req.body.contactpos;
      newEquipment.contacttelm = req.body.contacttelm;
      newEquipment.contacttelo = req.body.contacttelo;
      newEquipment.contactemail = req.body.contactemail;
      newEquipment.text = req.body.text;
      newEquipment.site = site._id;
      newEquipment.save(function (err, equipment) {
        if (err) {
          res.send(err);
        }
        site.equipments.push(newEquipment);
        site.save(function (err) {
          if (err) {
            res.send(err);
          }
          res.json({ message: 'Site equipment saved!' });
        });
      });
    });
  });

  // get equipments for a specific site id
  // '/v1/site/equipments/:id'
  api.get('/equipments/:id', function (req, res) {
    _equipment2.default.find({ site: req.params.id }, function (err, equipments) {
      if (err) {
        res.send(err);
      }
      res.json(equipments);
    });
  });

  // retrieve all sites of a specific type
  // '/v1/site/sitetype/:sitetype'
  api.get('/sitetype/:sitetype', function (req, res) {
    _site2.default.find({ sitetype: req.params.sitetype }, function (err, sites) {
      if (err) {
        res.send(err);
      }
      res.json(sites);
    });
  });

  return api;
};
//# sourceMappingURL=site.js.map
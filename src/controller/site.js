import mongoose from 'mongoose';
import { Router } from 'express';
import Site from '../model/site';
import Note from '../model/note';
import Contact from '../model/contact';
import Equipment from '../model/equipment';
import bodyParser from 'body-parser';

import { authenticate } from '../middleware/authMiddleware';

export default({ config, db }) => {
  let api = Router();

  // CRUD - Create Read Update Delete
  // '/v1/site/add' - Create
  api.post('/add', (req, res) => { //add word authenticate to lock down
    let newSite = new Site();
    newSite.sitetype = req.body.sitetype;
    newSite.name = req.body.name;
    newSite.network = req.body.network;
    newSite.country = req.body.country;
    newSite.details = req.body.details;
    newSite.geometry.coordinates.lat = req.body.geometry.coordinates.lat;
    newSite.geometry.coordinates.long = req.body.geometry.coordinates.long;

    newSite.save(function(err) {
      if (err) {
        res.send(err);
      }
      res.json({ message: 'Site saved successfully' });
    });
  });

  // '/v1/site' - Read
  api.get('/', (req, res) => {
    Site.find({}, (err, sites) => {
      if (err) {
        res.send(err);
      }
      res.json(sites);
    });
  });

  // '/v1/site/:id' - Read 1
  api.get('/:id', (req, res) => {
    Site.findById(req.params.id, (err, site) => {
      if (err) {
        res.send(err);
      }
      res.json(site);
    });
  });

  // '/v1/site/:id' - Update
  api.put('/:id', (req, res) => {
    Site.findById(req.params.id, (err, site) => {
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

      site.save(function(err) {
        if (err) {
          res.send(err);
        }
        res.json({ message: "Site info updated"});
      });
    });
  });

  // '/v1/site/:id' - Delete
  api.delete('/:id', (req, res) => {
    Site.findById(req.params.id, (err, site) => {
      if (err) {
        res.status(500).send(err);
        return;
      }
      if (site === null) {
        res.status(404).send("Site not found");
        return;
      }
      Site.remove({
        _id: req.params.id
      }, (err, site) => {
        if (err) {
          res.status(500).send(err);
          return;
        }
        Note.remove({
          site: req.params.id
        }, (err, note) => {
          if (err) {
            res.status(500).send(err);
            return;
          }
        });
        Contact.remove({
          site: req.params.id
        }, (err, contact) => {
          if (err) {
            res.status(500).send(err);
            return;
          }
        });
        Equipment.remove({
          site: req.params.id
        }, (err, equipment) => {
          if (err) {
            res.status(500).send(err);
            return;
          }
        });
        res.json({ message: "Site and Additional Info Successfully Removed!"});
      });
    });
  });

  // add note for a specific site id
  // '/v1/site/notes/add/:id'
  api.post('/notes/add/:id', (req, res) => {
    Site.findById(req.params.id, (err, site) => {
      if (err) {
        res.send(err);
      }
      let newNote = new Note();

      newNote.title = req.body.title;
      newNote.text = req.body.text;
      newNote.date = req.body.date;
      newNote.site = site._id;
      newNote.save((err, note) => {
        if (err) {
          res.send(err);
        }
        site.notes.push(newNote);
        site.save(err => {
          if (err) {
            res.send(err);
          }
          res.json({ message: 'Site note saved!'});
        });
      });
    });
  });

  // get notes for a specific site id
  // '/v1/site/notes/:id'
  api.get('/notes/:id', (req, res) => {
    Note.find({site: req.params.id}, (err, notes) => {
      if (err) {
        res.send(err);
      }
      res.json(notes);
    });
  });

  // '/v1/site/notes/:id' - Update
  api.put('/notes/:id', (req, res) => {
    Note.findById(req.params.id, (err, note) => {
      if (err) {
        res.send(err);
      }
      note.title = req.body.title;
      note.text = req.body.text;
      note.date = req.body.date;

      note.save((err, note) => {
        if (err) {
          res.send(err);
        }
          res.json({ message: 'Site note updated!'});
      });
    });
  });

  //Delete individual note by id
  // 'v1/site/notes/:id' - Delete
  api.delete('/notes/:id', (req, res) => {
    Note.findByIdAndRemove(req.params.id, (err, note) => {
        if (err) {
            res.status(500).send(err);
            return;
        }
        if (note === null) {
            res.status(404).send("Note not found");
            return;
        }
        //let siteid = note.site;
        //res.json({ message: siteid});
        // Note.remove({
        //     _id: req.params.id
        // }, (err, note) => {
        //     if (err) {
        //         res.status(500).send(err);
        //         return;
        //     }
        // });
        //Site.findById(siteid, (err, site) => {
          //reIndex: "sites";
          // site.notes.remove({
          //   _id: req.params.id
          // }, (err, site) => {
          //   if (err) {
          //     res.status(500).send(err);
          //     return;
          //   }
          // })
          // site.save((err, site) => {
          //   if (err) {
          //     res.send(err);
          //   }
              res.json({ message: 'Site note removed!'});
              //sites.reindex;
          //  });
          });
        });
      //});

  // add contact for a specific site id
  // '/v1/site/contacts/add/:id'
  api.post('/contacts/add/:id', (req, res) => {
    Site.findById(req.params.id, (err, site) => {
      if (err) {
        res.send(err);
      }
      let newContact = new Contact();

      newContact.name = req.body.name;
      newContact.telmobile = req.body.telmobile;
      newContact.email = req.body.email;
      newContact.teloffice = req.body.teloffice;
      newContact.position = req.body.position;
      newContact.site = site._id
      newContact.save((err, note) => {
        if (err) {
          res.send(err);
        }
        site.contacts.push(newContact);
        site.save(err => {
          if (err) {
            res.send(err);
          }
          res.json({ message: 'Site contact saved!'});
        });
      });
    });
  });

  // get contacts for a specific site id
  // '/v1/site/contacts/:id'
  api.get('/contacts/:id', (req, res) => {
    Contact.find({site: req.params.id}, (err, contacts) => {
      if (err) {
        res.send(err);
      }
      res.json(contacts);
    });
  });

  // add equipment for a specific site id
  // '/v1/site/equipments/add/:id'
  api.post('/equipments/add/:id', (req, res) => {
    Site.findById(req.params.id, (err, site) => {
      if (err) {
        res.send(err);
      }
      let newEquipment = new Equipment();

      newEquipment.equipment = req.body.equipment;
      newEquipment.company = req.body.company;
      newEquipment.contactname = req.body.contactname;
      newEquipment.contactpos = req.body.contactpos;
      newEquipment.contacttelm = req.body.contacttelm;
      newEquipment.contacttelo = req.body.contacttelo;
      newEquipment.contactemail = req.body.contactemail;
      newEquipment.text = req.body.text;
      newEquipment.site = site._id
      newEquipment.save((err, equipment) => {
        if (err) {
          res.send(err);
        }
        site.equipments.push(newEquipment);
        site.save(err => {
          if (err) {
            res.send(err);
          }
          res.json({ message: 'Site equipment saved!'});
        });
      });
    });
  });

  // get equipments for a specific site id
  // '/v1/site/equipments/:id'
  api.get('/equipments/:id', (req, res) => {
    Equipment.find({site: req.params.id}, (err, equipments) => {
      if (err) {
        res.send(err);
      }
      res.json(equipments);
    });
  });

  // retrieve all sites of a specific type
  // '/v1/site/sitetype/:sitetype'
  api.get('/sitetype/:sitetype', (req, res) => {
    Site.find({sitetype: req.params.sitetype}, (err, sites) => {
      if (err) {
        res.send(err);
      }
      res.json(sites);
    });
  });

  return api;
}

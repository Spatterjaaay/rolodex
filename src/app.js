import Application from 'app/models/application';
import ApplicationView from 'app/views/application_view';
import _ from 'underscore';
import $ from 'jquery';
import Contact from 'app/models/contact.js';
import Rolodex from 'app/collections/rolodex.js';
import ContactView from 'app/views/contact_view.js';
import DetailsView from 'app/views/details_view.js';
import RolodexView from 'app/views/rolodex_view.js';
//
// var application = new Application();
//
// var appView = new ApplicationView({
//   el: '#application',
//   model: application
// });

var contactData = [
  {
    name: "Bob Belcher",
    phone: "12x3456",
    email: "bob@burgers.com"
  }, {
    name: "Louise Belcher",
    phone: "345x6789",
    email: "louise@burgers.com"
  }, {
    name: "Tina Belcher",
    phone: "0987654x",
    email: "tina@burgers.com"
  }
];

var myContact = new Contact({
  name: "Jimmy Pesto",
  phone: "4958305s",
  email: "jimmy@pesto.com"
});

var secondContact = new Contact({});

var myRolodex = new Rolodex(contactData);

$(document).ready(function(){

  var myRolodexView = new RolodexView({
    model: myRolodex,
    template: _.template($('#tmpl-contact-card').html()),
    detailsContactTemplate: _.template($('#tmpl-contact-details').html()),
    el: 'body',
  });

  myRolodexView.render();
});

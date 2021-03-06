import Backbone from 'backbone';
import _ from 'underscore';
import $ from 'jquery';
import Contact from '../models/contact.js';
import ContactView from './contact_view.js';
import DetailsView from './details_view.js';
import Rolodex from '../collections/rolodex.js';

var RolodexView = Backbone.View.extend({
  initialize: function(params) {
    this.template = params.template;
    this.detailsTemplate = params.detailsContactTemplate;
    this.listenTo(this.model, "update", this.render);
  },
  render: function() {
    this.$("#contact-cards").empty();
    var that = this;
    this.model.each(function(contact) {
      var contactView = new ContactView({
        model: contact,
        template: that.template,
        tagName: 'li'
      });

      that.$("#contact-cards").append(contactView.render().$el);

      that.listenTo(contactView, "selected", function(model) {
        var detailsView = new DetailsView({
          model: model,
          template: that.detailsTemplate
        });
      
        that.$("#contact-details").html(detailsView.render().el);
        that.$("#contact-details").show();
      });
    });
    return this;
  },
  events: {
    "click .btn-save" : "addContact",
    "click" : "hideDetails"
  },
  getFormData: function() {
    var formName = this.$("input[name=name]").val();
    this.$("input[name=name]").val('');

    var formEmail = this.$("input[name=email]").val();
    this.$("input[name=email]").val('');

    var formPhone = this.$("input[name=phone]").val();
    this.$("input[name=phone]").val('');

    return {
      name: formName,
      email: formEmail,
      phone: formPhone
    };
  },
  addContact: function() {
    var contact = new Contact(this.getFormData());
    this.model.add(contact);
  },
  hideDetails: function () {
    this.$("#contact-details").hide();
  }
});

export default RolodexView;

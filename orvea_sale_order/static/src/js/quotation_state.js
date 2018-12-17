odoo.define('orvea_sale_order.order', function (require) {
"use strict";

var core = require('web.core');
var session = require('web.session');
var ajax = require('web.ajax');
var ActionManager = require('web.ActionManager');
var view_registry = require('web.view_registry');
var Widget = require('web.Widget');
var ControlPanelMixin = require('web.ControlPanelMixin');

var AbstractRenderer = require('web.AbstractRenderer');
var config = require('web.config');
var dom = require('web.dom');
var widgetRegistry = require('web.widget_registry');

var QWeb = core.qweb;

var _t = core._t;
var _lt = core._lt;

var OrveaQuotationView = Widget.extend(ControlPanelMixin, {

	events: _.extend({}, Widget.prototype.events, {

	}),

    init: function(parent, context) {
        console.log('--------------------init--221-------------------');
        var self = this;
        this._super(parent, context);
        var state_order = '';
	self.state_order = context.data['state'];
        var construction_site = false;
	self.construction_site = context.data['construction_site'];
        var placed_agent = false;
	self.placed_agent = context.data['placed_agent'];
        var ponctual_service = false;
	self.ponctual_service = context.data['ponctual_service'];
        var montant_chiffrage = 0;
	if (self.construction_site == true) {
		self.montant_chiffrage = context.data['total_basic_construction'] + context.data['total_optional_construction'];
	}
	if (self.placed_agent == true) {
		self.montant_chiffrage = context.data['total_agent_place'];
	}
	if (self.ponctual_service == true) {
		self.montant_chiffrage = context.data['total_basic_ponctuel'] + context.data['total_optional_ponctuel'];
	}
        var end_date = '';
	self.end_date = context.data['date_order'];
        self.render();
        self.href = window.location.href;
    },

    willStart: function() {
        return $.when(ajax.loadLibs(this), this._super());
    },
    start: function() {
        console.log('------------------start-----------------------');
        var self = this;
        var state_order = '';
	self.state_order = self.state_order;
	var montant_chiffrage = 0;
	self.montant_chiffrage = self.montant_chiffrage;
        var end_date = '';
	self.end_date = self.end_date.format("DD-MM-YYYY");
        return self.$el.html(QWeb.render("orvea_sale_order.order", {widget:self}));
    },
    render: function() {
        console.log('---------------------render--------------------');
        var self = this;
        console.log(self.state_order);
        var super_render = this._super;
        var state_order = '';
	self.state_order = self.state_order;
        var amount_untaxed = 0;
	self.amount_untaxed = self.amount_untaxed;
        var end_date = '';
	self.end_date = self.end_date;
        return self.$el.html(QWeb.render("orvea_sale_order.order", {widget:self}));
    },
    reload: function () {
        console.log('---------------------reload--------------------');
        window.location.href = this.href;
    },


});
widgetRegistry.add('orvea_sale_order.order', OrveaQuotationView);
return OrveaQuotationView
});

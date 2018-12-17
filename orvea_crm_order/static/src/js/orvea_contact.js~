odoo.define('orvea_lead.contact', function (require) {
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

var OrveaContactView = Widget.extend(ControlPanelMixin, {


	events: _.extend({}, Widget.prototype.events, {
        	'click .lead_contact': 'action_lead_contact',
	}),

    init: function(parent, context) {
        console.log('--------------------init---------------------');
        var self = this;
        this._super(parent, context);
        var active_id = 1;
	var lead_id = 1;
	var lead_name = '';
	var lead_amount = 0;
	self.lead_name = context.data['name'];
	self.lead_amount = context.data['amount'];
	self.active_id = context.res_id;
	self.lead_id = context.res_id;
        self.render();
        self.href = window.location.href;
    },

    willStart: function() {
        return $.when(ajax.loadLibs(this), this._super());
    },
    start: function() {
        console.log('------------------start-----------------------');
        var self = this;
	var lead_id = 1;
	lead_id = self.lead_id;
	var lead_name = '';
	lead_name = self.lead_name;
	var lead_amount = 0;
	lead_amount = self.lead_amount;
        this._super();
	return self.$el.html(QWeb.render("orvea_lead.contact", {lead_id:lead_id, lead_name:lead_name,lead_amount:lead_amount}));
    },
    render: function() {
        console.log('---------------------render--------------------');
        var super_render = this._super;
        var self = this;
		return self.$el.html(QWeb.render("orvea_lead.contact", {widget: self}));
    },
    reload: function () {
        console.log('---------------------reload--------------------');
            window.location.href = this.href;
    },
    action_lead_contact : function(event) {
        console.log('--------------------- action_lead_contact -----------------');
        var self = this;
        var element = document.getElementsByClassName("o_group o_inner_group invisible_child_ids");
	var element_classes = element[0].classList['value'];
	if (element_classes.includes("invisible_child_ids") == true) {
                element.classList = ["o_group o_inner_group visible_child_ids"];
	}
	if (element_classes.includes("visible_child_ids") == true) {
                element.classList = ["o_group o_inner_group invisible_child_ids"];
	}

        event.stopPropagation();
        event.preventDefault();
    },
});
widgetRegistry.add('orvea_lead.contact', OrveaContactView);
return OrveaContactView
});

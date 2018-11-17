odoo.define('orvea_lead.dashboard', function (require) {
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

var OrveaDashboardView = Widget.extend(ControlPanelMixin, {

	events: _.extend({}, Widget.prototype.events, {
        	'click .lead_coming': 'action_lead_coming',
        	'click .lead_new': 'action_lead_new',
        	'click .lead_contacted': 'action_lead_contacted',
        	'click .lead_rdv': 'action_lead_rdv',
        	'click .lead_dce': 'action_lead_waiting_dce',
        	'click .lead_quotation_creation': 'action_lead_quotation_creation',
        	'click .lead_quotation_sent': 'action_lead_quotation_sent',
        	'click .lead_meeting_sale': 'action_lead_meeting_sale',
        	'click .lead_agreement': 'action_lead_agreement',
        	'click .lead_signature': 'action_lead_signature',
        	'click .lead_quotation_signed': 'action_lead_quotation_signed',
        	'click .lead_preparation_site': 'action_lead_preparation_site',
        	'click .lead_production_site': 'action_lead_production_site',
        	'click .lead_fenced': 'action_lead_fenced',
	}),

    init: function(parent, context) {
        console.log('--------------------init---------------------');
        this._super(parent, context);
        var active_id = 1;
        var state_transaction = '';
        var self = this;
	self.active_id = context.res_id;
	self.state_transaction = context.data['state_transaction'];
        self.render();
        self.href = window.location.href;
    },

    willStart: function() {
        return $.when(ajax.loadLibs(this), this._super());
    },
    start: function() {
        console.log('------------------start-----------------------');
        var self = this;
        this._super();
        var state_transaction = '';
	state_transaction = self.state_transaction;
        console.log(state_transaction);
	if (state_transaction == 'coming') {
		self.action_lead_coming();
	}
	if (state_transaction == 'new') {
		self.action_lead_new();
	}
	if (state_transaction == 'contacted') {
		self.action_lead_contacted();
	}
	if (state_transaction == 'rdv') {
		self.action_lead_rdv();
	}
	if (state_transaction == 'waiting_dce') {
		self.action_lead_waiting_dce();
	}
	if (state_transaction == 'quotation_creation') {
		self.action_lead_quotation_creation();
	}
	if (state_transaction == 'quotation_sent') {
		self.action_lead_quotation_sent();
	}
	if (state_transaction == 'meeting_sale') {
		self.action_lead_meeting_sale();
	}
	if (state_transaction == 'agreement') {
		self.action_lead_agreement();
	}
	if (state_transaction == 'signature') {
		self.action_lead_signature();
	}
	if (state_transaction == 'quotation_signed') {
		self.action_lead_quotation_signed();
	}
	if (state_transaction == 'preparation_site') {
		self.action_lead_preparation_site();
	}
	if (state_transaction == 'production_site') {
		self.action_lead_production_site();
	}
	if (state_transaction == 'fenced') {
		self.action_lead_fenced();
	}
	return self.$el.html(QWeb.render("orvea_lead.dashboard", {}));
    },
    render: function() {
        console.log('---------------------render--------------------');
        var super_render = this._super;
        var self = this;
	return self.$el.html(QWeb.render("orvea_lead.dashboard", {widget: self}));
    },
    reload: function () {
        console.log('---------------------reload--------------------');
            window.location.href = this.href;
    },

    action_lead_coming : function(event) {
        console.log('--------------------- action_lead_coming -----------------');
        var self = this;
        self._rpc({
                model: 'crm.lead',
                method: 'write',
                args: [[self.active_id], { 'state_transaction': 'coming' }],
        }, []).then(function(){
                var element = document.getElementsByClassName("input lead_coming");
                var element2 = document.getElementsByClassName("span coming");
                element[0].classList.add("input2");
                element2[0].classList = ["coming_style"];
            }).done(function(){
		});
    },

    action_lead_new : function(event) {
        console.log('--------------------- action_lead_new -----------------');
        var self = this;
        self._rpc({
                model: 'crm.lead',
                method: 'write',
                args: [[self.active_id], { 'state_transaction': 'new' }],
        }, []).done(function(){
                var test = document.getElementsByClassName("input");
		var arr = [].slice.call(test);
                var element = document.getElementsByClassName("input lead_new");
                var element2 = document.getElementsByClassName("span new");
                element[0].classList.add("input2");
                element2[0].classList = ["new_style"];
                var element3 = document.getElementsByClassName("input lead_coming");
                element3[0].classList.add("input2");
            });

    },
    action_lead_contacted : function(event) {
        console.log('--------------------- action_lead_new -----------------');
        var self = this;
        self._rpc({
                model: 'crm.lead',
                method: 'write',
                args: [[self.active_id], { 'state_transaction': 'contacted' }],
        }, []).done(function(){
                var element = document.getElementsByClassName("input lead_new");
                element[0].classList.add("input2");
                var element3 = document.getElementsByClassName("input lead_coming");
                element3[0].classList.add("input2");
                var element4 = document.getElementsByClassName("input lead_contacted");
                var element5 = document.getElementsByClassName("span contacted");
                element4[0].classList.add("input2");
                element5[0].classList = ["coming_style"];
            });
    },
    action_lead_rdv : function(event) {
        console.log('--------------------- action_lead_rdv -----------------');
        var self = this;
        self._rpc({
                model: 'crm.lead',
                method: 'write',
                args: [[self.active_id], { 'state_transaction': 'rdv' }],
        }, []).done(function(){
                var element = document.getElementsByClassName("input lead_rdv");
                var element2 = document.getElementsByClassName("span rdv");
                element[0].classList.add("input2");
                element2[0].classList = ["new_style"];
                var element3 = document.getElementsByClassName("input lead_new");
                element3[0].classList.add("input2");
                var element4 = document.getElementsByClassName("input lead_coming");
                element4[0].classList.add("input2");
                var element5 = document.getElementsByClassName("input lead_contacted");
                element5[0].classList.add("input2");
            });
    },

    action_lead_waiting_dce : function(event) {
        console.log('--------------------- action_lead_dce -----------------');
        var self = this;
        self._rpc({
                model: 'crm.lead',
                method: 'write',
                args: [[self.active_id], { 'state_transaction': 'waiting_dce' }],
        }, []).done(function(){
                var element0 = document.getElementsByClassName("input lead_dce");
                var element1 = document.getElementsByClassName("span dce");
                element0[0].classList.add("input2");
                element1[0].classList = ["coming_style"];
                var element = document.getElementsByClassName("input lead_rdv");
                element[0].classList.add("input2");
                var element3 = document.getElementsByClassName("input lead_new");
                element3[0].classList.add("input2");
                var element4 = document.getElementsByClassName("input lead_coming");
                element4[0].classList.add("input2");
                var element5 = document.getElementsByClassName("input lead_contacted");
                element5[0].classList.add("input2");
            });
    },

    action_lead_quotation_creation : function(event) {
        console.log('--------------------- action_lead_quotation_creation -----------------');
        var self = this;
        self._rpc({
                model: 'crm.lead',
                method: 'write',
                args: [[self.active_id], { 'state_transaction': 'quotation_creation' }],
        }, []).done(function(){
                var element = document.getElementsByClassName("input lead_quotation_creation");
                var element2 = document.getElementsByClassName("span quotation_creation");
                element[0].classList.add("input2");
                element2[0].classList = ["new_style"];
                var element0 = document.getElementsByClassName("input lead_dce");
                element0[0].classList.add("input2");
                var element1 = document.getElementsByClassName("input lead_rdv");
                element1[0].classList.add("input2");
                var element3 = document.getElementsByClassName("input lead_new");
                element3[0].classList.add("input2");
                var element4 = document.getElementsByClassName("input lead_coming");
                element4[0].classList.add("input2");
                var element5 = document.getElementsByClassName("input lead_contacted");
                element5[0].classList.add("input2");
            });
    },

    action_lead_quotation_sent : function(event) {
        console.log('--------------------- action_lead_quotation_sent -----------------');
        var self = this;
        self._rpc({
                model: 'crm.lead',
                method: 'write',
                args: [[self.active_id], { 'state_transaction': 'quotation_sent' }],
        }, []).done(function(){
                var element01 = document.getElementsByClassName("input lead_quotation_sent");
                var element02 = document.getElementsByClassName("span quotation_sent");
                element01[0].classList.add("input2");
                element02[0].classList = ["coming_style"];
                var element = document.getElementsByClassName("input lead_quotation_creation");
                element[0].classList.add("input2");
                var element0 = document.getElementsByClassName("input lead_dce");
                element0[0].classList.add("input2");
                var element1 = document.getElementsByClassName("input lead_rdv");
                element1[0].classList.add("input2");
                var element3 = document.getElementsByClassName("input lead_new");
                element3[0].classList.add("input2");
                var element4 = document.getElementsByClassName("input lead_coming");
                element4[0].classList.add("input2");
                var element5 = document.getElementsByClassName("input lead_contacted");
                element5[0].classList.add("input2");
            });
    },
    action_lead_meeting_sale : function(event) {
        console.log('--------------------- action_lead_meeting_sale -----------------');
        var self = this;
        self._rpc({
                model: 'crm.lead',
                method: 'write',
                args: [[self.active_id], { 'state_transaction': 'meeting_sale' }],
        }, []).done(function(){
                var element001 = document.getElementsByClassName("input lead_meeting_sale");
                var element002 = document.getElementsByClassName("span meeting_sale");
                element001[0].classList.add("input2");
                element002[0].classList = ["new_style"];
                var element01 = document.getElementsByClassName("input lead_quotation_sent");
                element01[0].classList.add("input2");
                var element = document.getElementsByClassName("input lead_quotation_creation");
                element[0].classList.add("input2");
                var element0 = document.getElementsByClassName("input lead_dce");
                element0[0].classList.add("input2");
                var element1 = document.getElementsByClassName("input lead_rdv");
                element1[0].classList.add("input2");
                var element3 = document.getElementsByClassName("input lead_new");
                element3[0].classList.add("input2");
                var element4 = document.getElementsByClassName("input lead_coming");
                element4[0].classList.add("input2");
                var element5 = document.getElementsByClassName("input lead_contacted");
                element5[0].classList.add("input2");
            });
    },

    action_lead_agreement : function(event) {
        console.log('--------------------- action_lead_agreement -----------------');
        var self = this;
        self._rpc({
                model: 'crm.lead',
                method: 'write',
                args: [[self.active_id], { 'state_transaction': 'agreement' }],
        }, []).done(function(){
                var element0001= document.getElementsByClassName("input lead_agreement");
                var element0002 = document.getElementsByClassName("span agreement");
                element0001[0].classList.add("input2");
                element0002[0].classList = ["coming_style"];
                var element001 = document.getElementsByClassName("input lead_meeting_sale");
                element001[0].classList.add("input2");
                var element01 = document.getElementsByClassName("input lead_quotation_sent");
                element01[0].classList.add("input2");
                var element = document.getElementsByClassName("input lead_quotation_creation");
                element[0].classList.add("input2");
                var element0 = document.getElementsByClassName("input lead_dce");
                element0[0].classList.add("input2");
                var element1 = document.getElementsByClassName("input lead_rdv");
                element1[0].classList.add("input2");
                var element3 = document.getElementsByClassName("input lead_new");
                element3[0].classList.add("input2");
                var element4 = document.getElementsByClassName("input lead_coming");
                element4[0].classList.add("input2");
                var element5 = document.getElementsByClassName("input lead_contacted");
                element5[0].classList.add("input2");

            });
    },
    action_lead_signature : function(event) {
        console.log('--------------------- action_lead_signature -----------------');
        var self = this;
        self._rpc({
                model: 'crm.lead',
                method: 'write',
                args: [[self.active_id], { 'state_transaction': 'signature' }],
        }, []).done(function(){
                var element_signature = document.getElementsByClassName("input lead_signature");
                var element2_signature = document.getElementsByClassName("span signature");
                element_signature[0].classList.add("input2");
                element2_signature[0].classList = ["new_style"];

                var element0001= document.getElementsByClassName("input lead_agreement");
                var element0002 = document.getElementsByClassName("span agreement");
                element0001[0].classList.add("input2");
                element0002[0].classList = ["coming_style"];
                var element001 = document.getElementsByClassName("input lead_meeting_sale");
                element001[0].classList.add("input2");
                var element01 = document.getElementsByClassName("input lead_quotation_sent");
                element01[0].classList.add("input2");
                var element = document.getElementsByClassName("input lead_quotation_creation");
                element[0].classList.add("input2");
                var element0 = document.getElementsByClassName("input lead_dce");
                element0[0].classList.add("input2");
                var element1 = document.getElementsByClassName("input lead_rdv");
                element1[0].classList.add("input2");
                var element3 = document.getElementsByClassName("input lead_new");
                element3[0].classList.add("input2");
                var element4 = document.getElementsByClassName("input lead_coming");
                element4[0].classList.add("input2");
                var element5 = document.getElementsByClassName("input lead_contacted");
                element5[0].classList.add("input2");

            });
    },
    action_lead_quotation_signed : function(event) {
        console.log('--------------------- action_lead_quotation_signed -----------------');
        var self = this;
        self._rpc({
                model: 'crm.lead',
                method: 'write',
                args: [[self.active_id], { 'state_transaction': 'quotation_signed' }],
        }, []).done(function(){
                var element_signed = document.getElementsByClassName("input lead_quotation_signed");
                var element2_signed = document.getElementsByClassName("span quotation_signed");
                element_signed[0].classList.add("input2");
                element2_signed[0].classList = ["coming_style"];
                var element_signature = document.getElementsByClassName("input lead_signature");
                element_signature[0].classList.add("input2");
                var element0001= document.getElementsByClassName("input lead_agreement");
                element0001[0].classList.add("input2");
                var element001 = document.getElementsByClassName("input lead_meeting_sale");
                element001[0].classList.add("input2");
                var element01 = document.getElementsByClassName("input lead_quotation_sent");
                element01[0].classList.add("input2");
                var element = document.getElementsByClassName("input lead_quotation_creation");
                element[0].classList.add("input2");
                var element0 = document.getElementsByClassName("input lead_dce");
                element0[0].classList.add("input2");
                var element1 = document.getElementsByClassName("input lead_rdv");
                element1[0].classList.add("input2");
                var element3 = document.getElementsByClassName("input lead_new");
                element3[0].classList.add("input2");
                var element4 = document.getElementsByClassName("input lead_coming");
                element4[0].classList.add("input2");
                var element5 = document.getElementsByClassName("input lead_contacted");
                element5[0].classList.add("input2");
            });
    },
    action_lead_preparation_site : function(event) {
        console.log('--------------------- action_lead_preparation_site -----------------');
        var self = this;
        self._rpc({
                model: 'crm.lead',
                method: 'write',
                args: [[self.active_id], { 'state_transaction': 'preparation_site' }],
        }, []).done(function(){
                var element = document.getElementsByClassName("input lead_preparation_site");
                var element2 = document.getElementsByClassName("span preparation_site");
                element[0].classList.add("input2");
                element2[0].classList = ["new_style"];
                var element_signed = document.getElementsByClassName("input lead_quotation_signed");
                element_signed[0].classList.add("input2");
                var element_signature = document.getElementsByClassName("input lead_signature");
                element_signature[0].classList.add("input2");
                var element0001= document.getElementsByClassName("input lead_agreement");
                element0001[0].classList.add("input2");
                var element001 = document.getElementsByClassName("input lead_meeting_sale");
                element001[0].classList.add("input2");
                var element01 = document.getElementsByClassName("input lead_quotation_sent");
                element01[0].classList.add("input2");
                var element = document.getElementsByClassName("input lead_quotation_creation");
                element[0].classList.add("input2");
                var element0 = document.getElementsByClassName("input lead_dce");
                element0[0].classList.add("input2");
                var element1 = document.getElementsByClassName("input lead_rdv");
                element1[0].classList.add("input2");
                var element3 = document.getElementsByClassName("input lead_new");
                element3[0].classList.add("input2");
                var element4 = document.getElementsByClassName("input lead_coming");
                element4[0].classList.add("input2");
                var element5 = document.getElementsByClassName("input lead_contacted");
                element5[0].classList.add("input2");
            });
    },

    action_lead_production_site : function(event) {
        console.log('--------------------- action_lead_production_site -----------------');
        var self = this;
        self._rpc({
                model: 'crm.lead',
                method: 'write',
                args: [[self.active_id], { 'state_transaction': 'production_site' }],
        }, []).done(function(){
                var element = document.getElementsByClassName("input lead_production_site");
                var element2 = document.getElementsByClassName("span production_site");
                element[0].classList.add("input2");
                element2[0].classList = ["coming_style"];
                var element = document.getElementsByClassName("input lead_preparation_site");
                element[0].classList.add("input2");
                var element_signed = document.getElementsByClassName("input lead_quotation_signed");
                element_signed[0].classList.add("input2");
                var element_signature = document.getElementsByClassName("input lead_signature");
                element_signature[0].classList.add("input2");
                var element0001= document.getElementsByClassName("input lead_agreement");
                element0001[0].classList.add("input2");
                var element001 = document.getElementsByClassName("input lead_meeting_sale");
                element001[0].classList.add("input2");
                var element01 = document.getElementsByClassName("input lead_quotation_sent");
                element01[0].classList.add("input2");
                var element = document.getElementsByClassName("input lead_quotation_creation");
                element[0].classList.add("input2");
                var element0 = document.getElementsByClassName("input lead_dce");
                element0[0].classList.add("input2");
                var element1 = document.getElementsByClassName("input lead_rdv");
                element1[0].classList.add("input2");
                var element3 = document.getElementsByClassName("input lead_new");
                element3[0].classList.add("input2");
                var element4 = document.getElementsByClassName("input lead_coming");
                element4[0].classList.add("input2");
                var element5 = document.getElementsByClassName("input lead_contacted");
                element5[0].classList.add("input2");
            });
    },
    action_lead_fenced : function(event) {
        console.log('--------------------- action_lead_fenced -----------------');
        var self = this;
        console.log('self.id');
        console.log(self);  
        console.log(event);     
        console.log(this);   
        self._rpc({
                model: 'crm.lead',
                method: 'write',
                args: [[self.active_id], { 'state_transaction': 'fenced' }],
        }, []).done(function(){
                var element = document.getElementsByClassName("input lead_fenced");
                var element2 = document.getElementsByClassName("span fenced");
                element[0].classList.add("input2");
                element2[0].classList = ["new_style"];
                var element = document.getElementsByClassName("input lead_production_site");
                element[0].classList.add("input2");
                var element = document.getElementsByClassName("input lead_preparation_site");
                element[0].classList.add("input2");
                var element_signed = document.getElementsByClassName("input lead_quotation_signed");
                element_signed[0].classList.add("input2");
                var element_signature = document.getElementsByClassName("input lead_signature");
                element_signature[0].classList.add("input2");
                var element0001= document.getElementsByClassName("input lead_agreement");
                element0001[0].classList.add("input2");
                var element001 = document.getElementsByClassName("input lead_meeting_sale");
                element001[0].classList.add("input2");
                var element01 = document.getElementsByClassName("input lead_quotation_sent");
                element01[0].classList.add("input2");
                var element = document.getElementsByClassName("input lead_quotation_creation");
                element[0].classList.add("input2");
                var element0 = document.getElementsByClassName("input lead_dce");
                element0[0].classList.add("input2");
                var element1 = document.getElementsByClassName("input lead_rdv");
                element1[0].classList.add("input2");
                var element3 = document.getElementsByClassName("input lead_new");
                element3[0].classList.add("input2");
                var element4 = document.getElementsByClassName("input lead_coming");
                element4[0].classList.add("input2");
                var element5 = document.getElementsByClassName("input lead_contacted");
                element5[0].classList.add("input2");
            });
    },

});
widgetRegistry.add('orvea_lead.dashboard', OrveaDashboardView);
//core.action_registry.add('orvea_lead.dashboard', OrveaDashboardView);
return OrveaDashboardView
});

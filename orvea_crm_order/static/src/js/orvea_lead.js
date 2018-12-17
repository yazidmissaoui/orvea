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
        console.log('--------------------init-1--------------------');
        this._super(parent, context);
        var active_id = 1;
        var state_transaction = '';
        var self = this;
	self.active_id = context.res_id;
	self.state_transaction = context.data['state_transaction']['res_id'];
        self._rpc({
                model: 'crm.lead',
                method: 'get_name_state',
                args: [[self.active_id,context.data['state_transaction']['res_id']]],
        }, []).done(function(result){
		if (result['state_transaction'] == 'A VENIR - RÉFÉRENCEMENT') {
			state_transaction = 'coming';
		}
		if (result['state_transaction'] == 'Nouveau') {
			state_transaction = 'new';
		}
		if (result['state_transaction'] == 'Contacté') {
			state_transaction = 'contacted';
		}
		if (result['state_transaction'] == 'RDV Présentationé') {
			state_transaction = 'rdv';
		}
		if (result['state_transaction'] == 'En attente DCE') {
			state_transaction = 'waiting_dce';
		}
		if (result['state_transaction'] == 'Création Devis') {
			state_transaction = 'quotation_creation';
		}
		if (result['state_transaction'] == 'Devis Envoyé') {
			state_transaction = 'quotation_sent';
		}
		if (result['state_transaction'] == 'RDV Vente, Recalage Devis') {
			state_transaction = 'meeting_sale';
		}
		if (result['state_transaction'] == 'Accord de principe') {
			state_transaction = 'agreement';
		}
		if (result['state_transaction'] == 'Suivi signature') {
			state_transaction = 'signature';
		}
		if (result['state_transaction'] == 'Devis Signé') {
			state_transaction = 'quotation_signed';
		}
		if (result['state_transaction'] == 'Préparation chantier') {
			state_transaction = 'preparation_site';
		}
		if (result['state_transaction'] == 'Production chantier') {
			state_transaction = 'production_site';
		}
		if (result['state_transaction'] == 'Clôture') {
			state_transaction = 'fenced';
		}
		self.state_transaction = state_transaction;
        	self.render();
        	self.href = window.location.href;
        	console.log('--------------------init-2--------------------');
        	console.log(self.state_transaction);
	});
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
        self._rpc({
                model: 'crm.lead',
                method: 'get_name_state',
                args: [[self.active_id,state_transaction]],
        }, []).done(function(result){
		
		if (result['state_transaction'] == 'A VENIR - RÉFÉRENCEMENT') {
			state_transaction = 'coming';
			self.action_lead_coming();
		}
		if (result['state_transaction'] == 'Nouveau') {
			state_transaction = 'new';
			self.action_lead_new();
		}
		if (result['state_transaction'] == 'Contacté') {
			state_transaction = 'contacted';
			self.action_lead_contacted();
		}
		if (result['state_transaction'] == 'RDV Présentationé') {
			state_transaction = 'rdv';
			self.action_lead_rdv();
		}
		if (result['state_transaction'] == 'En attente DCE') {
			state_transaction = 'waiting_dce';
			self.action_lead_waiting_dce();
		}
		if (result['state_transaction'] == 'Création Devis') {
			state_transaction = 'quotation_creation';
			self.action_lead_quotation_creation();
		}
		if (result['state_transaction'] == 'Devis Envoyé') {
			state_transaction = 'quotation_sent';
			self.action_lead_quotation_sent();
		}
		if (result['state_transaction'] == 'RDV Vente, Recalage Devis') {
			state_transaction = 'meeting_sale';
			self.action_lead_meeting_sale();
		}
		if (result['state_transaction'] == 'Accord de principe') {
			state_transaction = 'agreement';
			self.action_lead_agreement();
		}
		if (result['state_transaction'] == 'Suivi signature') {
			state_transaction = 'signature';
			self.action_lead_signature();
		}
		if (result['state_transaction'] == 'Devis Signé') {
			state_transaction = 'quotation_signed';
			self.action_lead_quotation_signed();
		}
		if (result['state_transaction'] == 'Préparation chantier') {
			state_transaction = 'preparation_site';
			self.action_lead_preparation_site();
		}
		if (result['state_transaction'] == 'Production chantier') {
			state_transaction = 'production_site';
			self.action_lead_production_site();
		}
		if (result['state_transaction'] == 'Clôture') {
			state_transaction = 'fenced';
			self.state_transaction = 'fenced';
		}
            })
	console.log('**************************************')
	console.log(state_transaction)
	return self.$el.html(QWeb.render("orvea_lead.dashboard", {widget: self}));
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
	var state_transaction = 'A VENIR - RÉFÉRENCEMENT'
        self._rpc({
                model: 'crm.lead',
                method: 'get_state',
                args: [[self.active_id,state_transaction]],
        }, []).then(function(result){
		console.log('test values');
		console.log(result['transaction_id']);
		self._rpc({
		        model: 'crm.lead',
		        method: 'write',
		        args: [[self.active_id], { 'state_transaction': result['transaction_id'] }],
		}, []).done(function(){
		        var element = document.getElementsByClassName("input lead_coming");
		        var element2 = document.getElementsByClassName("span coming");
		        element[0].classList.add("input2");
		        element2[0].classList = ["coming_style"];

		});
	});
    },

    action_lead_new : function(event) {
        console.log('--------------------- action_lead_new -----------------');
        var self = this;
	var state_transaction = 'Nouveau'
        self._rpc({
                model: 'crm.lead',
                method: 'get_state',
                args: [[self.active_id,state_transaction]],
        }, []).then(function(result){
		self._rpc({
		        model: 'crm.lead',
		        method: 'write',
		        args: [[self.active_id], { 'state_transaction': result['transaction_id'] }],
		}, []).then(function(){
		        var test = document.getElementsByClassName("input");
			var arr = [].slice.call(test);
		        var element = document.getElementsByClassName("input lead_new");
		        var element2 = document.getElementsByClassName("span new");
		        element[0].classList.add("input2");
		        element2[0].classList = ["new_style"];
		        var element3 = document.getElementsByClassName("input lead_coming");
		        element3[0].classList.add("input2");
		    }).done(function(){
		});

	});
    },
    action_lead_contacted : function(event) {
        console.log('--------------------- action_lead_new -----------------');
        var self = this;
	var state_transaction = 'Contacté'
        self._rpc({
                model: 'crm.lead',
                method: 'get_state',
                args: [[self.active_id,state_transaction]],
        }, []).then(function(result){
		self._rpc({
		        model: 'crm.lead',
		        method: 'write',
		        args: [[self.active_id], { 'state_transaction': result['transaction_id'] }],
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
	});
    },
    action_lead_rdv : function(event) {
        console.log('--------------------- action_lead_rdv -----------------');
        var self = this;
	var state_transaction = 'RDV Présentationé'
        self._rpc({
                model: 'crm.lead',
                method: 'get_state',
                args: [[self.active_id,state_transaction]],
        }, []).then(function(result){
		self._rpc({
		        model: 'crm.lead',
		        method: 'write',
		        args: [[self.active_id], { 'state_transaction': result['transaction_id'] }],
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
	});
    },

    action_lead_waiting_dce : function(event) {
        console.log('--------------------- action_lead_dce -----------------');
        var self = this;
	var state_transaction = 'En attente DCE'
        self._rpc({
                model: 'crm.lead',
                method: 'get_state',
                args: [[self.active_id,state_transaction]],
        }, []).then(function(result){
		self._rpc({
		        model: 'crm.lead',
		        method: 'write',
		        args: [[self.active_id], { 'state_transaction': result['transaction_id'] }],
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
	});
    },

    action_lead_quotation_creation : function(event) {
        console.log('--------------------- action_lead_quotation_creation -----------------');
        var self = this;
	var state_transaction = 'Création Devis'
        self._rpc({
                model: 'crm.lead',
                method: 'get_state',
                args: [[self.active_id,state_transaction]],
        }, []).then(function(result){
		self._rpc({
		        model: 'crm.lead',
		        method: 'write',
		        args: [[self.active_id], { 'state_transaction': result['transaction_id'] }],
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
	});
    },

    action_lead_quotation_sent : function(event) {
        console.log('--------------------- action_lead_quotation_sent -----------------');
        var self = this;
	var state_transaction = 'Devis Envoyé'
        self._rpc({
                model: 'crm.lead',
                method: 'get_state',
                args: [[self.active_id,state_transaction]],
        }, []).then(function(result){
		self._rpc({
		        model: 'crm.lead',
		        method: 'write',
		        args: [[self.active_id], { 'state_transaction': result['transaction_id'] }],
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
	});

    },
    action_lead_meeting_sale : function(event) {
        console.log('--------------------- action_lead_meeting_sale -----------------');
        var self = this;
	var state_transaction = 'RDV Vente, Recalage Devis'
        self._rpc({
                model: 'crm.lead',
                method: 'get_state',
                args: [[self.active_id,state_transaction]],
        }, []).then(function(result){
		self._rpc({
		        model: 'crm.lead',
		        method: 'write',
		        args: [[self.active_id], { 'state_transaction': result['transaction_id'] }],
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
	});
    },

    action_lead_agreement : function(event) {
        console.log('--------------------- action_lead_agreement -----------------');
        var self = this;
	var state_transaction = 'Accord de principe'
        self._rpc({
                model: 'crm.lead',
                method: 'get_state',
                args: [[self.active_id,state_transaction]],
        }, []).then(function(result){
		self._rpc({
		        model: 'crm.lead',
		        method: 'write',
		        args: [[self.active_id], { 'state_transaction': result['transaction_id'] }],
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
	});
    },
    action_lead_signature : function(event) {
        console.log('--------------------- action_lead_signature -----------------');
        var self = this;
	var state_transaction = 'Suivi signature'
        self._rpc({
                model: 'crm.lead',
                method: 'get_state',
                args: [[self.active_id,state_transaction]],
        }, []).then(function(result){
		self._rpc({
		        model: 'crm.lead',
		        method: 'write',
		        args: [[self.active_id], { 'state_transaction': result['transaction_id'] }],
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
	});
    },
    action_lead_quotation_signed : function(event) {
        console.log('--------------------- action_lead_quotation_signed -----------------');
        var self = this;
	var state_transaction = 'Devis Signé'
        self._rpc({
                model: 'crm.lead',
                method: 'get_state',
                args: [[self.active_id,state_transaction]],
        }, []).then(function(result){
		self._rpc({
		        model: 'crm.lead',
		        method: 'write',
		        args: [[self.active_id], { 'state_transaction': result['transaction_id'] }],
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
	});
    },
    action_lead_preparation_site : function(event) {
        console.log('--------------------- action_lead_preparation_site -----------------');
        var self = this;
	var state_transaction = 'Préparation chantier'
        self._rpc({
                model: 'crm.lead',
                method: 'get_state',
                args: [[self.active_id,state_transaction]],
        }, []).then(function(result){
		self._rpc({
		        model: 'crm.lead',
		        method: 'write',
		        args: [[self.active_id], { 'state_transaction': result['transaction_id'] }],
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
	});
    },

    action_lead_production_site : function(event) {
        console.log('--------------------- action_lead_production_site -----------------');
        var self = this;
	var state_transaction = 'Production chantier'
        self._rpc({
                model: 'crm.lead',
                method: 'get_state',
                args: [[self.active_id,state_transaction]],
        }, []).then(function(result){
		self._rpc({
		        model: 'crm.lead',
		        method: 'write',
		        args: [[self.active_id], { 'state_transaction': result['transaction_id'] }],
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
	});
    },
    action_lead_fenced : function(event) {
        console.log('--------------------- action_lead_fenced -----------------');
        var self = this;
	var state_transaction = 'Clôture'
        self._rpc({
                model: 'crm.lead',
                method: 'get_state',
                args: [[self.active_id,state_transaction]],
        }, []).then(function(result){
		self._rpc({
		        model: 'crm.lead',
		        method: 'write',
		        args: [[self.active_id], { 'state_transaction': result['transaction_id'] }],
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
	});
    },

});
widgetRegistry.add('orvea_lead.dashboard', OrveaDashboardView);
//core.action_registry.add('orvea_lead.dashboard', OrveaDashboardView);
return OrveaDashboardView
});

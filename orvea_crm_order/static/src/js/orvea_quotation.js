odoo.define('orvea_lead.quotation', function (require) {
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
        	'click .open_quotation': 'action_open_quotation',
	        'click .create_order': 'action_create_order',
	}),

    init: function(parent, context) {
        console.log('--------------------init---------------------');
        var self = this;
        this._super(parent, context);
        var active_id = 1;
	var lead_id = 1;
	var lead_name = '';
	var lead_amount = 0;
	var lead_state = '';
	self.lead_name = context.data['name'];
	self.lead_state = context.data['state_transaction'];
	self.lead_amount = context.data['amount'];
	var mo_identification = '';
        var mo_identification_street =  '';
        var mo_identification_street2 = '';
        var mo_identification_zip = '';
        var mo_identification_city = '';
	var mo_id = 0; 
	if (context.data['mo_identification'] != false) {
		self.mo_identification = context.data['mo_identification']['data']['display_name'];
		mo_id = context.data['mo_identification']['data']['id'];
		self._rpc({
		        model: 'crm.lead',
		        method: 'get_adress_mo',
			args: [mo_id],
		    }, []).done(function(result){
		        self.mo_identification_street =  result['mo_identification_street'];
		        self.mo_identification_street2 = result['mo_identification_street2'];
		        self.mo_identification_zip = result['mo_identification_zip'];
		        self.mo_identification_city = result['mo_identification_city'];
			self.active_id = context.res_id;
			self.lead_id = context.res_id;
        		self.render();
        		self.href = window.location.href;
		});
	}
	else {
		self.active_id = context.res_id;
		self.lead_id = context.res_id;
		self.render();
		self.href = window.location.href;
	}
    },

    willStart: function() {
        return $.when(ajax.loadLibs(this), this._super());
    },
    start: function() {
        console.log('------------------start-----------------------');
        var self = this;
        console.log('------------  self  ---------');
        console.log(self);
	var lead_id = 1;
	lead_id = self.lead_id;
	var lead_name = '';
	lead_name = self.lead_name;
	var lead_amount = 0;
	lead_amount = self.lead_amount;
	var mo_identification = '';
	mo_identification = self.mo_identification;
	var mo_identification_street = '';
	var mo_identification_street2 = '';
	var mo_identification_zip = '';
	var mo_identification_city = '';
	mo_identification_street = self.mo_identification_street;
	mo_identification_street2 = self.mo_identification_street2;
	mo_identification_zip = self.mo_identification_zip;
	mo_identification_city = self.mo_identification_city;
	var lead_state = '';
	lead_state = self.lead_state;
        this._super();
	return self.$el.html(QWeb.render("orvea_lead.quotation", {widget:self}));
    },
    render: function() {
        console.log('---------------------render--------------------');
        var super_render = this._super;
        var self = this;
		return self.$el.html(QWeb.render("orvea_lead.quotation", {widget: self}));
    },
    reload: function () {
        console.log('---------------------reload--------------------');
            window.location.href = this.href;
    },
    action_open_quotation: function(event) {
        var self = this;
        console.log('---------------------  open_quotation  -----------------');
        var quotation_data = [];
        self._rpc({
                model: 'crm.lead',
                method: 'get_data_info',
            }, []).then(function(result){
                quotation_data = result
        }).done(function(result){
		console.log(self);
		event.stopPropagation();
		event.preventDefault();
		var view_form_id = quotation_data.sale_order_form_view
		var view_tree_id = quotation_data.sale_order_tree_view
		var lead_id = quotation_data.lead_id
		console.log('-------------------  quotation_data  ---------------------');
		self.do_action({
			    name: _t("Créér Devis Logistique"),
			    type: 'ir.actions.act_window',
			    res_model: 'sale.order',
			    view_mode: 'form',
			    view_type: 'form',
			    views: [[view_form_id, 'form']],
			    context: {
					'default_lead_id': self.lead_id,
					//'default_construction_site': true,
					//'default_placed_agent': false,
					//'default_ponctual_service': false,
				    },
			    domain: [[],],
			    target: 'current'
			})
	})

    },
    action_create_order: function(event) {
        var self = this;
        console.log('---------------------  create_order  -----------------');
        var quotation_data = [];
        self._rpc({
                model: 'crm.lead',
                method: 'get_data_info',
            }, []).then(function(result){
                quotation_data = result
        }).done(function(result){
		console.log(self);
		event.stopPropagation();
		event.preventDefault();
		var view_form_id = quotation_data.sale_order_form_view
		var view_tree_id = quotation_data.sale_order_tree_view
		var lead_id = quotation_data.lead_id
		console.log('-------------------  quotation_data  ---------------------');
		self.do_action({
			    name: _t("Création Devis"),
			    type: 'ir.actions.act_window',
			    res_model: 'sale.order',
			    view_mode: 'form',
			    view_type: 'form',
			    views: [[view_form_id, 'form']],
			    context: {
					'default_lead_id': self.lead_id
				    },
			    domain: [[],],
			    target: 'new'
			})
	})

    },

});
widgetRegistry.add('orvea_lead.quotation', OrveaQuotationView);
return OrveaQuotationView
});

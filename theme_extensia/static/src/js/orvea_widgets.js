odoo.define('orvea_widgets_menu', function (require) {
"use strict";

var core = require('web.core');
var session = require('web.session');
var ajax = require('web.ajax');
var ActionManager = require('web.ActionManager');
var view_registry = require('web.view_registry');
var Widget = require('web.Widget');
var SystrayMenu = require('web.SystrayMenu');
var ControlPanelMixin = require('web.ControlPanelMixin');

var QWeb = core.qweb;

var _t = core._t;
var _lt = core._lt;


var reminder_menu = Widget.extend({
    template : 'orvea_widgets_menu',
    events: {
    },

    init: function(parent, context) {
	console.log('------ INIT  -----');
        this._super(parent, context);
       	var self = this;
       	self.render();
       	self.href = window.location.href;
    },

    willStart: function() {
         return $.when(ajax.loadLibs(this), this._super());
    },

    start: function() {
	console.log('------ START  -----');
        var self = this;
        return this._super();
    },
    render: function() {
	console.log('------  RENDER  -----');
        var super_render = this._super;
        var self = this;
        var orvea_dashboard = QWeb.render( 'orvea_widgets_menu', {
            widget: self,
        });
        $( ".o_control_panel" ).addClass( "o_hidden" );
        $(orvea_dashboard).prependTo(self.$el);
        return orvea_dashboard
    },

    reload: function () {
            window.location.href = this.href;
    },

});
SystrayMenu.Items.push(reminder_menu);
var reminder_menu_list = Widget.extend({
    template : 'orvea_widgets_menu_list',
    events: {
    },

    init: function(parent, context) {
	console.log('------ INIT  -----');
        this._super(parent, context);
       	var self = this;
       	self.render();
       	self.href = window.location.href;
    },

    willStart: function() {
         return $.when(ajax.loadLibs(this), this._super());
    },

    start: function() {
	console.log('------ START  -----');
        var self = this;
        return this._super();
    },
    render: function() {
	console.log('------  RENDER  -----');
        var super_render = this._super;
        var self = this;
        var orvea_dashboard = QWeb.render( 'orvea_widgets_menu', {
            widget: self,
        });
        $( ".o_control_panel" ).addClass( "o_hidden" );
        $(orvea_dashboard).prependTo(self.$el);
        return orvea_dashboard
    },

    reload: function () {
            window.location.href = this.href;
    },

});
SystrayMenu.Items.push(reminder_menu_list);

});

console.log('-----------  test me  --------------');
odoo.define('webclient_bootstrap', function (require) {
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
var OrveaCalendarView = Widget.extend(ControlPanelMixin, {

    template: 'webclient_bootstrap',

    init: function(parent, context) {
        console.log('--------------------init--OrveaContactView-------------------');
        var self = this;
        this._super(parent, context);
        self.render();
        self.href = window.location.href;
    },
    start: function() {
        console.log('------------------start-----------------------');
        var self = this;
        this._super();
	return self.$el.html(QWeb.render("test", {widget: self}));
    },
    render: function() {
        console.log('---------------------render--------------------');
        var super_render = this._super;
        var self = this;
	return self.$el.html(QWeb.render("test", {widget: self}));
    },
    reload: function () {
        console.log('---------------------reload--------------------');
        window.location.href = this.href;
    },
});
widgetRegistry.add('webclient_bootstrap', OrveaCalendarView);
console.log('******************************');
console.log(OrveaCalendarView);
return OrveaCalendarView
});

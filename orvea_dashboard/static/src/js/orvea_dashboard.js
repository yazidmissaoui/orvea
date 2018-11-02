odoo.define('orvea_dashboard.dashboard', function (require) {
"use strict";

var core = require('web.core');
var session = require('web.session');
var ajax = require('web.ajax');
var ActionManager = require('web.ActionManager');
var view_registry = require('web.view_registry');
var Widget = require('web.Widget');
var ControlPanelMixin = require('web.ControlPanelMixin');

var QWeb = core.qweb;

var _t = core._t;
var _lt = core._lt;

var OrveaDashboardView = Widget.extend(ControlPanelMixin, {

	events: _.extend({}, Widget.prototype.events, {

        'click .project_task_list': 'action_project_task_list',
        'click .project_meeting_list': 'action_project_meeting_list',
        'click .project_call_list': 'action_project_call_list',

        'click .project_task_new': 'action_project_task_new',
        'click .project_meeting_new': 'action_project_meeting_new',
        'click .project_call_new': 'action_project_call_new',

        'click .project_task_list_today': 'action_project_task_list_today',
        'click .project_meeting_list_today': 'action_project_meeting_list_today',
        'click .project_call_list_today': 'action_project_call_list_today',
	}),
	init: function(parent, context) {
        this._super(parent, context);
        var project_data = [];
        var self = this;
        if (context.tag == 'orvea_dashboard.dashboard') {
            self._rpc({
                model: 'orvea.dashboard',
                method: 'get_data_info',
            }, []).then(function(result){
		console.log('------------------------  data  -------------------------');
		console.log(result.project_tasks_count);
                self.project_data = result
            }).done(function(){
                self.render();
                self.href = window.location.href;
            });
        }
    },
    willStart: function() {
         return $.when(ajax.loadLibs(this), this._super());
    },
    start: function() {
        var self = this;
        return this._super();
    },
    render: function() {
        var super_render = this._super;
        var self = this;
        var orvea_dashboard = QWeb.render( 'orvea_dashboard.dashboard', {
            widget: self,
        });
        $( ".o_control_panel" ).addClass( "o_hidden" );
        $(orvea_dashboard).prependTo(self.$el);
        return orvea_dashboard
    },
    reload: function () {
            window.location.href = this.href;
    },

    action_project_task_list: function(event) {
        var self = this;
        event.stopPropagation();
        event.preventDefault();
	var view_form_id = self.project_data.project_task_form_view
	var view_tree_id = self.project_data.project_task_tree_view
        this.do_action({
            name: _t("Liste des Tâches"),
            type: 'ir.actions.act_window',
            res_model: 'project.task',
            view_mode: 'tree,form',
            view_type: 'form',
            views: [[view_tree_id, 'list'],[view_form_id, 'form']],
            context: {
                    },
            domain: [['type_task','=','task'],],
            target: 'current'
        },{on_reverse_breadcrumb: function(){ return self.reload();}})
    },

    action_project_task_list_today: function(event) {
	console.log('-----action_project_task_list_today---');
        var self = this;
	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth()+1; 
	var yyyy = today.getFullYear();
	if(dd<10) 
	{
	    dd='0'+dd;
	} 

	if(mm<10) 
	{
	    mm='0'+mm;
	} 
	today = yyyy+'-'+mm+'-'+dd;
        event.stopPropagation();
        event.preventDefault();
	var view_form_id = self.project_data.project_task_form_view
	var view_tree_id = self.project_data.project_task_tree_view
        this.do_action({
            name: _t("Liste des Tâches"),
            type: 'ir.actions.act_window',
            res_model: 'project.task',
            view_mode: 'tree,form',
            view_type: 'form',
            views: [[view_tree_id, 'list'],[view_form_id, 'form']],
            context: {
                    },
            domain: [['type_task','=','task'],['deadline','=',today]],
            target: 'current'
        },{on_reverse_breadcrumb: function(){ return self.reload();}})
    },

    action_project_task_new: function(event) {
        var self = this;
        event.stopPropagation();
        event.preventDefault();
        var view_id = self.project_data.project_task_form_view;
	    console.log(this.getChildren());
		console.log(self);
        this.do_action({
            name: _t("<div class='modal-header' style='align:center !important;margin:0px !important;background-position: center!important;background-size: cover!important;display: block!important;background-color: #31B9EC !important; padding-top: 0% !important; padding-right: 0% !important; padding-bottom: 0% !important; padding-left: 0% !important'><h2 style='color:white !important; font-family:Helvetica,Arial,sans-serif !important'> <p><b>Créer une tâche </b></p></h2> </div>"),
            type: 'ir.actions.act_window',
            res_model: 'project.task',
            view_mode: 'form',
            view_type: 'form',
            views: [[view_id, 'form']],
            context: {
                    'default_type_task': 'task',
                    'default_name': 'task',
                    },
            domain: [['type_task','=','task'],],
            target: 'new'
        },{on_reverse_breadcrumb: function(){ 
			return self.reload();
		  }})
    },

    action_project_meeting_list: function(event) {
        var self = this;
        event.stopPropagation();
        event.preventDefault();
	var view_form_id = self.project_data.project_meeting_form_view
	var view_tree_id = self.project_data.project_meeting_tree_view
        this.do_action({
            name: _t("Liste des Rendez-vous"),
            type: 'ir.actions.act_window',
            res_model: 'project.task',
            view_mode: 'tree,form',
            view_type: 'form',
            views: [[view_tree_id, 'list'],[view_form_id, 'form']],
            context: {
                    },
            domain: [['type_task','=','meeting'],],
            target: 'current'
        },{on_reverse_breadcrumb: function(){ return self.reload();}})
    },
    action_project_meeting_list_today: function(event) {
        var self = this;
	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth()+1; 
	var yyyy = today.getFullYear();
	if(dd<10) 
	{
	    dd='0'+dd;
	} 

	if(mm<10) 
	{
	    mm='0'+mm;
	} 
	today = yyyy+'-'+mm+'-'+dd;
        event.stopPropagation();
        event.preventDefault();
	var view_form_id = self.project_data.project_meeting_form_view
	var view_tree_id = self.project_data.project_meeting_tree_view
        this.do_action({
            name: _t("Liste des Rendez-vous"),
            type: 'ir.actions.act_window',
            res_model: 'project.task',
            view_mode: 'tree,form',
            view_type: 'form',
            views: [[view_tree_id, 'list'],[view_form_id, 'form']],
            context: {
                    },
            domain: [['type_task','=','meeting'],['deadline','=',today]],
            target: 'current'
        },{on_reverse_breadcrumb: function(){ return self.reload();}})
    },


    action_project_meeting_new: function(event) {
        var self = this;
        event.stopPropagation();
        event.preventDefault();
	var view_form_id = self.project_data.project_meeting_form_view
        this.do_action({
            name: _t("Ajouter Rendez-vous"),
            type: 'ir.actions.act_window',
            res_model: 'project.task',
            view_mode: 'form',
            view_type: 'form',
            views: [[view_form_id, 'form']],
            context: {
                    'default_type_task': 'meeting',
                    },
            domain: [['type_task','=','meeting'],],
            target: 'new'
        },{on_reverse_breadcrumb: function(){ return self.reload();}})
    },

    action_project_call_list: function(event) {
        var self = this;
        event.stopPropagation();
        event.preventDefault();
	var view_form_id = self.project_data.project_call_form_view
	var view_tree_id = self.project_data.project_call_tree_view
        this.do_action({
            name: _t("Liste des Appels"),
            type: 'ir.actions.act_window',
            res_model: 'project.task',
            view_mode: 'tree,form',
            view_type: 'form',
            views: [[view_tree_id, 'list'],[view_form_id, 'form']],
            context: {
                    },
            domain: [['type_task','=','call'],],
            target: 'current'
        },{on_reverse_breadcrumb: function(){ return self.reload();}})
    },
    action_project_call_list_today: function(event) {
        var self = this;
	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth()+1; 
	var yyyy = today.getFullYear();
	if(dd<10) 
	{
	    dd='0'+dd;
	} 

	if(mm<10) 
	{
	    mm='0'+mm;
	} 
	today = yyyy+'-'+mm+'-'+dd;
        event.stopPropagation();
        event.preventDefault();
	var view_form_id = self.project_data.project_call_form_view
	var view_tree_id = self.project_data.project_call_tree_view
        this.do_action({
            name: _t("Liste des Appels"),
            type: 'ir.actions.act_window',
            res_model: 'project.task',
            view_mode: 'tree,form',
            view_type: 'form',
            views: [[view_tree_id, 'list'],[view_form_id, 'form']],
            context: {
                    },
            domain: [['type_task','=','call'],['called_on','=',today]],
            target: 'current'
        },{on_reverse_breadcrumb: function(){ return self.reload();}})
    },


    action_project_call_new: function(event) {
        var self = this;
        event.stopPropagation();
        event.preventDefault();
	var view_form_id = self.project_data.project_call_form_view
        this.do_action({
            name: _t("Ajouter Appel"),
            type: 'ir.actions.act_window',
            res_model: 'project.task',
            view_mode: 'form',
            view_type: 'form',
            views: [[view_form_id, 'form']],
            context: {
                    'default_type_task': 'call',
                    'default_name': 'call',
                    },
            domain: [['type_task','=','call'],],
            target: 'new'
        },{on_reverse_breadcrumb: function(){ return self.reload();}})
    },


    // Function which gives random color for charts.
    getRandomColor: function () {
        var letters = '0123456789ABCDEF'.split('');
        var color = '#';
        for (var i = 0; i < 6; i++ ) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    },
    // Here we are plotting bar,pie chart
    graph: function() {
        var self = this
        var ctx = this.$el.find('#myChart')
        // Fills the canvas with white background
        Chart.plugins.register({
          beforeDraw: function(chartInstance) {
            var ctx = chartInstance.chart.ctx;
            ctx.fillStyle = "white";
            ctx.fillRect(0, 0, chartInstance.chart.width, chartInstance.chart.height);
          }
        });
        var bg_color_list = []
        for (var i=0;i<=12;i++){
            bg_color_list.push(self.getRandomColor())
        }
        var myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                //labels: ["January","February", "March", "April", "May", "June", "July", "August", "September",
                // "October", "November", "December"],
                labels: self.employee_data.payroll_label,
                datasets: [{
                    label: 'Payroll',
                    data: self.employee_data.payroll_dataset,
                    backgroundColor: bg_color_list,
                    borderColor: bg_color_list,
                    borderWidth: 1,
                    pointBorderColor: 'white',
                    pointBackgroundColor: 'red',
                    pointRadius: 5,
                    pointHoverRadius: 10,
                    pointHitRadius: 30,
                    pointBorderWidth: 2,
                    pointStyle: 'rectRounded'
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            min: 0,
                            max: Math.max.apply(null,self.employee_data.payroll_dataset),
                            //min: 1000,
                            //max: 100000,
                            stepSize: self.employee_data.
                            payroll_dataset.reduce((pv,cv)=>{return pv + (parseFloat(cv)||0)},0)
                            /self.employee_data.payroll_dataset.length
                          }
                    }]
                },
                responsive: true,
                maintainAspectRatio: true,
                animation: {
                    duration: 100, // general animation time
                },
                hover: {
                    animationDuration: 500, // duration of animations when hovering an item
                },
                responsiveAnimationDuration: 500, // animation duration after a resize
                legend: {
                    display: true,
                    labels: {
                        fontColor: 'black'
                    }
                },
            },
        });
        //Pie Chart
        var piectx = this.$el.find('#attendanceChart');
        bg_color_list = []
        for (var i=0;i<=self.employee_data.attendance_dataset.length;i++){
            bg_color_list.push(self.getRandomColor())
        }
        var pieChart = new Chart(piectx, {
            type: 'pie',
            data: {
                datasets: [{
                    data: self.employee_data.attendance_dataset,
                    backgroundColor: bg_color_list,
                    label: 'Attendance Pie'
                }],
                labels:self.employee_data.attendance_labels,
            },
            options: {
                responsive: true
            }
        });

    },
    previewTable: function() {
        $('#emp_details').DataTable( {
            dom: 'Bfrtip',
            buttons: [
                'copy', 'csv', 'excel',
                {
                    extend: 'pdf',
                    footer: 'true',
                    orientation: 'landscape',
                    title:'Employee Details',
                    text: 'PDF',
                    exportOptions: {
                        modifier: {
                            selected: true
                        }
                    }
                },
                {
                    extend: 'print',
                    exportOptions: {
                    columns: ':visible'
                    }
                },
            'colvis'
            ],
            columnDefs: [ {
                targets: -1,
                visible: false
            } ],
            lengthMenu: [[10, 25, 50, -1], [10, 25, 50, "All"]],
            pageLength: 15,
        } );
    },


});
core.action_registry.add('orvea_dashboard.dashboard', OrveaDashboardView);
return OrveaDashboardView
});

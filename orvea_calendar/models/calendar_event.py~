#-*- coding:utf-8 -*-
# Part of Odoo. See LICENSE file for full copyright and licensing details.

import time
from datetime import datetime, timedelta
from dateutil import relativedelta

import babel

from odoo import api, fields, models, tools, _
from odoo.exceptions import UserError, ValidationError
from odoo.tools.safe_eval import safe_eval

from odoo.addons import decimal_precision as dp
from odoo.exceptions import UserError, AccessError

from odoo import api, fields, models, _

import logging
logger = logging.getLogger(__name__)


class OrveaCalendarEvent(models.Model):
    _inherit = 'calendar.event'

    flag_widget = fields.Boolean(default=False)

    @api.model
    def get_data_agenda(self):
        logger.info('test calendar.event')
        project_agenda_calendar_view = self.env['ir.ui.view'].sudo().search([('model', '=', 'calendar.event'),('name', '=', 'calendar.event.calendar')])
        project_agenda_tree_view = self.env['ir.ui.view'].sudo().search([('model', '=', 'calendar.event'),('name', '=', 'calendar.event.tree')])
        data = {
                'project_agenda_calendar_view': project_agenda_calendar_view.id,
                'project_agenda_tree_view': project_agenda_tree_view.id,
        }
        return data

    @api.model
    def get_data_task(self):
        project_task_form_view = self.env['ir.ui.view'].sudo().search([('model', '=', 'project.task'),('name', '=', 'project.task.popup.form')])
        project_task_tree_view = self.env['ir.ui.view'].sudo().search([('model', '=', 'project.task'),('name', '=', 'project.task.popup.tree')])
        data = {

                'project_task_form_view': project_task_form_view.id,
                'project_task_tree_view': project_task_tree_view.id,
        }
        return data

    @api.model
    def get_data_call(self):
        project_call_form_view = self.env['ir.ui.view'].sudo().search([('model', '=', 'project.task'),('name', '=', 'project.call.popup.form')])
        project_call_tree_view = self.env['ir.ui.view'].sudo().search([('model', '=', 'project.task'),('name', '=', 'project.call.popup.tree')])
        data = {
                'project_call_form_view': project_call_form_view.id,
                'project_call_tree_view': project_call_tree_view.id,
        }
        return data

    @api.model
    def get_data_rdv(self):
        logger.info('-------------get_data_rdv--------------')
        project_meeting_form_view = self.env['ir.ui.view'].sudo().search([('model', '=', 'project.task'),('name', '=', 'project.meeting.popup.form')])
        project_meeting_tree_view = self.env['ir.ui.view'].sudo().search([('model', '=', 'project.task'),('name', '=', 'project.meeting.popup.tree')])
        data = {
                'project_meeting_form_view': project_meeting_form_view.id,
                'project_meeting_tree_view': project_meeting_tree_view.id,
        }
        return data

																																																																																																																																											# -*- coding: utf-8 -*-
##############################################################################
#
#    Odoo, HRMS Leave Cancellation
#    Copyright (C) 2018 Hilar AK All Rights Reserved
#    https://www.linkedin.com/in/hilar-ak/
#    <hilarak@gmail.com>
#
#    This program is free software: you can redistribute it and/or modify
#    it under the terms of the GNU Affero General Public License as
#    published by the Free Software Foundation, either version 3 of the
#    License, or (at your option) any later version.
#
#    This program is distributed in the hope that it will be useful,
#    but WITHOUT ANY WARRANTY; without even the implied warranty of
#    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
#    GNU Affero General Public License for more details.
#
#    You should have received a copy of the GNU Affero General Public License
#    along with this program.  If not, see <http://www.gnu.org/licenses/>.
#
##############################################################################

from odoo import models, fields, api
from datetime import datetime, timedelta
from odoo.http import request
import datetime

import logging
_logger = logging.getLogger(__name__)


class OrveaDashboard(models.Model):
    _name = 'orvea.dashboard'
    _description = 'Orvea Dashboard'

    name = fields.Char("")

    @api.model
    def get_data_info(self):
        to_day = datetime.datetime.now().strftime('%Y-%m-%d')
        project_tasks_count = self.env['project.task'].sudo().search_count([('type_task', '=', 'task'),('deadline','=',to_day)])
        project_meetings_count = self.env['project.task'].sudo().search_count([('type_task', '=', 'meeting'),('deadline','=',to_day)])
        project_calls_count = self.env['project.task'].sudo().search_count([('type_task', '=', 'call'),('called_on','=',to_day)])
        project_task_form_view = self.env['ir.ui.view'].sudo().search([('model', '=', 'project.task'),('name', '=', 'project.task.popup.form')])
        project_meeting_form_view = self.env['ir.ui.view'].sudo().search([('model', '=', 'project.task'),('name', '=', 'project.meeting.popup.form')])
        project_call_form_view = self.env['ir.ui.view'].sudo().search([('model', '=', 'project.task'),('name', '=', 'project.call.popup.form')])

        project_task_tree_view = self.env['ir.ui.view'].sudo().search([('model', '=', 'project.task'),('name', '=', 'project.task.popup.tree')])
        project_meeting_tree_view = self.env['ir.ui.view'].sudo().search([('model', '=', 'project.task'),('name', '=', 'project.meeting.popup.tree')])
        project_call_tree_view = self.env['ir.ui.view'].sudo().search([('model', '=', 'project.task'),('name', '=', 'project.call.popup.tree')])
        data = {

                'project_tasks_count': project_tasks_count,
                'project_meetings_count': project_meetings_count,
                'project_calls_count': project_calls_count,
                'project_task_form_view': project_task_form_view.id,
                'project_meeting_form_view': project_meeting_form_view.id,
                'project_call_form_view': project_call_form_view.id,

                'project_task_tree_view': project_task_tree_view.id,
                'project_meeting_tree_view': project_meeting_tree_view.id,
                'project_call_tree_view': project_call_tree_view.id,
        }
        return data

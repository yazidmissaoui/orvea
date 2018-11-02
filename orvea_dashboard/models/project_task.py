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


import logging
_logger = logging.getLogger(__name__)

class OrveaProjectTask(models.Model):
    _inherit = 'project.task'

    type_task = fields.Selection([
        ('task', 'Tache'),
        ('meeting', 'Rendez-vous'),
        ('call', 'Appel'),
        ], string='Type')
    opportunity = fields.Many2one('crm.lead', string='Opportunity')
    types_task = fields.Selection([
        ('adminisration', "Administration"),
        ('commercial', "Commercial"),
        ('quality_controle', "Contrôle Qualite Projet"),
        ('external_cost', "Définition coût externe"),
        ('ppsps_establishment', "Etablissement du PPSPS"),
        ('photo_establishment', "Etablissement rapport photo"),
        ('inspection_project', "Inspection commune du projet"),
        ('agent_placed', "Mise en place Agent"),
        ('project_project', "Procédure Lancement Projet"),
        ('reunion', "Réunion de chantier projet"),
        ('human_ressources', "Ressources Humaines"),
        ('technique', "Technique"),
        ], string='type')
    deadline = fields.Date(string="Deadline")
    priority_task = fields.Selection([
        ('a', "A"),
        ('b', "B"),
        ('c', "C"),
        ('d', "D"),
        ], string="Priorité")
    repeated_task = fields.Boolean(string="Repeated...", default=False)
    mode_repetition = fields.Selection([
        ('daily', "Quotidiennement"),
        ('every_day', "Chaque jour ouvrable"),
        ('weekly', "Chaque semaine"),
        ('monthly', "Mensuellement"),
        ('annually', "Annuellement"),
        ], string="Repeat every")
    planned_on = fields.Float(string="Planned on")
    started_on = fields.Float(string="Started on")
    date_end = fields.Datetime(string="Date End", default=fields.Datetime.now)
    called_on = fields.Date(string="Called On")
    repeated_every_day = fields.Selection([
        ('day', "jour"),
        ('2_days', "2 jours"),
        ('3_days', "3 jours"),
        ('4_days', "4 jours"),
        ('5_days', "5 jours"),
        ('6_days', "6 jours"),
        ('7_days', "7 jours"),
        ('8_days', "8 jours"),
        ('9_days', "9 jours"),
        ('10_days', "10 jours"),
        ('11_days', "11 jours"),
        ('12_days', "12 jours"),
        ('13_days', "13 jours"),
        ('14_days', "14 jours"),
        ('15_days', "15 jours"),
        ('16_days', "16 jours"),
        ('17_days', "17 jours"),
        ('18_days', "18 jours"),
        ('19_days', "19 jours"),
        ('20_days', "20 jours"),
        ('21_days', "21 jours"),
        ('22_days', "22 jours"),
        ('23_days', "23 jours"),
        ('24_days', "24 jours"),
        ('25_days', "25 jours"),
        ('26_days', "26 jours"),
        ('27_days', "27 jours"),
        ('28_days', "28 jours"),
        ('29_days', "29 jours"),
        ('30_days', "30 jours"),
        ], string="Répéter chaque")

    repeated_every_business_day = fields.Selection([
        ('day', "jour ouvrable"),
        ('2_days', "2 jours ouvrables"),
        ('3_days', "3 jours ouvrables"),
        ('4_days', "4 jours ouvrables"),
        ('5_days', "5 jours ouvrables"),
        ('6_days', "6 jours ouvrables"),
        ('7_days', "7 jours ouvrables"),
        ('8_days', "8 jours ouvrables"),
        ('9_days', "9 jours ouvrables"),
        ('10_days', "10 jours ouvrables"),
        ('11_days', "11 jours ouvrables"),
        ('12_days', "12 jours ouvrables"),
        ('13_days', "13 jours ouvrables"),
        ('14_days', "14 jours ouvrables"),
        ('15_days', "15 jours ouvrables"),
        ('16_days', "16 jours ouvrables"),
        ('17_days', "17 jours ouvrables"),
        ('18_days', "18 jours ouvrables"),
        ('19_days', "19 jours ouvrables"),
        ('20_days', "20 jours ouvrables"),
        ('21_days', "21 jours ouvrables"),
        ('22_days', "22 jours ouvrables"),
        ('23_days', "23 jours ouvrables"),
        ('24_days', "24 jours ouvrables"),
        ('25_days', "25 jours ouvrables"),
        ('26_days', "26 jours ouvrables"),
        ('27_days', "27 jours ouvrables"),
        ('28_days', "28 jours ouvrables"),
        ('29_days', "29 jours ouvrables"),
        ('30_days', "30 jours ouvrables"),
        ], string="Repeat every")

    repeated_every_week = fields.Selection([
        ('week', "semaine"),
        ('2_weeks', "2 semaines"),
        ('3_weeks', "3 semaines"),
        ('4_weeks', "4 semaines"),
        ('5_weeks', "5 semaines"),
        ('6_weeks', "6 semaines"),
        ('7_weeks', "7 semaines"),
        ('8_weeks', "8 semaines"),
        ('9_weeks', "9 semaines"),
        ('10_weeks', "10 semaines"),
        ('11_weeks', "11 semaines"),
        ('12_weeks', "12 semaines"),
        ('13_weeks', "13 semaines"),
        ('14_weeks', "14 semaines"),
        ('15_weeks', "15 semaines"),
        ('16_weeks', "16 semaines"),
        ('17_weeks', "17 semaines"),
        ('18_weeks', "18 semaines"),
        ('19_weeks', "19 semaines"),
        ('20_weeks', "20 semaines"),
        ('21_weeks', "21 semaines"),
        ('22_weeks', "22 semaines"),
        ('23_weeks', "23 semaines"),
        ('24_weeks', "24 semaines"),
        ('25_weeks', "25 semaines"),
        ('26_weeks', "26 semaines"),
        ('27_weeks', "27 semaines"),
        ('28_weeks', "28 semaines"),
        ('29_weeks', "29 semaines"),
        ('30_weeks', "30 semaines"),
        ], string="Repeat every")
    repeated_every_month = fields.Selection([
        ('month', "mois"),
        ('2_months', "2 mois"),
        ('3_months', "3 mois"),
        ('4_months', "4 mois"),
        ('5_months', "5 mois"),
        ('6_months', "6 mois"),
        ('7_months', "7 mois"),
        ('8_months', "8 mois"),
        ('9_months', "9 mois"),
        ('10_months', "10 mois"),
        ('11_months', "11 mois"),
        ('12_months', "12 mois"),
        ('13_months', "13 mois"),
        ('14_months', "14 mois"),
        ('15_months', "15 mois"),
        ('16_months', "16 mois"),
        ('17_months', "17 mois"),
        ('18_months', "18 mois"),
        ('19_months', "19 mois"),
        ('20_months', "20 mois"),
        ('21_months', "21 mois"),
        ('22_months', "22 mois"),
        ('23_months', "23 mois"),
        ('24_months', "24 mois"),
        ('25_months', "25 mois"),
        ('26_months', "26 mois"),
        ('27_months', "27 mois"),
        ('28_months', "28 mois"),
        ('29_months', "29 mois"),
        ('30_months', "30 mois"),
        ], string="Repeat every")
    day_month = fields.Selection([
        ('6_day_of_month', "Jour 6 du mois"),
        ('first_thursday_month', "Premier jeudi du mois"),
        ], string="Day of month")

    repeated_every_year = fields.Selection([
        ('year', "year"),
        ('2_years', "2 years"),
        ('3_years', "3 years"),
        ('4_years', "4 years"),
        ('5_years', "5 years"),
        ('6_years', "6 years"),
        ('7_years', "7 years"),
        ('8_years', "8 years"),
        ('9_years', "9 years"),
        ('10_years', "10 years"),
        ('11_years', "11 years"),
        ('12_years', "12 years"),
        ('13_years', "13 years"),
        ('14_years', "14 years"),
        ('15_years', "15 years"),
        ('16_years', "16 years"),
        ('17_years', "17 years"),
        ('18_years', "18 years"),
        ('19_years', "19 years"),
        ('20_years', "20 years"),
        ('21_years', "21 years"),
        ('22_years', "22 years"),
        ('23_years', "23 years"),
        ('24_years', "24 years"),
        ('25_years', "25 years"),
        ('26_years', "26 years"),
        ('27_years', "27 years"),
        ('28_years', "28 years"),
        ('29_years', "29 years"),
        ('30_years', "30 years"),
        ], string="Repeat every")

    step_project = fields.Selection([
        ('preparation', "PREPARATION"),
        ('work_planning', "PLANIFICATION TRAVAUX"),
        ], string="Step")
    date = fields.Datetime(string='Date', default=fields.Datetime.now)
    duration = fields.Float(string='Duration')
    description = fields.Html(string='Description')
    localisation = fields.Selection([
        ('localisation_entreprise', "Localisation d'une entreprise"),
        ('localisation_contact', "Localisation d'un contact ..."),
        ('localisation_unique', "Localisation pour utilisation unique"),
        ('rdv_virtuel', 'Rendez-vous virtuel'),
        ], string='Localisation')
    affected_to = fields.Many2one('res.partner', string='Affected To',
        help="Person To meet.")
    project = fields.Many2one('project.project', string='Project')
    opportunity = fields.Many2one('crm.lead', string='Opportunity')
    company = fields.Char(string="Company")
    planned = fields.Boolean(string="Planning")
    partner_phone = fields.Char(string="Phone", related="partner_id.phone")
    call_creator = fields.Many2one('res.users')
    title = fields.Char(string="Title")


    @api.model
    def create(self, vals):
        vals['call_creator'] = self.env.uid
        return super(OrveaProjectTask, self).create(vals)

    @api.one
    def delete_task(self) :
        _logger.info('----------------------  delete_task -------------------')
        _logger.info(self)
        self.unlink()



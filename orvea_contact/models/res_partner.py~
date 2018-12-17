# -*- coding: utf-8 -*-
# Part of Odoo. See LICENSE file for full copyright and licensing details.
import base64
import logging

from odoo import api, fields, models
from odoo import tools, _
from odoo.exceptions import ValidationError, AccessError
from odoo.modules.module import get_module_resource

_logger = logging.getLogger(__name__)

class ResPartnerType(models.Model):

    _name = "res.partner.type"

    name = fields.Char(string="Name")
class ResPartner(models.Model):

    _inherit = "res.partner"

    name_contact = fields.Char(string="Name")
    surname_contact = fields.Char(string="Surname")
    second_mobile = fields.Char(string="Second Mobile Phone")
    contact_owner = fields.Many2one('res.users', string="Company Owner", default=lambda self: self.env.user)
    company_name = fields.Many2one('res.partner',string="Company Name", domain=[('is_company','=',True)])
    activity_sector = fields.Char(string="Activity Sector")
    lead_state = fields.Char(string="Lead State")
    flag = fields.Boolean(string="flag", default=False)
    type_contact = fields.Selection([
        ('Client', "Client"),
        ('Fournisseur', "Fournisseur"),
        ('Partenaire', "Partenaire"),
        ('Salarie', "Salarié"),
        ('Autres', "Autres"),
	])

    partner_ids = fields.Many2one('res.partner', string='Entreprises')

    type_partner_contact = fields.Many2one('res.partner.type', string="Type Partenaire")
    contact_activity = fields.Many2one('res.partner.activity', string="Contact Activity", store="True")
    contact_activity_btp = fields.Many2one('res.partner.activity.btp', string="Contact Activity Btp", store="True")
    flag_btp = fields.Boolean(string="flag BTP", default=False, compute='_compute_flag_btp', store=True)
    contact_activity_service = fields.Many2one('res.partner.activity.service', string="Contact Activity Service", store="True")
    flag_service = fields.Boolean(string="flag service", default=False, compute='_compute_flag_service', store=True)
    flag_appearance = fields.Boolean(string="flag Appearance", default=False, compute='_compute_flag_appearance', store=True)

    flag_data = fields.Boolean(string="flag Data", default=False, compute='_compute_flag_data', store=True)

    @api.onchange('email')
    @api.depends('email')
    def _compute_flag_data(self):
        for contact in self:
            _logger.info('--------------- _compute_flag_data --------------')	
            if contact.email :
                partner_id = self.env['res.partner'].search([('email', '=', contact.email)])
                if len(partner_id) > 0 :
                    contact.partner_ids = partner_id[0].id
                    contact.flag_data = True

    @api.onchange('email','surname_contact','name_contact')
    @api.depends('email','surname_contact','name_contact')
    def _compute_flag_appearance(self):
        for contact in self:
            _logger.info('--------------- _compute_flag_appearance --------------')	
            if not contact.email or not contact.name_contact or not contact.surname_contact :
                contact.flag_appearance = False
            else :
                contact.flag_appearance = True

    @api.depends('contact_activity')
    def _compute_flag_btp(self):
        for contact in self:
            if contact.contact_activity :
                partner_activity = self.env['res.partner.activity'].search([('id', '=', contact.contact_activity.id)])
                if partner_activity.name == 'Entreprise du BTP' :
                    contact.flag_btp = True
                else :
                    contact.flag_btp = False

    @api.depends('contact_activity')
    def _compute_flag_service(self):
        for contact in self:
            if contact.contact_activity :
                partner_activity = self.env['res.partner.activity'].search([('id', '=', contact.contact_activity.id)])
                if partner_activity.name == 'Entreprise de Service' :
                    contact.flag_service = True
                else :
                    contact.flag_service = False

    @api.model
    def create(self, vals):
        _logger.info('--------------CREATE-----------------')
        _logger.info(vals)
        #TODO:
        #if vals['is_company'] == False :
        vals['name'] = vals['surname_contact'] + ' ' + vals['name_contact']
        return super(ResPartner, self).create(vals)




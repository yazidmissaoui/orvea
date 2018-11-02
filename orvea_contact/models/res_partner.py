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
    company_name = fields.Char(string="Company Name")
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
    type_partner_contact = fields.Many2one('res.partner.type', string="Type Partenaire")
    contact_activity = fields.Many2one('res.partner.activity', string="Contact Activity", store="True")
    contact_activity_btp = fields.Many2one('res.partner.activity.btp', string="Contact Activity Btp", store="True")
    flag_btp = fields.Boolean(string="flag BTP", default=False, compute='_compute_flag_btp', store=True)
    contact_activity_service = fields.Many2one('res.partner.activity.service', string="Contact Activity Service", store="True")
    flag_service = fields.Boolean(string="flag service", default=False, compute='_compute_flag_service', store=True)


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
        #vals['name'] = vals['surname_contact'] + ' ' + vals['name_contact']
        return super(ResPartner, self).create(vals)



    @api.multi
    def open_contact_details(self):
        partner_id = False
        formview_ref = self.env.ref('orvea_contact.view_contact_list_form', False)
        partner_id =  self.id
        partner_name =  self.name
        return {
            'name': ("À Propos de " + str(partner_name)),
            'view_mode': 'tree',
            'view_id': False,
            'view_type': 'form',
            'res_id': partner_id,
            'res_model': 'res.partner',
            'type': 'ir.actions.act_window',
            'target': 'new',
            'views': [(formview_ref and formview_ref.id or False, 'form')],
            'context': {}
        }
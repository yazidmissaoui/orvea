# -*- coding: utf-8 -*-
# Part of Odoo. See LICENSE file for full copyright and licensing details.
import base64
import logging

from odoo import api, fields, models
from odoo import tools, _
from odoo.exceptions import ValidationError, AccessError
from odoo.modules.module import get_module_resource

_logger = logging.getLogger(__name__)


class ResPartnerCompanyType(models.Model):

    _name = "res.partner.company.type"

    name = fields.Char(string="Name")



class ResPartnerCompany(models.Model):

    _inherit = "res.partner"

    description_company = fields.Html(string="Description")
    transactions_number = fields.Integer(string="Transactions")
    contacts_number = fields.Integer(string="Contact")
    flag_company = fields.Boolean(string="Contact")
    company_owner = fields.Many2one('res.users', string="Company Owner", default=lambda self: self.env.user)
    type_company = fields.Selection([
        ('client', "Client"),
        ("supplier", "Fournisseur"),
        ('lead', "Partenaire"),
        ('other', "Autres"),
	],string="Type")
    type_partner_company = fields.Many2one('res.partner.company.type', string="Type Partenaire")
    company_sector = fields.Selection([
        ("accounting", "Comptabilité"),
        ('contacted', "Compagnies aériennes/Aviation"),
        ('rules', "Règlement extrajudiciaire des différends"),
        ('medecine_sent', "Médecines alternatives"),
	('clothers', "Vêtements et mode"),
        ('animation', 'Animation'),
        ('architecture', 'Architecture et planification'),
        ('arts', "L'arts et métier"),
        ('automobile', 'Automobile'),
        ('aviation', "Aviation et Aéronotique"),
	('bank', 'Banque'),
	('biotechnology', 'Biotechnologie'),
	('medias', "Médias audiovisuels"),
	('materals', "Matériaux de construction"),
	('fournitures', "Fournitures et équipements d'entreprise"),
	('marcket', 'Marchés de capitaux'),
	('chemical', 'Produits chimiques'),
	('organisation', 'Organisation citoyenne et sociale'),
	('civil', "Génie civil"),
	('commercial', 'Immobilier commercial'),
	('security', "Sécurité Informatique et réseau"),
	('games', "Jeux d'ordinateur"),
	('informatical_material', "Matériel Informatique"),
	('reseautage', "Réseautage informatique"),
	('software', 'Logiciel'),
	('internet', 'Internet'),
	('construction', 'Construction'),
	('electronics', 'Electronique Grand public'),
	('consommatiob', 'Biens de consommation'),
	('services', 'Services aux consommateurs'),
	('beauty_products', "Produits de beauté"),
	('milk_products', 'Produits laitiers'),
	('industry', "Industrie aéronotique et de défense"),

	],string="SECTOR ACTIVITY")

    company_activity = fields.Many2one('res.partner.company.activity', string="Contact Activity", store="True")
    company_activity_btp = fields.Many2one('res.partner.company.activity.btp', string="Contact Activity Btp", store="True")
    flag_company_btp = fields.Boolean(string="flag BTP", default=False, compute='_compute_company_flag_btp', store=True)
    company_activity_service = fields.Many2one('res.partner.company.activity.service', string="Contact Activity Service", store="True")
    flag_company_service = fields.Boolean(string="flag service", default=False, compute='_compute_company_flag_service', store=True)
    flag_controle = fields.Boolean(string="Controle", default=False,  store=True)
    flag_company_site1 = fields.Boolean(string="Site 1", default=False,  store=True)
    street_site1 = fields.Char()
    street2_site1 = fields.Char()
    zip_site1 = fields.Char()
    city_site1 = fields.Char()
    state_site1_id = fields.Many2one('res.country.state')
    country_site1_id = fields.Many2one('res.country')
    flag_company_site2 = fields.Boolean(string="Site 2", default=False,  store=True)
    street_site2 = fields.Char()
    street2_site2 = fields.Char()
    zip_site2 = fields.Char()
    city_site2 = fields.Char()
    state_site2_id = fields.Many2one('res.country.state')
    country_site2_id = fields.Many2one('res.country')
    flag_company_site3 = fields.Boolean(string="Site 3", default=False,  store=True)
    street_site3 = fields.Char()
    street2_site3 = fields.Char()
    zip_site3 = fields.Char()
    city_site3 = fields.Char()
    state_site3_id = fields.Many2one('res.country.state')
    country_site3_id = fields.Many2one('res.country')

    flag_company_facturation = fields.Boolean(string="Facturation", default=False,  store=True)

    street_facturation = fields.Char()
    street2_facturation = fields.Char()
    zip_facturation = fields.Char()
    city_facturation = fields.Char()
    state_facturation_id = fields.Many2one('res.country.state')
    country_facturation_id = fields.Many2one('res.country')

    flag_company_autre = fields.Boolean(string="Autres", default=False,  store=True)

    street_autre = fields.Char()
    street2_autre = fields.Char()
    zip_autre = fields.Char()
    city_autre = fields.Char()
    state_autre_id = fields.Many2one('res.country.state')
    country_autre_id = fields.Many2one('res.country')


    flag_phone_standard = fields.Boolean(string="Standard", default=False,  store=True)
    flag_phone_comptabilite = fields.Boolean(string="Comptabilité", default=False,  store=True)
    flag_phone_autre = fields.Boolean(string="Autre", default=False,  store=True)
    phone_standard = fields.Char()
    phone_comptabilite = fields.Char()
    phone_autre = fields.Char()

    @api.depends('company_activity')
    def _compute_company_flag_btp(self):
        for company in self:
            if company.company_activity :
                partner_activity = self.env['res.partner.company.activity'].search([('id', '=', company.company_activity.id)])
                if partner_activity.name == 'Entreprise du BTP' :
                    company.flag_company_btp = True
                else :
                    company.flag_company_btp = False

    @api.depends('company_activity')
    def _compute_company_flag_service(self):
        for company in self:
            if company.company_activity :
                partner_activity = self.env['res.partner.company.activity'].search([('id', '=', company.company_activity.id)])
                if partner_activity.name == 'Entreprise de Service' :
                    company.flag_company_service = True
                else :
                    company.flag_company_service = False

    @api.multi
    def open_company_details(self):
        partner_id = False
        formview_ref = self.env.ref('orvea_company.view_company_list_form', False)
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

    @api.depends('flag_phone_standard')
    @api.onchange('flag_phone_standard')
    def _compute_phone_standard(self):
        for company in self:
            if company.flag_phone_standard == False:
                company.update({'phone_standard' : False})

    @api.depends('flag_phone_comptabilite')
    @api.onchange('flag_phone_comptabilite')
    def _compute_phone_comptabilite(self):
        for company in self:
            if company.flag_phone_comptabilite == False:
                company.update({'phone_comptabilite' : False})

    @api.depends('flag_phone_standard')
    @api.onchange('flag_phone_standard')
    def _compute_phone_standard(self):
        for company in self:
            if company.flag_phone_standard == False:
                company.update({'phone_standard' : False})

    @api.depends('flag_company_site1')
    @api.onchange('flag_company_site1')
    def _compute_company_site1(self):
        for company in self:
            if company.flag_company_site1 == False:
                company.update({'street_site1' : False, 'street2_site1' : False, 'zip_site1' : False, 'city_site1' : False, 'state_site1_id' : False, 'country_site1_id' : False})

    @api.depends('flag_company_site2')
    @api.onchange('flag_company_site2')
    def _compute_company_site2(self):
        for company in self:
            if company.flag_company_site2 == False:
                company.update({'street_site2' : False, 'street2_site2' : False, 'zip_site2' : False, 'city_site2' : False, 'state_site2_id' : False, 'country_site2_id' : False})

    @api.depends('flag_company_site3')
    @api.onchange('flag_company_site3')
    def _compute_company_site3(self):
        for company in self:
            if company.flag_company_site3 == False:
                company.update({'street_site3' : False, 'street2_site3' : False, 'zip_site3' : False, 'city_site3' : False, 'state_site3_id' : False, 'country_site3_id' : False})

    @api.depends('flag_company_facturation')
    @api.onchange('flag_company_facturation')
    def _compute_company_facturation(self):
        for company in self:
            if company.flag_company_facturation == False:
                company.update({'street_facturation' : False, 'street2_facturation' : False, 'zip_facturation' : False, 'city_facturation' : False, 'state_facturation_id' : False, 'country_facturation_id' : False})

    @api.depends('flag_company_autre')
    @api.onchange('flag_company_autre')
    def _compute_company_autre(self):
        for company in self:
            if company.flag_company_autre == False:
                company.update({'street_autre' : False, 'street2_autre' : False, 'zip_autre' : False, 'city_autre' : False, 'state_autre_id' : False, 'country_autre_id' : False})



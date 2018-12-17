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
#from .hubspotCon.connection import APIKey
#from .hubspotCon.connection import PortalConnection
from openerp.exceptions import UserError
#from tzlocal import get_localzone
#local_tz = get_localzone()

import logging
logger = logging.getLogger(__name__)


class OrveaSaleOrder(models.Model):
    _inherit = 'sale.order'

    lead_id = fields.Many2one('crm.lead', string='Related Lead', index=True)


class OrveaResPartner(models.Model):
    _inherit = 'res.partner'

    crm_id = fields.Many2one('crm.lead', string='Related Lead', index=True)
    lead_id = fields.Many2one('crm.lead', string='Related Lead', index=True)

class OrveaCrmLead(models.Model):
    _inherit = 'crm.lead'


    state_transaction = fields.Many2one('configure.state', string="État")
    state_crm = fields.Selection([
	('coming', "A VENIR - RÉFÉRENCEMENT"), 
	('new', "Nouveau"), 
	('contacted', "Contacté"),
	('rdv', "RDV Présentationé"),
        ('waiting_dce', "En attente DCE"),
        ('quotation_creation', "Création Devis"),
        ('quotation_sent', "Devis Envoyé"),
        ('meeting_sale', "RDV Vente, Recalage Devis"),
        ('agreement', "Accord de principe"),
        ('signature', "Suivi signature"),
        ('quotation_signed', "Devis Signé"),
        ('preparation_site', "Préparation chantier"),
        ('production_site', "Production chantier"),
	('fenced', "Clôture"),
	],string="State CRM", default='coming')
    client_account = fields.Many2one('res.partner',domain="[('is_company', '=', True),('company_type', '=', 'company')]", string='Client Account')
    transaction_type = fields.Selection([
	('logistic_contract', "Contrat Logistique"),
	('additional_prestation', 'Prestation Additonnelle'),
	('punctual_prestation', 'Prestation Ponctuelle'),
	],string="Type Transaction", default='logistic_contract')
    amount = fields.Float(string="Amount")
    housing_nbre = fields.Integer(string="Number of Housing")
    nbre_quotation = fields.Char(string="N° Quotation")
    delay_ces = fields.Integer(string="Delay CES")
    forecast_start = fields.Date(string="Forecast Start CES", default=fields.Datetime.now, store=True)
    real_start = fields.Date(string="Forecast Real", default=fields.Datetime.now, store=True)
    transaction_owner = fields.Many2one('res.partner',string="Transaction Owner", default=lambda self: self.env.user.partner_id.id)
    date_creation = fields.Date(string="Date Creation", default=fields.Datetime.now, store=True)
    contact_transaction = fields.Many2one('res.partner', string='Contact')
    company_transaction = fields.Many2one('res.company', string='Company')
    source_origine = fields.Selection([
	('natural_search', "Recherche Naturelle"),
	('paid_referencement', "Référencement payant"),
	('e_mail', 'E-mail marketing'),
	('social_network', 'Réseaux sociaux'),
	('references', 'Renvois'),
	('other_companies', 'Autres campagnes'),
	('direct_traffic', 'Trafic direct'),
	('offline_sources', 'Offline Sources'),
	('social_company', 'Campagne sociale payante'),
	],string="Source Origine", default='natural_search')
    deal_id = fields.Integer(string="Number of Deal Hubspot")
    test = fields.Char()
    flag_contact = fields.Boolean(default=False)
    flag_company = fields.Boolean(default=False)
    flag_details = fields.Boolean(default=True)
    lead_name = fields.Char(compute="_get_name_lead", store=True)
    mo_identification = fields.Many2one('maitre.ouvrage',string="Identification MO")

    child_ids = fields.Many2many('res.partner', 'partner_crm_rel', 'partner_id', 'crm_id', string='Contacts')
    company_ids = fields.Many2many('res.partner', 'partner_company_rel', 'partner_id', 'company_id', string='Entreprises')

    hubspot_vid = fields.Integer('Hubspot Vid',readonly = True,default = 0)

    order_count = fields.Integer(compute='_get_order_count', store=True)
    lead_ids = fields.One2many('sale.order','lead_id','Sale Order')

    affected_to = fields.Many2one('res.users',string="Affecté À")

    color_state = fields.Char(string='Color Index')


    @api.model
    def get_name_state(self,state):
        logger.info('---------------get_name_state-----------------')
        logger.info(state)
        logger.info(len(state))
        if len(state) > 1:
            state_id = state[1]
            state_transaction = self.env['configure.state'].sudo().search([('id', '=', state_id)])
            logger.info(state_transaction)
            data = {
                'name_transaction': state_transaction.name,
            }
            return data
        else :
            state_transaction = self.env['configure.state'].sudo().search([('name', '=', 'A VENIR - RÉFÉRENCEMENT')])
            logger.info(state_transaction)
            data = {
                'name_transaction': state_transaction.name,
            }
            return data	


    @api.model
    def get_state(self,state):	
        logger.info('-------------------GET STATE--------------------')
        logger.info(state)
        state_transaction = self.env['configure.state'].sudo().search([('name', '=', state[1])])
        data = {
                'transaction_id': state_transaction.id,
        }
        return data


    @api.model
    @api.depends('lead_ids')
    def _get_order_count(self):
        for lead in self:
            lead.order_count = len(lead.lead_ids)


    @api.model
    @api.depends('name')
    def _get_name_lead(self):
        for lead in self:
            lead.lead_name = lead.name

    #@api.model
    #def create(self, vals):
        #'''Create lead in hubspot on create of lead in Odoo'''
        #create_res = super(OrveaCrmLead, self).create(vals)
        #Param = self.env['ir.config_parameter'].sudo()
        #hubspot_app_key = Param.get_param('hubspot.hubspot_app_key');
        #hubspot_app_name = Param.get_param('hubspot.hubspot_app_name');
        #if not hubspot_app_key or not hubspot_app_name:
            #raise UserError(_('Error in Synchronization!\nHubspot API Key and App Name need to be specified for synchronization of data with Odoo.'))
        #hubspot_app_key = APIKey(hubspot_app_key)
        #self.env.cr.commit()
        #return create_res
        

    #@api.multi
    #def write(self, vals):
        #for lead in self:
           # '''Update Lead details in hubspot on change of details in odoo'''
            #write_res = super(OrveaCrmLead, lead).write(vals)
            #Param = self.env['ir.config_parameter'].sudo()
            #hubspot_app_key = Param.get_param('hubspot.hubspot_app_key');
            #hubspot_app_name = Param.get_param('hubspot.hubspot_app_name');
            #if not hubspot_app_key or not hubspot_app_name:
                #raise UserError(_('Error in Synchronization!\nHubspot API Key and App Name need to be specified for synchronization of data with Odoo.'))
            #hubspot_app_key = APIKey(hubspot_app_key)
            #lead._cr.commit()
            #return write_res


    @api.model
    def createNewLeadsInOdoo(self, changedLeads,hubspot_app_key, hubspot_app_name):
        Param = self.env['ir.config_parameter'].sudo()
        logger.info('----------------- createNewLeadsInOdoo   ----------------')
        logger.info(hubspot_app_key)
        logger.info(hubspot_app_name)
        with PortalConnection(hubspot_app_key, hubspot_app_name) as connection:
            logger.info(changedLeads)
            allRecords = self.search([])
            partnerContacts = allRecords.read(['hubspot_vid'])
            hubspotIds = [each['hubspot_vid'] for each in partnerContacts]
            logger.info(changedLeads)
            for eachLead in changedLeads:
                logger.info('-----------------eachLead-------------------------')
                logger.info(eachLead)
                vals = {}
                if eachLead['dealId']:
                    vals.update({'hubspot_vid': eachLead['dealId']})

                if 'dealname' in eachLead['properties']:
                    if len(eachLead['properties']['dealname']['value']) > 0:
                        vals.update({'name': eachLead['properties']['dealname']['value']})
                    else:
                        vals.update({'name': 'Unknown'})


                if 'dealstage' in eachLead['properties']:
                    logger.info('--------------------------  Dealstage  ----------------------------')
                    logger.info(eachLead['properties']['dealstage'])
                    if eachLead['properties']['dealstage']['value'] == 'a0108133-fe57-4bb6-8426-af843b48a849':
                        vals.update({'state_transaction': 'coming'})  
                    if eachLead['properties']['dealstage']['value'] == 'appointmentscheduled':
                        vals.update({'state_transaction': 'new'})  
                    if eachLead['properties']['dealstage']['value'] == 'qualifiedtobuy':
                        vals.update({'state_transaction': 'contacted'})  
                    if eachLead['properties']['dealstage']['value'] == 'presentationscheduled':
                        vals.update({'state_transaction': 'rdv'})  
                    if eachLead['properties']['dealstage']['value'] == 'decisionmakerboughtin':
                        vals.update({'state_transaction': 'waiting_dce'})  
                    if eachLead['properties']['dealstage']['value'] == '3f21a32d-774c-44fa-8b34-2e9b5b010caf':
                        vals.update({'state_transaction': 'quotation_creation'}) 
                    if eachLead['properties']['dealstage']['value'] == '31da94d8-af47-4d3a-ba23-f8663177d54f':
                        vals.update({'state_transaction': 'quotation_sent'})  
                    if eachLead['properties']['dealstage']['value'] == 'contractsent':
                        vals.update({'state_transaction': 'meeting_sale'})  
                    if eachLead['properties']['dealstage']['value'] == 'closedwon':
                        vals.update({'state_transaction': 'agreement'})  
                    if eachLead['properties']['dealstage']['value'] == 'closedlost':
                        vals.update({'state_transaction': 'signature'})  
                    if eachLead['properties']['dealstage']['value'] == '92d525af-0364-4759-ad37-8bec06365211':
                        vals.update({'state_transaction': 'quotation_signed'}) 
                    if eachLead['properties']['dealstage']['value'] == '22d74e12-ea46-42e3-84bc-0a90df970567':
                        vals.update({'state_transaction': 'production_site'})  
                    if eachLead['properties']['dealstage']['value'] == 'a6d79204-3dce-4bf9-aff9-90d8be30d867':
                        vals.update({'state_transaction': 'fenced'})  
                    else:
                        vals.update({'state_transaction': 'preparation_site'})   


                if 'hs_analytics_source' in eachLead['properties']:
                    vals.update({'source_origine': 'offline_sources'})  

                if 'amount' in eachLead['properties']:
                    vals.update({'amount': eachLead['properties']['amount']['value']})  
                if 'nombre_de_logement' in eachLead['properties']:
                    vals.update({'housing_nbre': eachLead['properties']['nombre_de_logement']['value']})
                if 'n_devis' in eachLead['properties']:
                    vals.update({'nbre_quotation': eachLead['properties']['n_devis']['value']})
                if 'd_lai_ces' in eachLead['properties']:
                        vals.update({'delay_ces': eachLead['properties']['d_lai_ces']['value']})
                if 'd_marrage_pr_visionnel_ces' in eachLead['properties']:
                        ts = int(eachLead['properties']['d_marrage_pr_visionnel_ces']['value'])
                        forecast_start = datetime.fromtimestamp(ts/1000)
                        vals.update({'forecast_start': forecast_start})
                if 'compte_client' in eachLead['properties']:
                        if eachLead['properties']['compte_client']['value'] :
                            partner_id = self.env['res.partner'].search([('name','=',eachLead['properties']['compte_client']['value'])])
                            if partner_id:
                                vals.update({'client_account': partner_id.id})
                if 'dealtype' in eachLead['properties']:
                        if eachLead['properties']['dealtype']['value']:
                            if eachLead['properties']['dealtype']['value'] == 'Contrat Logistique' :
                                vals.update({'transaction_type': 'logistic_contract'})
                            if eachLead['properties']['dealtype']['value'] == 'Prestation Additonnelle' :
                                vals.update({'transaction_type': 'additional_prestation'})
                            if eachLead['properties']['dealtype']['value'] == 'Prestation Ponctuelle' :
                                vals.update({'transaction_type': 'punctual_prestation'})

	        #ADD LIST CONTACTS
#TODO: VERIFY ID UNIQUE FOR CONTACT&COMPANY
                if 'num_associated_contacts' in eachLead['properties']:
                    if int(eachLead['properties']['num_associated_contacts']['value']) > 0 :
                        if len(eachLead['associations']['associatedVids']) > 0 :
                            for contact in eachLead['associations']['associatedVids'] :
                                detailContact = connection.send_get_request('/contacts/v1/contact/vid/' + str(int(contact)) + '/profile')
                                if detailContact :
                                    for partner in detailContact['properties']['email']['value'] :
                                        partner_id = self.env['res.partner'].search([('email','=',partner)])
                                        if partner_id :
                                                vals.update({'child_ids': [(4, partner_id.id)]})

	        #ADD LIST Entreprises
                if 'num_associated_contacts' in eachLead['properties']:
                    if int(eachLead['properties']['num_associated_contacts']['value']) > 0 :
                        if len(eachLead['associations']['associatedCompanyIds']) > 0 :
                            for contact in eachLead['associations']['associatedCompanyIds'] :
                                detailContact = connection.send_get_request('/companies/v2/companies/' + str(int(contact)))
                                if detailContact :
                                    for partner in detailContact['properties']['name']['value'] :
                                        partner_id = self.env['res.partner'].search([('name','=',partner)])
                                        if partner_id :
                                                vals.update({'company_ids': [(4, partner_id.id)]})


                if len(vals) > 0:
                    if int(eachLead['dealId']) in hubspotIds:
                        # Contact exists in Odoo hence, only update it
                        search_id = self.search([('hubspot_vid', '=', int(eachLead['dealId']))])
                        search_id.with_context({'from_hubspot':True}).write(vals)
                    else:
                        # create new contact in Odoo
                        self.with_context({'from_hubspot':True}).create(vals)
    logger.info('Completed Creating new Leads in Odoo')


    @api.model
    def getModifiedLeadsFromHubspot(self, key, app_name, modifiedDateForLead):
        logger.info('Getting modified leads from hubspot')
        changedLeads = []
        # global contactModifiedDate
        first = False
        oldData = False
        newleadModifiedDate = modifiedDateForLead
        with PortalConnection(key, app_name) as connection:
            logger.info('Getting modified leads from hubspot 1')
            updatedLeadsList = []
            logger.info('am i here')
            updatedLeadsList = connection.send_get_request('/deals/v1/deal/paged', {'limit': 50})
            logger.info('---------------updatedLeadsList------------------------')
            logger.info(updatedLeadsList)
            for eachLead in updatedLeadsList['deals'] :
                detailProperties = connection.send_get_request('/deals/v1/deal/' + str(int(eachLead['dealId'])))
                changedLeads.append(detailProperties)

        contact = self.env['ir.config_parameter'].sudo().set_param("hubspot.modifiedDateForLead", newleadModifiedDate)
        logger.info('Completed Getting modified leads from hubspot')
        return changedLeads



    @api.model
    def _syncHubspotLeads(self):
        self.syncHubspotLeads()
        
    #@api.model
    #def syncHubspotLeads(self):
        #logger.info('Synchronization with Hubspot Started')
        #'''Synchronize the crm leads with the hubspot Leads'''
        #Param = self.env['ir.config_parameter'].sudo()
        #hubspot_app_key = Param.get_param('hubspot.hubspot_app_key');
        #hubspot_app_name = Param.get_param('hubspot.hubspot_app_name');

        #if not hubspot_app_key or not hubspot_app_name:
            #raise UserError(_('Error in Synchronization!\nHubspot API Key and App Name need to be specified for synchronization of data with Odoo.'))
        #hubspot_app_key = APIKey(hubspot_app_key)

        #modifiedDateForLead = float(Param.get_param('hubspot.modifiedDateForLead') or 0)
        #changedLeads = self.getModifiedLeadsFromHubspot(hubspot_app_key, hubspot_app_name, modifiedDateForLead)
        #logger.info('--------------------------changedLeads---------------------------')
        #logger.info(changedLeads)
        #if len(changedLeads) > 0:
            #self.createNewLeadsInOdoo(changedLeads,hubspot_app_key, hubspot_app_name)
        #logger.info('Synchronization with Hubspot Completed')


    @api.multi
    def action_hide_contacts(self):
        if self.flag_contact == False :
            return self.write({'flag_contact': True})
        if self.flag_contact == True :
        	return self.write({'flag_contact': False})

    @api.multi
    def action_hide_companies(self):
        if self.flag_company == False :
            return self.write({'flag_company': True})
        if self.flag_company == True :
        	return self.write({'flag_company': False})

    @api.multi
    def action_hide_details(self):
        if self.flag_details == False :
            return self.write({'flag_details': True})
        if self.flag_details == True :
        	return self.write({'flag_details': False})
    @api.model
    def get_adress_mo(self,mo_id):
        mo_identification = self.env['maitre.ouvrage'].sudo().search([('id', '=', int(mo_id))])
        data = {
                'mo_identification_street': mo_identification.street_ouvrage,
                'mo_identification_street2': mo_identification.street2_ouvrage,
                'mo_identification_zip': mo_identification.zip_ouvrage,
                'mo_identification_city': mo_identification.city_ouvrage,
        }
        return data

    @api.model
    def get_data_info(self):
        logger.info('-----------------------get_data_info-------------------------') 
        sale_order_form_view = self.env['ir.ui.view'].sudo().search([('model', '=', 'sale.order'),('name', '=', 'orvea.sale.order')])
        logger.info(sale_order_form_view)
        if len(sale_order_form_view) > 1 :
            sale_order_form_view = sale_order_form_view[0]
        sale_order_tree_view = self.env['ir.ui.view'].sudo().search([('model', '=', 'sale.order'),('name', '=', 'sale.order.tree')])
        logger.info(sale_order_tree_view)
        if len(sale_order_tree_view) > 1 :
            sale_order_tree_view = sale_order_tree_view[0]
        data = {
                'sale_order_form_view': sale_order_form_view.id,
                'sale_order_tree_view': sale_order_tree_view.id,
        }
        logger.info(data)
        return data

#TODO: Create the Quotation View
    @api.multi
    def action_create_quotation(self):
        logger.info('----------------------- create_quotation -------------------------')
        form_view_id = self.env['ir.ui.view'].sudo().search([('model', '=', 'sale.order'),('name', '=', 'sale.order.form')])
        logger.info('---------------------------')
        logger.info(form_view_id)
        return {
		    'name': "Nouveau Devis",
		    'view_type': 'form',
		    'res_model': 'sale.order',
		    'view_id': form_view_id,
		    'view_mode': 'form',
		    'nodestroy': True,
		    'target': 'new',
		    'context': {'default_lead_id': self.id},
		    'type': 'ir.actions.act_window',
        }

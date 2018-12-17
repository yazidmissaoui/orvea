#-*- coding:utf-8 -*-

from odoo import api, fields, models
from odoo import tools, _
from odoo.exceptions import UserError, AccessError
from odoo.exceptions import ValidationError
from odoo.modules.module import get_module_resource
import base64
import encodings
import struct
import json
import requests
import dateutil.parser
from dateutil import parser
import time
from datetime import datetime, timedelta
from email.utils import formataddr
from dateutil import relativedelta
import babel
from odoo import workflow
import re
import psycopg2
import threading
import html2text

from email.utils import formataddr

from odoo import _, api, fields, models
from odoo import tools
from odoo.addons.base.ir.ir_mail_server import MailDeliveryException
from odoo.tools.safe_eval import safe_eval
import ast
from odoo.tools.safe_eval import safe_eval


class CallimMailMail(models.Model):
	_inherit = 'mail.mail'

	email_partner_cc = fields.Many2many('res.partner', 'message_partnercc_rel','mailid','partner_id', string="Cc", help='Blind Carbon copy message recipients')
	email_partner_bcc = fields.Many2many('res.partner', 'message_partnerbcc_rel','mailid','partner_id', string="Cci", help='Carbon copy message recipients')


	@api.multi
        def send(self, auto_commit=False, raise_exception=True):
                IrMailServer = self.env['ir.mail_server']
		body = False
		smtp_server_id = False
		signature_company = False
		subject = False
                for mail_id in self.ids:
                        try:
                                mail = self.browse(mail_id)
				user_id = self.env.uid
				user = self.env['res.users'].search([('id', '=', user_id)])
				signature_user = user.signature
				signature_company = user.company_id.signature_id.body_html
				if mail.case_id:
				    smtp_server_id = mail.case_id.company_affct_to.smtp_id.id
				    signature_company = mail.case_id.company_affct_to.signature_id.body_html
				else :
				    smtp_server_id = mail.mail_server_id.id
                                if 'joint' in mail.body_html and len(mail.attachment_ids) == 0 :
                                        raise ValidationError(_("Avez-vous oublié les Pièces Jointes ?"))
                                # TDE note: remove me when model_id field is present on mail.message - done here to avoid doing it multiple times in the sub method
                                if mail.model:
                                    model = self.env['ir.model'].sudo().search([('model', '=', mail.model)])[0]
                                else:
                                    model = None
                                if model:
                                    mail = mail.with_context(model_name=model.name)

                                # load attachment binary data with a separate read(), as prefetching all
                                # `datas` (binary field) could bloat the browse cache, triggerring
                                # soft/hard mem limits with temporary data.
                                attachments = [(a['datas_fname'], base64.b64decode(a['datas']))
                                               for a in mail.attachment_ids.sudo().read(['datas_fname', 'datas'])]

                                # specific behavior to customize the send email for notified partners
                                email_list = []
                                if mail.email_to:
                                    email_list.append(mail.send_get_email_dict())
                                for partner in mail.recipient_ids:
                                    email_list.append(mail.send_get_email_dict(partner=partner))
				# email cc
				email_cc = ''
				for partner in mail.email_partner_cc:
				    email_cc += partner.email+';'
				#email bcc        
				email_bcc = ''
				for partner in mail.email_partner_bcc:
				    email_bcc += partner.email+';'       
                                # headers
                                headers = {}
                                bounce_alias = self.env['ir.config_parameter'].get_param("mail.bounce.alias")
                                catchall_domain = self.env['ir.config_parameter'].get_param("mail.catchall.domain")
                                if bounce_alias and catchall_domain:
                                    if mail.model and mail.res_id:
                                        headers['Return-Path'] = '%s+%d-%s-%d@%s' % (bounce_alias, mail.id, mail.model, mail.res_id, catchall_domain)
                                    else:
                                        headers['Return-Path'] = '%s+%d@%s' % (bounce_alias, mail.id, catchall_domain)
                                if mail.headers:
                                    try:
                                        headers.update(safe_eval(mail.headers))
                                    except Exception:
                                        pass

                                # Writing on the mail object may fail (e.g. lock on user) which
                                # would trigger a rollback *after* actually sending the email.
                                # To avoid sending twice the same email, provoke the failure earlier
                                mail.write({
                                    'state': 'exception',
                                    'failure_reason': _('Error without exception. Probably due do sending an email without computed recipients.'),
                                })
                                mail_sent = False


                                # build an RFC2822 email.message.Message object and send it without queuing
                                res = None
				subject	= mail.subject
                                for email in email_list:
				    if signature_company :	
					body=email.get('body') + signature_user + signature_company
				    else:
					body=email.get('body') + signature_user

				
                                    msg = IrMailServer.build_email(
                                        email_from=mail.email_from,
                                        email_to=email.get('email_to'),
                                        subject=subject,
                                        body=body,
                                        body_alternative=email.get('body_alternative'),
				        email_cc = tools.email_split(email_cc),
				        email_bcc = tools.email_split(email_bcc),
                                        reply_to=mail.reply_to,
                                        attachments=attachments,
                                        message_id=mail.message_id,
                                        references=mail.references,
                                        object_id=mail.res_id and ('%s-%s' % (mail.res_id, mail.model)),
                                        subtype='html',
                                        subtype_alternative='plain',
                                        headers=headers)
				    _logger.info('------------------  test values mail   -----------------------')
				    _logger.info(msg)
                                    try:
                                        res = IrMailServer.send_email(msg, mail_server_id=smtp_server_id)
                                    except AssertionError as error:
                                        if error.message == IrMailServer.NO_VALID_RECIPIENT:
                                            # No valid recipient found for this particular
                                            # mail item -> ignore error to avoid blocking
                                            # delivery to next recipients, if any. If this is
                                            # the only recipient, the mail will show as failed.
                                            _logger.info("Ignoring invalid recipients for mail.mail %s: %s",
                                                         mail.message_id, email.get('email_to'))
                                        else:
                                            raise
                                if res:
                                    mail.write({'state': 'sent', 'message_id': res, 'failure_reason': False})
                                    mail_sent = True

                                # /!\ can't use mail.state here, as mail.refresh() will cause an error
                                # see revid:odo@openerp.com-20120622152536-42b2s28lvdv3odyr in 6.1
                                if mail_sent:
                                    _logger.info('Mail with ID %r and Message-Id %r successfully sent', mail.id, mail.message_id)
                                mail._postprocess_sent_message(mail_sent=mail_sent)
                        except MemoryError:
                                # prevent catching transient MemoryErrors, bubble up to notify user or abort cron job
                                # instead of marking the mail as failed
                                _logger.exception(
                                    'MemoryError while processing mail with ID %r and Msg-Id %r. Consider raising the --limit-memory-hard startup option',
                                    mail.id, mail.message_id)
                                raise
                        except psycopg2.Error:
                                # If an error with the database occurs, chances are that the cursor is unusable.
                                # This will lead to an `psycopg2.InternalError` being raised when trying to write
                                # `state`, shadowing the original exception and forbid a retry on concurrent
                                # update. Let's bubble it.
                                raise
                        except Exception as e:
                                failure_reason = tools.ustr(e)
                                _logger.exception('failed sending mail (id: %s) due to %s', mail.id, failure_reason)
                                mail.write({'state': 'exception', 'failure_reason': failure_reason})
                                mail._postprocess_sent_message(mail_sent=False)
                                if raise_exception:
                                    if isinstance(e, AssertionError):
                                        # get the args of the original error, wrap into a value and throw a MailDeliveryException
                                        # that is an except_orm, with name and value as arguments
                                        value = '. '.join(e.args)
                                        raise MailDeliveryException(_("Mail Delivery Failed"), value)
                                    raise

                        if auto_commit is True:
                                        self._cr.commit()
                return True


odoo.define('orvea_module.Orvea_buttons', function (require) {
    "use strict";

var core = require('web.core');
var rpc = require('web.rpc')


console.log('ttttttttttttttttt');
var ListController = require('web.ListController');
    ListController.include({
        renderButtons: function($node) {
        this._super.apply(this, arguments);
            if (this.$buttons) {
                let filter_button = this.$buttons.find('.open_popup');
                filter_button && filter_button.click(this.proxy('filter_button')) ;
            }
        },

        filter_button: function () {
	    rpc.query({
                model: 'sale.order',
                method: 'create_quotation_api',
                args: [[],"get_quotation_data",[]],
            })
            console.log('yay filter');

            //implement your click logic here
        }

    });

})

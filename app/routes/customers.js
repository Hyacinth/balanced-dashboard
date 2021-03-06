Balanced.CustomersRoute = Balanced.AuthRoute.extend({
});

Balanced.CustomerRoute = Balanced.AuthRoute.extend({
    pageTitle: function (route, setTitle) {
        var customer = route.controller.content;
        return Balanced.Utils.maybeDeferredLoading(customer, setTitle, function () {
            return 'Customer: loading ...';
        }, function () {
            return 'Customer: {0}'.format(customer.get('displayName'));
        });
    },

    model: function (params) {
        var marketplace = this.modelFor('marketplace');
        return marketplace.then(function (marketplace) {
            var customerUri = marketplace.get('customers_uri') + '/' + params.customer_id;
            return Balanced.Customer.find(customerUri);
        });
    }
});

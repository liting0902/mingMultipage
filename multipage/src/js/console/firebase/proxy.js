let FooBar = {
    _secretDrink: 'Jäger Bom',
    closeTime: 'never',
    phoneNumber: '02-2849-2839'
};
FooBar = new Proxy(FooBar, {
    set: function (target, prop, value) {
        if (prop === 'phoneNumber') {
            // phone number validation
            var re = /^\(?\d{2}\)?[\s\-]?\d{4}\-?\d{4}$/;
            if (!re.test(value)) {
                throw Error(`Cannot set ${prop} to ${value}. Wrong format. Should be xx-xxxx-xxxx`);
            }
        }
        target[prop] = value;
    },
    //..
});

FooBar.phoneNumber = "AA"

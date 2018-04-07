var Bitcore = require('bitcore-lib-polis');

var _ = require('lodash');

function AddressTranslator() {
};


AddressTranslator.getAddressCoin = function(address) {
  try {
    new Bitcore.Address(address);
    return 'polis';
  } catch (e) {
    return;
  }
};

AddressTranslator.translate = function(addresses, coin, origCoin) {
  var wasArray = true;
  if (!_.isArray(addresses)) {
    wasArray = false;
    addresses = [addresses];
  }
  origCoin = origCoin || AddressTranslator.getAddressCoin(addresses[0]);
  var ret =  _.map(addresses, function(x) {
    var orig = new Bitcore.Address(x).toObject();
    return Bitcore.Address.fromObject(orig).toString();
  });

  if (wasArray) 
    return ret;
  else 
    return ret[0];

};

// TODO delete dependencies; Polis address don't have to be translated.
AddressTranslator.translateInput = function(addresses) {
  return addresses;
}

AddressTranslator.translateOutput = function(addresses) {
  return addresses;
}




module.exports = AddressTranslator;

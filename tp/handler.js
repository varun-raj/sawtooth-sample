const { TransactionHandler } = require('sawtooth-sdk/processor/handler')
const { InvalidTransaction, InternalError } = require('sawtooth-sdk/processor/exceptions')
const SimpleStoreState = require('./state');
var { XO_FAMILY, XO_NAMESPACE } = require("./constants");
const cbor = require('cbor')

class SimpleStoreHandler extends TransactionHandler {
  constructor() {
    super(XO_FAMILY, ['1.0'], [XO_NAMESPACE])
  }

  apply(transactionProcessRequest, context) {
    let payload = cbor.decode(transactionProcessRequest.payload);
    let simpleStoreState = new SimpleStoreState(context);
    let header = transactionProcessRequest.header;
    
    if (payload.action === 'get') {
      return simpleStoreState.getValue(payload.data)
    } else if (payload.action === 'set') {  
      return simpleStoreState.setValue(payload.data)
    } else {
      throw new InvalidTransaction(
        `Action must be create, delete, or take not ${payload.action}`
      )
    }
  }
}


module.exports = SimpleStoreHandler;
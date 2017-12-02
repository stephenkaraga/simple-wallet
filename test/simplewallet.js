var SimpleWallet = artifacts.require("../contracts/SimpleWallet.sol");
contract("SimpleWallet", function(accounts) {
    it('the owner is allowed to send funds', function(){
        return SimpleWallet.deployed().then(function(instance){
            return instance.isAllowedToSend.call(accounts[0]).then(function(isAllowed) {
                assert(isAllowed, true, 'the owner should have been allowed to send funds');
            })
        })
    })
    it('the other account should not be allowed to send funds', function(){
        return SimpleWallet.deployed().then(function(instance){
            return instance.isAllowedToSend.call(accounts[1]).then(function(isAllowed) {
                assert.equal(isAllowed, false, 'the owner account was allowed');
            })
        })
    })

    it('adds accounts to the allowed list', function(){
        return SimpleWallet.deployed().then(function(instance){
            return instance.isAllowedToSend.call(accounts[1]).then(function(isAllowed) {
                assert.equal(isAllowed, false, 'the owner account was allowed');
            }).then(function() {
                return instance.allowAddressToSendMoney(accounts[1]);
            }).then(function() {
                return instance.isAllowedToSend.call(accounts[1]);
            }).then(function(isAllowed) {
                assert.equal(isAllowed, true, 'the owner account was not allowed');
            }).then(function() {
                return instance.disallowAddressToSendMoney(accounts[1]);
            }).then(function() {
                return instance.isAllowedToSend.call(accounts[1]);
            }).then(function(isAllowed) {
                assert.equal(false, isAllowed, 'the account was allowed');
            })
        });
    })

    it('should check Deposit Events', function(){
        SimpleWallet.deployed().then(function(instance){
            var event = instance.allEvents();
            event.watch(function(error, result) {
                if (error) {
                    console.err(error);
                } else {
                    assert.equal(result.event, "Deposit");
                    assert.equal(web3.fromWei(result.args.amount.valueOf(), "ether"), 1);
                    assert.equal(result.args._sender.valueOf(), web3.eth.accounts[0]);
                    event.stopWatching();
                }
            })
    
            web3.eth.sendTransaction({ from: web3.eth.accounts[0], to: meta.address, value: web3.toWei(1, "ether")})
        });

        
    })

    it('should check not allowed Deposit Events', function(){
        SimpleWallet.deployed().then(function(instance){
            web3.eth.sendTransaction({ from: web3.eth.accounts[0], to: instance.address, value: web3.toWei(1, "ether")}, function(error, result) {
                if (error) {
                    console.err(error);
                } else {
                    console.log('Success');
                }
            })
        });
        
    })
})
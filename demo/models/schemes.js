const mongoose = require('mongoose');

const schemesSchema = new mongoose.Schema({

    SchemeName: {
        type: String,
        require: true,
    },

    UniqueNo: {
        type: String,
        require: true,

    },
    SchemeCode: {
        type: String,
        require: true,
    },

    RTASchemeCode: {
        type: String,
        require: true,
    },

    ISIN: {
        type: String,
        require: true,

    },
    CodeNumber: {
        type: String,
        require: true,
    },

    AMCCode: {
        type: String,
        require: true,
    },

    Logo: {
        type: String,
        require: true,
    },

    SchemeType: {
        type: String,
        require: true,

    },
    SchemePlan: {
        type: String,
        require: true,
    },

    MainType: {
        type: String,
        require: true,
    },

    SubType: {
        type: String,
        require: true,
    },

    Monthly: {
        type: String,
        require: true,

    },
    Daily: {
        type: String,
        require: true,
    },

    PurchaseAllowed: {
        type: String,
        require: true,
    },

    PurchaseTransactionmode: {
        type: String,
        require: true,
    },
    MinimumPurchaseAmount: {
        type: String,
        require: true,

    },
    AdditionalPurchaseAmount: {
        type: String,
        require: true,
    },

    MaximumPurchaseAmount: {
        type: String,
        require: true,
    },

    PurchaseAmountMultiplier: {
        type: String,
        require: true,
    },

    PurchaseCutoffTime: {
        type: String,
        require: true,
    },

    RedemptionAllowed: {
        type: String,
        require: true,
    },

    RedemptionTransactionMode: {
        type: String,
        require: true,
    },

    MinimumRedemptionQty: {
        type: String,
        require: true,
    },


});

module.exports = mongoose.model('schemes', schemesSchema)
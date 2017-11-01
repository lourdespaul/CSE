const mongoose = require('mongoose');

const storeLogoSchema = new mongoose.Schema({
    store: { type: mongoose.Schema.Types.ObjectId, ref: 'store', unique:true },
    logoImage: { data: Buffer, contentType: String }
});

const StoreLogo = mongoose.model('storelogo', storeLogoSchema);

module.exports = StoreLogo;
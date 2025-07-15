const mongoose = require('mongoose');

const claimHistorySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  pointsClaimed: { type: Number, required: true, min:1 , max:10 },
  claimedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('ClaimHistory', claimHistorySchema);

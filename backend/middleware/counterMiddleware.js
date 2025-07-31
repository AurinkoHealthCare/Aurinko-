// plugins/autoIncrement.js
const Counter = require("../model/counterSchema");

function autoIncrement(field) {
  return async function (next) {
    if (this.isNew) {
      try {
        const counter = await Counter.findByIdAndUpdate(
          { _id: field },
          { $inc: { seq: 1 } },
          { new: true, upsert: true }
        );
        this[field] = counter.seq;
      } catch (err) {
        return next(err);
      }
    }
    next();
  };
}

module.exports = autoIncrement;

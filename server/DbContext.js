const mongoose = require('mongoose');

class DbContext {
  constructor() {
    this._isConnected = false;
    this._connection = null;
  }

  connect(url) {
    if (!this._isConnected) {
      mongoose.Promise = global.Promise;
      this._connection = mongoose.connection;
      mongoose
        .connect('mongodb://127.0.0.1:27017/testCypress', {
          autoIndex: false,
          useNewUrlParser: true,
          useUnifiedTopology: true
        })
        .catch(err => {
          throw err;
        });
    }
  }

  getConnection() {
    return new Promise(resolve => {
      const connectionState = this._connection._readyState;
      if (connectionState === this._connection.states.connected) {
        resolve(this._connection);
      } else {
        this._connection.on('connected', () => {
          resolve(this._connection);
        });
      }
    });
  }
}

module.exports = new DbContext;

'use strict';

const Promise = require('bluebird');
const RedashClient = require('./RedashClient').RedashClient;

exports.AccountManager = class AccountManager {
  constructor (config) {
    this.config = config;
  };

  redashClient () {
    this.client = this.client || new RedashClient(this.config);
    return this.client;
  };

  createUser (userDetails) {
    return this.redashClient().login();
  }
};

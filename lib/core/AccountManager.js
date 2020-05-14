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

  provisionUser (userDetails) {
    return this.redashClient().login()
      .then(
        this.redashClient().provisionUser(userDetails.email, userDetails.name)
      );
  }

  revokeUser (userDetails) {
    return this.redashClient().login()
      .then(
        this.redashClient().revokeUser(userDetails.email)
      );
  }

  showUsers (userDetails) {
    return this.redashClient().login()
      .then(
        this.redashClient().getUsers(userDetails.emailOrName, userDetails.status, userDetails.queryOptions)
      );
  }
};

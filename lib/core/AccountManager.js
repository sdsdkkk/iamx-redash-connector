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

  provisionUser (context) {
    return this.redashClient().login()
      .then(() => {
        return this.redashClient().createUser(context.user.email, context.user.name)
          .catch(() => {
            return this.redashClient().enableUser(context.user.email);
          });
      });
  }

  revokeUser (context) {
    return this.redashClient().login()
      .then(() => {
        return this.redashClient().disableUser(context.user.email)
          .catch(() => {
            return this.redashClient().deletePendingUser(context.user.email); 
          });
      });
  }

  showUsers (context) {
    return this.redashClient().login()
      .then(() => {
        return this.redashClient().getUsers(context.user.email, context.user.status, context.queryOptions)
          .then((result) => {
            return result;
          });
      });
  }
};

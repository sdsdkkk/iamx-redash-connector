'use strict';

const Promise = require('bluebird');
const AccountManager = require('./AccountManager').AccountManager;
const Schema = require('./Schema');
const Metadata = require('./Metadata').ModuleMetadata;

exports.Connector = class RedashConnector {
  constructor (config) {
    this.accountManager = new AccountManager(config);
  };

  engine () {
    return Metadata.Engine;
  };

  version () {
    return Metadata.Version;
  };

  name () {
    return Metadata.Name;
  };

  supportedExecution () {
    return Metadata.SupportedExecution;
  };

  registryFormat () {
    return Schema.CredentialsRegistryDataSchema;
  };

  readContextFormat () {
    return Schema.ReadOnlyWorkflowContextSchema;
  };

  writeContextFormat () {
    return Schema.MutatingWorkflowContextSchema;
  };

  provision (context) {
    let mContext = { ...context };
    return this.accountManager.provisionUser(mContext);
  };

  revoke (context) {
    let mContext = { ...context };
    return this.accountManager.revokeUser(mContext);
  };

  show (context) {
    let mContext = { ...context };
    return this.accountManager.showUsers(mContext);
  };
};

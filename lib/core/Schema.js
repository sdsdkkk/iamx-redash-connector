'use strict';

const CredentialsRegistryDataSchema = {
  type: 'object',
  properties: {
    credentials: {
      type: 'object',
      properties: {
        email: { type: 'string' },
        password: { type: 'string' }
      },
      required: [ 'email', 'password' ]
    },
    baseUri: { type: 'string' },
    redashVersion: { type: 'string' }
  },
  required: [ 'credentials', 'baseUri' ]
};

const MutatingWorkflowContextSchema = {
  type: "object",
  properties: {
    user: {
      type: 'object',
      properties: {
        email: { type: 'string' }
      },
      required: [ 'email' ]
    }
  }
};

const ReadOnlyWorkflowContextSchema = {
  type: 'object',
  properties: {
    user: {
      type: 'object',
      properties: {
        emailOrName: { type: 'string' },
        status: { type: 'string', default: 'active' }
      }
    },
    queryOptions: {
      type: 'object',
      properties: {
        page: { type: 'integer', default: 1 },
        pageSize: { type: 'integer', default: 20 },
        order: { type: 'string', default: 'created_at' }
      }
    }
  }
};

exports.CredentialsRegistryDataSchema = CredentialsRegistryDataSchema;
exports.MutatingWorkflowContextSchema = MutatingWorkflowContextSchema;
exports.ReadOnlyWorkflowContextSchema = ReadOnlyWorkflowContextSchema;
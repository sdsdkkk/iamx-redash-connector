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
        email: { type: 'string' },
        name: { type: 'string' }
      },
      required: [ 'email' ]
    },
    accessPolicies: {
      type: 'object',
      properties: {
        groups: {
          type: 'array',
          items: {
            type: 'string'
          }
        }
      }
    }
  }
};

const ReadOnlyWorkflowContextSchema = {
  type: 'object',
  properties: {
    user: {
      type: 'object',
      properties: {
        email: { type: 'string' },
        name: { type: 'string' }
      }
    }
  }
};

exports.CredentialsRegistryDataSchema = CredentialsRegistryDataSchema;
exports.MutatingWorkflowContextSchema = MutatingWorkflowContextSchema;
exports.ReadOnlyWorkflowContextSchema = ReadOnlyWorkflowContextSchema;

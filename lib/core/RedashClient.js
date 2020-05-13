'use strict';

const Promise = require('bluebird');
const request = require('superagent');

exports.RedashClient = class RedashClient {
  constructor (config) {
    this.config = config;
    this.payloadFormat = 'form';
  };

  login () {
    let uri = `${this.config.baseUri}/login`
    let payload = {
      email: this.config.credentials.email,
      password: this.config.credentials.password
    };
    console.log(uri);
    return Promise.resolve(
      request.post(uri)
        .type(this.payloadFormat)
        .send(payload)
        .then(response => response)
    );
  }
};

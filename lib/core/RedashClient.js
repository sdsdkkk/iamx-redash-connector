'use strict';

const Promise = require('bluebird');
const request = require('superagent');
const cheerio = require('cheerio');

const FAILED_LOGIN_TITLE_TEXT = 'Login to Redash';
const SUCCESS_LOGIN_TITLE_TEXT = 'Redash';

exports.RedashClient = class RedashClient {
  constructor (config) {
    this.config = config;
    this.payloadFormat = 'form';
    this.agent = request.agent();
  };

  login () {
    let uri = `${this.config.baseUri}/login`
    let payload = {
      email: this.config.credentials.email,
      password: this.config.credentials.password
    };
    return Promise.resolve(
      this.agent.post(uri)
        .type(this.payloadFormat)
        .send(payload)
        .then(response => {
          let $ = cheerio.load(response.text);
          let pageTitle = $('title').text();

          if (pageTitle === SUCCESS_LOGIN_TITLE_TEXT) {
            return true;
          };

          if (pageTitle === FAILED_LOGIN_TITLE_TEXT) {
            return false;
          };

          throw('Login error');
        })
    );
  };

  getUsers (emailOrName, status = 'active', options = { page: 1, pageSize: 20, order: 'created_at' }) {
    let uriMap = {
      active: `${this.config.baseUri}/users`,
      pending: `${this.config.baseUri}/users/pending`,
      disabled: `${this.config.baseUri}/users/disabled`
    };

    let query = {
      q: emailOrName,
      page: options.page,
      page_size: options.page_size,
      order: options.order
    };

    return Promise.resolve(
      this.agent.get(uriMap[status])
        .query(query)
        .then(response => {
          let $ = cheerio.load(response.text);
          return $('title').text();
        })
    );
  };

  provisionUser (email, name) {
    return Promise.resolve(null);
  };

  revokeUser (email) {
    return Promise.resolve(null);
  };
};

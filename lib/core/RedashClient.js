'use strict';

const Promise = require('bluebird');
const request = require('superagent');
const cheerio = require('cheerio');

const FAILED_LOGIN_TITLE_TEXT = 'Login to Redash';
const SUCCESS_LOGIN_TITLE_TEXT = 'Redash';

exports.RedashClient = class RedashClient {
  constructor (config) {
    this.config = config;
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
        .type('form')
        .send(payload)
        .then(response => {
          if (!this._loginSuccess(response)) {
            throw('Invalid credentials');
          }
        })
    );
  };

  getUsers (emailOrName, status = 'active', options = { page: 1, pageSize: 20, order: 'created_at' }) {
    this._checkAuthenticationStatus();

    let uri = `${this.config.baseUri}/api/users`;
    let query = {
      q: emailOrName || '',
      page: options.page,
      page_size: options.pageSize,
      order: options.order
    };

    if (status === 'pending') query.pending = true;
    else if (status === 'disabled') query.disabled = true;
    else query.pending = false;

    return Promise.resolve(
      this.agent.get(uri)
        .set('Cookie', this.cookies)
        .query(query)
        .then(response => {
          let result = JSON.parse(response.text);
          return result;
        })
    );
  };

  createUser (email, name) {
    this._checkAuthenticationStatus();

    let uri = `${this.config.baseUri}/api/user`
    let payload = {
      email: email,
      name: name
    };

    return Promise.resolve(
      this.agent.post(uri)
        .send(payload)
        .then(response => {
          let result = JSON.parse(response.text);
          return result;
        })
    );
  };

  enableUser (email) {
    this._checkAuthenticationStatus();

    let requestMethod = 'DELETE';
    let uri = `${this.config.baseUri}/api/users/${userId}/disable`

    return Promise.resolve(
      this.agent.post(uri)
        .send(payload)
        .then(response => {
          let result = JSON.parse(response.text);
          return result;
        })
    );
  };

  disableUser (email) {
    this._checkAuthenticationStatus();

    let requestMethod = 'POST';
    let uri = `${this.config.baseUri}/api/users/${userId}/disable`

    return Promise.resolve(
      this.agent.post(uri)
        .send(payload)
        .then(response => {
          let result = JSON.parse(response.text);
          return result;
        })
    );
  };

  revokeUser (email) {
    this._checkAuthenticationStatus();

    return Promise.resolve(null);
  };

  _loginSuccess(response) {
    let $ = cheerio.load(response.text);
    let pageTitle = $('title').text();

    if (pageTitle === SUCCESS_LOGIN_TITLE_TEXT) {
      this.cookies = response.request.cookies;
      return true;
    };

    if (pageTitle === FAILED_LOGIN_TITLE_TEXT) {
      return false;
    };

    throw('Login error');
  };

  _checkAuthenticationStatus () {
    if (!this.cookies) {
      throw('Unauthenticated');
    }
  };
};
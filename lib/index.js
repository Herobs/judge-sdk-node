import crypto from 'crypto';
import restify from 'restify';
import JudgeServiceError from './JudgeServiceError';

export default class Judge {
  /**
   * Constructor
   *
   * @param {string} judge api base uri
   * @param {string} account id
   * @param {string} account secret
   */
  constructor(base, id, secret) {
    this.base = base;
    this.id = id;
    this.secret = secret;
    this.sha256 = crypto.createHmac('sha256', this.secret);
    this.client = restify.createJsonClient({
      url: base,
      connectTimeout: 2000,
      requestTimeout: 2000,
      retry: false,
      signRequest: req => {
        req.setHeader('Authorization',
          this.getAuthorization(req.path, req.method));
      }
    });
  };

  /**
   * Generate sigature
   *
   * @param {string} resource path
   * @param {GET|POST|PUT|DELETE|...} judge service method
   * @return Authorization header
   */
  getAuthorization(path, method) {
    const now = Math.floor(Date.now() / 1000);
    const sigature = this.sha256
      .update(this.id + now + path + method)
      .digest('hex');

    return [this.id, now, path, method, sigature].join(' ');
  }

  /**
   * Handler wrapper
   *
   * @param {function} callback
   * @return {function} http response handler
   */
  handler(callback) {
    return (err, req, res, result) => {
      if (err) throw new JudgeServiceError(err.message);
      callback(result);
    };
  }

  /**
   * Create a new problem
   *
   * @param {object} problem will be created
   * @return {object} judge service response
   */
  addProblem(problem, callback) {
    this.client.post('/problem', problem, this.handler(callback));
  };

  /**
   * Update specific problem
   *
   * @param {integer} the problem will be updated
   * @param {object} problem want to be updated
   * @return {object} judge service response
   */
  updateProblem(id, problem, callback) {
    this.client.put('/problem/' + id, problem, this.handler(callback));
  };

  /**
   * Delete specific problem
   *
   * @param {object} the problem will be deleted
   * @return {object} judge service response
   */
  removeProblem(id, callback) {
    this.client.del('/problem/' + id, this.handler(callback));
  };

  /**
   * Copy specific problem
   *
   * @param {object} the problem will be copied
   * @return {object} judge service response
   */
  copyProblem(id, callback) {
    this.client.get('/problem/' + id, this.handler(callback));
  };

  /**
   * Update specific test file
   *
   * @param {integer} test case belong to
   * @param {integer} test case id
   * @param {object} the test case files want to be updated
   * @return {object} judge service response
   */
  testcase(problemId, caseId, files, callback) {
    this.client.post('/testcase/' + problemId + '/' + caseId,
      files, this.handler(callback));
  };

  /**
   * Delete specific test case
   *
   * @param {integer} test case belong to
   * @param {integer} test case id
   * @return {object} judge service response
   */
  removeTestCase(problemId, caseId, callback) {
    this.client.del('/testcase/' + problemId + '/' + caseId,
      this.handler(callback));
  }

  /**
   * Add a judge record
   *
   * @param {object} the code want to be judged
   * @return {object} judge service response
   */
  add(record, callback) {
    this.client.post('/status', record, this.handler(callback));
  };

  /**
   * Query judge record
   * @param {integer} record status id
   * @return {object} judge service response
   */
  query(id, callback) {
    this.client.get('/status/' + id, this.handler(callback));
  };
};

export default class JudgeServiceError extends Error {
  constructor(message) {
    super(message);
    this.message = message;
    this.name = 'JudgeServiceError';
  }
};

import Judge from '../lib/index';
import JudgeServiceError from '../lib/JudgeServiceError';

const judge = new Judge('http://127.0.0.1:8002', '1', 'Herobs');

try {
  judge.addProblem({});
} catch (e) {
  console.log(e);
}

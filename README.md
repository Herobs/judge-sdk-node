Judge API SDK with PHP
======================
A simple judge api sdk write with NodeJS for [OPJS](http://opjs.coder.tips).

Install
-------
npm install judge-sdk-node --save

Usage
-----
```javascript
import Judge from 'judge-sdk-node';

// create a new judge instance
// $uri is the base judge api address, id and secret is your identifier
const judge = new Judge(uri, id, secret);

// add problem
problem = judge.addProblem(problem);
// update problem
judge.updateProblem(problemId, problem);
// remove problem
judge.removeProblem(problemId);
// add a group test files
judge.testcase(problemId, caseId, files);
// add a judge record
judge.add(record);
// query a judge record result
result = judge.query(statusId);
```

All objects in params are reference to [API docs](http://opjs.coder.tips/docs).

## Summary
An Express app that takes a matrix of integers:
Ex:
```
|314| 
|159| 
|265|
```
And returns the minimum weight path through the matrix.

## Prerequisites
* Node.js

## Installation and Running
```
git clone https://github.com/rv-kip/matrix_min_weight.git
cd matrix_min_weight
npm install
npm start
```

## Example Usage
```
$ curl -H 'Content-type: application/json'  -d '[[3,100,4],[10,5,9],[12,2,6]]' http://localhost:8081/
{"weight":10,"path":[3,5,2]}
```

```
$ curl http://localhost:8081/ping
{"status":"OK","name":"matrix_min_weight","version":"1.0.0","pid":"_38642"}
```

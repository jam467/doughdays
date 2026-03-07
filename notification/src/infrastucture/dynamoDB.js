var AWS = require('aws-sdk');
// Set the region 
AWS.config.update({ region: 'ap-southeast-2' });
var dynamodb = new AWS.DynamoDB.DocumentClient({ apiVersion: '2012-08-10' });

async function scanLEK(params,scanLoad) {
    var data = await scan(params)
    if (data.LastEvaluatedKey) {
        params["ExclusiveStartKey"] = data.LastEvaluatedKey;
        return await scanLEK(params,data.Items.concat(scanLoad));
    }else{
        return data.Items.concat(scanLoad);
    }
}
function scan(params) {
    return new Promise((resolve, reject) => {
        dynamodb.scan(params, function (err, data) {
            if (err) {
                console.log(err);
                reject(err);
            } else {
                resolve(data);
            }

        })
    })
}
async function queryLEK(params,queryLoad) {
    var data = await query(params)
    if (data.LastEvaluatedKey) {
        params["ExclusiveStartKey"] = data.LastEvaluatedKey;
        return await queryLEK(params,data.Items.concat(queryLoad));
    }else{
        return data.Items.concat(queryLoad);
    }
}
function query(params) {
    return new Promise((resolve, reject) => {
        dynamodb.query(params, function (err, data) {
            if (err) {
                console.log(err);
                reject(err);
            } else {
                resolve(data);
            }
        })
    })
}

function update(params) {
    return new Promise((resolve, reject) => {
        dynamodb.update(params, function (err, data) {
            if (err) {
                console.log(err);
                reject(err);
            } else {
                console.log(data);
                resolve(data);
            }
        })
    })
}

function dDelete(params) {
    return new Promise((resolve, reject) => {
        dynamodb.delete(params, function (err, data) {
            if (err) {
                console.log(err);
                reject(err);
            } else {
                resolve(data);
            }
        })
    })
}

function batchWrite(params) {
    return new Promise((resolve, reject) => {
        dynamodb.batchWrite(params, function (err, data) {
            if (err) {
                console.log(err);
                reject(err);
            } else {
                resolve(data);
            }
        })
    })
}

function put(params){
    return new Promise((resolve,reject)=>{
        dynamodb.put(params, function(err, data) {
            if(err){
                console.log(err);
                reject(err);
            }else{
                console.log(data);
                resolve(data);
            }
        })
    })
}

module.exports = { scan: scan, query: query, update: update,scanLEK:scanLEK,queryLEK:queryLEK,put:put,delete:dDelete };
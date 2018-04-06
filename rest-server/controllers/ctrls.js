exports.promiseGetResponse = (promise, res, status) => {
  promise.then((val) => {
    res = addHeader(res, val);
    res.status(status).send(JSON.stringify(val));
  }).catch((err) => {
    console.log(err);
    res.status(500).send(err);
  });
};

exports.promiseGetPagedResponse = (promiseCount, promiseGet, res, status) => {
  promiseCount.then((val) => {
    res.set('X-Total-Count', val[0].cnt);
    res.set('Access-Control-Expose-Headers', 'X-Total-Count');
    promiseGet.then((val) => {
      res.status(status).send(JSON.stringify(val));
    }).catch(err => {
      console.log(err);
      res.status(500).send(err);
    });
  }).catch((err) => {
    console.log(err);
    res.status(500).send(err);
  });
};


exports.promiseGetOneResponse = (promise, res, status)=>{
  promise.then((val) => {
    if ( val.length < 1 ){
      res.status(400).send("Not Found");
    }
    else{
      res = addHeader(res, val[0]);
      res.status(status).send(JSON.stringify(val[0]));
    }
  })
};

exports.promisePostResponse = (promise, req, res, status) => {
  promise.then(() => {
    res = addHeader(res, req.body);
    res.status(status).send(JSON.stringify(req.body))
  }).catch((err) => {
    console.log(err);
    res.status(500).send(err);
  })
};

exports.promisePutOneResponse = (putPromise, getPromise, res, status) => {
  putPromise.then(() => {
    this.promiseGetOneResponse(getPromise, res, status);
  }).catch((err) => {
    console.log(err);
    res.status(500).send(err);
  })
};


exports.promiseDeleteNotice = (promise, message, res, status) => {
  promise.then(()=>{
    res = addHeader(res, message);
    res.status(status).send(JSON.stringify(message))
  }).catch((err) => {
    console.log(err);
    res.status(500).send(err);
  })
};

exports.promisePutNotice = (promise, message, res, status) => {
  promise.then(()=>{
    res = addHeader(res, message);
    res.status(status).send(JSON.stringify(message))
  }).catch((err) => {
    console.log(err);
    res.status(500).send(err);
  })
};

exports.promisePostNotice = (promise, message, res, status) => {
  promise.then(()=>{
    res = addHeader(res, message);
    res.status(status).send(JSON.stringify(message))
  }).catch((err) => {
    console.log(err);
    res.status(500).send(err);
  })
};


exports.paginate = (req) => {
  let pagin = {};
  if ( req.query._start !== undefined && req.query._end !== undefined){
    const start = Number(req.query._start);
    pagin['offset'] = start;
    pagin['limit'] = Number(req.query._end) - start;
  }
  return pagin;
};

function addHeader (res, val){
  res.set('X-Total-Count', val.length);
  res.set('Access-Control-Expose-Headers', 'X-Total-Count');
  return res;
}
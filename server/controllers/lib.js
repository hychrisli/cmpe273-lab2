


exports.paginate = (req) => {
  let pagin = {};
  if ( req.query._start !== undefined && req.query._end !== undefined){
    const start = Number(req.query._start);
    pagin['skip'] = start;
    pagin['limit'] = Number(req.query._end) - start;
  }
  return pagin;
};
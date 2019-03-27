const requesterQueries = {
  create: 'INSERT INTO loans (amount, owner) VALUES ($1, $2) RETURNING *',
  getNonPaid:
    'SELECT * FROM loans WHERE status != $1 AND status != $2 AND owner = $3',
};

export default requesterQueries;

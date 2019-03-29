const requesterQueries = {
  create: 'INSERT INTO loans (amount, owner) VALUES ($1, $2) RETURNING *',
  getOne: 'SELECT * FROM loans WHERE id = $1 AND owner = $2',
  getNonPaid:
    'SELECT * FROM loans WHERE status != $1 AND status != $2 AND owner = $3',
  payLoan: 'UPDATE loans SET status = 2, paiddate = $1 WHERE status = 1 AND owner = $2 RETURNING *',
};

export default requesterQueries;

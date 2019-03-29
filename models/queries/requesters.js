const requesterQueries = {
  create: 'INSERT INTO loans (amount, owner) VALUES ($1, $2) RETURNING *',
  getOne: 'SELECT * FROM loans WHERE id = $1 AND owner = $2',
  getPending: 'SELECT * FROM loans WHERE status = 0 AND owner = $1',
  getNonPaid:
    'SELECT * FROM loans WHERE status != $1 AND status != $2 AND owner = $3',
  delete: 'DELETE FROM loans WHERE status = 0 AND owner = $1',
  updateLoan:
    'UPDATE loans SET amount=$1 WHERE owner=$2 AND status=0 RETURNING *',
};

export default requesterQueries;

const contributorsQueries = {
  contribute:
    'INSERT INTO contributions (amount, owner) VALUES ($1, $2) RETURNING *',
  getContrubutions: 'SELECT * FROM contributions WHERE owner=$1',
  getLoans: 'SELECT * FROM loans WHERE status=0',
  getContrubutionById: 'SELECT * FROM contributions WHERE id=$1',
  payContribution:
    'UPDATE contributions SET status = 1, paiddate = $1 WHERE id = $2 AND status = 0 RETURNING *',
  getAllContributions: 'SELECT * FROM contributions',
};

export default contributorsQueries;

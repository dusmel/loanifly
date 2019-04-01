const loansQueries = {
  getById: 'SELECT * FROM loans WHERE id = $1',
  grant: 'UPDATE loans SET status = $1, granteddate = $2 WHERE id = $3 AND status = 0 RETURNING *',
  getLoans: 'SELECT * FROM loans',
  
};

export default loansQueries;

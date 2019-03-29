const requesterQueries = {
  create: "INSERT INTO loans (amount, owner) VALUES ($1, $2) RETURNING *",
  getOne: "SELECT * FROM loans WHERE id = $1 AND owner = $2",
  getNonPaid:
    "SELECT * FROM loans WHERE status != $1 AND status != $2 AND owner = $3",
  updateLoan:
    "UPDATE loans SET amount=$1 WHERE owner=$2 AND status=0 RETURNING *"
};

export default requesterQueries;

const contributorsQueries = {
  contribute:
    "INSERT INTO contributions (amount, owner) VALUES ($1, $2) RETURNING *",
  getContrubutions: "SELECT * FROM contributions WHERE owner=$1"
};

export default contributorsQueries;

const contributorsQueries = {
  contribute:
    "INSERT INTO contributions (amount, owner) VALUES ($1, $2) RETURNING *"
};

export default contributorsQueries;

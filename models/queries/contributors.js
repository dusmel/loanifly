const contributorsQueries = {
  contribute:
    "INSERT INTO contributions (amount, status) VALUES ($1, $2) RETURNING *"
};

export default contributorsQueries;

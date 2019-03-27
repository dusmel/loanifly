const contributorsQueries = {
  contribute:
<<<<<<< HEAD
    'INSERT INTO contributions (amount, status) VALUES ($1, $2) RETURNING *',
=======
    "INSERT INTO contributions (amount, owner) VALUES ($1, $2) RETURNING *"
>>>>>>> 15f57c1b0a3ed1bbb88dca6149337ff63a0a83f5
};

export default contributorsQueries;

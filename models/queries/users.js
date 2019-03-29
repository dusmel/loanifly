const userQueries = {
  create:
    'INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, $4) RETURNING *',
  login: 'SELECT * FROM users where email = $1',
  getUsers: 'SELECT * FROM users',
  getUser: 'SELECT * FROM users where id = $1',
<<<<<<< HEAD

=======
  deleteUser: 'DELETE FROM users WHERE id = $1 RETURNING (name, email, role)',
>>>>>>> d71249a7e7b27ab4a3ef1deba2130847aae094dd
};

export default userQueries;

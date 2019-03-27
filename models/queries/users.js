const userQueries = {
  create:
    'INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, $4) RETURNING *',
  login: 'SELECT * FROM users where email = $1',
  getUsers: 'SELECT * FROM users',
  getUser: 'SELECT * FROM users where id = $1',
};

export default userQueries;

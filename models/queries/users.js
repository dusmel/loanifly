const userQueries = {
  create:
    'INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, $4) RETURNING *',
  login: 'SELECT * FROM users where email = $1',
  getUsers: 'SELECT * FROM users',
};

export default userQueries;

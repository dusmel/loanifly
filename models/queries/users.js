const userQueries = {
  create: 'INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, $4) RETURNING *',
};

export default userQueries;

import DB from "../models/index";

const db = new DB();

const migrate = async () => {
  const users = await db.defineUser();
  console.log(users.rows ? "Table users created" : users.res);

  const loans = await db.defineLoan();
  console.log(loans.rows ? "Table loans created" : loans.res);

  const contributions = await db.defineContributions();
  console.log(
    contributions.rows ? "Table contributions created " : contributions.res
  );
};

migrate();

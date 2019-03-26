import DB from "../models/index";

const db = new DB();

const migrate = async () => {
  const users = await db.defineUser();
  console.log(users.length === 0 ? "Table users created" : users.res);

  const loans = await db.defineLoan();
  console.log(loans.length === 0 ? "Table loans created" : loans.res);

  const contributions = await db.defineContributions();
  console.log(
    contributions.length === 0
      ? "Table contributions created"
      : contributions.res
  );
};

migrate();

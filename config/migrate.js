import DB from "../models/index";

const db = new DB();

const migrate = () => {
  const users = db.defineUser();
  const loans = db.defineLoan();
  const contributions = db.defineContributions();
  return [users, loans, contributions];
};

console.log(migrate());

import dotenv from "dotenv";
import pg from "pg";

dotenv.config();

class DB {
  constructor() {
    this.pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
  }

  async runQuery(query, params = []) {
    try {
      const response = await this.pool.query(query, params);
      return {
        response
      };
    } catch (e) {
      return {
        error: e
      };
    }
  }

  async defineUser() {
    const query = `
        CREATE TABLE IF NOT EXISTS users (id SERIAL PRIMARY KEY NOT NULL ,
        name varchar(100) NOT NULL,
        email varchar(100) NOT NULL,
        password text NOT NULL,
        role int,
        date date DEFAULT NOW());`;

    try {
      const response = await this.pool.query(query);
      return response;
    } catch (e) {
      return {
        status: 500,
        res: e
      };
    }
  }

  async defineLoan() {
    const query = `
        CREATE TABLE IF NOT EXISTS loans (id SERIAL PRIMARY KEY NOT NULL ,
        amount int NOT NULL,
        status int,
        createdDate date DEFAULT NOW(),
        grantedDate date DEFAULT NOW(),
        paidDate date DEFAULT NOW());`;

    try {
      const response = await this.pool.query(query);
      return response;
    } catch (e) {
      return {
        status: 500,
        res: e
      };
    }
  }

  async defineContributions() {
    const query = `
        CREATE TABLE IF NOT EXISTS contributions (id SERIAL PRIMARY KEY NOT NULL ,
        amount int NOT NULL,
        status int,
        createdDate date DEFAULT NOW(),
        paidDate date DEFAULT NOW());`;

    try {
      const response = await this.pool.query(query);
      return response;
    } catch (e) {
      return {
        status: 500,
        res: e
      };
    }
  }
}

export default DB;

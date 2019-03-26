import dotenv from "dotenv";
import { Pool } from "pg";

class DB {
  constructor() {
    this.pool = new Pool();
    this.client;
    this.connect();
  }

  async connect() {
    try {
      this.client = pool.connect(process.env.DATABASE_URL);
    } catch (e) {
      return {
        status: 500,
        message: e
      };
    }
  }

  async defineUser() {
    const query = `
        CREATE TYPE IF NOT EXISTS role AS ENUM (0, 1, 2);
        CREATE TABLE IF NOT EXISTS users (id SERIAL PRIMARY KEY NOT NULL ,
        name varchar(100) NOT NULL,
        email varchar(100) NOT NULL,
        password text NOT NULL,
        role role,
        date date DEFAULT NOW();`;

    try {
      const response = await this.client.query(query);
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
        CREATE TYPE IF NOT EXISTS status AS ENUM (0, 1, 2, 3);
        CREATE TABLE IF NOT EXISTS loans (id SERIAL PRIMARY KEY NOT NULL ,
        amount int NOT NULL,
        status status,
        createdDate date DEFAULT NOW(),
        grantedDate date DEFAULT NOW(),
        paidDate date DEFAULT NOW();`;

    try {
      const response = await this.client.query(query);
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
        CREATE TYPE IF NOT EXISTS status AS ENUM (0, 1);
        CREATE TABLE IF NOT EXISTS contributions (id SERIAL PRIMARY KEY NOT NULL ,
        amount int NOT NULL,
        status status,
        createdDate date DEFAULT NOW(),
        paidDate date DEFAULT NOW();`;

    try {
      const response = await this.client.query(query);
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

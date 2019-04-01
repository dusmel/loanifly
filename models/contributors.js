import DB from "./index";
import queries from "./queries/contributors";

const db = new DB();

const contributorsModel = {
  async contribute(body, user) {
    const { amount } = body;
    const { id } = user;
    try {
      const { response } = await db.runQuery(queries.contribute, [amount, id]);
      return {
        status: true,
        data: response
      };
    } catch (e) {
      return {
        status: false,
        message: e
      };
    }
  },
  async viewContributions(user) {
    try {
      const { response } = await db.runQuery(queries.getContrubutions, [
        user.id
      ]);
      return {
        status: true,
        data: response
      };
    } catch (e) {
      return {
        status: false,
        message: e
      };
    }
  },
  async viewLoans() {
    try {
      const { response } = await db.runQuery(queries.getLoans);
      return {
        status: true,
        data: response
      };
    } catch (e) {
      return {
        status: false,
        message: e
      };
    }
  },
  async payContribution(id) {
    try {
      const contribution = await db.runQuery(queries.getContrubutionById, [id]);
      if (contribution.response.rows.length === 0) {
        return {
          status: false,
          message: "the contribution does not exist..."
        };
      }
      if (contribution.response.rows[0].status !== 0) {
        return {
          status: false,
          message: "The contribution has already been paid ..."
        };
      }
      const { response } = await db.runQuery(queries.payContribution, [
        new Date(),
        id
      ]);

      return {
        status: true,
        data: response.rows
      };
    } catch (error) {
      return {
        status: false,
        message: error
      };
    }
  },
  
  async viewAllContributions(){
    const {response} = await db.runQuery(queries.getAllContributions);
    if(response.rowCount > 0){
      return {
        status: true,
        data: response.rows,
      }
    } else{
      return {
        status: false,
        message: 'no contribution found',
      }
    }
  },

  async viewContribution(id) {
    const { response } = await db.runQuery(queries.getContrubutionById, [id]);
    if (response.rowCount > 0) {
      return {
        status: true,
        data: response.rows,
      };
    } else {
      console.log(response);
      return {
        status: false,
        message: "The contribution not found",
      };
    }
  }

};

export default contributorsModel;

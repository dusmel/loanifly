import DB from "./index";
import queries from "./queries/contributors";

const db = new DB();

const contributorsModel = {
  async contribute(body) {
    const { amount } = body;

    try {
      const { response } = await db.runQuery(queries.contribute, [amount, 0]);
      return {
        status: true,
        data: response.rows
      };
    } catch (e) {
      return {
        status: false,
        message: e
      };
    }
  }
};

export default contributorsModel;

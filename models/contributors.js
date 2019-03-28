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
  }
};

export default contributorsModel;

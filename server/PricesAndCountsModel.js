
import Sequelize from "sequelize";

const sequelize = new Sequelize("1c_base", "root", "root", {
  dialect: "mysql",
  host: "localhost"
});



const PricesAndCountsModel = sequelize.define('prices_and_counts', {
    good_guid: {
        type: Sequelize.STRING,
        primaryKey: true
    },
    count: {
        type: Sequelize.STRING,
    },
    price: {
        type: Sequelize.STRING
    }
})

sequelize.sync({force: true}).then(result=>{
    console.log(result);
  })
  .catch(err=> console.log(err));

export default sequelize.model('prices_and_counts', PricesAndCountsModel)
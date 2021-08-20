
import Sequelize from "sequelize";

const sequelize = new Sequelize("1c_base", "root", "root", {
  dialect: "mysql",
  host: "localhost"
});



const GoodModel = sequelize.define('good', {
    guid: {
        type: Sequelize.STRING,
        primaryKey: true
    },
    title: {
        type: Sequelize.STRING,
    },
    group_id: {
        type: Sequelize.STRING
    }
})

sequelize.sync({force: true}).then(result=>{
    console.log(result);
  })
  .catch(err=> console.log(err));

export default sequelize.model('good', GoodModel)
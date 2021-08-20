
import Sequelize from "sequelize";

const sequelize = new Sequelize("1c_base", "root", "root", {
  dialect: "mysql",
  host: "localhost"
});



const Group = sequelize.define('group', {
    guid: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true
    },
    title: {
        type: Sequelize.STRING,
        allowNull: false
    }
})

sequelize.sync().then(result=>{
    console.log(result);
  })
  .catch(err=> console.log(err));

export default Group

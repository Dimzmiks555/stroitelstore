
import Sequelize from "sequelize";

const sequelize = new Sequelize("1c_base", "root", "root", {
  dialect: "mysql",
  host: "localhost",
  define: {
      timestamps: false
  }
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



const GroupModel = sequelize.define('group', {
    guid: {
        type: Sequelize.STRING,
        primaryKey: true
    },
    title: {
        type: Sequelize.STRING,
    },
    parent_group: {
        type: Sequelize.STRING,
    }
})

const PricesAndCountsModel = sequelize.define('prices_and_counts', {
    good_guid: {
        type: Sequelize.STRING,
        primaryKey: true
    },
    price: {
        type: Sequelize.STRING
    },
    sku: {
        type: Sequelize.STRING
    },
    unit: {
        type: Sequelize.STRING
    },
    amount: {
        type: Sequelize.STRING
    },
})

const AttributeModel = sequelize.define('attributes', {
    id: {
        type: Sequelize.STRING,
        auto_increment: true,
        primaryKey: true
    },
    title: {
        type: Sequelize.STRING
    },
    group_id: {
        type: Sequelize.STRING
    }
})


const GoodsAttributeModel = sequelize.define('goods_attributes', {
    id: {
        type: Sequelize.INTEGER,
        auto_increment: true,
        primaryKey: true
    },
    attr_id: {
        type: Sequelize.INTEGER
    },
    good_id: {
        type: Sequelize.STRING
    },
    value: {
        type: Sequelize.STRING
    }
})


GroupModel.hasMany(GoodModel, { foreignKey: 'group_id'})
GoodModel.belongsTo(GroupModel, { foreignKey: 'group_id'})


GoodModel.hasOne(PricesAndCountsModel, { foreignKey: 'good_guid'})
PricesAndCountsModel.belongsTo(GoodModel, { foreignKey: 'good_guid'})

GroupModel.hasMany(AttributeModel, { foreignKey: 'group_id'})
AttributeModel.belongsTo(GroupModel, { foreignKey: 'group_id'})


AttributeModel.hasMany(GoodsAttributeModel, { foreignKey: 'attr_id'})
GoodModel.hasMany(GoodsAttributeModel, { foreignKey: 'good_id', as: 'attr'})
GoodsAttributeModel.belongsTo(GoodModel, { foreignKey: 'good_id'})
GoodsAttributeModel.belongsTo(AttributeModel, { foreignKey: 'attr_id'})

export {GoodModel, GroupModel, PricesAndCountsModel, AttributeModel, GoodsAttributeModel }
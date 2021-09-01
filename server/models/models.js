
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
        autoIncrement: true,
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
        autoIncrement: true,
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

const DescModel = sequelize.define('desc', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    good_id: {
        type: Sequelize.STRING
    },
    text: {
        type: Sequelize.TEXT
    }
})

const ImageModel = sequelize.define('image', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    good_id: {
        type: Sequelize.STRING
    },
    url: {
        type: Sequelize.STRING
    },
    main: {
        type: Sequelize.BOOLEAN
    }
})

const DeliveryModel = sequelize.define('delivery', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    user_id: {
        type: Sequelize.INTEGER
    },
    city: {
        type: Sequelize.STRING
    },
    street: {
        type: Sequelize.STRING
    },
    house: {
        type: Sequelize.STRING
    },
    room: {
        type: Sequelize.STRING
    }
})

const UserModel = sequelize.define('user', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING
    },
    surname: {
        type: Sequelize.STRING
    },
    password: {
        type: Sequelize.STRING
    },
    email: {
        type: Sequelize.STRING,
        unique: true
    },
    phone: {
        type: Sequelize.STRING
    },
    role: {
        type: Sequelize.STRING,
        defaultValue: "USER"
    }
})

const OrderModel = sequelize.define('order', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    user_id: {
        type: Sequelize.INTEGER
    },
    address: {
        type: Sequelize.STRING
    },
    payment: {
        type: Sequelize.STRING
    },
    total: {
        type: Sequelize.INTEGER,
    },
    type: {
        type: Sequelize.STRING
    }
})


const OrderProductsModel = sequelize.define('order_product', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    order_id: {
        type: Sequelize.INTEGER
    },
    good_id: {
        type: Sequelize.STRING
    },
    count: {
        type: Sequelize.INTEGER
    },
    price: {
        type: Sequelize.INTEGER,
    },
    total: {
        type: Sequelize.INTEGER
    }
})

GroupModel.hasMany(GoodModel, { foreignKey: 'group_id'})
GoodModel.belongsTo(GroupModel, { foreignKey: 'group_id'})


GoodModel.hasOne(PricesAndCountsModel, { foreignKey: 'good_guid'})
PricesAndCountsModel.belongsTo(GoodModel, { foreignKey: 'good_guid'})

GroupModel.hasMany(AttributeModel, { foreignKey: 'group_id'})
AttributeModel.belongsTo(GroupModel, { foreignKey: 'group_id'})


AttributeModel.hasMany(GoodsAttributeModel, { foreignKey: 'attr_id'})

for (let i = 0; i < 1000; i++) {
    GoodModel.hasMany(GoodsAttributeModel, { foreignKey: 'good_id' , as : `filter_${i}`})
}

GoodsAttributeModel.belongsTo(GoodModel, { foreignKey: 'good_id'})
GoodsAttributeModel.belongsTo(AttributeModel, { foreignKey: 'attr_id'})




GoodModel.hasOne(DescModel, { foreignKey: 'good_id'})
DescModel.belongsTo(GoodModel, { foreignKey: 'good_id'})

GoodModel.hasMany(ImageModel, { foreignKey: 'good_id'})
ImageModel.belongsTo(GoodModel, { foreignKey: 'good_id'})

OrderModel.hasMany(OrderProductsModel, { foreignKey: 'order_id'})
OrderProductsModel.belongsTo(OrderModel, { foreignKey: 'order_id'})


GoodModel.hasMany(OrderProductsModel, { foreignKey: 'good_id'})
OrderProductsModel.belongsTo(GoodModel, { foreignKey: 'good_id'})

// OrderProductsModel.sync({force: true})

export {
    GoodModel,
    GroupModel, 
    PricesAndCountsModel, 
    AttributeModel, 
    GoodsAttributeModel, 
    DescModel, 
    ImageModel, 
    UserModel, 
    DeliveryModel ,
    OrderProductsModel,
    OrderModel
}
import LayoutGrid from './layout'
import {Table} from 'antd'
import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";
import { useEffect, useState } from 'react';
export default function Products() {

    const [data, setData] = useState([]);
    useEffect(() => {
      async function getData(){
          const api = new WooCommerceRestApi({
              url: "http://admin.stroitelstore.ru/",
              consumerKey: "ck_f3179856b9f88fc14315e11fd4c231397f53759e",
              consumerSecret: "cs_51824080e7aea0de3cec00f7f409f4d1a67e881d",
              version: "wc/v3"
              });
          await api.get("products", {
                  per_page: 100,
                  stock_status: 'instock'// 18 products per page
              })
              .then( result => {
                      let arr = [];
                      result.data.forEach(item => {
                          arr.push(+item.price)
                      });
                      setData(result.data)
                  }
              )
  
              
      }
      
      getData();
  
  
      
  
  }, []);


    const columns = [
        {
            title: 'ID',
            dataIndex: 'id'
        },
        {
            title: 'Картинка',
            dataIndex: 'images',
            render: (images) => (
                <img height="60px" width="60px" src={images[0].src}></img>
            )
        },
        {
            title: 'Наименование',
            dataIndex: 'name'
        },
        {
            title: 'Цена, руб.',
            dataIndex: 'price'
        },
        {
            title: 'Группа',
            dataIndex: 'categories',
            render: (cat) => (
                <p>{cat[0].name}</p>
            ),
            filters: [
                {
                    text: 'Крюки',
                    value: 'Крюки'
                }
            ],
            onFilter: (value, record) => record.categories[0].name === value
        },
        {
            title: 'Остаток',
            dataIndex: 'stock_quantity'
        },
    ]


    return (
        <LayoutGrid title={'Товары'} navbarKey="2">
            {console.log(data)}
            <Table dataSource={data} columns={columns}></Table>
        </LayoutGrid>
    )
}

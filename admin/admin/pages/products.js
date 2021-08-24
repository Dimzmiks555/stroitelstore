import LayoutGrid from './layout'
import {Table} from 'antd'
import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";
import { useEffect, useState } from 'react';
export default function Products() {

    const [data, setData] = useState([]);
    useEffect(() => {
      async function getData(){
         
        fetch('http://localhost/api/products')
        .then(res => res.json())
        .then(json => setData(json))
  
              
      }
      
      getData();
  
  
      
  
  }, []);


    const columns = [
        {
            title: 'GUID',
            dataIndex: 'guid'
        },
        // {
        //     title: 'Картинка',
        //     dataIndex: 'images',
        //     render: (images) => (
        //         <img height="60px" width="60px" src={images[0].src}></img>
        //     )
        // },
        {
            title: 'Артикул',
            dataIndex: 'sku'
        },
        {
            title: 'Наименование',
            dataIndex: 'title'
        },
        {
            title: 'Цена, руб.',
            dataIndex: 'price'
        },
        {
            title: 'Группа',
            dataIndex: 'group',
            filters: [
                {
                    text: 'Крюки',
                    value: 'Крюки'
                }
            ],
            onFilter: (value, record) => record.group === value
        },
        {
            title: 'Остаток',
            dataIndex: 'amount'
        },
    ]


    return (
        <LayoutGrid title={'Товары'} navbarKey="2">
            {console.log(data)}
            <Table dataSource={data} columns={columns}></Table>
        </LayoutGrid>
    )
}

import LayoutGrid from './layout'
import {Table} from 'antd'
import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";
import { useEffect, useState } from 'react';
export default function Products() {

    const [data, setData] = useState([]);
    const [metadata, setMetaData] = useState([]);

    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 20,
    })

    



    const handleTableChange = (pagination) => {
        fetch(`http://localhost/api/products?page=${pagination.current}`)
        .then(res => res.json())
        .then(json => {
            setData(json.data)
            setMetaData(json.metadata)
            setPagination({
                 pagination,
                 total: json.metadata[0]['COUNT(*)']
            })
            console.log(json.metadata[0])
        })
      };

    useEffect(() => {
      async function getData(params = {}){
         
        fetch('http://localhost/api/products')
        .then(res => res.json())
        .then(json => {
            setData(json.data)
            setMetaData(json.metadata)
            setPagination({
                ...params.pagination,
                 total: json.metadata[0]['COUNT(*)']
            })
            console.log(json.metadata[0])
        })
  
              
      }
      
      getData({pagination});
  
  
      
  
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
            <Table 
                onChange={handleTableChange}
                dataSource={data} 
                columns={columns}
                pagination={pagination}
            ></Table>
        </LayoutGrid>
    )
}

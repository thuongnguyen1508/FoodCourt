import React ,{useState,useEffect} from 'react'
import Table from '../../../components/table/Table'
import axios from "axios";
import { Link } from 'react-router-dom';

const listFoods = {
     header: [
        "Mã món",
        "Tên món",
        "Mã danh mục",
        // "UrlImage",
        "Giá",
        "Mô tả",
        "Trạng thái",
        "Xoá/Sửa"
    ]
}

const renderOrderHead = (item, index) => (
    <th key={index}>{item}</th>
)

const Foods = () => {
    const [listcate,setCategory]=useState([]);
    const [listFood,setlistFood]=useState([]);
    const [newFood,setnewFood] =useState({
        id:"",
        name:"",
        category_id:"",
        food_img:"",
        price:"",
        description:"",
        status:"",
    });
    const handleInputChange=(e)=>
    {
       e.preventDefault();
       let { name, value }=e.target;
       setnewFood({...newFood,[name]: value });
       console.log(newFood.id + "," + newFood.name+", " + newFood.category_id +  "," + newFood.food_img+", " + newFood.price+", " + newFood.description+ ","+newFood.status);
    };
    const handleAdd=(e)=>{
       e.preventDefault();
    };
    useEffect(()=>{
        async function fetchListCategory()
        {
            try {
                const res = await axios.get(
                    `http://localhost:5000/api/v1/category/getListCategory`
                  );
                setCategory(res.data);
                console.log(res.data);
            } catch (error) {
                console.log('fail to get listFood', error.message)
            }
        }
        fetchListCategory();
      },[]);
      const fetchListFood=async ()=>
      {
          try {
            const res = await axios.get(
                `http://localhost:5000/api/v1/food//getListFood`
              );
              setlistFood(res.data);
            console.log(res.data);
          } catch (error) {
              console.log('fail to get listfood', error.message)
          }
      }
    useEffect(()=>{
      fetchListFood();
    },[]);
    const deleteRecord = (productId) =>
        {
          axios.delete(`http://localhost:5000/api/v1/employee/${productId}`)
          .then((result)=>{
            fetchListFood();
          })
          .catch(()=>{
            alert('Error in the Code');
          });
        };
    return (
        <div>
            <h2 className="page-header">Quản lí món</h2>
                <div className="row">
                    <div className="col-4">
                        <div className="card">
                            <div className="card__header1">
                                <h3>Quản lí món</h3>
                            </div>
                            <div className="card__body">
                                <form>
                                    <div className="form-group">
                                        <lable>Tên món</lable>
                                        <input type="text" className="form-control" name="name" onChange={handleInputChange}></input>
                                    </div>   
                                    <div className="form-group">
                                        <lable>Mã danh mục</lable>
                                        <select className="form-control" name="category_id" onChange={handleInputChange}>                                            
                                            {
                                                listcate.map((item,i)=>{
                                                   return (<option key={i} value={item.id}>
                                                        {item.name}
                                                    </option>)})
                                            }
                                        </select>
                                    </div>   
                                    <div className="form-group">
                                        <lable>UrlImage</lable>
                                        <input type="text" className="form-control" name="food_img" onChange={handleInputChange}></input>
                                    </div> 
                                    <div className="form-group">
                                        <lable>Giá</lable>
                                        <input type="number" className="form-control" name="price" onChange={handleInputChange}></input>
                                    </div>
                                    <div className="form-group">
                                        <lable>Mô tả</lable>
                                        <textarea className="form-control" type="text" name="description" onChange={handleInputChange}></textarea>
                                    </div>
                                    <div className="form-group">
                                        <lable>Trạng thái</lable>
                                        <select className="form-control" name="status" onChange={handleInputChange}> 
                                           <option value="1">Sử dụng</option>
                                           <option value="0">Ngưng sử dụng</option>
                                        </select>
                                    </div>   
                                    <div className="row">
                                        <div className="col-12"> 
                                            <button type="submit" className="buttonform" onClick={handleAdd}>Thêm</button>  
                                        </div>
                                    </div>                                                                        
                                </form>                                                                                                                                </div>
                            </div>
                    </div>
                    <div className="col-8">
                        <div className="card">
                            <div className="card__header1">
                                <h3>Danh sách món</h3>
                            </div>
                            <div className="input-group mb-4 mt-3">
                               <div className="form-outline">
                                   <input type="text" id="form1" className="form-control" placeholder="Tìm kiếm" style={{backgroundColor:"#ececec"}}/>
                               </div>
                               <button type="button"  className="btn btn-success">
                                   <i className="fa fa-search" aria-hidden="true"></i>
                               </button>
                            </div>  
                            <div className="card__body">
                                <Table
                                    limit='10'
                                    headData={listFoods.header}
                                    renderHead={(item, index) => renderOrderHead(item, index)}
                                    bodyData={listFood}
                                    renderBody={(item, index) => 
                                        <tr key={index}>
                                            <td>{item.id}</td>
                                            <td>{item.name}</td>
                                            <td>{item.category_id}</td>
                                            {/* <td>{item.urlimage}</td> */}
                                            <td>{item.price}</td>
                                            <td>{item.description}</td>
                                            <td>{item.active===true?"Sử dụng":"Ngưng sử dụng"}</td>
                                            <td>                                     
                                                   <Link onClick={() => {
                                                     const confirmBox = window.confirm(
                                                       "Bạn chắc chắn muốn xoá "+ item.name
                                                     )
                                                     if (confirmBox === true) {
                                                       deleteRecord(item.id)
                                                     }
                                                   }}> <i className="far fa-trash-alt" style={{fontSize:"18px",marginRight:"5px"}}></i> </Link>
                                                <Link className=" mr-2" to={`/editFood/${item.id}`}>
                                                  <i className="fa fa-edit" aria-hidden="true"></i> 
                                                </Link>
                                            </td>
                                    </tr>                
                                    }                           
                                />
                            </div>                                                                                
                        </div>
                    </div>
                </div>
        </div>
    );
}

export default Foods

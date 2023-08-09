import React, { Component, Fragment } from 'react'
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    withRouter
    } from "react-router-dom";

import axios from 'axios';
 

export class AddProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            type : [],
            brand : [],
            resCondition : '',
            intro : '',
            desc : '',
            prdType : '',
            prdBrand : '',
            img1 : null,
            img2 : null,
            img3 : null,
            amountLeft : null,
            price : null

        }
    }
    
    async componentDidMount(){
        window.$('[data-bs-toggle="tooltip"]').tooltip();

        try{
            const res1 = await axios.get('/getPrdTyp',{
                headers : {
                    'Content-Type' : 'application/json'
                }
            });
            const res2 = await axios.get('/getPrdBrnd',{
                headers : {
                    'Content-Type' : 'application/json'
                }
            });

            const [response1, response2] = await Promise.all([res1, res2]);

            this.setState({
                type : response1.data.allType,
                brand : response2.data.allBrand
            })

            console.log(this.state.type, this.state.brand)

        }catch(error){
            console.log(error);
        }
    }

    
    resUserCond = ()=>{
        if(this.state.resCondition != ''){
            return <div className='text-center'>
                <p>{this.state.resCondition}</p>
            </div>
        }else{
            return <div className='text-center'>
                <p>Please Enter Valid Product Name & Information ...<br/>Image Can only Be Jpg or Jpeg Formated.</p>
            </div>
        }
        }
  
    addPrdType=()=>{
        return  this.state.type.map((eachone)=>{
            return  <option value={eachone.type}>{eachone.type}</option>
        })
    }

    addPrdBrand=()=>{
        return  this.state.brand.map((eachone)=>{
            return  <option value={eachone.type}>{eachone.type}</option>
        })
    }

    AddProduct = async(e)=>{
        e.preventDefault();
        const formData = new FormData();
        formData.append('intro',this.state.intro);
        formData.append('desc',this.state.desc);
        formData.append('prdType',this.state.prdType);
        formData.append('prdBrand',this.state.prdBrand);
        formData.append('amountLeft',this.state.amountLeft);
        formData.append('price',this.state.price);
        formData.append('img1',this.state.img1);
        formData.append('img2',this.state.img2);
        formData.append('img3',this.state.img3);
    

    try{
        const response = await axios.post(`/addProduct/${localStorage.getItem('slno')}`, formData, {
            headers : {
                'Content-Type' : 'multipart/form-data'
            }
        })
        if(response.status == 200){
            this.setState({resCondition : response.data.message});
            if(response.data.message == 'Successfully Added Product ...'){
                this.setState = {
                    intro : '',
                    desc : '',
                    prdType : '',
                    prdBrand : '',
                    img1 : null,
                    img2 : null,
                    img3 : null,
                    amountLeft : null,
                    price : null    
                }
                
                const inputFields = document.querySelectorAll('input[type="text"], input[type="number"], input[type="file"], select, textarea');

                // Loop through all the input fields and set their values to an empty string
                inputFields.forEach((input) => {
                    input.value = '';
                });
            }
        }
        
        
    }catch(error){
        console.log(error)
    }
    }

    render() {
        return (
            <Fragment>
            <div className='container-fluid product d-flex justify-content-center align-items-center flex-column'>
            <div className='row row-cols-1 row-cols-md-12 d-flex justify-content-center logintxt'>
                <div className='col col-md-12 mb-5 alertshadw'>{this.resUserCond()}</div>
            </div>
            <form method="POST"  encType='multipart/form-data'>
                <div className='row row-cols-1 row-cols-md-12 d-flex justify-content-center logintxt regformwidth'>
                    <div className='col col-md-10 mb-2'><input onChange={(e)=>{this.setState({intro : e.target.value})}} className="form-control form-control-sm" type="text" placeholder="Product Title" data-bs-toggle="tooltip" data-bs-placement="right" data-bs-custom-class="custom-tooltip" data-bs-title="Insert Product Introduction in One Line." aria-label=".form-control-sm example" /></div>
                    
                    <div className='col col-md-10 mb-2'><textarea onChange={(e)=>{this.setState({desc : e.target.value})}} className="form-control form-control-sm txtboxwidhigh" type="text" placeholder="Product Description In 600 Characters." data-bs-toggle="tooltip" data-bs-placement="right" data-bs-custom-class="custom-tooltip" data-bs-title="Insert Product Detailed Description." aria-label=".form-control-sm example"></textarea></div>
                    
                    <div className='col col-md-5 mb-2'><select onChange={(e)=>{this.setState({prdType : e.target.value})}} class="form-select" aria-label="Default select example">
                    <option selected disabled>Product Type</option>
                    {this.addPrdType()}
                    </select></div>


                    <div className='col col-md-5 mb-2'><select onChange={(e)=>{this.setState({prdBrand : e.target.value})}} class="form-select" aria-label="Default select example">
                    <option selected disabled>Product Brand</option>
                    {this.addPrdBrand()}
                    </select></div>

                    <div className='col col-md-5 mb-2'><input onChange={(e)=>{this.setState({amountLeft : e.target.value})}} className="form-control form-control-sm" type="number" placeholder="Amount In Stock" aria-label=".form-control-sm example" /></div>
                    <div className='col col-md-5 mb-2'><input onChange={(e)=>{this.setState({price : e.target.value})}} className="form-control form-control-sm" type="number" placeholder="Price $" aria-label=".form-control-sm example" /></div>
                    
                    <div className='col col-md-5 mb-2'><input onChange={(e)=>{this.setState({img1 : e.target.files[0]})}} className="form-control form-control-sm" placeholder="Input image 1" data-bs-toggle="tooltip" data-bs-placement="right" data-bs-custom-class="custom-tooltip" data-bs-title="Insert Product Image 1 Here. Image Can Only Be Jpg or Jpeg." id="formFileSm" type="file" /></div>
                    <div className='col col-md-5 mb-2'><input onChange={(e)=>{this.setState({img2 : e.target.files[0]})}} className="form-control form-control-sm" placeholder="Input image 2" data-bs-toggle="tooltip" data-bs-placement="right" data-bs-custom-class="custom-tooltip" data-bs-title="Insert Product Image 2 Here. Image Can Only Be Jpg or Jpeg." id="formFileSm" type="file" /></div>
                    <div className='col col-md-5 mb-4'><input onChange={(e)=>{this.setState({img3 : e.target.files[0]})}} className="form-control form-control-sm" placeholder="Input image 3" data-bs-toggle="tooltip" data-bs-placement="right" data-bs-custom-class="custom-tooltip" data-bs-title="Insert Product Image 3 Image Here.  Image Can Only Be Jpg or Jpeg." id="formFileSm" type="file" /></div>
                    
                    
                    <div className='col col-md-10 d-flex justify-content-center mb-3'><button onClick={(e)=>{this.AddProduct(e)}} type="button" class="btn btn-sm btn-outline-info"><AppRegistrationIcon /> Add Product</button></div>
                    </div>
            </form>
            </div>
            </Fragment>
        )
    }
}

export default AddProduct

import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import axios from 'axios';
import ImageResults from '../image results/ImageResults';

class Search extends Component {

    state = {
        SearchText : "",
        amount:15,
        apiUrl:'https://pixabay.com/api/',
        apiKey:'18606655-8669f0a11d867bab33571fb28',
        images:[]
    }

     onTextChange = (e) => {
         const val = e.target.value;
        this.setState({[e.target.name]: val},() =>{
            if(val=== ''){
               this.setState({images:[]});
            }else{
                axios.get(`${this.state.apiUrl}/?key=${this.state.apiKey}&q=${this.state.SearchText}&image_type=photo
                &per_page=${this.state.amount}&safesearch=false`)
                .then(res => this.setState({images:res.data.hits}))
                .catch(err => console.log(err));
            }
            
        });
     };

     onAmountChange = (e,index,value) => {
       this.setState({ amount: value });
     }

    render() {
        console.log(this.state.images);
        return (
            <div>
                <TextField 
                  name="SearchText"
                  value={this.state.SearchText}
                  onChange={this.onTextChange}
                  floatingLabelText="Search for PixaBay Images"
                  fullWidth={true}
                />
                <br/>
                <SelectField
                  name="Amount"
                  floatingLabelText="Amount"
                  value={this.state.amount}
                  onChange={this.onAmountChange}
                >
                    <MenuItem  value={5} primaryText="5"/>
                    <MenuItem  value={10} primaryText="10"/>
                    <MenuItem  value={15} primaryText="15"/>
                    <MenuItem  value={20} primaryText="20"/>
                    <MenuItem  value={25} primaryText="25"/>
                    <MenuItem  value={50} primaryText="50"/>

                </SelectField>
                <br/>
                {this.state.images.length > 0 ? (<ImageResults images={this.state.images} />):null}
            </div>
        )
    }
}

export default Search;
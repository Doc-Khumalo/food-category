import React from 'react';
import axios from 'axios';

class Items extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            category: [],
            products: []
        }
    }

    componentDidMount() {
        axios.all([
            axios.get('https://api.gousto.co.uk/products/v2.0/categories'),
            axios.get('https://api.gousto.co.uk/products/v2.0/products?includes[]=categories&includes[]=attributes&sort=position&image_sizes[]=365&i')
        ])
        .then(axios.spread((categoryRes, productRes) => {
               this.setState({
                   category: categoryRes.data,
                   products: productRes.data
            })
        }));
    }
    
    render() {
        console.log('category', this.state.category)
        console.log('products', this.state.products)
        return (
            <div>Test</div>
        )
    }
}

export default Items;
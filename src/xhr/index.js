import axios from 'axios';

let getData;

getData = function() {
    return axios.all([
            axios.get('https://api.gousto.co.uk/products/v2.0/categories'),
            axios.get('https://api.gousto.co.uk/products/v2.0/products?includes[]=categories&includes[]=attributes&sort=position&image_sizes[]=365&i')
        ])
}

export { getData }
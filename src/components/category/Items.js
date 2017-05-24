import React from 'react';
import axios from 'axios';
import { getData } from '../../xhr/index.js';

const Items = React.createClass({

    getInitialState() {
        return {
            categories: [],
            products: [],
            categoryID: null,
            searchString: ''
        }
    },

    // handleFilter(e) {
    //     this.setState({ searchString: e.target.products });
    // },

    selectCat(category) {
        this.setState({
            categoryID: category
        });
    },

    componentDidMount() {
        getData().then(axios.spread((categoryRes, productRes) => {
            this.setState({
                categories: categoryRes.data.data,
                products: productRes.data.data
            })
        }));
    },

    render() {
        console.log('category', this.state.categories)
        console.log('products', this.state.products)

        const {
            categories,
            products,
            categoryID,
            searchString
        } = this.state;


        return (
            <div>
                <h1>Store Cupboard</h1>

                {/*<div>
                    <input type="search" placeholder="Search..." onChange={this.handleFilter} />
                    {products}
                </div>*/}

                <CategoryItems
                    categories={categories}
                    selectCat={this.selectCat} />

                <CategoryListings
                    products={products}
                    categoryID={categoryID} />
            </div>
        )
    }
});

const CategoryNavigationListing = React.createClass({
    handleClick(e) {
        const { id, selectCat } = this.props;
        e.preventDefault();
        selectCat(id);
    },

    render() {
        const { id, title } = this.props;
        return (
            <div>
                <a href={id} onClick={this.handleClick}>
                    {title}
                </a>
            </div>
        );
    }
});

const CategoryItems = React.createClass({
    renderCategoryItems() {
        const { selectCat, categories } = this.props;

        return categories.map(category => {
            const { id, title } = category;
            return (
                <CategoryNavigationListing
                    key={id}
                    title={title}
                    id={id}
                    selectCat={selectCat} />
            );
        });
    },

    render() {
        return (
            <div>
                <div>
                    {this.renderCategoryItems()}
                </div>
            </div>
        );
    }
});

const CategoryNavigationListingLink = React.createClass({
    render() {
        const { name } = this.props;
        return (
            <div id={name}>
                {name}
            </div>
        );
    }
});

const CategoryListings = React.createClass({
    renderDesc() {
        const { categoryID, products } = this.props;
        return products.filter(product => {
            return product.categories.some(catMain => {
                return catMain.id === categoryID;
            });
        })
            .map(product => {
                const { title, link, id } = product;
                return (
                    <CategoryNavigationListingLink
                        key={id}
                        name={title}
                        link={link} />
                );
            });
    },

    render() {
        return (
            <div>
                {this.renderDesc()}
            </div>
        );
    }
});

export default Items;
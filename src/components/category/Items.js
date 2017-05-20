import React from 'react';

class Items extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            category: [],
            products: []
        }
    }

    ComponentDidMount() {
        getItems().then(results => {
            this.setState = ({
                // category:
                // products:
            })
        })
    }
    
    render() {
        return (
            <div></div>
        )
    }
}

export default Items;
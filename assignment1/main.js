var ListItem = React.createClass({
	propTypes: {
		id: React.PropTypes.number,
		name: React.PropTypes.string.isRequired,
		price: React.PropTypes.string.isRequired,
		description: React.PropTypes.string
        
	},
	render: function() {
		return (
			React.createElement('li', {className: 'listItem'},
				React.createElement('a', {className: 'name', id: 'item/' + this.props.id, href: '#item/' + this.props.id}, this.props.name),
				React.createElement('div', {className: 'price'}, this.props.price),
				React.createElement('div', {className: 'description'}, this.props.description)
			)
		);
	}
});
var ListItems = React.createClass({
	propTypes: {
		items: React.PropTypes.array.isRequired
	},
	render: function() {
		return (
			React.createElement('ul', {className: 'list'}, this.props.items.map(i => React.createElement(ListItem, i)))
		);
	}
});
let AddNewForm = React.createClass({
	propTypes: {
		listItem: React.PropTypes.object.isRequired,
		onChange: React.PropTypes.func.isRequired,
		onSubmit: React.PropTypes.func.isRequired
	},
	onNameChange: function(e) {
		this.props.onChange(Object.assign({}, this.props.listItem, {name: e.target.value}));
	},
	onPriceChange: function(e) {
		this.props.onChange(Object.assign({}, this.props.listItem, {price: e.target.value}));
	},
	onDescriptionChange: function(e) {
		this.props.onChange(Object.assign({}, this.props.listItem, {description: e.target.value}));
	},
	onSubmit: function() {
		this.props.onSubmit(this.props.listItem);
	},
	render: function() {
		return (
			React.createElement('form', {className: 'form'},
				React.createElement('input', {
					type: 'text',
					placeholder: 'Name',
					value: this.props.listItem.name,
					onChange: this.onNameChange
				}),
				React.createElement('input', {
					type: 'text',
					placeholder: 'Price',
					value: this.props.listItem.price,
					onChange: this.onPriceChange
				}),
				React.createElement('textarea', {
					placeholder: 'Description',
					value: this.props.listItem.description,
					onChange: this.onDescriptionChange
				}),
				React.createElement('button', {type: 'button', onClick: this.onSubmit}, 'Submit')
			)
		);
	}
});
function updateNewListItem(item) {
	setState({listItem: item});
}
function addNewItem(item) {
	let itemList = state.items;
	itemList.push(Object.assign({}, {key: itemList.length + 1, id: itemList.length + 1}, item));
	setState({items: itemList});
    
    
}
let NavMenu = React.createClass({
	render: function() {
		return (
			React.createElement('ul', {className: 'nav-menu'},
				React.createElement('li', {},
					React.createElement('a', {href: '#list'}, 'List')
				),
				React.createElement('li', {},
					React.createElement('a', {href: '#new'}, 'New')
				)
			)
		);
	}
});

let state = {
	location: ''
};

let ListPage = React.createClass({
	propTypes: {
		items: React.PropTypes.array
	},
	render: function () {
		return (
			React.createElement('div', {},
				React.createElement(NavMenu, {}),
				React.createElement(ListItems, {items: this.props.items})
			)
		);
	}
});

let NewPage = React.createClass({
	render: function () {
		return (
			React.createElement('div', {},
				React.createElement(NavMenu, {}),
				React.createElement(AddNewForm, {listItem: this.props.listItem, onChange: this.props.onChange, onSubmit: this.props.onSubmit})
			)
		);
	}
});

let ItemPage = React.createClass({
	propTypes: {
		id: React.PropTypes.number,
		name: React.PropTypes.string.isRequired,
		price: React.PropTypes.string.isRequired,
		description: React.PropTypes.string
	},
	render: function () {
		return (
			React.createElement('div', {},
				React.createElement(NavMenu, {}),
				React.createElement('div', {className: 'itemDesc'},
					React.createElement('p', {className: 'name'}, this.props.name),
					React.createElement('p', {className: 'price'}, this.props.price),
					React.createElement('p', {}, this.props.description)
				)
			)
		);
	}
});

function setState(changes) {
	let component;
	let componentProperties = {};
	Object.assign(state, changes);
    
	let splittedUrl = state.location.replace(/^#\/?|\/$/g, '').split('/');
    
	switch(splittedUrl[0]) {
	case 'new': 
		component = NewPage;
		componentProperties = {listItem: state.listItem, onChange: state.onNewListItemChange, onSubmit: state.onSubmitNewItem};
		break;
	case 'item':
		component = ItemPage;
		componentProperties = items.find((i) => i.key == splittedUrl[1]);
		break;
	default: 
		component = ListPage;
		componentProperties = {items: state.items};
	}
    
    
    
	ReactDOM.render(
		React.createElement(component, componentProperties),
		document.getElementById('react-app')
	);
//    ReactDOM.render(
//        React.createElement(FormView, Object.assign({}, state, {
//            onNewListItemChange: updateNewListItem,
//            onSubmitNewItem: addNewItem
//        }, component, {})),
//        document.getElementById('react-app')
//    );
}
window.addEventListener('hashchange', ()=>setState({location: location.hash}));

setState({
	listItem:{
		name: '',
		price: '',
		description: ''
	},
	items: items,
	location: location.hash,
	onNewListItemChange: updateNewListItem,
	onSubmitNewItem: addNewItem
});
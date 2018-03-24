import React from 'react';

class SearchBar extends React.Component {
	constructor(props) {
		super(props);

		this.state = {searchTerm: ''};
	}

	onFormSubmit(event) {
		event.preventDefault();
		this.props.onLocationSearch(this.state.searchTerm);
	}

	onInputChange(event) {
		this.setState({searchTerm: event.target.value})
	}

	render() {
		return (
			<div className="address widget">
				<form onSubmit={event => this.onFormSubmit(event)}>
					<input type="text" name="address" onChange={event => this.onInputChange(event)}  defaultValue={this.props.address} />
					<input type="submit" name="submit-address" />
				</form>
			</div>
		)
	}
}

export default SearchBar;
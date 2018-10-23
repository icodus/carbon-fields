/**
 * External dependencies.
 */
import { Component } from '@wordpress/element';
import { assign, find, get } from 'lodash';

class Complex extends Component {
	/**
	 * Handles the change of the input.
	 *
	 * @param  {string} fieldKey The name(Gutenberg) or the identifier(Classic Editor) of field.
	 * @param  {string} value
	 * @return {void}
	 */
	handleChange = ( fieldKey, value ) => {
		this.props.onChange( {
			[ fieldKey ]: value
		} );
	}

	/**
	 * Handles the change of the child input.
	 *
	 * @param  {string} fieldKey The name(Gutenberg) or the identifier(Classic Editor) of field.
	 * @param  {string} value
	 * @return {void}
	 */
	handleChildChange = ( fieldKey, value ) => {
		const newValue = assign( value, get( this.props.value, fieldKey, {} ) );

		this.props.onChange( this.props.field.base_name, newValue );
	}

	/**
	 * Checks if the field has multiple groups.
	 *
	 * @return {boolean}
	 */
	hasGroups = () => this.props.field.groups.length > 1

	/**
	 * Checks if the field has multiple groups.
	 *
	 * @param  {string} label The value to be replaced in the add button template
	 * @return {string}
	 */
	getAddLabel = ( label = '' ) => carbonFieldsL10n.field.complexAddButton.replace( '%s', label )

	/**
	 * Handles the click of the click of the add buttons.
	 *
	 * @param  {string} groupId The id of the fields group which should be added
	 * @return {void}
	 */
	handleAdd = ( groupId ) => {
		const { field, value } = this.props;

		const group = find( field.groups, ( groupItem ) => groupItem.group_id === groupId );

		this.handleChange( field.base_name, [ ...value, ...[ { ...group } ] ] );
	}

	/**
	 * Render the component.
	 *
	 * @return {Object}
	 */
	render() {
		return this.props.children( {
			depth: this.props.depth,
			handleChange: this.handleChange,
			hasGroups: this.hasGroups,
			getAddLabel: this.getAddLabel,
			handleAdd: this.handleAdd
		} );
	}
}

export default Complex;

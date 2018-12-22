/**
 * External Dependencies
 */
import { Fragment } from '@wordpress/element';
import { PanelBody } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { RichText, InspectorControls } from '@wordpress/editor';
import { registerBlockType } from '@wordpress/blocks';

registerBlockType( 'geocities/wordart', {
	title: __( 'Wordart', 'geocities-blocks' ),
	icon: 'carrot',
	category: 'geocities',
	description: __(
		'A simple text element with classic wordart styles',
		'geocities-blocks'
	),
	attributes: {
        content: {
    		type: 'string',
    		source: 'html',
    		selector: '.gc-wordart-content',
    		default: 'Word Art!!!',
    	},
        level: {
    		type: 'number',
    		default: 2,
    	},
    	align: {
    		type: 'string',
    	},
	},

    styles: [
		{ name: 'gc-rainbow', label: __( 'Rainbow Text' ), isDefault: true }
	],

    edit: ({ attributes, setAttributes }) => {
        const { className, content, placeholder } = attributes
        return (
            <Fragment>
                <h2 className={className}>
                    <RichText
                        identifier="content"
                        tagName='span'
                        value={ content }
                        onChange={ value => setAttributes( { content: value } ) }
                        onRemove={ () => onReplace( [] ) }
                        className='gc-wordart-content'
                        placeholder={ placeholder || __( 'Write Something...' ) }
                    />
                </h2>
            </Fragment>
        )
    },
    save: ({ attributes }) => {
        const { className, content } = attributes
        return (
            <h2 className={className}>
                <RichText.Content
                    tagName="span"
                    className='gc-wordart-content'
                    value={content}
                />
            </h2>
        )
    }
})

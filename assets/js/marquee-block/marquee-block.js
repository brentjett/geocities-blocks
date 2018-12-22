/**
 * External Dependencies
 */
import { Fragment } from '@wordpress/element';
import { PanelBody } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { RichText, InspectorControls } from '@wordpress/editor';
import { registerBlockType } from '@wordpress/blocks';
import classname from 'classnames';

/**
 * Internal dependencies
 */
import './marquee-block.scss';

registerBlockType( 'geocities/marquee', {
	title: __( 'Marquee', 'geocities-blocks' ),
	icon: 'carrot',
	category: 'geocities',
	description: __(
		'An animated text element.',
		'geocities-blocks'
	),
	attributes: {
        content: {
    		type: 'string',
    		source: 'html',
    		selector: '.gc-marquee-content',
    		default: '',
    	},
		placeholder: {
    		type: 'string',
    	},
	},

	getEditWrapperProps( attributes ) {
		return {}
	},

	edit: props => {
        const { className, isSelected, attributes, setAttributes, onReplace } = props;
		const { content, placeholder } = attributes;
		const classes = classname({
			'gc-marquee' : true,
			'gc-marquee-is-animating' : !isSelected
		}, className )

		return (
            <Fragment>
                <InspectorControls>
                    <PanelBody>
                        Options coming soon!
                    </PanelBody>
                </InspectorControls>
				<div className={classes}>
	                <div>
					{ isSelected && <RichText
										identifier="content"
										tagName='span'
										value={ content }
										onChange={ value => setAttributes( { content: value } ) }
										onRemove={ () => onReplace( [] ) }
										className={ className + 'gc-marquee' }
										placeholder={ placeholder || __( 'Write Something...' ) }
									/>

					}
	                { !isSelected &&
						<Fragment>
							<span className="gc-marquee-content">
								<RichText
									identifier="content"
									value={ content }
									tagName='div'
									className={ className }
									placeholder={ placeholder || __( 'Write Something...' ) }
								/>
							</span>
							<span className="gc-marquee-content">
								<RichText
									identifier="content"
									value={ content }
									tagName='div'
									className={ className }
									placeholder={ placeholder || __( 'Write Something...' ) }
								/>
							</span>
						</Fragment>
					}
	                </div>
	            </div>
            </Fragment>
        )
	},

	save: ({ attributes }) => {
		const { content } = attributes
		return (
			<div className="gc-marquee gc-marquee-is-animating">
                <div>
					<RichText.Content
						tagName="span"
						className="gc-marquee-content"
						value={content}
					/>
					<RichText.Content
						tagName="span"
						className="gc-marquee-content"
						value={content}
					/>
                </div>
            </div>
		);
	},
} );

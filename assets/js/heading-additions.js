import { Fragment } from '@wordpress/element';
import { PanelBody, ToggleControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { InspectorControls } from '@wordpress/editor';
import { addFilter } from '@wordpress/hooks';
import { createHigherOrderComponent } from '@wordpress/compose';
import classname from 'classnames';
import '../css/heading-additions.scss';

/**
 * Add the marquee attribute so it gets saved.
 */
const addAttribute = ( settings, name ) => {

    if ( 'core/heading' !== name ) return settings;

    const { attributes } = settings;

    settings.attributes = Object.assign({}, attributes, {
        marquee: {
            default: false
        },
        isReversed: {
            default: false
        }
    });

    return settings;
}
addFilter(
    'blocks.registerBlockType',
    'geocities/add-marquee-option',
    addAttribute
);

/**
 * Alter how headings get edited. Add support for marquee effect.
 */
const edit = createHigherOrderComponent( BlockEdit => {
    return props => {
        const { name, isSelected, attributes, setAttributes } = props;
        const { marquee, isReversed } = attributes;

        // Only dealing with core/heading blocks
        if ( 'core/heading' !== name ) {
            return <BlockEdit { ...props } />;
        }

        const classes = classname({
            'gc-marquee': true,
            'gc-marquee-is-animating': marquee && !isSelected,
            'gc-marquee-is-editing' : marquee && isSelected,
            'gc-marquee-is-reversed': marquee && isReversed,
        });

        return (
            <Fragment>
                { !marquee && <BlockEdit { ...props } /> }
                { marquee &&
                <div className={classes}>
                    <div className="gc-marquee-wrapper">
                        <span className="gc-marquee-content">
            				<BlockEdit { ...props } />
            			</span>
                        { ! isSelected &&
                        <span className="gc-marquee-content">
            				<BlockEdit { ...props } />
            			</span> }
                    </div>
                </div> }

                <InspectorControls>
                    <PanelBody title={ __( 'Marquee Settings', 'geocities-blocks' ) }>
                        <ToggleControl
                            label={ __( 'Marquee Effect' ) }
                            checked={marquee}
                            onChange={ value => setAttributes( { marquee: value } ) }
                        />
                        <ToggleControl
                            label={ __( 'Reverse Direction' ) }
                            checked={isReversed}
                            onChange={ value => setAttributes( { isReversed: value } ) }
                        />
                    </PanelBody>
                </InspectorControls>
            </Fragment>
        )
    }
}, 'withInspectorControl' );

addFilter(
	'editor.BlockEdit',
	'geocities/add-marquee-option',
	edit
);

/**
 * Alter how headings get saved.
 */
const saveHeading = ( element, blockType, attributes ) => {
    const { marquee, isReversed } = attributes;
    const classes = classname({
        'gc-marquee': marquee,
        'gc-marquee-is-animating': marquee,
        'gc-marquee-is-reversed': marquee && isReversed,
    });

    if ( 'core/heading' !== blockType.name || !marquee ) {
        return element;
    }
	return (
        <div className={classes}>
            <div className="gc-marquee-wrapper">
                <span className="gc-marquee-content">{element}</span>
                <span className="gc-marquee-content">{element}</span>
            </div>
        </div>
    )
}
addFilter(
	'blocks.getSaveElement',
	'geocities/add-marquee-option',
	saveHeading
);

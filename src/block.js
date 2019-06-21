const { RichText, MediaUpload, PlainText, InspectorControls, ColorPalette, InnerBlocks } = wp.blockEditor;
const { registerBlockType } = wp.blocks;
const { PanelBody, Button, TextControl, SelectControl } = wp.components;
const { Fragment, createElement } = wp.element;

const iconEl = createElement('svg', { width: 20, height: 20, viewBox: "0 0 241.95 283.46" },
  createElement('path', { d: "M41.51,41.51,61.56,61.56a113.38,113.38,0,0,1,160.35,0l20-20.05A141.73,141.73,0,0,0,41.51,41.51 M41.51,41.51,61.56,61.56a113.38,113.38,0,0,0,0,160.35L41.51,242A141.73,141.73,0,0,1,41.51,41.51Z M242,242l-20-20a113.38,113.38,0,0,1-160.35,0L41.51,242A141.73,141.73,0,0,0,242,242Z", fill: "#303030"})
);

import './style.scss';
import './editor.scss';

registerBlockType('chrisf/section-container-block', {
  title: 'Section Container Block',
  icon: iconEl,
  category: 'common',
  attributes: {
    bgColor: {
      type: 'string'
    },
    bgImage: {
      type: 'object',
      default: null
    },
    containerId: {
      type: 'string',
      default: null
    },
    elementTag: {
      type: 'string',
      default: 'section'
    },
    paddingVertical: {
      type: 'integer',
      default: 0
    },
    paddingHorizontal: {
      type: 'integer',
      default: 0
    }
  },

  edit( {attributes, className, setAttributes} ) {

    const styles = {}

    //padding
    styles.padding = `${attributes.paddingVertical}rem ${attributes.paddingHorizontal}rem`
    //bg color
    if( attributes.bgColor ){
      styles.backgroundColor = attributes.bgColor
    }
    //if bgImage
    if(attributes.bgImage){
      styles.backgroundImage = 'url(' + attributes.bgImage.image.url + ')'
      styles.backgroundSize = 'cover'
    };

    const onSelectBgImage = ( media ) => {
  		setAttributes( {
  			bgImage: {
  				id: media.id,
  				image: media.sizes.large || media.sizes.full,
  			}
  		} )
  	}

  	const onRemoveBgImage = () => {
  		setAttributes( {
  			bgImage: null
  		} )
  	}

    const getImageButton = (openEvent) => {
      if(attributes.bgImage) {
        return [
          <Button
            onClick={ openEvent }
            className="button button-large"
          >
            Change image
          </Button>,
          <Button
            onClick={ onRemoveBgImage }
            className="button button-large"
          >
            Remove background image
          </Button>
        ];
      } else {
        return (
          <Button
            onClick={ openEvent }
            className="button button-large"
          >
            Choose background image
          </Button>
        );
      }
    };

    return(
      <Fragment>
        <InspectorControls>
          <PanelBody>
            <strong>Select a background color:</strong>
            <ColorPalette
              value={ attributes.bgColor }
              onChange={ color => setAttributes({ bgColor: color })}
            />
          </PanelBody>
          <PanelBody>
            <label><strong>Choose a background image for the section:</strong></label>
            <br />
            <MediaUpload
              onSelect={ onSelectBgImage }
              allowedTypes={["image"]}
              value={ attributes.bgImage }
              render={ ({ open }) => getImageButton(open) }
            />
          </PanelBody>
          <PanelBody>
            <TextControl
              label="Container ID"
              value={ attributes.containerId }
              onChange={ (value) => setAttributes({ containerId: value })}
            />
          </PanelBody>
          <PanelBody>
            <SelectControl
              onChange={(value) => setAttributes({ elementTag: value })}
              value={ attributes.elementTag }
              label="Choose container type"
              options={[ {value: 'section', label: 'section'}, {value: 'div', label: 'div'} ]}
            />
          </PanelBody>
          <PanelBody>
            <label>Padding</label>
            <TextControl
              type="number"
              step="0.5"
              min="0"
              label="Padding Left and Right"
              value={ attributes.paddingHorizontal }
              onChange={ (value) => setAttributes({ paddingHorizontal: parseInt( value, 10 ) })}
            />
            <TextControl
              type="number"
              step="0.5"
              min="0"
              label="Padding Top and Bottom"
              value={ attributes.paddingVertical }
              onChange={ (value) => setAttributes({ paddingVertical: parseInt( value, 10 ) })}
            />
          </PanelBody>
        </InspectorControls>
        <div className="section-wrapper" style={styles}>
          <InnerBlocks />
        </div>
      </Fragment>
    )
  },


  save( { attributes } ) {

    const styles = {}
    //padding
    styles.padding = `${attributes.paddingVertical}rem ${attributes.paddingHorizontal}rem`;
    //bg color
    if( attributes.bgColor ){
      styles.backgroundColor = attributes.bgColor
    }
    //if bgImage
    if(attributes.bgImage){
      styles.backgroundImage = 'url(' + attributes.bgImage.image.url + ')'
      styles.backgroundSize = 'cover'
    };

    //element type
    let container = <section style={styles} id={attributes.containerId}><InnerBlocks.Content /></section>;
    if( attributes.elementTag == 'div' ){
      container = <div style={styles} id={attributes.containerId}><InnerBlocks.Content /></div>;
    }

    return container;
  },

  deprecated: [
    {
      save ( { attributes } ) {
        //element type
        let container = <section id={attributes.containerId}><InnerBlocks.Content /></section>;
        if( attributes.elementTag == 'div' ){
          container = <div id={attributes.containerId}><InnerBlocks.Content /></div>;
        }
        return container;
      }
    }
  ]


});

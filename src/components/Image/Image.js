import React, { Fragment } from 'react';
import Observer from './Observer';
import tw from "twin.macro"

class Image extends React.Component {
  constructor(props) {
    super(props);
    this.ref = React.createRef();
  }

  imageSizes = [
    '320',
    '450',
    '640',
    '750',
    '800',
    '900',
    '1000',
    '1200',
    '1500',
    '1600',
    '2000'
  ]; // image sizes used for image source sets

  state = {
    isIntersecting: false
  };

  handleIntersection = e => {
    if (e.isIntersecting) {
      this.setState({ isIntersecting: true })
    }
  };

  checkIsUploadcare(src) {
    return typeof src === 'string' && src.includes('ucarecdn.com')
  }

  getResolutionString(res) {
    /* add resolutions options for inline images */
    if (res === 'small') {
      res = '400x'
    } else if (res === 'medium') {
      res = '1000x'
    } else if (res === 'large') {
      res = '3000x'
    }
    return res
  }

  render() {
    let {
      resolutions = 'large',
      src,
      secSet = '',
      fullSrc,
      smallSrc,
      onClick,
      title = '',
      alt = '',
      lazy = true,
      greyScale = false
    } = this.props;

    const isUploadcare = this.checkIsUploadcare(src);
    const normalImage = !isUploadcare || !lazy;

    /* create source set for images */
    if (isUploadcare) {
      secSet = this.imageSizes.map(size => {
        return `${src}-/progressive/yes/-/format/auto/-/preview/${size}x${size}/-/quality/lightest/${size}.jpg ${size}w`
      })
    }

    fullSrc = `${src}${
      isUploadcare ? '-/progressive/yes/-/format/auto/-/resize/' + this.getResolutionString(resolutions) + '/' : ''
    }`;
    smallSrc = `${src}${
        isUploadcare ? '-/progressive/yes/-/format/auto/-/resize/10x/' : ''
    }`;

    if (greyScale) {
      const GREY_SCALE_FILTER = '-/filter/carris/';
      smallSrc += GREY_SCALE_FILTER;
      fullSrc += GREY_SCALE_FILTER;
    }

    const style = {
      backgroundImage: `url(${
          this.state.isIntersecting ? fullSrc : smallSrc
      })`,
      opacity: `${this.state.isIntersecting} ? 1 : 0`,
      transition: "ease all 0.3s",
    };

    const ImageDiv = tw.div`inset-0 absolute overflow-hidden bg-center bg-no-repeat bg-cover`;

    return (
      <Fragment>
        {isUploadcare && lazy && (
          <Observer onChange={this.handleIntersection}>
            <ImageDiv
              ref={this.ref}
              style={
                { backgroundImage: `url(${smallSrc})` }
              }
            >
              <ImageDiv
                style={style}
              />
            </ImageDiv>
          </Observer>
        )}
        {normalImage && (
          <Fragment>
            <img
              src={fullSrc}
              srcSet={secSet}
              sizes={'100vw'}
              onClick={onClick}
              title={title}
              alt={alt}
            />
          </Fragment>
        )}
      </Fragment>
    )
  }
}

export default Image;

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import getImages from './functions/getImages';
import ImageComponent from './components/ImageComponent';
import handleScroll from './functions/handleScroll';
import sizeInByes from './functions/sizeInBytes';
import './App.css';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imgs: [], disp: "grid", pg: 1, err: null, amnt: 10, fetching: false
    }
    this.handleScrollLocal = this.handleScrollLocal.bind(this);
    this.liveImg = React.createRef();
  }

  componentDidMount() {
    this.displayImages(this.state.amnt, 1);
    window.addEventListener('scroll', this.handleScrollLocal);
  }

  /**
   * Displays images to the user
   * @param {number} amnt 
   * @param {number} offset 
   */
  async displayImages(amnt, offset) {
    try {
      if (!this.state.fetching) {
        this.setState({ fetching: true });
        let imgs = await getImages(amnt, offset);
        if (imgs) {
          this.setState({ fetching: false });
          if (imgs.photos) {
            this.setState({ imgs: imgs.photos.photo, pg: imgs.photos.page });
          } else {
            throw new Error;
          }
        } else {
          throw new Error;
        }
    }
    } catch (err) {
      this.setState({ err: "There was an internal error. Please contact support", fetching: false }); // fail silent
    }
  }

  /**
   * Binded handle scroll function for page to determine if at bottom
   * @param {event} e 
   */
  handleScrollLocal(e) {
    let bottom = handleScroll.call(this, e);
    if (bottom) {
      this.handleUpdate();
      this.setLive(-1);
    }
  }

  /**
   * Handles update and determines if to advance the page or add more images
   */
  handleUpdate() {
    if (this.state.imgs.length > 90) {
      this.doUpdate(10, this.state.pg + 1);
    } else {
      this.doUpdate(this.state.amnt + 10, this.state.pg);
    }
  }

  /**
   * Does specific update with values passed
   * @param {number} amnt 
   * @param {number} pg 
   */
  doUpdate(amnt, pg) {
      this.displayImages(amnt, pg);
      this.setState({ amnt: amnt, pg });
  }

  /**
   * Will set the current enlarged image to active in state and display to user
   * @param {number} index 
   */
  setLive = async (index) => {
    try {
      if (index > -1) {
        let lv = this.state.imgs[index];
        let url = `https://live.staticflickr.com/${lv.server}/${lv.id}_${lv.secret}.jpg`;
        let bytes = await sizeInByes(url);
        this.setState({ liveImg: index, sizeLive: bytes });
        this.liveImg.current.classList.add('active');
      } else {
        this.setState({ liveImg: -1, sizeLive: null });
        this.liveImg.current.classList.remove('active');
      }
    } catch (err) {
      console.log(err); // fail silent
    }
  }

  render() {
    return (
      <div style={{padding: 25 + 'px'}} id="main">
        <h1>Flickr Gallery</h1>
        <div className="live-img" ref={this.liveImg}>
          { this.state.liveImg > -1 ? 
          <ImageComponent {...this.props} img={this.state.imgs[this.state.liveImg]} key={-1} close={true} setLive={this.setLive} sizeLive={this.state.sizeLive} />
          : null
          }

        </div>
        <div className={this.state.disp}>
          {
            this.state.imgs ?
              this.state.imgs.map((img, index) => 
                <ImageComponent {...this.props}
                img={img}
                key={index}
                index={index}
                setLive={this.setLive}
                />
              )
              : null
          }
        </div>
        {
            this.state.imgs.length > 0 ? 
              <button onClick={(e) => this.handleUpdate()}>Load more</button>
              : null
        }
        <div>{this.state.err ? this.state.err : null}</div>
      </div>
    )
  }
}
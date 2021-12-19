import React, { Component } from 'react';
import '../style/img.css';

/**
 * Component that is used for individual images. To be included in other components individually or as a mapped array.
 */
export default class ImageComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            live: false
        }
    }

    render() {
        return (
            <div className="img-container">
                {
                this.props.close ?
                    <div>
                        <button className="close-img" onClick={(e) => this.props.setLive(-1)}>x</button>
                        { this.props.img.width_o && this.props.img.height_o ? 
                            <div className="w-h">Size: {this.props.img.width_o} x {this.props.img.height_o}</div>
                            : null
                        }
                        {
                            this.props.sizeLive ?
                                <div className="mem">Size In Memory: {this.props.sizeLive} bytes / {this.props.sizeLive / 1000} kbs / {this.props.sizeLive / 1000000} mbs</div>
                            : null
                        }
                    </div>
                        : null
                }
                <img src={`https://live.staticflickr.com/${this.props.img.server}/${this.props.img.id}_${this.props.img.secret}.jpg`} className="img-individual" onClick={(e) => this.props.setLive(this.props.index)}></img>
            </div>
        )
    }
}
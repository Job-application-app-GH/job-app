import React from 'react'
import {connect} from 'react-redux'
import ReactAvatarEditor from 'react-avatar-editor'
import {fetchCandidate} from '../store/candidate'
import {Link} from 'react-router-dom'

class UploadLogo extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      image: '',
      allowZoomOut: false,
      position: {x: 0.5, y: 0.5},
      scale: 1,
      rotate: 0,
      borderRadius: 50,
      preview: null,
      width: 330,
      height: 330,
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  // componentDidMount() {
  //   this.props.loadOrganization(this.props.organization.id)
  // }

  handleNewImage = (e) => {
    this.setState({image: e.target.files[0]})
  }

  handleScale = (e) => {
    const scale = parseFloat(e.target.value)
    this.setState({scale})
  }

  handlePositionChange = (position) => {
    this.setState({position})
  }

  setEditorRef = (editor) => (this.editor = editor)

  async handleSubmit(e) {
    if (this.editor) {
      // This returns a HTMLCanvasElement, it can be made into a data URL or a blob,
      // drawn on another canvas, or added to the DOM.
      const img = this.editor.getImageScaledToCanvas().toDataURL()
      await fetch(`/api/upload`, {
        method: 'POST',
        body: JSON.stringify({data: img}),
        headers: {'Content-type': 'application/json'},
      })
    }
    this.props.history.push('/signup/organization/job')
  }

  render() {
    return (
      <div className="global-screen-box">
        <div className="upload-img-avatar-container">
          <ReactAvatarEditor
            ref={this.setEditorRef}
            scale={parseFloat(this.state.scale)}
            width={this.state.width}
            height={this.state.height}
            position={this.state.position}
            onPositionChange={this.handlePositionChange}
            rotate={parseFloat(this.state.rotate)}
            borderRadius={this.state.width / (100 / this.state.borderRadius)}
            image={this.state.image}
            // color={[255, 198, 84, 1]}
            color={[255, 255, 255, 0.6]}
            className="editor-canvas"
          />
        </div>
        <br />
        <label className="custom-file-upload">
          <input name="newImage" type="file" onChange={this.handleNewImage} />
          <h3>Upload Photo</h3>
        </label>
        <br />
        <h3 style={{fontWeight: 'lighter'}}>Zoom</h3>
        <input
          name="scale"
          type="range"
          onChange={this.handleScale}
          min={this.state.allowZoomOut ? '0.1' : '1'}
          max="2"
          step="0.01"
          defaultValue="1"
        />
        <button className="upload-img-button" onClick={this.handleSubmit}>
          SUBMIT
        </button>
        <Link to="/signup/organization/job">
          <h3>SKIP</h3>
        </Link>
      </div>
    )
  }
}

const mapState = (state) => {
  return {
    organization: state.organization,
  }
}

// const mapDispatch = (dispatch) => {
//   return {
//     fetchCandidate: () => dispatch(fetchCandidate()),
//   }
// }

export default connect(mapState)(UploadLogo)

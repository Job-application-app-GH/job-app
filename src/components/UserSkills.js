import React, { Component } from "react";
import { connect } from "react-redux";
import { getUserSkills, removeUserSkill } from "../store";

class UserSkills extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick = (skill) => {
    console.log("Removing skill : ", skill);
    this.props.removeUserSkill(skill);
  };
  render() {
    console.log("Inside UserSkills Render");
    const { userSkills } = this.props;
    return (
      <React.Fragment>
        <div className="selectedSkills">
          {userSkills.map((skill, index) => {
            return (
              <div className="selectedSkill_container" key={skill.id}>
                <button
                  className="selectedSkill-button"
                  type="button"
                  onClick={() => this.handleClick(skill)}
                >
                  <h3 className="selectedSkill-text">{skill.name}</h3>
                </button>
              </div>
            );
          })}
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userSkills: state.userSkills,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getUserSkills: dispatch(getUserSkills()),
    removeUserSkill: (skill) => dispatch(removeUserSkill(skill)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserSkills);

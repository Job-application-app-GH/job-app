import React, { Component } from "react";
import { connect } from "react-redux";
import { getAllSkills, addUserSkill } from "../store";
import UserSkills from "./UserSkills";

class Skills extends Component {
  constructor(props) {
    super(props);
    this.handleSelect = this.handleSelect.bind(this);
  }

  handleSelect(skill) {
    console.log("selected skill: ", skill);
    this.props.addUserSkill(skill);
  }

  componentDidMount() {
    this.props.getAllSkills();
  }
  render() {
    console.log("Inside Skills render");
    return (
      <div className="skills_container">
        <h3> Please update your skills</h3>
        <UserSkills />
        <div className="skills_list">
          {this.props.skills.map((skill, index) => {
            return (
              <button
                className="skills_button"
                type="button"
                key={skill.id}
                onClick={() => this.handleSelect(skill)}
              >
                {skill.name}
              </button>
            );
          })}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    skills: state.skills,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllSkills: () => dispatch(getAllSkills()),
    addUserSkill: (skill) => dispatch(addUserSkill(skill)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Skills);

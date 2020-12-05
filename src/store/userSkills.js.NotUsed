// import axios from "axios";

const SET_USER_SKILLS = 'SET_USER_SKILLS'
const ADD_USER_SKILL = 'ADD_USER_SKILL'
const REMOVE_USER_SKILL = 'REMOVE_USER_SKILL'
const UPDATE_USER_SKILLS = 'UPDATE_USER_SKILLS'

// const DUMMY_USER_SKILLS_LIST = ["C++"];
const DUMMY_USER_SKILLS_LIST = [{id: 2, name: 'JavaScript'}]

// THUNK creators
export const getUserSkills = () => async (dispatch) => {
  try {
    //Access API to get the given user's skills list from DB table
    // const {data : userSkills} = await axios.get(`/api/skills/:userId`);
    // dispatch(setUserSkills(userSkills));
    dispatch(setUserSkills(DUMMY_USER_SKILLS_LIST))
  } catch (err) {
    console.error(err)
  }
}

// export const updateUserSkills = (userSkills) => async (dispatch) => {
//   try {
//     //API call to update user's skillset in DB
//     //once done, we either want to get the skills from db again,
//     //or actually do nothing, because we already have latest skillset of this user in our state

//     dispatch(setUpdatedSkills(userSkills));
//   } catch (err) {
//     console.error(err);
//   }
// };

// ACTION creators
const setUserSkills = (userSkills) => ({type: SET_USER_SKILLS, userSkills})
export const addUserSkill = (skill) => ({type: ADD_USER_SKILL, skill})
export const removeUserSkill = (skill) => ({type: REMOVE_USER_SKILL, skill})
// const setUpdatedSkills = (userSkills) => ({
//   type: UPDATE_USER_SKILLS,
//   userSkills,
// });

const initialState = []

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_USER_SKILLS:
      return action.userSkills
    case ADD_USER_SKILL:
      //check if user's skills-list already has this skill, if so just return the state.
      //else return the state with added skill
      for (let skill of state) {
        if (skill.id === action.skill.id) return state
      }
      return [...state, action.skill]
    case REMOVE_USER_SKILL:
      return state.filter((skill) => skill.id !== action.skill.id)
    default:
      return state
  }
}

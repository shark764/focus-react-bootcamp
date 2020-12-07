import { employees } from '../data';

const initialState = {
  employees,
  selectedEmployeeId: null,
  formIsOpen: false,
  lastCode: 15,
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case 'ADD_EMPLOYEE': {
      const employee = {
        ...action.payload,
        userId: action.payload.firstName.toLowerCase(),
        employeeCode: `E${state.lastCode + 1}`,
        emailAddress: `${action.payload.firstName.toLowerCase()}.${action.payload.lastName.toLowerCase()}@learningcontainer.com`,
      };

      return {
        ...state,
        employees: state.employees.concat(employee),
        lastCode: state.lastCode + 1,
      };
    }

    case 'UPDATE_EMPLOYEE': {
      const sEmployees = [...state.employees];
      const employeeIndex = sEmployees.findIndex((employee) => employee.userId === action.payload.id);
      sEmployees[employeeIndex] = {
        ...sEmployees[employeeIndex],
        ...action.payload.data,
      };

      return {
        ...state,
        employees: sEmployees,
      };
    }

    case 'REMOVE_EMPLOYEE': {
      return {
        ...state,
        employees: state.employees.filter((employee) => employee.userId !== action.payload),
      };
    }

    case 'SET_SELECTED_EMPLOYEE_ID':
      return {
        ...state,
        selectedEmployeeId: action.payload,
      };

    case 'OPEN_SIDE_FORM':
      return {
        ...state,
        formIsOpen: action.payload,
      };

    default:
      return state;
  }
}

export default rootReducer;
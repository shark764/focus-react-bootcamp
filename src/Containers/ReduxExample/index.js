import React from 'react';
import PropTypes from 'prop-types';
import { Box, Layer } from 'grommet';
import { connect } from 'react-redux';
import Employees from './Employees';
import FormLayout from './Form';
import { openSideForm, setSelectedEmployeeId } from '../../redux/actions';

function ReduxExample({
  formIsOpen, selectedEmployeeId, rdxSetSelectedEmployeeId, rdxOpenSideForm,
}) {
  const closeSideForm = () => {
    rdxSetSelectedEmployeeId(null);
    rdxOpenSideForm(false);
  };

  return (
    <Box align="stretch" pad={{ horizontal: 'large' }}>
      <Employees />

      {formIsOpen && (
        <Layer position="right" full="vertical" modal onClickOutside={closeSideForm} onEsc={closeSideForm}>
          <FormLayout key={selectedEmployeeId} />
        </Layer>
      )}
    </Box>
  );
}

ReduxExample.propTypes = {
  formIsOpen: PropTypes.bool,
  rdxSetSelectedEmployeeId: PropTypes.func,
  rdxOpenSideForm: PropTypes.func,
};

const mapStateToProps = (state) => ({
  formIsOpen: state.root.formIsOpen,
  selectedEmployeeId: state.root.selectedEmployeeId ? state.root.selectedEmployeeId : 'none',
});

const actions = {
  rdxSetSelectedEmployeeId: setSelectedEmployeeId,
  rdxOpenSideForm: openSideForm,
};

export default connect(mapStateToProps, actions)(ReduxExample);

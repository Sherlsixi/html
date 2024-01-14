import CountUI from "../../components/Count";
import { connect } from "react-redux";
import {
  createDecrementAction,
  createIncrementAction,
  createIncrementAsyncAction,
} from "../../redux/count_action";

function mapStateToProps(state) {
  return { count: state };
}
function mapDispatchToProps(dispatch) {
  return {
    jia: (number) => {
      dispatch(createIncrementAction(number));
    },
    jian: (number) => {
      dispatch(createDecrementAction(number));
    },
    jiaAsync: (number, time) => {
      dispatch(createIncrementAsyncAction(number, time));
    },
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(CountUI);

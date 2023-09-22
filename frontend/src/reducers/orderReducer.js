import {
  ADMIN_ORDER_FAIL,
  ADMIN_ORDER_REQUEST,
  ADMIN_ORDER_SUCCESS,
  CLEAR_ERRORS,
  CREATE_ORDER_FAIL,
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  DELETE_ORDER_FAIL,
  DELETE_ORDER_REQUEST,
  DELETE_ORDER_RESET,
  DELETE_ORDER_SUCCESS,
  MY_ORDER_FAIL,
  MY_ORDER_REQUEST,
  MY_ORDER_SUCCESS,
  ORDER_DETAIL_FAIL,
  ORDER_DETAIL_REQUEST,
  ORDER_DETAIL_SUCCESS,
  UPDATE_ORDER_FAIL,
  UPDATE_ORDER_REQUEST,
  UPDATE_ORDER_RESET,
  UPDATE_ORDER_SUCCESS,
} from "../constants/orderConstant";

export const newOrderReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_ORDER_REQUEST:
      return {
        ...state,
        loading:true
      };
    case CREATE_ORDER_SUCCESS:
      return {
        loading:false,
        order: action.payload,
      };
    case CREATE_ORDER_FAIL:
      return {
        loading:false,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
        return state
      
  }
};

export const myOrderReducer = (state = { orders:[] }, action) => {
  switch (action.type) {
    case MY_ORDER_REQUEST:
      return {
        ...state,
        loading:true
      };
    case MY_ORDER_SUCCESS:
      return {
        loading:false,
        orders: action.payload,
      };
    case MY_ORDER_FAIL:
      return {
        loading:false,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
        return state
      
  }
};

export const AdminOrderReducer = (state = { orders:[] }, action) => {
  switch (action.type) {
    case ADMIN_ORDER_REQUEST:
      return {
        ...state,
        loading:true
      };
    case ADMIN_ORDER_SUCCESS:
      return {
        loading:false,
        orders: action.payload,
      };
    case ADMIN_ORDER_FAIL:
      return {
        loading:false,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
        return state
      
  }
};

export const orderOperationReducer = (state = {} , action) => {
  switch (action.type) {
    case UPDATE_ORDER_REQUEST:
      case DELETE_ORDER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case UPDATE_ORDER_SUCCESS:
      return {
        loading: false,
        isUpdated:action.payload.success,
        message:action.payload.message
      };
      case DELETE_ORDER_SUCCESS:
      return {
        loading: false,
        isDeleted:action.payload
      };
    case UPDATE_ORDER_FAIL:
      case DELETE_ORDER_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
      case DELETE_ORDER_RESET:
        return {
          loading: false,
          error: action.payload,
          isDeleted:false

        };
      case UPDATE_ORDER_RESET:
        return {
          loading: false,
          error: action.payload,
          isUpdated:false

        };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const orderDetailReducer = (state = { order:{} }, action) => {
  switch (action.type) {
    case ORDER_DETAIL_REQUEST:
      return {
        loading:true
      };
    case ORDER_DETAIL_SUCCESS:
      return {
        loading:false,
        order: action.payload,
      };
    case ORDER_DETAIL_FAIL:
      return {
        loading:false,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
        return state
      
  }
};
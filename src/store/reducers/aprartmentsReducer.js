const apartmentsReducer = (state = [], action) => {
  switch (action.type) {
    case "CREATE_APARTMENT":
      return [...state, action.newApartment];
    case "GET_APARTMENT":
      return action.apartments;
    case "DELETE_APARTMENT":
      return state.filter(apartment => apartment.apartment_id !== action.apartmentId);
    case "UPDATE_APARTMENT":
      console.table(state)
      let map = state.map(apartment => {
        if (apartment.apartment_id === action.updatedApartment.apartmentId) {
          return action.updatedApartment;
        } else {
          return apartment;
        }
      });
      return map
    default:
      return state;
  }
};

export default apartmentsReducer;
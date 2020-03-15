const intiailState = {
  buildings: [],
  error: null
}
const buildingsReducer = (state = intiailState, action) => {
  switch (action.type) {
    case "GET_BUILDINGS":
      return { ...state, buildings: action.buildings };
    case "GET_BUILDING_APARTMENTS":
      return {...state,
        buildings: state.buildings.map(building => {
        if (building.building_id === action.apartment[0].building_id) {
          building.apartments = action.apartments;
        } else {
          return;
        }}
      )
      }
    case "CREATE_APARTMENT":
      return [...state, action.newApartment];
    case "DELETE_APARTMENT":
      return state.filter(
        apartment => apartment.apartment_id !== action.apartmentId
      );
    case "UPDATE_APARTMENT":
      console.table(state);
      let map = state.map(apartment => {
        if (apartment.apartment_id === action.updatedApartment.apartmentId) {
          return action.updatedApartment;
        } else {
          return apartment;
        }
      });
      return map;
    default:
      return state;
  }
};

export default buildingsReducer;

export function handleKeys(event, id, dispatch) {
  switch (event.key) {
    case "Enter":
      dispatch(id.toString());
      break;

    default:
      break;
  }
}

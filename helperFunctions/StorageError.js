const StorageError = () => {
  // any exception including data not found
  // goes to catch()
  console.warn(props.err.message);
  switch (props.err.name) {
    case 'NotFoundError':
      break;
    case 'ExpiredError':
      break;
  }
}

export default StorageError;
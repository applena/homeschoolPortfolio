const StorageError = () => {
  // any exception including data not found
  // goes to catch()
  console.warn(props.err.message);
  switch (props.err.name) {
    case 'NotFoundError':
      console.error('not found', props.err.name)
      break;
    case 'ExpiredError':
      console.error('expired data', props.err.name)
      break;
  }
}

export default StorageError;
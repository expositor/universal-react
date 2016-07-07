/**
* This looks at static needs parameter in components and waits for the promise to be fullfilled
* It is used to make sure server side rendered pages wait for APIs to resolve before returning res.end()
*/

export  function fetchComponentDataBeforeRender(dispatch, components, params) {
  return Promise.all(
    components.reduce((previous, current) => {
      return (current.need || []).concat(previous);
    }, []).map(need => dispatch(need(params)))
  );
}
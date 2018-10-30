var loaded = false;
window.addEventListener("click", function() {
  if (!loaded) {
    import(/* webpackChunkName: 'base'*/ "./css/base.scss").then(_ => {
      loaded = true;
    });
  }
});

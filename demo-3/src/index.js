var loaded = false;
window.addEventListener("click", function() {
  if (!loaded) {
    import(/* webpackChunkName: 'module-index'*/ "./css/index.scss").then(_ => {
      loaded = true;
    });
  }
});

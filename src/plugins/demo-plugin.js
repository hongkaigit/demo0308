// import moduleName from 'module';
class doSthing {
  install(Vue, option) {
    console.log(Vue);
    console.log(this);
    console.log(option);
  }
}
export default new doSthing();

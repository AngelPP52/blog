function loader(source) {
    console.log('loader-a');
    console.log('data', this.data);
    return source + 'loader-a'
}
loader.pitch = function (reminningRequest, previousRequest, data) {
    console.log('loader-a-pitch');
    console.log('reminningRequest', reminningRequest);
    console.log('previousRequest', previousRequest);
    data.name = 'loader-a-pitch';
}
module.exports = loader;

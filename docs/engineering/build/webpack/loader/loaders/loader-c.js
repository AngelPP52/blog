function loader(source) {
    console.log('loader-c');
    console.log('data', this.data);
    return source + 'loader-c'
}
loader.pitch = function (reminningRequest, previousRequest, data) {
    console.log('loader-c-pitch');
    console.log('reminningRequest', reminningRequest);
    console.log('previousRequest', previousRequest);
    console.log('data', data);
    data.name = 'loader-c-pitch';
}
module.exports = loader;
